#!/usr/bin/env python3
"""Convert MetaBridge markdown curriculum files to formatted Word documents."""

import re
import os
from docx import Document
from docx.shared import Pt, RGBColor, Inches, Cm
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.style import WD_STYLE_TYPE
from docx.oxml.ns import qn
from docx.oxml import OxmlElement

# MetaBridge brand colours
BLUE    = RGBColor(0x25, 0x63, 0xEB)   # primary blue
CYAN    = RGBColor(0x06, 0xB6, 0xD4)   # cyan accent
GOLD    = RGBColor(0xF5, 0x9E, 0x0B)   # gold accent
NAVY    = RGBColor(0x06, 0x0D, 0x1E)   # near-black navy
WHITE   = RGBColor(0xFF, 0xFF, 0xFF)
DARK    = RGBColor(0x1E, 0x29, 0x3B)   # dark grey for body
MUTED   = RGBColor(0x64, 0x74, 0x8B)   # muted grey
GREEN   = RGBColor(0x10, 0xB9, 0x81)   # green accent
RED     = RGBColor(0xEF, 0x44, 0x44)   # red accent

COURSE_COLOURS = {
    "cybersecurity":          RED,
    "data-analytics":         CYAN,
    "ai-prompt-engineering":  RGBColor(0xA8, 0x5C, 0xFF),  # purple
    "blockchain-cryptocurrency": GOLD,
}

COURSE_LABELS = {
    "cybersecurity":             "Cybersecurity",
    "data-analytics":            "Data Analytics",
    "ai-prompt-engineering":     "AI & Prompt Engineering",
    "blockchain-cryptocurrency": "Blockchain & Cryptocurrency",
}

DOC_LABELS = {
    "01-curriculum":       "Curriculum Overview",
    "01-curriculum-part2": "Curriculum Overview — Part 2",
    "02-lesson-notes":     "Lesson Notes",
    "04-kahoot-quiz-bank": "Kahoot! Quiz Bank",
}


def set_cell_bg(cell, r, g, b):
    tc = cell._tc
    tcPr = tc.get_or_add_tcPr()
    shd = OxmlElement('w:shd')
    shd.set(qn('w:val'), 'clear')
    shd.set(qn('w:color'), 'auto')
    shd.set(qn('w:fill'), f'{r:02X}{g:02X}{b:02X}')
    tcPr.append(shd)


def add_horizontal_rule(doc):
    p = doc.add_paragraph()
    pPr = p._p.get_or_add_pPr()
    pBdr = OxmlElement('w:pBdr')
    bottom = OxmlElement('w:bottom')
    bottom.set(qn('w:val'), 'single')
    bottom.set(qn('w:sz'), '6')
    bottom.set(qn('w:space'), '1')
    bottom.set(qn('w:color'), '2563EB')
    pBdr.append(bottom)
    pPr.append(pBdr)
    p.paragraph_format.space_after = Pt(2)
    return p


def setup_styles(doc, accent_colour):
    styles = doc.styles

    # Normal
    normal = styles['Normal']
    normal.font.name = 'Calibri'
    normal.font.size = Pt(11)
    normal.font.color.rgb = DARK
    normal.paragraph_format.space_after = Pt(6)
    normal.paragraph_format.line_spacing = Pt(14)

    # Heading 1 — Course / document title
    h1 = styles['Heading 1']
    h1.font.name = 'Calibri'
    h1.font.size = Pt(24)
    h1.font.bold = True
    h1.font.color.rgb = accent_colour
    h1.paragraph_format.space_before = Pt(0)
    h1.paragraph_format.space_after = Pt(6)

    # Heading 2 — Module
    h2 = styles['Heading 2']
    h2.font.name = 'Calibri'
    h2.font.size = Pt(17)
    h2.font.bold = True
    h2.font.color.rgb = accent_colour
    h2.paragraph_format.space_before = Pt(18)
    h2.paragraph_format.space_after = Pt(4)

    # Heading 3 — Section
    h3 = styles['Heading 3']
    h3.font.name = 'Calibri'
    h3.font.size = Pt(13)
    h3.font.bold = True
    h3.font.color.rgb = NAVY
    h3.paragraph_format.space_before = Pt(12)
    h3.paragraph_format.space_after = Pt(4)

    # Heading 4 — Sub-section
    h4 = styles['Heading 4']
    h4.font.name = 'Calibri'
    h4.font.size = Pt(11)
    h4.font.bold = True
    h4.font.color.rgb = DARK
    h4.paragraph_format.space_before = Pt(8)
    h4.paragraph_format.space_after = Pt(2)

    # List Bullet
    try:
        lb = styles['List Bullet']
    except:
        lb = styles.add_style('List Bullet', WD_STYLE_TYPE.PARAGRAPH)
    lb.font.name = 'Calibri'
    lb.font.size = Pt(11)
    lb.font.color.rgb = DARK
    lb.paragraph_format.left_indent = Inches(0.25)
    lb.paragraph_format.space_after = Pt(3)

    # List Bullet 2 (nested)
    try:
        lb2 = styles['List Bullet 2']
    except:
        lb2 = styles.add_style('List Bullet 2', WD_STYLE_TYPE.PARAGRAPH)
    lb2.font.name = 'Calibri'
    lb2.font.size = Pt(10.5)
    lb2.font.color.rgb = DARK
    lb2.paragraph_format.left_indent = Inches(0.5)
    lb2.paragraph_format.space_after = Pt(2)

    # List Number
    try:
        ln = styles['List Number']
    except:
        ln = styles.add_style('List Number', WD_STYLE_TYPE.PARAGRAPH)
    ln.font.name = 'Calibri'
    ln.font.size = Pt(11)
    ln.font.color.rgb = DARK
    ln.paragraph_format.left_indent = Inches(0.25)
    ln.paragraph_format.space_after = Pt(3)

    # Intense Quote (blockquote / callout)
    try:
        iq = styles['Intense Quote']
    except:
        iq = styles.add_style('Intense Quote', WD_STYLE_TYPE.PARAGRAPH)
    iq.font.name = 'Calibri'
    iq.font.size = Pt(11)
    iq.font.italic = True
    iq.font.color.rgb = accent_colour
    iq.paragraph_format.left_indent = Inches(0.3)
    iq.paragraph_format.space_before = Pt(6)
    iq.paragraph_format.space_after = Pt(6)


def add_cover_page(doc, course_name, doc_type, accent_colour):
    # Brand header bar (simulated with a heading paragraph with shading)
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run = p.add_run("MetaBridge Academy")
    run.font.name = 'Calibri'
    run.font.size = Pt(28)
    run.font.bold = True
    run.font.color.rgb = accent_colour

    p2 = doc.add_paragraph()
    p2.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r2 = p2.add_run(course_name.upper())
    r2.font.name = 'Calibri'
    r2.font.size = Pt(20)
    r2.font.bold = True
    r2.font.color.rgb = NAVY

    p3 = doc.add_paragraph()
    p3.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r3 = p3.add_run(doc_type)
    r3.font.name = 'Calibri'
    r3.font.size = Pt(15)
    r3.font.color.rgb = MUTED

    add_horizontal_rule(doc)
    doc.add_paragraph()  # spacer


def apply_inline_formatting(paragraph, text, default_colour=None):
    """Parse **bold**, `code`, and plain text within a line."""
    # Split on **bold** and `code` markers
    pattern = re.compile(r'(\*\*[^*]+\*\*|`[^`]+`)')
    parts = pattern.split(text)
    for part in parts:
        if part.startswith('**') and part.endswith('**'):
            run = paragraph.add_run(part[2:-2])
            run.bold = True
            if default_colour:
                run.font.color.rgb = default_colour
        elif part.startswith('`') and part.endswith('`'):
            run = paragraph.add_run(part[1:-1])
            run.font.name = 'Courier New'
            run.font.size = Pt(10)
            run.font.color.rgb = RGBColor(0x0F, 0x77, 0x2A)
        else:
            run = paragraph.add_run(part)
            if default_colour:
                run.font.color.rgb = default_colour


def parse_table(doc, lines, start_idx):
    """Parse a markdown table starting at lines[start_idx]. Returns next index."""
    table_lines = []
    i = start_idx
    while i < len(lines) and '|' in lines[i]:
        table_lines.append(lines[i])
        i += 1

    if len(table_lines) < 2:
        return i

    # Filter separator rows
    data_rows = [l for l in table_lines if not re.match(r'^\|[-:\s|]+\|$', l.strip())]
    if not data_rows:
        return i

    # Parse rows
    parsed = []
    for row in data_rows:
        cells = [c.strip() for c in row.strip().strip('|').split('|')]
        parsed.append(cells)

    if not parsed:
        return i

    col_count = max(len(r) for r in parsed)
    row_count = len(parsed)

    table = doc.add_table(rows=row_count, cols=col_count)
    table.style = 'Table Grid'

    for ri, row in enumerate(parsed):
        for ci, cell_text in enumerate(row):
            if ci >= col_count:
                break
            cell = table.cell(ri, ci)
            # Clean markdown bold in cells
            clean = re.sub(r'\*\*([^*]+)\*\*', r'\1', cell_text)
            clean = re.sub(r'`([^`]+)`', r'\1', clean)
            cell.text = clean
            if ri == 0:
                for run in cell.paragraphs[0].runs:
                    run.bold = True
                    run.font.color.rgb = WHITE
                set_cell_bg(cell, 0x06, 0x0D, 0x1E)
            else:
                for run in cell.paragraphs[0].runs:
                    run.font.size = Pt(10)

    doc.add_paragraph()
    return i


def convert_md_to_docx(md_path, docx_path, course_key):
    accent = COURSE_COLOURS.get(course_key, BLUE)
    course_name = COURSE_LABELS.get(course_key, course_key)

    stem = os.path.splitext(os.path.basename(md_path))[0]
    doc_type = DOC_LABELS.get(stem, stem)

    doc = Document()

    # Page margins
    for section in doc.sections:
        section.top_margin = Cm(2)
        section.bottom_margin = Cm(2)
        section.left_margin = Cm(2.5)
        section.right_margin = Cm(2.5)

    setup_styles(doc, accent)
    add_cover_page(doc, course_name, doc_type, accent)

    with open(md_path, 'r', encoding='utf-8') as f:
        content = f.read()

    lines = content.split('\n')
    i = 0
    in_code_block = False
    code_lines = []
    code_lang = ''

    while i < len(lines):
        line = lines[i]

        # Code block start/end
        if line.startswith('```'):
            if not in_code_block:
                in_code_block = True
                code_lang = line[3:].strip()
                code_lines = []
                i += 1
                continue
            else:
                # End of code block — render as styled paragraph(s)
                if code_lines:
                    code_text = '\n'.join(code_lines)
                    p = doc.add_paragraph()
                    run = p.add_run(code_text)
                    run.font.name = 'Courier New'
                    run.font.size = Pt(9)
                    run.font.color.rgb = RGBColor(0x0F, 0x77, 0x2A)
                    p.paragraph_format.left_indent = Inches(0.3)
                    p.paragraph_format.space_before = Pt(4)
                    p.paragraph_format.space_after = Pt(4)
                    # Light grey shading
                    pPr = p._p.get_or_add_pPr()
                    shd = OxmlElement('w:shd')
                    shd.set(qn('w:val'), 'clear')
                    shd.set(qn('w:color'), 'auto')
                    shd.set(qn('w:fill'), 'F0F4F8')
                    pPr.append(shd)
                in_code_block = False
                code_lines = []
                i += 1
                continue

        if in_code_block:
            code_lines.append(line)
            i += 1
            continue

        stripped = line.strip()

        # Skip empty
        if not stripped:
            i += 1
            continue

        # Horizontal rule
        if stripped in ('---', '***', '___') or re.match(r'^-{3,}$', stripped):
            add_horizontal_rule(doc)
            i += 1
            continue

        # Headings
        if stripped.startswith('#### '):
            p = doc.add_paragraph(style='Heading 4')
            apply_inline_formatting(p, stripped[5:])
            i += 1
            continue

        if stripped.startswith('### '):
            p = doc.add_paragraph(style='Heading 3')
            apply_inline_formatting(p, stripped[4:])
            i += 1
            continue

        if stripped.startswith('## '):
            p = doc.add_paragraph(style='Heading 2')
            apply_inline_formatting(p, stripped[3:])
            i += 1
            continue

        if stripped.startswith('# '):
            p = doc.add_paragraph(style='Heading 1')
            apply_inline_formatting(p, stripped[2:])
            i += 1
            continue

        # Blockquote (> text)
        if stripped.startswith('> '):
            p = doc.add_paragraph(style='Intense Quote')
            apply_inline_formatting(p, stripped[2:], accent)
            i += 1
            continue

        # Markdown table
        if stripped.startswith('|') and i + 1 < len(lines) and re.match(r'^\|[-:\s|]+\|$', lines[i+1].strip()):
            i = parse_table(doc, lines, i)
            continue

        # Numbered list
        m = re.match(r'^(\d+)\.\s+(.*)', stripped)
        if m:
            p = doc.add_paragraph(style='List Number')
            apply_inline_formatting(p, m.group(2))
            i += 1
            continue

        # Bullet list (nested with spaces)
        if re.match(r'^\s{2,}[-*]\s+', line):
            p = doc.add_paragraph(style='List Bullet 2')
            text = re.sub(r'^\s*[-*]\s+', '', line)
            apply_inline_formatting(p, text.strip())
            i += 1
            continue

        if stripped.startswith('- ') or stripped.startswith('* '):
            p = doc.add_paragraph(style='List Bullet')
            apply_inline_formatting(p, stripped[2:])
            i += 1
            continue

        # Normal paragraph (may have bold/italic/code inline)
        p = doc.add_paragraph()
        apply_inline_formatting(p, stripped)
        i += 1

    doc.save(docx_path)
    print(f"  Saved: {docx_path}")


if __name__ == '__main__':
    base = '/home/user/metabridge-website/curriculum'
    out_dir = '/home/user/metabridge-website/exports'
    os.makedirs(out_dir, exist_ok=True)

    files = [
        ('cybersecurity', '01-curriculum.md'),
        ('cybersecurity', '01-curriculum-part2.md'),
        ('cybersecurity', '02-lesson-notes.md'),
        ('cybersecurity', '04-kahoot-quiz-bank.md'),
        ('data-analytics', '01-curriculum.md'),
        ('data-analytics', '01-curriculum-part2.md'),
        ('data-analytics', '02-lesson-notes.md'),
        ('data-analytics', '04-kahoot-quiz-bank.md'),
        ('ai-prompt-engineering', '01-curriculum.md'),
        ('ai-prompt-engineering', '01-curriculum-part2.md'),
        ('ai-prompt-engineering', '02-lesson-notes.md'),
        ('ai-prompt-engineering', '04-kahoot-quiz-bank.md'),
        ('blockchain-cryptocurrency', '01-curriculum.md'),
        ('blockchain-cryptocurrency', '01-curriculum-part2.md'),
        ('blockchain-cryptocurrency', '02-lesson-notes.md'),
        ('blockchain-cryptocurrency', '04-kahoot-quiz-bank.md'),
    ]

    for course, filename in files:
        stem = filename.replace('.md', '')
        label = DOC_LABELS.get(stem, stem).replace(' ', '-').replace('/', '-')
        course_label = COURSE_LABELS.get(course, course).replace(' ', '-').replace('&', 'and')
        out_name = f"{course_label}-{label}.docx"
        src = os.path.join(base, course, filename)
        dst = os.path.join(out_dir, out_name)
        if os.path.exists(src):
            print(f"Converting: {course}/{filename}")
            convert_md_to_docx(src, dst, course)
        else:
            print(f"  MISSING: {src}")

    print("\nWord conversion complete.")
