<template>
  <div
    :class="['scholarly-columns', `columns-${columnCount}`, { 'columns-balanced': balanced }]"
    :style="gridStyle"
  >
    <div class="scholarly-column">
      <slot />
    </div>
    <div v-if="columnCount >= 2" class="scholarly-column">
      <slot name="col2" />
    </div>
    <div v-if="columnCount >= 3" class="scholarly-column">
      <slot name="col3" />
    </div>
    <div v-if="columnCount >= 4" class="scholarly-column">
      <slot name="col4" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type ColumnCount = 2 | 3 | 4

interface Props {
  /** Number of columns (2-4) */
  columns?: ColumnCount | number | string
  /** Legacy alias of `columns` */
  cols?: ColumnCount | number | string
  /** Column width ratio, e.g., "1:2" or "1:1:2" */
  ratio?: string
  /** Gap between columns */
  gap?: string | number
  /** Whether to balance content height across columns */
  balanced?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  ratio: undefined,
  gap: '1.5rem',
  balanced: false
})

function normalizeColumnCount(value: unknown): ColumnCount | undefined {
  const n = typeof value === 'string' ? Number(value) : typeof value === 'number' ? value : undefined
  if (n === 2 || n === 3 || n === 4) return n
  return undefined
}

function normalizeGap(value: string | number | undefined): string {
  if (value === undefined) return '1.5rem'
  if (typeof value === 'number') return `${value}rem`
  const trimmed = value.trim()
  // Allow passing a plain number-like string, e.g. gap="2" => 2rem
  if (/^\d+(\.\d+)?$/.test(trimmed)) return `${trimmed}rem`
  return trimmed
}

const columnCount = computed<ColumnCount>(() => {
  return normalizeColumnCount(props.columns) ?? normalizeColumnCount(props.cols) ?? 2
})

const gridStyle = computed(() => {
  let templateColumns: string

  if (props.ratio) {
    // Parse ratio like "1:2" or "1:1:2" (must match the column count)
    const parts = props.ratio
      .split(':')
      .map((p) => Number(p.trim()))
      .filter((n) => Number.isFinite(n) && n > 0)
    if (parts.length === columnCount.value) {
      const total = parts.reduce((a, b) => a + b, 0)
      templateColumns = parts.map((p) => `${(p / total) * 100}%`).join(' ')
    } else {
      templateColumns = `repeat(${columnCount.value}, 1fr)`
    }
  } else {
    // Equal columns
    templateColumns = `repeat(${columnCount.value}, 1fr)`
  }

  return {
    display: 'grid',
    gridTemplateColumns: templateColumns,
    gap: normalizeGap(props.gap),
    alignItems: props.balanced ? 'stretch' : 'start'
  }
})
</script>

<style scoped>
.scholarly-columns {
  width: 100%;
}

.scholarly-columns :deep(> *) {
  min-width: 0; /* Prevent overflow in grid children */
}

.scholarly-columns.columns-balanced :deep(> *) {
  display: flex;
  flex-direction: column;
}
</style>
