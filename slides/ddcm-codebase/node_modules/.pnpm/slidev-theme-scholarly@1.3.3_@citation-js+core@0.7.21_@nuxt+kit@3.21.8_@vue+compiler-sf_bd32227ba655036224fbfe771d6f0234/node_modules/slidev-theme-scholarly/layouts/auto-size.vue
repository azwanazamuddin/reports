<template>
  <div
    class="slidev-layout auto-size flex flex-col h-full"
    :data-density="contentDensity"
  >
    <ScholarlyHeader ref="headerRef" class="flex-shrink-0" :title="headerTitle" :subtitle="headerSubtitle" />
    <div
      ref="contentWrapperRef"
      class="flex-grow overflow-hidden content-wrapper"
      :class="[contentWrapperClass, { 'no-header': !hasHeaderContent }]"
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
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { useSlideContext } from '@slidev/client'
import ScholarlyFooter from '../components/ScholarlyFooter.vue'
import ScholarlyHeader from '../components/ScholarlyHeader.vue'
import { useAutoFontSize } from '../utils/useAutoFontSize'
import { useFontSizeStyles } from '../utils/useFontSizeStyles'

const props = defineProps<{
  /** Content density: auto (default), compact, normal, relaxed */
  density?: 'auto' | 'compact' | 'normal' | 'relaxed'
  /** Override header title (auto-extracted from first h1 if not set in frontmatter) */
  title?: string
  /** Override header subtitle */
  subtitle?: string
  /** Minimum font size in pixels */
  minFontSize?: number
  /** Maximum font size in pixels */
  maxFontSize?: number
  /** Allow sparse slides to grow beyond their base size */
  autoSizeGrow?: boolean
  /** Vertical alignment for the main matter */
  autoSizeAlign?: 'top' | 'center'
  /** Inner padding preset for the main matter area */
  autoSizePadding?: 'compact' | 'normal'
}>()

const { $slidev } = useSlideContext()
const headerRef = ref()
const contentWrapperRef = ref<HTMLElement>()
const contentInnerRef = ref<HTMLElement>()

// Get frontmatter settings
const frontmatter = computed(() => {
  return ($slidev?.nav?.currentSlideRoute?.meta?.slide as any)?.frontmatter || {}
})

const resolvedMinFontSize = computed(() => {
  return props.minFontSize ?? frontmatter.value?.minFontSize ?? frontmatter.value?.autoSizeMinFontSize
})

const resolvedMaxFontSize = computed(() => {
  return props.maxFontSize ?? frontmatter.value?.maxFontSize ?? frontmatter.value?.autoSizeMaxFontSize
})

const resolvedAutoSizeGrow = computed(() => {
  return props.autoSizeGrow ?? frontmatter.value?.autoSizeGrow ?? true
})

const resolvedAutoSizeAlign = computed<'top' | 'center'>(() => {
  const value = props.autoSizeAlign ?? frontmatter.value?.autoSizeAlign
  return value === 'center' ? 'center' : 'top'
})

const resolvedAutoSizePadding = computed<'compact' | 'normal'>(() => {
  const value = props.autoSizePadding ?? frontmatter.value?.autoSizePadding
  return value === 'compact' ? 'compact' : 'normal'
})

const { fontSize: contentFontSize } = useAutoFontSize(contentWrapperRef, contentInnerRef, {
  strategy: computed(() => (resolvedAutoSizeGrow.value ? 'fit' : 'shrink')),
  minFontSizePx: resolvedMinFontSize,
  maxFontSizePx: resolvedMaxFontSize,
  growthFactor: 1.65,
})

// Check if frontmatter has title/subtitle
const hasHeaderContent = computed(() => {
  return !!(frontmatter.value?.title || frontmatter.value?.subtitle || props.title || props.subtitle)
})

// Header title: from props > frontmatter > auto-extract from first h1
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

// Auto-detect content density based on content amount
const detectedDensity = ref<'compact' | 'normal' | 'relaxed'>('normal')

const detectContentDensity = () => {
  if (!contentInnerRef.value) return 'normal'

  const content = contentInnerRef.value
  const listItems = content.querySelectorAll('li').length
  const paragraphs = content.querySelectorAll('p').length
  const headings = content.querySelectorAll('h1, h2, h3, h4, h5, h6').length
  const codeBlocks = content.querySelectorAll('pre').length
  const theorems = content.querySelectorAll('.theorem-box').length

  const totalElements = listItems + paragraphs + headings + codeBlocks + theorems

  if (totalElements > 15 || listItems > 10) {
    return 'compact'
  }
  if (totalElements < 5) {
    return 'relaxed'
  }
  return 'normal'
}

// Content density: from props > frontmatter > auto-detect
const contentDensity = computed(() => {
  const explicit = props.density || frontmatter.value?.density
  if (explicit && explicit !== 'auto') return explicit
  return detectedDensity.value
})

const computedStyles = useFontSizeStyles(contentFontSize)
const contentWrapperClass = computed(() => [
  `align-${resolvedAutoSizeAlign.value}`,
  `padding-${resolvedAutoSizePadding.value}`,
])

onMounted(() => {
  nextTick(() => {
    detectedDensity.value = detectContentDensity()
  })
})

watch(() => $slidev?.nav?.currentPage, () => {
  nextTick(() => {
    detectedDensity.value = detectContentDensity()
  })
})
</script>

<style scoped>
.content-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-top: calc(var(--scholarly-header-height) - 0.25rem);
  padding-bottom: calc(var(--scholarly-footer-height) + var(--scholarly-auto-size-bottom-gap, 0.5rem));
  padding-left: var(--scholarly-auto-size-inline-padding, 0.9rem);
  padding-right: var(--scholarly-auto-size-inline-padding, 0.9rem);
  width: 100%;
  box-sizing: border-box;
}

.content-wrapper.no-header {
  padding-top: 0;
}

.content-wrapper.align-center {
  justify-content: center;
}

.content-wrapper.padding-compact {
  --scholarly-auto-size-inline-padding: 0.35rem;
  --scholarly-auto-size-bottom-gap: 0.2rem;
}

.content-wrapper.padding-normal {
  --scholarly-auto-size-inline-padding: 0.9rem;
  --scholarly-auto-size-bottom-gap: 0.5rem;
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

.content-wrapper :deep(.content-inner > :first-child) {
  margin-top: 0;
}

.content-inner {
  width: 100%;
  max-width: 100%;
}
</style>
