<template>
  <div :class="['slidev-layout', layoutName, 'flex', 'flex-col', 'h-full']">
    <ScholarlyHeader v-if="showHeader" class="flex-shrink-0" />
    <div
      ref="contentWrapperRef"
      :class="['flex-grow', 'flex', 'flex-col', 'items-center', 'justify-center', 'text-center', 'content-wrapper-centered', containerClass]"
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
import { computed, ref } from 'vue'
import ScholarlyHeader from './ScholarlyHeader.vue'
import ScholarlyFooter from './ScholarlyFooter.vue'
import { useAutoFontSize } from '../utils/useAutoFontSize'
import { useFontSizeStyles } from '../utils/useFontSizeStyles'

interface Props {
  layoutName: string
  maxWidth?: 'full' | '4xl' | '5xl' | 'none'
  showHeader?: boolean
  customPadding?: string
  customSpacing?: string
}

const props = withDefaults(defineProps<Props>(), {
  maxWidth: 'none',
  showHeader: true,
  customPadding: undefined,
  customSpacing: undefined
})

const containerClass = computed(() => {
  const classes = []
  
  if (props.maxWidth === 'full') {
    classes.push('w-full')
  } else if (props.maxWidth === '4xl') {
    classes.push('max-w-4xl')
  } else if (props.maxWidth === '5xl') {
    classes.push('max-w-5xl')
  }
  
  return classes.join(' ')
})

const paddingTop = computed(() => {
  if (props.customPadding !== undefined) {
    return props.customPadding
  }
  return props.showHeader ? '60px' : '0'
})

const itemSpacing = computed(() => {
  return props.customSpacing || '0.5rem'
})

const contentWrapperRef = ref<HTMLElement>()
const contentInnerRef = ref<HTMLElement>()
const { fontSize: contentFontSize } = useAutoFontSize(contentWrapperRef, contentInnerRef)
const computedStyles = useFontSizeStyles(contentFontSize)
</script>

<style scoped>
.content-wrapper-centered {
  padding-top: v-bind(paddingTop);
  padding-bottom: calc(var(--scholarly-footer-height) + 0.5rem); /* Space for fixed footer */
  padding-left: 2rem;
  padding-right: 2rem;
}

.content-wrapper-centered :deep(> *) {
  margin-bottom: v-bind(itemSpacing);
}

.content-wrapper-centered :deep(> *:last-child) {
  margin-bottom: 0;
}

.content-inner {
  width: 100%;
}
</style>
