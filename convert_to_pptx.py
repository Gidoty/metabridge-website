#!/usr/bin/env python3
"""Convert MetaBridge slide deck markdown files to formatted PowerPoint presentations."""

import re
import os
from pptx import Presentation
from pptx.util import Inches, Pt, Emu
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN
from pptx.util import Cm

# MetaBridge dark theme colours
BG_DARK   = RGBColor(0x06, 0x0D, 0x1E)   # near-black navy
BG_CARD   = RGBColor(0x0D, 0x1B, 0x2E)   # card background
BLUE      = RGBColor(0x25, 0x63, 0xEB)   # primary blue
BLUE_LT   = RGBColor(0x3B, 0x82, 0xF6)   # light blue
CYAN      = RGBColor(0x06, 0xB6, 0xD4)   # cyan accent
GOLD      = RGBColor(0xF5, 0x9E, 0x0B)   # gold
GREEN     = RGBColor(0x10, 0xB9, 0x81)   # green
RED       = RGBColor(0xEF, 0x44, 0x44)   # red
PURPLE    = RGBColor(0xA8, 0x5C, 0xFF)   # purple
WHITE     = RGBColor(0xFF, 0xFF, 0xFF)
OFF_WHITE = RGBColor(0xE2, 0xE8, 0xF0)   # off-white text
MUTED     = RGBColor(0x94, 0xA3, 0xB8)   # muted text
BORDER    = RGBColor(0x1E, 0x40, 0xAF)   # blue border

COURSE_ACCENT = {
    "cybersecurity":             RED,
    "data-analytics":            CYAN,
    "ai-prompt-engineering":     PURPLE,
    "blockchain-cryptocurrency": GOLD,
}

COURSE_LABELS = {
    "cybersecurity":             "Cybersecurity",
    "data-analytics":            "Data Analytics",
    "ai-prompt-engineering":     "AI & Prompt Engineering",
    "blockchain-cryptocurrency": "Blockchain & Cryptocurrency",
}

SLIDE_W = Inches(13.33)
SLIDE_H = Inches(7.5)


def set_bg(slide, colour):
    fill = slide.background.fill
    fill.solid()
    fill.fore_color.rgb = colour


def add_textbox(slide, text, x, y, w, h, font_size=18, bold=False,
                colour=WHITE, align=PP_ALIGN.LEFT, wrap=True, italic=False):
    txBox = slide.shapes.add_textbox(x, y, w, h)
    tf = txBox.text_frame
    tf.word_wrap = wrap
    p = tf.paragraphs[0]
    p.alignment = align
    run = p.add_run()
    run.text = text
    run.font.size = Pt(font_size)
    run.font.bold = bold
    run.font.italic = italic
    run.font.color.rgb = colour
    run.font.name = 'Calibri'
    return txBox


def add_rect(slide, x, y, w, h, fill_colour, line_colour=None, line_width=Pt(1)):
    shape = slide.shapes.add_shape(
        1,  # MSO_SHAPE_TYPE.RECTANGLE
        x, y, w, h
    )
    shape.fill.solid()
    shape.fill.fore_color.rgb = fill_colour
    if line_colour:
        shape.line.color.rgb = line_colour
        shape.line.width = line_width
    else:
        shape.line.fill.background()
    return shape


def make_title_slide(prs, course_name, accent):
    slide_layout = prs.slide_layouts[6]  # blank
    slide = prs.slides.add_slide(slide_layout)
    set_bg(slide, BG_DARK)

    # Top accent bar
    add_rect(slide, 0, 0, SLIDE_W, Inches(0.08), accent)

    # MetaBridge logo text (top left)
    add_textbox(slide, "MetaBridge Academy",
                Inches(0.5), Inches(0.2), Inches(5), Inches(0.6),
                font_size=13, bold=True, colour=accent)

    # Course name (large, centered)
    add_textbox(slide, course_name.upper(),
                Inches(1), Inches(2.0), Inches(11.33), Inches(1.4),
                font_size=40, bold=True, colour=WHITE, align=PP_ALIGN.CENTER)

    # Slide Deck label
    add_textbox(slide, "SLIDE DECK",
                Inches(1), Inches(3.4), Inches(11.33), Inches(0.7),
                font_size=22, bold=False, colour=accent, align=PP_ALIGN.CENTER)

    # Tagline
    add_textbox(slide, "Nigeria's Premier Blockchain & Technology Academy",
                Inches(1), Inches(4.2), Inches(11.33), Inches(0.5),
                font_size=14, colour=MUTED, align=PP_ALIGN.CENTER)

    # Bottom bar
    add_rect(slide, 0, Inches(7.3), SLIDE_W, Inches(0.2), accent)

    return slide


def make_section_slide(prs, title_text, accent, level_badge=None):
    """Module opener slide."""
    slide_layout = prs.slide_layouts[6]
    slide = prs.slides.add_slide(slide_layout)
    set_bg(slide, BG_DARK)

    # Accent bar
    add_rect(slide, 0, 0, SLIDE_W, Inches(0.08), accent)

    # Module / section label
    if level_badge:
        add_textbox(slide, level_badge,
                    Inches(0.5), Inches(1.5), Inches(4), Inches(0.5),
                    font_size=14, bold=True, colour=accent)

    # Title
    add_textbox(slide, title_text,
                Inches(0.5), Inches(2.2), Inches(12.3), Inches(2.5),
                font_size=34, bold=True, colour=WHITE, align=PP_ALIGN.LEFT, wrap=True)

    add_rect(slide, 0, Inches(7.3), SLIDE_W, Inches(0.2), accent)
    return slide


def make_content_slide(prs, title, content_lines, notes_text, accent):
    """Standard content slide with title + body text."""
    slide_layout = prs.slide_layouts[6]
    slide = prs.slides.add_slide(slide_layout)
    set_bg(slide, BG_DARK)

    # Top accent bar
    add_rect(slide, 0, 0, SLIDE_W, Inches(0.08), accent)

    # Title bar background
    add_rect(slide, 0, Inches(0.08), SLIDE_W, Inches(0.9), BG_CARD)

    # Title text
    add_textbox(slide, title,
                Inches(0.3), Inches(0.1), Inches(12.7), Inches(0.9),
                font_size=20, bold=True, colour=accent, align=PP_ALIGN.LEFT)

    # Content area — join lines
    body_text = '\n'.join(content_lines).strip()

    # Use monospace-style textbox for content (most slides have pre-formatted content)
    content_box = slide.shapes.add_textbox(
        Inches(0.3), Inches(1.1), Inches(12.7), Inches(6.0)
    )
    tf = content_box.text_frame
    tf.word_wrap = True

    # Split into individual lines and add with formatting
    body_lines = body_text.split('\n')
    first = True
    for bl in body_lines:
        if first:
            p = tf.paragraphs[0]
            first = False
        else:
            p = tf.add_paragraph()

        # Determine line style
        stripped_bl = bl.strip()

        # Section headers (ALL CAPS lines that are not plain text)
        if re.match(r'^[A-Z][A-Z\s&·\-–—:]+$', stripped_bl) and len(stripped_bl) > 3:
            run = p.add_run()
            run.text = stripped_bl
            run.font.size = Pt(13)
            run.font.bold = True
            run.font.color.rgb = accent
            run.font.name = 'Calibri'
        # Bullet points
        elif stripped_bl.startswith('- ') or stripped_bl.startswith('• ') or stripped_bl.startswith('· '):
            run = p.add_run()
            run.text = '  • ' + stripped_bl[2:]
            run.font.size = Pt(11)
            run.font.color.rgb = OFF_WHITE
            run.font.name = 'Calibri'
        # Code-like lines (contain = or function syntax)
        elif stripped_bl.startswith('=') or '()' in stripped_bl or '->' in stripped_bl:
            run = p.add_run()
            run.text = stripped_bl
            run.font.size = Pt(10)
            run.font.color.rgb = RGBColor(0x4A, 0xDE, 0x80)  # bright green
            run.font.name = 'Courier New'
        else:
            # Check for inline bold markers
            parts = re.split(r'(\*\*[^*]+\*\*)', stripped_bl)
            for part in parts:
                run = p.add_run()
                if part.startswith('**') and part.endswith('**'):
                    run.text = part[2:-2]
                    run.font.bold = True
                    run.font.color.rgb = WHITE
                else:
                    run.text = part
                    run.font.color.rgb = OFF_WHITE
                run.font.size = Pt(11)
                run.font.name = 'Calibri'

    # Bottom bar
    add_rect(slide, 0, Inches(7.3), SLIDE_W, Inches(0.2), accent)

    # Speaker notes
    if notes_text.strip():
        notes_slide = slide.notes_slide
        notes_tf = notes_slide.notes_text_frame
        notes_tf.text = notes_text.strip()

    return slide


def parse_slide_deck(md_path, course_key):
    """Parse the markdown slide deck into structured slide data."""
    with open(md_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Split into slide blocks by ## SLIDE or ## slide markers
    # Also handle ---  separators within slide content
    blocks = re.split(r'\n(?=## SLIDE\s)', content, flags=re.IGNORECASE)

    slides = []
    for block in blocks:
        block = block.strip()
        if not block:
            continue

        # Check if it's a slide block
        m = re.match(r'^## SLIDE\s+\d+[A-Z]?\s*[—–-]+\s*(.+)', block, re.IGNORECASE)
        if not m:
            # Could be intro content before first slide or other headings
            # Check for other ## headings
            hm = re.match(r'^## (.+)', block)
            if hm:
                slides.append({
                    'type': 'section',
                    'title': hm.group(1).strip(),
                    'content': [],
                    'notes': '',
                })
            continue

        title = m.group(1).strip()

        # Extract Visual description
        visual_match = re.search(r'\*\*Visual:\*\*\s*(.+?)(?=\n\n|\*\*Content|\*\*Speaker|\Z)', block, re.DOTALL)
        visual = visual_match.group(1).strip() if visual_match else ''

        # Extract Content block (between ``` marks)
        content_match = re.search(r'\*\*Content:\*\*\s*```[^\n]*\n([\s\S]+?)```', block)
        if content_match:
            content_lines = content_match.group(1).rstrip().split('\n')
        else:
            # Try content without code block
            content_match2 = re.search(r'\*\*Content:\*\*\s*\n([\s\S]+?)(?=\*\*Speaker|\*\*Visual|\Z)', block)
            if content_match2:
                content_lines = content_match2.group(1).strip().split('\n')
            else:
                content_lines = []

        # Extract Speaker notes
        notes_match = re.search(r'\*\*Speaker notes?:\*\*\s*([\s\S]+?)(?=---|\Z)', block)
        notes = notes_match.group(1).strip() if notes_match else ''
        # Clean markdown from notes
        notes = re.sub(r'\*\*([^*]+)\*\*', r'\1', notes)

        slides.append({
            'type': 'content',
            'title': title,
            'visual': visual,
            'content': content_lines,
            'notes': notes,
        })

    return slides


def convert_slide_deck(md_path, pptx_path, course_key):
    accent = COURSE_ACCENT.get(course_key, BLUE)
    course_name = COURSE_LABELS.get(course_key, course_key)

    prs = Presentation()
    prs.slide_width = SLIDE_W
    prs.slide_height = SLIDE_H

    # Title slide
    make_title_slide(prs, course_name, accent)

    # Parse and build slides
    slides = parse_slide_deck(md_path, course_key)

    for slide_data in slides:
        if slide_data['type'] == 'section':
            make_section_slide(prs, slide_data['title'], accent)
        else:
            title = slide_data['title']
            content = slide_data['content']
            notes = slide_data['notes']

            # Detect module openers (MODULE N OPENER in title)
            if 'OPENER' in title.upper() or re.search(r'MODULE\s+\d+', title.upper()):
                # Extract level badge if present
                level_match = re.search(r'LEVEL:\s*(\w+)', '\n'.join(content))
                level = f"LEVEL: {level_match.group(1)}" if level_match else None
                # Use first non-level line as subtitle
                make_section_slide(prs, title, accent, level_badge=level)
                if notes:
                    # Add notes to last slide
                    last_slide = prs.slides[-1]
                    notes_slide = last_slide.notes_slide
                    notes_slide.notes_text_frame.text = notes
            else:
                make_content_slide(prs, title, content, notes, accent)

    prs.save(pptx_path)
    print(f"  Saved: {pptx_path}")


if __name__ == '__main__':
    base = '/home/user/metabridge-website/curriculum'
    out_dir = '/home/user/metabridge-website/exports'
    os.makedirs(out_dir, exist_ok=True)

    courses = [
        'cybersecurity',
        'data-analytics',
        'ai-prompt-engineering',
        'blockchain-cryptocurrency',
    ]

    labels = {
        "cybersecurity":             "Cybersecurity",
        "data-analytics":            "Data-Analytics",
        "ai-prompt-engineering":     "AI-and-Prompt-Engineering",
        "blockchain-cryptocurrency": "Blockchain-and-Cryptocurrency",
    }

    for course in courses:
        src = os.path.join(base, course, '03-slide-deck.md')
        if os.path.exists(src):
            course_label = labels[course]
            dst = os.path.join(out_dir, f"{course_label}-Slide-Deck.pptx")
            print(f"Converting: {course}/03-slide-deck.md")
            convert_slide_deck(src, dst, course)
        else:
            print(f"  MISSING: {src}")

    print("\nPowerPoint conversion complete.")
