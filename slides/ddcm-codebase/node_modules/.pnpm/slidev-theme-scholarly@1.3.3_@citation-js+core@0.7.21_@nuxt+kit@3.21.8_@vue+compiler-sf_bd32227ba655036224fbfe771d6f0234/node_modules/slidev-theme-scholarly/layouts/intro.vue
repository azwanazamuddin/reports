<template>
  <div 
    class="slidev-layout intro h-full flex flex-col"
    :data-density="contentDensity"
  >
    <div
      ref="contentWrapperRef"
      class="flex-grow flex flex-col justify-center intro-content"
      :class="alignClass"
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
import { ref, computed } from 'vue'
import { useSlideContext } from '@slidev/client'
import ScholarlyFooter from '../components/ScholarlyFooter.vue'
import { useAutoFontSize } from '../utils/useAutoFontSize'
import { useFontSizeStyles } from '../utils/useFontSizeStyles'

const props = defineProps<{
  /** Text alignment: left (default), center */
  align?: 'left' | 'center'
  /** Content density: auto (default), compact, normal, relaxed */
  density?: 'auto' | 'compact' | 'normal' | 'relaxed'
}>()

const { $slidev } = useSlideContext()
const contentWrapperRef = ref<HTMLElement>()
const contentInnerRef = ref<HTMLElement>()
const { fontSize: contentFontSize } = useAutoFontSize(contentWrapperRef, contentInnerRef)
const computedStyles = useFontSizeStyles(contentFontSize)

const frontmatter = computed(() => {
  return ($slidev?.nav?.currentSlideRoute?.meta?.slide as any)?.frontmatter || {}
})

const alignClass = computed(() => {
  const align = props.align || frontmatter.value?.align || 'left'
  return align === 'center' ? 'items-center text-center' : 'items-start'
})

const contentDensity = computed(() => {
  return props.density || frontmatter.value?.density || 'normal'
})
</script>

<style scoped>
.slidev-layout.intro {
  @apply h-full grid;
}

.intro-content {
  padding-top: 0;
  padding-bottom: calc(var(--scholarly-footer-height) + 0.5rem); /* Space for fixed footer */
  padding-left: 2rem;
  padding-right: 2rem;
}

.intro-content.items-start :deep(h1),
.intro-content.items-start :deep(h2),
.intro-content.items-start :deep(h3),
.intro-content.items-start :deep(p),
.intro-content.items-start :deep(ul),
.intro-content.items-start :deep(ol) {
  text-align: left;
}

.intro-content.items-center :deep(h1),
.intro-content.items-center :deep(h2),
.intro-content.items-center :deep(h3),
.intro-content.items-center :deep(p) {
  text-align: center;
}

.content-inner {
  width: 100%;
}
</style>
