<template>
  <div 
    class="slidev-layout auto-center flex flex-col h-full"
  >
    <ScholarlyHeader ref="headerRef" class="flex-shrink-0" :title="headerTitle" :subtitle="headerSubtitle" />
    <div
      ref="contentWrapperRef"
      class="flex-grow overflow-hidden content-wrapper flex items-center justify-center"
      :class="{ 'no-header': !hasHeaderContent }"
    >
      <div
        ref="contentInnerRef"
        class="content-inner"
        :style="computedStyles"
      >
        <slot />
      </div>
    </div>
    <ScholarlyFooter class="flex-shrink-0" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import { useSlideContext } from '@slidev/client'
import ScholarlyHeader from '../components/ScholarlyHeader.vue'
import ScholarlyFooter from '../components/ScholarlyFooter.vue'
import { useFontSizeStyles } from '../utils/useFontSizeStyles'

const props = defineProps<{
  /** Override header title */
  title?: string
  /** Override header subtitle */
  subtitle?: string
  /** Minimum font size in pixels */
  minFontSize?: number
  /** Maximum font size in pixels */
  maxFontSize?: number
}>()

const { $slidev } = useSlideContext()
const headerRef = ref()
const contentWrapperRef = ref<HTMLElement>()
const contentInnerRef = ref<HTMLElement>()

const fontSize = ref<string>('')

// Get frontmatter settings
const frontmatter = computed(() => {
  return ($slidev?.nav?.currentSlideRoute?.meta?.slide as any)?.frontmatter || {}
})

// Check if frontmatter has title/subtitle
const hasHeaderContent = computed(() => {
  return !!(frontmatter.value?.title || frontmatter.value?.subtitle || props.title || props.subtitle)
})

// Header title: from props > frontmatter
const headerTitle = computed(() => {
  if (props.title) return props.title
  if (frontmatter.value?.title) return frontmatter.value.title
  return ''
})

// Header subtitle: from props > frontmatter
const headerSubtitle = computed(() => {
  if (props.subtitle) return props.subtitle
  if (frontmatter.value?.subtitle) return frontmatter.value.subtitle
  return ''
})

const computedStyles = useFontSizeStyles(fontSize)

// Auto font size adjustment
const isClient = typeof window !== 'undefined'
let resizeObserver: ResizeObserver | undefined
let mutationObserver: MutationObserver | undefined
let rafId: number | null = null

const cancelScheduledAdjust = () => {
  if (rafId !== null && isClient) {
    cancelAnimationFrame(rafId)
    rafId = null
  }
}

const adjustFontSize = () => {
  if (!isClient) return
  const wrapper = contentWrapperRef.value
  const content = contentInnerRef.value

  if (!wrapper || !content) return

  cancelScheduledAdjust()

  // Reset font size first
  content.style.fontSize = ''
  fontSize.value = ''

  const computedSize = parseFloat(window.getComputedStyle(content).fontSize || '18')
  if (Number.isNaN(computedSize)) {
    fontSize.value = ''
    return
  }

  const minFontSize = props.minFontSize ?? Math.max(12, Math.round(computedSize * 0.5))
  const maxFontSize = props.maxFontSize ?? Math.round(computedSize * 1.5)

  // Get available space
  const wrapperRect = wrapper.getBoundingClientRect()
  const availableHeight = wrapperRect.height - 20 // 20px padding
  const availableWidth = wrapperRect.width - 40 // 40px padding

  let candidateSize = maxFontSize
  const maxAttempts = 100
  let attempts = 0

  // Try to find the best font size
  content.style.fontSize = `${candidateSize}px`

  while (
    attempts < maxAttempts &&
    (content.scrollHeight > availableHeight || content.scrollWidth > availableWidth)
  ) {
    candidateSize -= 1
    if (candidateSize <= minFontSize) {
      candidateSize = minFontSize
      break
    }
    content.style.fontSize = `${candidateSize}px`
    attempts += 1
  }

  content.style.fontSize = `${candidateSize}px`
  fontSize.value = `${candidateSize}px`
}

const scheduleAdjust = () => {
  if (!isClient) return
  cancelScheduledAdjust()
  nextTick(() => {
    cancelScheduledAdjust()
    rafId = requestAnimationFrame(() => {
      adjustFontSize()
      rafId = null
    })
  })
}

watch(() => $slidev?.nav?.currentPage, () => {
  scheduleAdjust()
})

watch(() => $slidev?.nav?.clicks, () => {
  scheduleAdjust()
})

watch(
  () => [contentWrapperRef.value, contentInnerRef.value],
  () => {
    scheduleAdjust()
  },
)

onMounted(() => {
  if (!isClient) return

  scheduleAdjust()
  window.addEventListener('resize', scheduleAdjust)

  if (typeof ResizeObserver !== 'undefined') {
    resizeObserver = new ResizeObserver(() => scheduleAdjust())
    if (contentWrapperRef.value) resizeObserver.observe(contentWrapperRef.value)
    if (contentInnerRef.value) resizeObserver.observe(contentInnerRef.value)
  }

  if (typeof MutationObserver !== 'undefined' && contentInnerRef.value) {
    mutationObserver = new MutationObserver(() => scheduleAdjust())
    mutationObserver.observe(contentInnerRef.value, { childList: true, subtree: true, characterData: true })
  }
})

onBeforeUnmount(() => {
  if (!isClient) return

  window.removeEventListener('resize', scheduleAdjust)
  resizeObserver?.disconnect()
  mutationObserver?.disconnect()
  cancelScheduledAdjust()
})
</script>

<style scoped>
.content-wrapper {
  padding: 10px 20px;
  width: 100%;
  box-sizing: border-box;
}

.content-wrapper.no-header {
  padding-top: 10px;
}

.content-inner {
  width: 100%;
  max-width: 100%;
  text-align: left;
}

.content-wrapper :deep(h1),
.content-wrapper :deep(h2),
.content-wrapper :deep(h3),
.content-wrapper :deep(p),
.content-wrapper :deep(ul),
.content-wrapper :deep(ol) {
  text-align: left;
}

.content-wrapper :deep(.theorem-box) {
  width: 100%;
  margin-left: 0;
  margin-right: 0;
}

/* Reduce spacing for auto-centered content */
.content-wrapper :deep(h1) {
  margin-bottom: 0.5em;
}

.content-wrapper :deep(h2) {
  margin-bottom: 0.4em;
}

.content-wrapper :deep(h3) {
  margin-bottom: 0.3em;
}

.content-wrapper :deep(p) {
  margin-bottom: 0.5em;
}

.content-wrapper :deep(ul),
.content-wrapper :deep(ol) {
  margin-bottom: 0.5em;
}

.content-wrapper :deep(li) {
  margin-bottom: 0.25em;
}
</style>
