import { defineTransformersSetup } from '@slidev/types'
import type { MarkdownTransformer } from '@slidev/types'

const BIBLIOGRAPHY_MARKER = '[[bibliography]]'
const REFERENCES_LAYOUT = 'references'
const SCHOLARLY_CITATIONS_COMMENT_RE = /<!--\s*scholarly-citations:\s*\[.*?\]\s*-->\s*\n?/g
const PROTECTED_BLOCKS_RE = /```[\s\S]*?```|<!--[\s\S]*?-->/g
const ANCHOR_MARKER_CLASS = 'scholarly-anchor-marker'
const HEADING_ID_SUFFIX_RE = /^([ \t]*#{1,6}\s+.*?)[ \t]+\{#([^\s}]+)\}[ \t]*$/gm
const ANCHOR_SUGAR_RE = /^[ \t]*::anchor\{#([^\s}]+)\}[ \t]*$/gm

export default defineTransformersSetup(() => ({
  pre: [transformScholarlyMarkdown],
}))

const transformScholarlyMarkdown: MarkdownTransformer = async (ctx) => {
  const original = ctx.s.toString()
  const frontmatter = ctx.slide.frontmatter as Record<string, unknown>
  let transformed = ensureBibliographyMarker(original, frontmatter)

  if (transformed.includes(BIBLIOGRAPHY_MARKER)) {
    const citations = resolveBibliographyCitations(frontmatter, ctx.options.data.slides)
    transformed = injectBibliographyComment(transformed, citations)
  }

  transformed = transformSyntaxSugar(transformed)

  if (transformed !== original) {
    if (original.length === 0)
      ctx.s.appendLeft(0, transformed)
    else
      ctx.s.overwrite(0, original.length, transformed)
  }
}

function resolveBibliographyCitations(frontmatter: Record<string, unknown>, slides: Array<{ content?: string; source?: { content?: string; contentRaw?: string } }>): string[] {
  let citations: string[] = []

  if (Array.isArray((frontmatter as any).citations)) {
    citations = [...(frontmatter as any).citations]
  } else if (Array.isArray((frontmatter as any).references)) {
    citations = [...(frontmatter as any).references]
  } else if (Array.isArray((frontmatter as any).bib)) {
    citations = [...(frontmatter as any).bib]
  } else {
    const citekeys = new Set<string>()
    for (const slide of slides) {
      collectCitations(slide.source?.contentRaw ?? slide.source?.content ?? slide.content ?? '', citekeys)
    }
    citations = Array.from(citekeys)
  }

  const perPage = (frontmatter as any).perPage as number | undefined
  const page = (frontmatter as any).page as number | undefined

  if (perPage && perPage > 0 && citations.length > 0) {
    const currentPage = page || 1
    const startIndex = (currentPage - 1) * perPage
    const endIndex = startIndex + perPage
    citations = citations.slice(startIndex, endIndex)
  }

  return citations
}

function injectBibliographyComment(content: string, citations: string[]): string {
  if (!citations.length)
    return content

  const sanitized = content.replace(SCHOLARLY_CITATIONS_COMMENT_RE, '')
  const citationsJson = JSON.stringify(citations)

  return sanitized.replaceAll(
    BIBLIOGRAPHY_MARKER,
    `<!-- scholarly-citations: ${citationsJson} -->\n${BIBLIOGRAPHY_MARKER}`
  )
}

function ensureBibliographyMarker(content: string, frontmatter: Record<string, unknown>): string {
  if (!shouldAutoInjectBibliography(content, frontmatter))
    return content

  const trimmed = content.replace(/\s*$/, '')
  return trimmed ? `${trimmed}\n\n${BIBLIOGRAPHY_MARKER}\n` : `${BIBLIOGRAPHY_MARKER}\n`
}

function shouldAutoInjectBibliography(content: string, frontmatter: Record<string, unknown>): boolean {
  if ((frontmatter.layout as string | undefined) !== REFERENCES_LAYOUT)
    return false

  if (content.includes(BIBLIOGRAPHY_MARKER))
    return false

  const stripped = content
    .replace(SCHOLARLY_CITATIONS_COMMENT_RE, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/^\s*#{1,6}\s+.*$/gm, '')
    .replace(/^\s*---+\s*$/gm, '')

  return stripped.trim().length === 0
}

function collectCitations(text: string, citekeys: Set<string>) {
  if (!text)
    return

  let stripped = text.replace(/```[\s\S]*?```/g, '')
  stripped = stripped.replace(/`[^`]*`/g, '')
  stripped = stripped.replace(/<!--[\s\S]*?-->/g, '')
  stripped = stripped.replace(/https?:\/\/[^\s)>\]]+/g, '')
  stripped = stripped.replace(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g, '')

  for (const match of stripped.matchAll(/(?<![A-Za-z0-9])(!?)@([A-Za-z][A-Za-z0-9_-]*)/g)) {
    const key = match[2].replace(/[.,;:!?)]+$/, '')
    if (key.length > 0)
      citekeys.add(`@${key}`)
  }
}

function transformSyntaxSugar(content: string): string {
  return withProtectedBlocks(content, (input) => {
    let transformed = input

    transformed = transformed.replace(
      /^[ \t]*:::block(?:\{([^\n]*)\})?[ \t]*\n([\s\S]*?)^[ \t]*:::[ \t]*$/gm,
      (_, attrs, inner) => {
        const props = parseAttributes(attrs)
        return `<Block${formatProps(props)}>\n\n${inner.trim()}\n\n</Block>`
      }
    )

    transformed = transformed.replace(
      /^[ \t]*:::theorem(?:\{([^\n]*)\})?[ \t]*\n([\s\S]*?)^[ \t]*:::[ \t]*$/gm,
      (_, attrs, inner) => {
        const props = parseAttributes(attrs)
        return `<Theorem${formatProps(props)}>\n\n${inner.trim()}\n\n</Theorem>`
      }
    )

    transformed = transformed.replace(
      /^[ \t]*:::highlight(?:\{([^\n]*)\})?[ \t]*\n([\s\S]*?)^[ \t]*:::[ \t]*$/gm,
      (_, attrs, inner) => {
        const props = parseAttributes(attrs)
        return `<Highlight${formatProps(props)}>${inner.trim()}</Highlight>`
      }
    )

    transformed = transformed.replace(
      /^[ \t]*:::cite(?:\{([^\n]*)\})?[ \t]*\n([\s\S]*?)^[ \t]*:::[ \t]*$/gm,
      (_, attrs, inner) => {
        const props = parseAttributes(attrs)
        return `<Cite${formatProps(props)}>${inner.trim()}</Cite>`
      }
    )

    transformed = transformed.replace(
      /^[ \t]*:::steps(?:\{([^\n]*)\})?[ \t]*:::[ \t]*$/gm,
      (_, attrs) => {
        const props = parseAttributes(attrs)
        return `<Steps${formatProps(props)} />`
      }
    )

    transformed = transformed.replace(
      /^[ \t]*:::keywords(?:\{([^\n]*)\})?[ \t]*:::[ \t]*$/gm,
      (_, attrs) => {
        const props = parseAttributes(attrs)
        return `<Keywords${formatProps(props)} />`
      }
    )

    transformed = transformed.replace(
      /^[ \t]*:::columns(?:\{([^\n]*)\})?[ \t]*\n([\s\S]*?)^[ \t]*:::[ \t]*$/gm,
      (_, attrs, inner) => {
        const columns = inner.split(/\n\+\+\+\n/).map((column: string) => column.trim())
        let props = parseAttributes(attrs)

        if (columns.length > 1 && !/(^|\s):?(cols|columns)\s*=/.test(props))
          props = `${props} columns="${Math.min(columns.length, 4)}"`.trim()

        if (columns.length === 1)
          return `<Columns${formatProps(props)}>\n\n${columns[0]}\n\n</Columns>`

        let result = `<Columns${formatProps(props)}>\n\n${columns[0]}\n\n`
        for (let index = 1; index < columns.length; index++) {
          result += `<template #col${index + 1}>\n\n${columns[index]}\n\n</template>\n`
        }
        result += '</Columns>'
        return result
      }
    )

    transformed = transformed.replace(
      HEADING_ID_SUFFIX_RE,
      (_, heading, id) => `${heading} <span id="${id}" class="${ANCHOR_MARKER_CLASS}" aria-hidden="true"></span>`,
    )

    transformed = transformed.replace(
      ANCHOR_SUGAR_RE,
      (_, id) => `<div id="${id}" class="${ANCHOR_MARKER_CLASS}" aria-hidden="true"></div>`,
    )

    return transformed
  })
}

function withProtectedBlocks(content: string, transform: (content: string) => string): string {
  const protectedBlocks: string[] = []

  const masked = content.replace(PROTECTED_BLOCKS_RE, (block) => {
    const index = protectedBlocks.length
    protectedBlocks.push(block)
    return `\u0000SCHOLARLY_BLOCK_${index}\u0000`
  })

  return transform(masked).replace(/\u0000SCHOLARLY_BLOCK_(\d+)\u0000/g, (_, index) => {
    return protectedBlocks[Number(index)] ?? ''
  })
}

function parseAttributes(attrs?: string): string {
  return (attrs ?? '').trim()
}

function formatProps(props: string): string {
  return props ? ` ${props}` : ''
}
