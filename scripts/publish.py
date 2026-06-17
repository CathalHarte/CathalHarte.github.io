#!/usr/bin/env python3
"""
publish.py — convert a plaintext essay to site HTML and update thoughts.html

Usage:
    python3 scripts/publish.py /path/to/draft.txt

Plaintext format:
    Title of My Essay

    17 June 2026          ← optional date; today used if absent

    First paragraph.

    Second paragraph.

    ## Section Heading

    > Pull quote text
    > — Source Name

    ---
    An interruption/aside.
    — CH
    ---

    [link text](https://url)  or bare  https://url  are both auto-linked.
"""

import re
import sys
import os
from datetime import datetime
from html import escape

# ── helpers ──────────────────────────────────────────────────────────────────

DATE_RE = re.compile(
    r'^(\d{1,2}\s+\w+\s+\d{4}|\w+\s+\d{4})$'
)

def slugify(title):
    s = title.lower()
    s = re.sub(r"[''']", '', s)       # drop apostrophes
    s = re.sub(r'[^a-z0-9]+', '-', s)
    return s.strip('-')

def truncate(text, limit=180):
    if len(text) <= limit:
        return text
    cut = text[:limit].rsplit(' ', 1)[0]
    return cut.rstrip(',.;:') + '…'

def linkify(text):
    """Convert [text](url) and bare https:// URLs to <a> tags."""
    # named links first
    text = re.sub(
        r'\[([^\]]+)\]\((https?://[^\)]+)\)',
        lambda m: f'<a href="{escape(m.group(2), quote=True)}" target="_blank" rel="noopener">{escape(m.group(1))}</a>',
        text
    )
    # bare URLs (not already inside an href="...")
    text = re.sub(
        r'(?<!["\'>])(https?://[^\s<,;)\]]+)',
        lambda m: f'<a href="{escape(m.group(1), quote=True)}" target="_blank" rel="noopener">{escape(m.group(1))}</a>',
        text
    )
    return text

def inline(text):
    """Escape HTML then linkify."""
    return linkify(escape(text))

def month_year(date_str):
    """'17 June 2026' → 'June 2026'"""
    parts = date_str.strip().split()
    if len(parts) == 3:          # day month year
        return f'{parts[1]} {parts[2]}'
    return date_str              # already 'Month YYYY'

# ── parsing ──────────────────────────────────────────────────────────────────

def parse(raw):
    lines = raw.strip().splitlines()

    # title — first non-empty line
    title = ''
    idx = 0
    for i, l in enumerate(lines):
        if l.strip():
            title = l.strip()
            idx = i + 1
            break

    # optional date — next non-empty line
    date_str = ''
    for i in range(idx, len(lines)):
        if lines[i].strip():
            if DATE_RE.match(lines[i].strip()):
                date_str = lines[i].strip()
                idx = i + 1
            break

    if not date_str:
        date_str = datetime.today().strftime('%-d %B %Y')

    body = '\n'.join(lines[idx:])

    # split into raw blocks on blank lines
    raw_blocks = re.split(r'\n{2,}', body.strip())

    blocks = []
    i = 0
    while i < len(raw_blocks):
        b = raw_blocks[i].strip()
        if not b:
            i += 1
            continue

        if b == '---':
            # collect interruption content until next '---'
            content_lines = []
            i += 1
            while i < len(raw_blocks):
                chunk = raw_blocks[i].strip()
                i += 1
                if chunk == '---':
                    break
                content_lines.append(chunk)
            blocks.append(('interruption', '\n'.join(content_lines)))
            continue

        # single-block interruption: starts and ends with ---
        if b.startswith('---') and b.endswith('---') and b.count('---') >= 2:
            inner = b[3:-3].strip()
            blocks.append(('interruption', inner))
            i += 1
            continue

        if b.startswith('## '):
            blocks.append(('heading', b[3:].strip()))
        elif b.startswith('> '):
            quote_lines = [l[2:] for l in b.splitlines() if l.startswith('> ')]
            blocks.append(('blockquote', quote_lines))
        else:
            blocks.append(('paragraph', b))

        i += 1

    return title, date_str, blocks

# ── HTML generation ───────────────────────────────────────────────────────────

NAV = '''\
  <div id="progress"></div>
  <nav id="nav">
    <a href="index.html" class="logo" id="nav-logo">CH</a>
    <ul id="nav-links">
      <li><a href="thoughts.html">All writing →</a></li>
      <li><a href="#comments">Comments</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
  </nav>'''

ARCHIVE_NAV = '''\
    <div class="essay-archive-nav">
      <div class="section-inner">
        <a href="thoughts.html">All writing →</a>
      </div>
    </div>'''

COMMENTS = '''\
    <section id="comments">
      <div class="section-inner">
        <div class="section-header reveal">
          <span class="section-label">Comments</span>
          <h2>0 comments</h2>
          <div class="divider"></div>
        </div>
        <div class="reveal comments-body">
          <div class="comments-mock" aria-hidden="true">
            <span class="comments-mock-prompt">Write a comment…</span>
          </div>
          <p class="comments-cta">Email me. You might actually start a real discussion, instead of shouting into the void. If enough people email me about the same piece I’ll put you all in a thread together.</p>
          <a href="mailto:cathal.harte@proton.me" class="card-more">cathal.harte@proton.me →</a>
        </div>
      </div>
    </section>'''

CONTACT = '''\
    <section id="contact">
      <div class="section-inner">
        <div class="section-header reveal">
          <span class="section-label">Contact</span>
          <h2>Get in touch</h2>
          <div class="divider"></div>
        </div>
        <div class="reveal contact-grid">
          <a href="mailto:cathal.harte@proton.me" class="contact-link" target="_blank" rel="noopener">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            cathal.harte@proton.me
          </a>
          <a href="https://terapet.ch/" class="contact-link" target="_blank" rel="noopener">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
            Terapet
          </a>
          <a href="https://www.linkedin.com/in/cathal-harte" class="contact-link" target="_blank" rel="noopener">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            LinkedIn
          </a>
        </div>
      </div>
    </section>'''


def render_block(b):
    kind, content = b
    if kind == 'paragraph':
        return f'          <p>{inline(content)}</p>'
    if kind == 'heading':
        return f'\n          <h2>{escape(content)}</h2>\n'
    if kind == 'blockquote':
        lines = content
        # last line starting with — is a cite
        if lines and lines[-1].startswith('—') or (lines and lines[-1].startswith('- ')):
            attr = lines[-1].lstrip('-— ')
            body_lines = lines[:-1]
        elif lines and re.match(r'^[\-—]\s', lines[-1]):
            attr = re.sub(r'^[\-—]\s+', '', lines[-1])
            body_lines = lines[:-1]
        else:
            attr = None
            body_lines = lines
        q_text = ' '.join(inline(l) for l in body_lines)
        cite = f'\n            <cite>{escape(attr)}</cite>' if attr else ''
        return f'          <blockquote>\n            <p>{q_text}</p>{cite}\n          </blockquote>'
    return ''


def open_body_section(idx):
    sec_id = 'essay-body' if idx == 1 else f'essay-body-{idx}'
    return (
        f'\n    <section id="{sec_id}" class="essay-section">\n'
        '      <div class="section-inner">\n'
        '        <div class="essay-prose reveal">\n'
    )

def close_body_section():
    return '        </div>\n      </div>\n    </section>'

def render_interruption(idx, content):
    lines = content.strip().splitlines()
    # last line starting with — is attribution
    if lines and re.match(r'^[\-—]\s*\S', lines[-1]):
        attr = re.sub(r'^[\-—]\s*', '', lines[-1])
        body = '\n'.join(lines[:-1]).strip()
    else:
        attr = 'CH'
        body = content.strip()
    return (
        f'\n    <section id="essay-int-{idx}" class="essay-interruption">\n'
        '      <div class="section-inner">\n'
        '        <div class="interruption-inner reveal">\n'
        f'          <p class="interruption-text">{inline(body)}</p>\n'
        f'          <span class="interruption-attr">— {escape(attr)}</span>\n'
        '        </div>\n'
        '      </div>\n'
        '    </section>'
    )


def build_essay_html(title, date_str, blocks):
    parts = []
    parts.append(f'''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{escape(title)} — Cathal Harte</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,700;0,8..60,800;1,8..60,700&family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css" />
</head>
<body>
{NAV}

  <main>

    <section id="page-intro">
      <div class="section-inner">
        <span class="section-label">{escape(date_str)}</span>
        <h1 class="page-title">{escape(title)}</h1>
      </div>
    </section>
''')

    body_idx = 1
    int_idx = 1
    in_body = False

    for b in blocks:
        if b[0] == 'interruption':
            if in_body:
                parts.append(close_body_section())
                in_body = False
            parts.append(render_interruption(int_idx, b[1]))
            int_idx += 1
        else:
            if not in_body:
                parts.append(open_body_section(body_idx))
                body_idx += 1
                in_body = True
            parts.append(render_block(b))

    if in_body:
        parts.append(close_body_section())

    parts.append(f'\n{ARCHIVE_NAV}\n')
    parts.append(f'\n{COMMENTS}\n')
    parts.append(f'\n{CONTACT}\n')
    parts.append('\n  </main>\n\n  <script src="scroll.js"></script>\n</body>\n</html>\n')

    return '\n'.join(parts)


# ── thoughts.html update ──────────────────────────────────────────────────────

CARD_RE = re.compile(
    r'<a href="([^"]+)" class="essay-card reveal">\s*'
    r'<span class="essay-date">([^<]+)</span>\s*'
    r'<h3 class="essay-title">([^<]+)</h3>\s*'
    r'<p class="essay-excerpt">([^<]*)</p>\s*'
    r'<span class="essay-read">[^<]*</span>\s*'
    r'</a>',
    re.DOTALL
)

def update_thoughts(thoughts_path, new_href, new_date_full, new_title, new_excerpt):
    with open(thoughts_path, 'r', encoding='utf-8') as f:
        html = f.read()

    # strip HTML comments before searching so sample code in comments isn't matched
    html_no_comments = re.sub(r'<!--.*?-->', '', html, flags=re.DOTALL)

    match = CARD_RE.search(html_no_comments)
    if not match:
        print('WARNING: could not find existing essay-card in thoughts.html — skipping update')
        return

    old_href = match.group(1)
    old_date = match.group(2)
    old_title = match.group(3)

    new_card = (
        f'<a href="{new_href}" class="essay-card reveal">\n'
        f'          <span class="essay-date">{escape(month_year(new_date_full))}</span>\n'
        f'          <h3 class="essay-title">{escape(new_title)}</h3>\n'
        f'          <p class="essay-excerpt">{escape(new_excerpt)}</p>\n'
        f'          <span class="essay-read">Read →</span>\n'
        f'        </a>'
    )

    old_archive_li = (
        f'          <li>\n'
        f'            <a href="{old_href}" class="essay-archive-item">\n'
        f'              <span class="essay-archive-date">{old_date}</span>\n'
        f'              <span class="essay-archive-title">{old_title}</span>\n'
        f'            </a>\n'
        f'          </li>'
    )

    # replace current latest card (work on comment-stripped version)
    updated = CARD_RE.sub(new_card, html_no_comments, count=1)

    # prepend old card to archive list
    updated = updated.replace(
        '<ol class="essay-archive stagger" reversed>',
        f'<ol class="essay-archive stagger" reversed>\n{old_archive_li}'
    )

    with open(thoughts_path, 'w', encoding='utf-8') as f:
        f.write(updated)


# ── main ─────────────────────────────────────────────────────────────────────

def main():
    if len(sys.argv) < 2:
        print('Usage: python3 scripts/publish.py <draft.txt>')
        sys.exit(1)

    draft_path = sys.argv[1]
    with open(draft_path, 'r', encoding='utf-8') as f:
        raw = f.read()

    title, date_str, blocks = parse(raw)

    if not title:
        print('ERROR: could not find a title (first non-empty line)')
        sys.exit(1)

    slug = slugify(title)
    out_filename = f'essay-{slug}.html'
    repo_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    out_path = os.path.join(repo_root, out_filename)
    thoughts_path = os.path.join(repo_root, 'thoughts.html')

    if os.path.exists(out_path):
        print(f'ERROR: {out_filename} already exists — rename the essay or adjust the slug manually')
        sys.exit(1)

    # excerpt = first paragraph block text
    first_para = next((b[1] for b in blocks if b[0] == 'paragraph'), '')
    excerpt = truncate(first_para)

    html = build_essay_html(title, date_str, blocks)

    with open(out_path, 'w', encoding='utf-8') as f:
        f.write(html)

    update_thoughts(thoughts_path, out_filename, date_str, title, excerpt)

    print(f'Published : {out_filename}')
    print(f'Title     : {title}')
    print(f'Date      : {date_str}')
    print(f'Slug      : {slug}')
    print(f'Excerpt   : {excerpt}')
    print(f'\nNext steps:')
    print(f'  git add {out_filename} thoughts.html')
    print(f'  git commit -m "publish: {title}"')
    print(f'  git push -u origin main')


if __name__ == '__main__':
    main()
