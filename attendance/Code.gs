// ================================================================
// MetaBridge Academy — Attendance System
// Google Apps Script Backend  |  Code.gs
// ================================================================

const ADMIN_PASSWORD = 'Admin2026';

// ----------------------------------------------------------------
// LIVE REGISTRATION SHEET
// ID of the Google Sheet that collects enrolment form responses.
// The attendance system reads this sheet to pick up new students
// automatically. The sheet's header row must contain columns whose
// names include the words "name", "cohort" and (optionally) "email".
// ----------------------------------------------------------------
const REG_SHEET_ID = '1n49CjCnNxWX9sEaUUb0Vpjz14i6m4j-3cFwOk2ClEx4';

// Active cohorts — add 'C4', 'C5', etc. here when a new cohort starts.
// Also add an empty entry to STUDENT_REGISTER and run initializeSheets once.
const COHORTS = ['C1', 'C2', 'C3'];

const COURSES = [
  'Artificial Intelligence',
  'Blockchain & Cryptocurrency',
  'Cybersecurity',
  'Data Analytics',
  'Web Development',
  'UI/UX Design',
  'Virtual Assistance',
  'Social Media Marketing',
  'App Development'
];

const BELTS = ['Blue Belt', 'Green Belt', 'Black Belt'];

// Hardcoded register — authoritative list with verified IDs.
// Any new student found in the live registration sheet who is NOT
// already listed here will be merged in automatically with a
// generated ID (MA/Cn/NNN/YY), starting from S/N 16.
const STUDENT_REGISTER = {
  C1: [
    { sn: 1,  id: 'MA/C1/001/26', name: 'Promise Ogechi Okafor',       email: 'Promiseokafor43@gmail.com'      },
    { sn: 2,  id: 'MA/C1/002/26', name: 'Sarouk Danjuma Ahmed',         email: 'danjumasarouk@gmail.com'        },
    { sn: 3,  id: 'MA/C1/003/26', name: 'Kehinde Adenike Matthew',      email: 'ariyo.kehinde2017@gmail.com'    },
    { sn: 4,  id: 'MA/C1/004/26', name: 'Amir Nuru Yakubu',             email: 'anuryakubu@gmail.com'           },
    { sn: 5,  id: 'MA/C1/005/26', name: 'Akwu Victoria Izichi',         email: 'izichiakwu@gmail.com'           },
    { sn: 6,  id: 'MA/C1/006/26', name: 'Nwosu Chisom',                 email: 'nwosuchisom822@gmail.com'       }
  ],
  C2: [
    { sn: 7,  id: 'MA/C2/007/26', name: 'Matthew Blessing Abasiama',    email: 'matthewblessing333@gmail.com'   },
    { sn: 8,  id: 'MA/C2/008/26', name: 'Chinenyenwa Edith Ezurike',    email: 'wanaxynwa@gmail.com'            }
  ],
  C3: [
    { sn: 9,  id: 'MA/C3/009/26', name: 'Utam Friday',                  email: 'utamfriday2017@gmail.com'       },
    { sn: 10, id: 'MA/C3/010/26', name: 'Ishola Oluwatobi Michael',     email: 'Oluwatobimichael60@gmail.com'   },
    { sn: 11, id: 'MA/C3/011/26', name: 'Jones Ifeanyi Asoluka',        email: 'jonesasoluka@gmail.com'         },
    { sn: 12, id: 'MA/C3/012/26', name: 'Omolade Agbotoba',             email: 'oagbotoba@gmail.com'            },
    { sn: 13, id: 'MA/C3/013/26', name: 'Umeano Justina Chikodili',     email: 'happinessj2016@gmail.com'       },
    { sn: 14, id: 'MA/C3/014/26', name: 'Omaraye Vincent Osakpolor',    email: 'o.vosakpolor@gmail.com'         },
    { sn: 15, id: 'MA/C3/015/26', name: 'Abidoye Temitayo',             email: 'temitayoabidoye83@gmail.com'    }
  ]
};

// ----------------------------------------------------------------
// ROUTING
// ----------------------------------------------------------------

function doGet(e) {
  const p = (e && e.parameter) ? e.parameter : {};
  const cohort = (p.c || '').toUpperCase();
  const isAdmin = p.admin === 'true';

  if (isAdmin) {
    const tmpl = HtmlService.createTemplateFromFile('AdminPanel');
    return tmpl.evaluate()
      .setTitle('MetaBridge Academy — Admin Panel')
      .setSandboxMode(HtmlService.SandboxMode.IFRAME)
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  }

  // Lock check — if cohort attendance is not open, show the locked page
  if (cohort && _isCohortLocked(cohort)) {
    return HtmlService.createHtmlOutput(_lockedPageHtml(cohort))
      .setTitle('MetaBridge Academy — Attendance')
      .setSandboxMode(HtmlService.SandboxMode.IFRAME)
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  }

  const tmpl = HtmlService.createTemplateFromFile('StudentForm');
  tmpl.cohort      = cohort;
  tmpl.cohortLabel = cohort ? 'COHORT ' + cohort.replace('C', '') : '';
  return tmpl.evaluate()
    .setTitle('MetaBridge Academy — Attendance')
    .setSandboxMode(HtmlService.SandboxMode.IFRAME)
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// ----------------------------------------------------------------
// STUDENT-FACING FUNCTIONS
// ----------------------------------------------------------------

function getStudentsForCohort(cohort) {
  cohort = (cohort || '').toUpperCase();
  const overrides = _getCohortOverrides();

  // Students explicitly moved OUT of this cohort
  const movedOut = new Set(
    overrides.filter(o => o.fromCohort === cohort).map(o => o.studentId)
  );

  // Students moved INTO this cohort (full record stored in overrides)
  const movedIn = overrides
    .filter(o => o.toCohort === cohort)
    .map(o => ({ sn: o.sn, id: o.studentId, name: o.studentName, email: o.email }));

  const hardcoded = (STUDENT_REGISTER[cohort] || []).filter(s => !movedOut.has(s.id));

  let extras = [];
  try {
    extras = _getLiveNewStudents(cohort).filter(s => !movedOut.has(s.id));
  } catch (e) {}

  return [...hardcoded, ...extras, ...movedIn];
}

function getCourses() { return COURSES; }
function getBelts()   { return BELTS;   }

function getTodayFormatted() {
  return _fmtDate(new Date());
}

function markAttendance(payload) {
  try {
    const ss     = SpreadsheetApp.getActiveSpreadsheet();
    const cohort = (payload.cohort || '').toUpperCase();
    const sheet  = _getOrCreateAttendanceSheet(ss, cohort + '_ATTENDANCE');

    // Duplicate guard: same student + same course + same date
    const last = sheet.getLastRow();
    if (last > 1) {
      const rows = sheet.getRange(2, 1, last - 1, 7).getValues();
      for (const r of rows) {
        if (r[1] === payload.studentId && r[3] === payload.course && r[5] === payload.date) {
          return { success: false, message: 'A record already exists for ' + payload.course + ' on this date.' };
        }
      }
    }

    const nextRow  = sheet.getLastRow() + 1;
    const sn       = nextRow - 1;
    const status   = payload.status || 'Present ✓';
    const isPresent = status.toLowerCase().includes('present');

    sheet.getRange(nextRow, 1, 1, 7).setValues([[
      sn,
      payload.studentId,
      payload.name,
      payload.course,
      payload.belt,
      payload.date,
      status
    ]]);

    // Row styling
    const rowRange = sheet.getRange(nextRow, 1, 1, 7);
    rowRange.setBackground(sn % 2 === 0 ? '#EBF5FB' : '#FFFFFF');
    rowRange.setVerticalAlignment('middle');

    // Status cell — green for present, red for absent
    sheet.getRange(nextRow, 7)
         .setBackground(isPresent ? '#00B894' : '#E74C3C')
         .setFontColor('#FFFFFF')
         .setFontWeight('bold')
         .setHorizontalAlignment('center');

    sheet.autoResizeColumns(1, 7);
    return { success: true };

  } catch (err) {
    return { success: false, message: 'Server error: ' + err.toString() };
  }
}

// ----------------------------------------------------------------
// ADMIN FUNCTIONS
// ----------------------------------------------------------------

function verifyAdmin(password) {
  return { success: password === ADMIN_PASSWORD };
}

function getAdminData(password) {
  if (password !== ADMIN_PASSWORD) return { success: false, message: 'Invalid password' };

  try {
    const ss   = SpreadsheetApp.getActiveSpreadsheet();
    const data = {};

    for (const c of COHORTS) {
      const sheet = ss.getSheetByName(c + '_ATTENDANCE');
      if (sheet && sheet.getLastRow() > 1) {
        data[c] = sheet
          .getRange(2, 1, sheet.getLastRow() - 1, 7)
          .getValues()
          .filter(r => r[1])
          .map(r => ({
            sn: r[0], studentId: r[1], name: r[2],
            course: r[3], belt: r[4], date: r[5], status: r[6]
          }));
      } else {
        data[c] = [];
      }
    }

    // Merged student list (hardcoded + live registrations + cohort moves)
    const allStudents = {};
    for (const c of COHORTS) {
      allStudents[c] = getStudentsForCohort(c);
    }

    return { success: true, data, students: allStudents, cohorts: COHORTS };

  } catch (err) {
    return { success: false, message: err.toString() };
  }
}

function backdateAttendance(password, payload) {
  if (password !== ADMIN_PASSWORD) return { success: false, message: 'Invalid password' };

  // payload.date arrives as YYYY-MM-DD from the date input
  const parts = payload.date.split('-');
  const d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
  payload.date = _fmtDate(d);

  return markAttendance(payload);
}

function deleteRecord(password, cohort, rowSN) {
  if (password !== ADMIN_PASSWORD) return { success: false, message: 'Invalid password' };

  try {
    const ss    = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(cohort.toUpperCase() + '_ATTENDANCE');
    if (!sheet) return { success: false, message: 'Sheet not found' };

    const last = sheet.getLastRow();
    if (last < 2) return { success: false, message: 'No records found' };

    const rows = sheet.getRange(2, 1, last - 1, 7).getValues();
    for (let i = 0; i < rows.length; i++) {
      if (String(rows[i][0]) === String(rowSN)) {
        sheet.deleteRow(i + 2);
        // Re-number S/N
        const newLast = sheet.getLastRow();
        for (let j = 2; j <= newLast; j++) {
          sheet.getRange(j, 1).setValue(j - 1);
        }
        return { success: true };
      }
    }
    return { success: false, message: 'Record not found' };

  } catch (err) {
    return { success: false, message: err.toString() };
  }
}

// Returns the registered course and belt for a student by name.
// Looks them up in the live registration sheet.
// Returns null if not found or sheet unreachable.
function getStudentProfile(studentName) {
  let regSheet;
  try {
    regSheet = SpreadsheetApp.openById(REG_SHEET_ID).getSheets()[0];
  } catch (e) { return null; }

  const data = regSheet.getDataRange().getValues();
  if (data.length < 2) return null;

  const headers   = data[0].map(h => String(h).toLowerCase().trim());
  const nameIdx   = headers.findIndex(h => h.includes('name'));
  const courseIdx = headers.findIndex(h => h.includes('course'));
  const beltIdx   = headers.findIndex(h => h.includes('level') || h.includes('belt'));

  if (nameIdx === -1) return null;

  const target = _normalizeName(studentName);
  for (let i = 1; i < data.length; i++) {
    const rowName = String(data[i][nameIdx] || '').trim();
    if (_normalizeName(rowName) === target) {
      return {
        course: courseIdx !== -1 ? String(data[i][courseIdx] || '').trim() : '',
        belt:   beltIdx   !== -1 ? String(data[i][beltIdx]   || '').trim() : ''
      };
    }
  }
  return null;
}

// Moves a student from one cohort to another by writing to COHORT_OVERRIDES.
// Past attendance records are never touched.
function moveStudentCohort(password, payload) {
  if (password !== ADMIN_PASSWORD) return { success: false, message: 'Invalid password' };

  const { studentId, studentName, email, sn, fromCohort, toCohort } = payload;
  if (!studentId || !fromCohort || !toCohort || fromCohort === toCohort) {
    return { success: false, message: 'Invalid parameters.' };
  }

  try {
    const ss  = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName('COHORT_OVERRIDES');
    if (!sheet) {
      sheet = ss.insertSheet('COHORT_OVERRIDES');
      sheet.getRange(1, 1, 1, 7).setValues([['Student ID','Student Name','Email','S/N','From Cohort','To Cohort','Moved Date']]);
      _styleHeader(sheet, 7);
      sheet.autoResizeColumns(1, 7);
    }

    // Prevent duplicate entry for same student
    if (sheet.getLastRow() > 1) {
      const ids = sheet.getRange(2, 1, sheet.getLastRow() - 1, 1).getValues().flat().map(String);
      if (ids.includes(String(studentId))) {
        return { success: false, message: studentName + ' is already registered as moved. Remove the existing record first to move them again.' };
      }
    }

    const nextRow = sheet.getLastRow() + 1;
    sheet.getRange(nextRow, 1, 1, 7).setValues([[
      studentId, studentName, email || '', sn || '', fromCohort, toCohort, _fmtDate(new Date())
    ]]);
    sheet.autoResizeColumns(1, 7);
    return { success: true };

  } catch (err) {
    return { success: false, message: err.toString() };
  }
}

// Returns the lock state for every cohort. Used by the admin panel.
function getLockState(password) {
  if (password !== ADMIN_PASSWORD) return { success: false };
  try {
    const ss    = SpreadsheetApp.getActiveSpreadsheet();
    let sheet   = ss.getSheetByName('SETTINGS');
    if (!sheet) sheet = _initSettingsSheet(ss);

    const now  = new Date();
    const rows = sheet.getLastRow() > 1
      ? sheet.getRange(2, 1, sheet.getLastRow() - 1, 2).getValues()
      : [];

    const stateMap = {};
    rows.filter(r => r[0]).forEach(r => {
      const cohort = String(r[0]).trim();
      const until  = r[1] ? new Date(r[1]) : null;
      const open   = !!(until && until > now);
      stateMap[cohort] = {
        cohort,
        open,
        minutesLeft: open ? Math.ceil((until - now) / 60000) : 0,
        until: until ? until.toISOString() : null
      };
    });

    const states = COHORTS.map(c => stateMap[c] || { cohort: c, open: false, minutesLeft: 0, until: null });
    return { success: true, states };
  } catch (err) {
    return { success: false, message: err.toString() };
  }
}

// Locks or unlocks a cohort. action = 'lock' | 'unlock'. durationMinutes used when unlocking.
function setLockState(password, cohort, action, durationMinutes) {
  if (password !== ADMIN_PASSWORD) return { success: false, message: 'Invalid password' };
  try {
    const ss    = SpreadsheetApp.getActiveSpreadsheet();
    let sheet   = ss.getSheetByName('SETTINGS');
    if (!sheet) sheet = _initSettingsSheet(ss);

    const rows = sheet.getLastRow() > 1
      ? sheet.getRange(2, 1, sheet.getLastRow() - 1, 1).getValues()
      : [];

    let rowIdx = -1;
    for (let i = 0; i < rows.length; i++) {
      if (String(rows[i][0]).trim() === cohort) { rowIdx = i + 2; break; }
    }
    if (rowIdx === -1) return { success: false, message: 'Cohort not found in settings.' };

    if (action === 'lock') {
      sheet.getRange(rowIdx, 2).setValue('');
    } else {
      const until = new Date(new Date().getTime() + durationMinutes * 60 * 1000);
      sheet.getRange(rowIdx, 2).setValue(until.toISOString());
    }
    return { success: true };
  } catch (err) {
    return { success: false, message: err.toString() };
  }
}

function getAttendanceReport(password) {
  if (password !== ADMIN_PASSWORD) return { success: false };

  try {
    const ss      = SpreadsheetApp.getActiveSpreadsheet();
    const report  = {};
    const totals  = { records: 0, today: 0 };
    const todayStr = _fmtDate(new Date());

    for (const c of COHORTS) {
      const sheet = ss.getSheetByName(c + '_ATTENDANCE');
      if (!sheet || sheet.getLastRow() < 2) { report[c] = {}; continue; }

      const rows = sheet.getRange(2, 1, sheet.getLastRow() - 1, 7).getValues().filter(r => r[1]);
      totals.records += rows.length;
      totals.today   += rows.filter(r => r[5] === todayStr).length;

      const byStudent = {};
      for (const r of rows) {
        const sid = r[1];
        if (!byStudent[sid]) byStudent[sid] = { name: r[2], cohort: c, total: 0, byCourse: {} };
        byStudent[sid].total++;
        byStudent[sid].byCourse[r[3]] = (byStudent[sid].byCourse[r[3]] || 0) + 1;
      }
      report[c] = byStudent;
    }

    // Merged student list for report
    const allStudents = {};
    for (const c of COHORTS) {
      allStudents[c] = getStudentsForCohort(c);
    }

    return { success: true, report, totals, students: allStudents };

  } catch (err) {
    return { success: false, message: err.toString() };
  }
}

// ----------------------------------------------------------------
// ONE-TIME SETUP — run this once after pasting the code
// ----------------------------------------------------------------

function initializeSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  ss.setName('MetaBridge Academy — Attendance System');

  // Master Register — built from merged data (hardcoded + live)
  const mr = _getOrCreateSheet(ss, 'MASTER_REGISTER');
  mr.clearContents();
  mr.getRange(1, 1, 1, 5).setValues([['S/N', 'Student ID', 'Full Name', 'Cohort', 'Email']]);
  _styleHeader(mr, 5);

  const allStudents = [];
  for (const c of ['C1', 'C2', 'C3']) {
    getStudentsForCohort(c).forEach(s => {
      allStudents.push([s.sn || '', s.id || '', s.name, c, s.email || '']);
    });
  }

  if (allStudents.length > 0) {
    mr.getRange(2, 1, allStudents.length, 5).setValues(allStudents);
    allStudents.forEach((_, i) => {
      mr.getRange(i + 2, 1, 1, 5).setBackground(i % 2 === 0 ? '#FFFFFF' : '#EBF5FB');
    });
  }
  mr.autoResizeColumns(1, 5);

  // Attendance sheets — one per cohort
  for (const c of COHORTS) {
    _getOrCreateAttendanceSheet(ss, c + '_ATTENDANCE');
  }

  // Cohort overrides sheet (created empty; used by moveStudentCohort)
  const ovr = _getOrCreateSheet(ss, 'COHORT_OVERRIDES');
  if (ovr.getLastRow() === 0) {
    ovr.getRange(1, 1, 1, 7).setValues([['Student ID','Student Name','Email','S/N','From Cohort','To Cohort','Moved Date']]);
    _styleHeader(ovr, 7);
    ovr.autoResizeColumns(1, 7);
  }

  // Settings sheet — lock state per cohort (locked by default)
  _initSettingsSheet(ss);

  // Delete default Sheet1 if empty
  const def = ss.getSheetByName('Sheet1');
  if (def && def.getLastRow() === 0) ss.deleteSheet(def);

  return '✓ MetaBridge Academy Attendance System initialized successfully!';
}

// ----------------------------------------------------------------
// LIVE REGISTRATION SHEET — PRIVATE HELPER
// ----------------------------------------------------------------

// Reads the enrolment registration sheet and returns any students
// NOT already in STUDENT_REGISTER who belong to targetCohort.
// IDs are assigned sequentially (continuing from the last hardcoded S/N)
// in the order they appear in the registration sheet.
// Returns [] if the sheet is unreachable or columns cannot be detected.
function _getLiveNewStudents(targetCohort) {
  let regSheet;
  try {
    regSheet = SpreadsheetApp.openById(REG_SHEET_ID).getSheets()[0];
  } catch (e) {
    return []; // Sheet not accessible — fall back to hardcoded list only
  }

  const data = regSheet.getDataRange().getValues();
  if (data.length < 2) return [];

  // Locate columns by header keywords (case-insensitive)
  const headers   = data[0].map(h => String(h).toLowerCase().trim());
  const nameIdx   = headers.findIndex(h => h.includes('name'));
  const cohortIdx = headers.findIndex(h => h.includes('cohort'));
  const emailIdx  = headers.findIndex(h => h.includes('email'));

  if (nameIdx === -1 || cohortIdx === -1) return []; // Columns not detectable

  // Serial numbers continue after the last hardcoded student
  const allHardcoded = Object.values(STUDENT_REGISTER).flat();
  let nextSn = allHardcoded.reduce((m, s) => Math.max(m, s.sn || 0), 0);

  // Seen set prevents hardcoded duplicates AND duplicate rows in the live sheet
  const seen = new Set(allHardcoded.map(s => _normalizeName(s.name)));

  const year   = new Date().getFullYear().toString().slice(-2);
  const result = [];

  for (let i = 1; i < data.length; i++) {
    const row     = data[i];
    const rowName = String(row[nameIdx] || '').trim();
    if (!rowName) continue;

    const key = _normalizeName(rowName);
    if (seen.has(key)) continue;
    seen.add(key); // mark seen even if wrong cohort, to maintain consistent numbering

    const rowCohort = _normalizeCohort(String(row[cohortIdx] || '').trim().toUpperCase());
    if (!rowCohort) continue;

    nextSn++;
    const paddedSn = String(nextSn).padStart(3, '0');
    const newId    = `MA/${rowCohort}/${paddedSn}/${year}`;

    if (rowCohort === targetCohort) {
      result.push({
        sn:    nextSn,
        id:    newId,
        name:  rowName,
        email: emailIdx !== -1 ? String(row[emailIdx] || '').trim() : ''
      });
    }
  }

  return result;
}

// Reads the COHORT_OVERRIDES sheet and returns an array of move records.
// Returns [] if the sheet doesn't exist or is empty.
// Returns true if the cohort's attendance window is closed.
// Locked by default; unlocked only when a future timestamp is set in SETTINGS.
function _isCohortLocked(cohort) {
  try {
    const ss    = SpreadsheetApp.getActiveSpreadsheet();
    let sheet   = ss.getSheetByName('SETTINGS');
    if (!sheet) sheet = _initSettingsSheet(ss);
    if (sheet.getLastRow() < 2) return true;
    const rows = sheet.getRange(2, 1, sheet.getLastRow() - 1, 2).getValues();
    for (const r of rows) {
      if (String(r[0]).trim() === cohort) {
        if (!r[1]) return true;             // blank = locked
        return new Date(r[1]) <= new Date(); // expired = locked
      }
    }
    return true; // cohort not in settings = locked
  } catch (e) { return true; } // fail safe — locked on error
}

// Creates (or ensures) the SETTINGS sheet with all cohorts locked by default.
function _initSettingsSheet(ss) {
  const sheet = _getOrCreateSheet(ss, 'SETTINGS');
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, 2).setValues([['Cohort', 'Unlocked Until']]);
    _styleHeader(sheet, 2);
    COHORTS.forEach(function(c, i) {
      sheet.getRange(i + 2, 1).setValue(c); // Unlocked Until left blank = locked
    });
    sheet.setColumnWidth(1, 80);
    sheet.setColumnWidth(2, 240);
  }
  return sheet;
}

// Returns the HTML shown to a student when their cohort attendance is locked.
function _lockedPageHtml(cohort) {
  const cohortNum  = cohort ? cohort.replace('C', '') : '';
  const cohortPill = cohortNum
    ? `<div class="cohort-pill">Cohort ${cohortNum}</div>`
    : '';
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>MetaBridge Academy — Attendance</title>
<style>
* { margin:0; padding:0; box-sizing:border-box; }
body {
  background:#0A1929; color:#F0F4F8;
  font-family:'Segoe UI',Arial,sans-serif;
  min-height:100vh; display:flex; flex-direction:column;
  align-items:center; justify-content:center; padding:24px;
  background-image:
    radial-gradient(ellipse at 20% 30%, rgba(0,194,212,0.06) 0%, transparent 55%),
    radial-gradient(ellipse at 80% 70%, rgba(155,89,182,0.05) 0%, transparent 55%);
}
.card {
  background:#122236;
  border:1px solid rgba(231,76,60,0.25);
  border-radius:18px; padding:40px 32px;
  max-width:420px; width:100%; text-align:center;
  box-shadow:0 16px 48px rgba(0,0,0,0.5);
}
.lock-icon {
  width:64px; height:64px;
  background:rgba(231,76,60,0.12);
  border:1.5px solid rgba(231,76,60,0.3);
  border-radius:16px;
  display:inline-flex; align-items:center; justify-content:center;
  font-size:30px; margin-bottom:20px;
}
.cohort-pill {
  display:inline-block; padding:3px 12px;
  background:rgba(0,194,212,0.1); border:1px solid rgba(0,194,212,0.25);
  border-radius:10px; color:#00C2D4;
  font-size:11px; font-weight:700; letter-spacing:1.5px;
  text-transform:uppercase; margin-bottom:16px;
}
h2 { font-size:20px; font-weight:800; margin-bottom:10px; }
p  { color:#8BA5BE; font-size:14px; line-height:1.65; }
.note { font-size:12px; color:#6B8FAE; margin-top:12px; }
.brand {
  font-size:11px; color:#8BA5BE; letter-spacing:2px;
  text-transform:uppercase; margin-top:28px; padding-top:20px;
  border-top:1px solid rgba(255,255,255,0.06);
}
.brand b { color:#00C2D4; font-weight:800; }
</style>
</head>
<body>
<div class="card">
  <div class="lock-icon">🔒</div>
  ${cohortPill}
  <h2>Attendance Not Open</h2>
  <p>Class attendance is not currently open. Your instructor will open it once class has begun.</p>
  <p class="note">Close this page and try again when your instructor announces attendance is open.</p>
  <div class="brand">Meta<b>Bridge</b> Academy</div>
</div>
</body>
</html>`;
}

function _getCohortOverrides() {
  try {
    const ss    = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('COHORT_OVERRIDES');
    if (!sheet || sheet.getLastRow() < 2) return [];
    return sheet.getRange(2, 1, sheet.getLastRow() - 1, 6).getValues()
      .filter(r => r[0])
      .map(r => ({
        studentId:   String(r[0]).trim(),
        studentName: String(r[1]).trim(),
        email:       String(r[2]).trim(),
        sn:          r[3],
        fromCohort:  String(r[4]).trim(),
        toCohort:    String(r[5]).trim()
      }));
  } catch (e) { return []; }
}

function _normalizeName(name) {
  return String(name || '').toLowerCase().replace(/\s+/g, ' ').trim();
}

// Accepts: "C1", "COHORT 1", "COHORT1", "C 1", "1" → "C1"
// Returns '' if the value contains no digit.
function _normalizeCohort(raw) {
  const m = raw.match(/(\d+)/);
  return m ? 'C' + m[1] : '';
}

// ----------------------------------------------------------------
// PRIVATE HELPERS
// ----------------------------------------------------------------

function _fmtDate(d) {
  const DAYS = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const MTHS = ['January','February','March','April','May','June',
                'July','August','September','October','November','December'];
  const n = d.getDate();
  let sfx = 'th';
  if (!(n >= 11 && n <= 13)) {
    if      (n % 10 === 1) sfx = 'st';
    else if (n % 10 === 2) sfx = 'nd';
    else if (n % 10 === 3) sfx = 'rd';
  }
  return `${DAYS[d.getDay()]}, ${n}${sfx} ${MTHS[d.getMonth()]}, ${d.getFullYear()}`;
}

function _getOrCreateSheet(ss, name) {
  return ss.getSheetByName(name) || ss.insertSheet(name);
}

function _getOrCreateAttendanceSheet(ss, name) {
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.getRange(1, 1, 1, 7).setValues([['S/N','Student ID','Full Name','Course','Belt','Date','Status']]);
    _styleHeader(sheet, 7);
    sheet.setColumnWidth(1, 55);
    sheet.setColumnWidth(2, 130);
    sheet.setColumnWidth(3, 220);
    sheet.setColumnWidth(4, 200);
    sheet.setColumnWidth(5, 110);
    sheet.setColumnWidth(6, 240);
    sheet.setColumnWidth(7, 100);
  }
  return sheet;
}

function _styleHeader(sheet, numCols) {
  const h = sheet.getRange(1, 1, 1, numCols);
  h.setBackground('#0D2137')
   .setFontColor('#FFFFFF')
   .setFontWeight('bold')
   .setFontSize(11)
   .setHorizontalAlignment('center')
   .setVerticalAlignment('middle');
  sheet.setFrozenRows(1);
  sheet.getRange(1, 1, 1, numCols).setFontFamily('Arial');
}
