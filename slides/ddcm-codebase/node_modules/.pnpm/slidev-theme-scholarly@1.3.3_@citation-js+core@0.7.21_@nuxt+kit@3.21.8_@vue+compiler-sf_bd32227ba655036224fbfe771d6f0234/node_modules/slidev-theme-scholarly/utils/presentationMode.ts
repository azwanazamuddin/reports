export const isPrintExportRoute = () => {
  if (typeof window === 'undefined')
    return false

  const path = window.location.pathname
  const params = new URLSearchParams(window.location.search)

  return params.has('print') || path.includes('/export') || path.includes('/print')
}

export const isInteractiveSlideRoute = () => {
  if (typeof window === 'undefined')
    return false

  const path = window.location.pathname
  const params = new URLSearchParams(window.location.search)

  const isEmbedded = params.has('embedded')
  const isPrintMode = isPrintExportRoute()
  const isPlayRoute = !path.includes('/overview')
    && !path.includes('/notes')
    && !path.includes('/entry')
    && !path.includes('/presenter')
    && !path.includes('/export')
    && !path.includes('/print')

  return isPlayRoute && !isEmbedded && !isPrintMode
}
