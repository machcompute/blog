# Mach Computing Blog

The blog for [Mach Computing](https://machcomputing.com) — articles on AI/ML, algorithms, data structures, and programming.

Built with **Next.js 16**, **React 19**, **Tailwind CSS v4**, and **TypeScript**. Blog posts are plain Markdown files with YAML frontmatter, rendered at build time with syntax highlighting via Shiki.

## Getting Started

```bash
npm install
npm run dev        # starts on http://localhost:3000
npm run build      # production build
npm run start      # serve production build
```

## Project Structure

```
blog/
  app/
    page.tsx                      # Home — hero + featured post + latest grid
    layout.tsx                    # Root layout with navbar, footer, fonts
    globals.css                   # Tailwind v4 @theme tokens + prose styles
    blog/
      page.tsx                    # Paginated listing (?page=2&size=9)
      [slug]/page.tsx             # Individual post with TOC
    tags/
      page.tsx                    # All tags (searchable)
      [tag]/page.tsx              # Posts by tag
    categories/
      page.tsx                    # All categories (searchable)
      [category]/page.tsx         # Posts by category
    api/posts/route.ts            # JSON API for all posts
    sitemap.ts                    # Auto-generated sitemap
  components/
    Navbar.tsx                    # Sticky nav with logo + links
    Footer.tsx                    # Dark footer with nav + connect columns
    BlogCard.tsx                  # Post card (date, reading time, tags)
    Pagination.tsx                # Page numbers + page size selector
    TagPill.tsx                   # Lavender pill link
    Prose.tsx                     # Article HTML wrapper
    TableOfContents.tsx           # TOC with active heading tracking
    SearchablePills.tsx           # Filterable pill list for tags/categories
  lib/
    posts.ts                      # Markdown parsing, pagination, tag/category queries
  content/blog/
    *.md                          # Blog posts (Markdown + YAML frontmatter)
  public/
    logo.png                      # MC logo
    text_logo.png                 # MC wordmark
    res/images/                   # Post images (WebP, PNG, SVG)
```

## Writing Posts

Create a `.md` file in `content/blog/`:

```markdown
---
title: "Your Post Title"
description: "A short summary."
date: 2025-01-15
image: "res/images/thumbnail.webp"
draft: false
tags:
  - Algorithms
  - Rust
categories:
  - Computer Science
---

Your content here. Use standard Markdown — headings, code blocks,
images, tables, and links all work as expected.
```

- **slug** is derived from the filename (`my-post.md` becomes `/blog/my-post`)
- **draft: true** posts are excluded from all listings, the API, the sitemap, and direct URL access
- **images** go in `public/res/images/` and are referenced as `![alt](/res/images/file.webp)`
- **code blocks** with a language tag (e.g. ` ```python `) get syntax highlighting automatically

## API

`GET /api/posts` returns all published posts as JSON:

```json
[
  {
    "title": "Understanding Recursion",
    "slug": "understanding-recursion",
    "description": "A comprehensive guide...",
    "date": "2024-10-05",
    "tags": [],
    "readingTime": 7
  }
]
```

## Key Details

- **Pagination** — `/blog` accepts `?page=N&size=6|9|12` search params
- **TOC** — auto-generated from h2/h3 headings; sticky sidebar on desktop, inline card on mobile
- **Static generation** — all post pages use `generateStaticParams` for build-time rendering
- **Internal link rewriting** — old `blog.machcomputing.com` URLs are rewritten to `/blog/` paths
- **Styling** — follows the Mach Computing style guide (see `assets/style.md`)
