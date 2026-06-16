<template>
  <div 
    class="slidev-layout image-left h-full" 
    :style="gridStyle"
  >
    <ScholarlyHeader class="col-span-full" style="z-index: 10;" />
    <div class="image-container">
      <slot name="image">
        <img 
          v-if="image" 
          :src="image" 
          :style="imageStyle"
          class="w-full h-full"
        >
      </slot>
    </div>
    <div class="content-wrapper-text px-8" :style="computedStyles">
      <slot />
    </div>
    <ScholarlyFooter class="col-span-full" style="z-index: 10;" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import ScholarlyHeader from '../components/ScholarlyHeader.vue'
import ScholarlyFooter from '../components/ScholarlyFooter.vue'
import { useFontSizeStyles } from '../utils/useFontSizeStyles'

const props = defineProps<{
  image?: string
  /** Column ratio for image:content, e.g., "1:1" (default), "2:3", "1:2" */
  ratio?: string
  /** Image fit mode: cover (default), contain, fill */
  fit?: 'cover' | 'contain' | 'fill'
  /** Image position when using cover/contain */
  position?: string
}>()

const computedStyles = useFontSizeStyles()

const gridStyle = computed(() => {
  const ratio = props.ratio || '1:1'
  const parts = ratio.split(':').map(Number)
  const templateColumns = parts.map((p: number) => `${p}fr`).join(' ')
  
  return {
    display: 'grid',
    gridTemplateColumns: templateColumns,
    gridTemplateRows: 'auto 1fr auto',
    gap: '0',
  }
})

const imageStyle = computed(() => ({
  objectFit: props.fit || 'cover',
  objectPosition: props.position || 'center',
}))
</script>

<style>
.slidev-layout.image-left {
  padding: 0 !important;
}
</style>

<style scoped>
.col-span-full {
  grid-column: 1 / -1;
}

.image-container {
  position: relative;
  overflow: hidden;
  grid-row: 1 / -1;
}

.image-container img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.content-wrapper-text {
  padding-top: calc(60px + 5%); /* Space for fixed header + compensate for removed layout padding */
  padding-bottom: calc(var(--scholarly-footer-height) + 0.5rem); /* Space for fixed footer */
  padding-left: 2rem;
  padding-right: 2rem;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  overflow: auto;
}

.content-wrapper-text :deep(h1),
.content-wrapper-text :deep(h2),
.content-wrapper-text :deep(h3) {
  width: 100%;
  margin-top: 0;
}
</style>
