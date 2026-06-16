<template>
  <div 
    class="slidev-layout two-cols h-full" 
    :style="gridStyle"
  >
    <ScholarlyHeader class="col-span-full" />
    <div class="col-left content-wrapper-left" :style="computedStyles">
      <slot name="left">
        <slot />
      </slot>
    </div>
    <div class="col-right content-wrapper-right" :style="computedStyles">
      <slot name="right" />
    </div>
    <ScholarlyFooter class="col-span-full" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import ScholarlyHeader from '../components/ScholarlyHeader.vue'
import ScholarlyFooter from '../components/ScholarlyFooter.vue'
import { useFontSizeStyles } from '../utils/useFontSizeStyles'

const props = defineProps<{
  /** Column width ratio, e.g., "1:1" (default), "1:2", "2:1", "1:3", "3:1" */
  ratio?: string
  /** Gap between columns */
  gap?: string
}>()

const computedStyles = useFontSizeStyles()

const gridStyle = computed(() => {
  const ratio = props.ratio || '1:1'
  const gap = props.gap || '1rem'
  
  // Parse ratio like "1:2" or "2:1"
  const parts = ratio.split(':').map(Number)
  const total = parts.reduce((a: number, b: number) => a + b, 0)
  const templateColumns = parts.map((p: number) => `${p}fr`).join(' ')
  
  return {
    display: 'grid',
    gridTemplateColumns: templateColumns,
    gridTemplateRows: 'auto 1fr auto',
    gap: `0 ${gap}`,
  }
})
</script>

<style scoped>
.col-span-full {
  grid-column: 1 / -1;
}

.content-wrapper-left,
.content-wrapper-right {
  padding-top: 60px; /* Space for fixed header */
  padding-bottom: calc(var(--scholarly-footer-height) + 0.5rem); /* Space for fixed footer */
  align-self: start;
  overflow: auto;
}

.content-wrapper-left :deep(h1),
.content-wrapper-left :deep(h2),
.content-wrapper-left :deep(h3),
.content-wrapper-right :deep(h1),
.content-wrapper-right :deep(h2),
.content-wrapper-right :deep(h3) {
  margin-top: 0;
}
</style>
