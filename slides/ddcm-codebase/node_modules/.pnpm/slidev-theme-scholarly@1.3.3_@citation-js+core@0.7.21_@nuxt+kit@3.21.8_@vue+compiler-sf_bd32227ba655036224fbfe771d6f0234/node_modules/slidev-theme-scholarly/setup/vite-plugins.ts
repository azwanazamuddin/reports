import { defineVitePluginsSetup } from '@slidev/types'

// Store citation config globally so it can be accessed by the markdown plugin
declare global {
  // eslint-disable-next-line no-var
  var __scholarlyConfig: {
    bibFile: string
    bibStyle: string
    showNum: boolean
  } | undefined
}

export default defineVitePluginsSetup((options) => {
  // Get configuration from headmatter (global frontmatter)
  const headmatter = options.data.headmatter || {}
  const bibFile = (headmatter.bibFile as string) || 'references.bib'
  const bibStyle = (headmatter.bibStyle as string) || 'apa'
  const showNum = (headmatter.bibShowNum as boolean) ?? false

  // Store config globally for the vite.config.ts to access
  globalThis.__scholarlyConfig = { bibFile, bibStyle, showNum }

  return []
})

