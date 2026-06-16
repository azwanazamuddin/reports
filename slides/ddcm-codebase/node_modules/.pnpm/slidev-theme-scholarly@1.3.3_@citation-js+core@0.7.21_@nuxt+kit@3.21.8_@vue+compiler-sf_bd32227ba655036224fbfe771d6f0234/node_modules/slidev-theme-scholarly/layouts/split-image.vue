<template>
  <div class="slidev-layout split-image h-full flex flex-col">
    <ScholarlyHeader v-if="hasHeader" class="flex-shrink-0" />
    <div class="flex-grow flex items-center justify-center px-6 py-4 gap-4" :style="computedStyles">
      <div v-for="(img, idx) in images" :key="idx" class="flex-1 flex flex-col items-center h-full justify-center">
        <div class="relative bg-white p-2 rounded shadow-sm border border-gray-100">
          <img :src="img" class="max-h-[55vh] object-contain rounded-sm" :alt="captions?.[idx] || `Image ${idx + 1}`" />
        </div>
        <p v-if="captions && captions[idx]" class="mt-3 text-center font-serif text-base text-gray-700 max-w-xs">
          {{ captions[idx] }}
        </p>
      </div>
    </div>
    <div v-if="$slots.default" class="px-8 pb-4">
      <slot />
    </div>
    <ScholarlyFooter class="flex-shrink-0" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'
import ScholarlyHeader from '../components/ScholarlyHeader.vue'
import ScholarlyFooter from '../components/ScholarlyFooter.vue'
import { useFontSizeStyles } from '../utils/useFontSizeStyles'

defineProps<{
  images: string[]
  captions?: string[]
}>()

const { $frontmatter } = useSlideContext()
const hasHeader = computed(() => $frontmatter.value?.title || $frontmatter.value?.subtitle)
const computedStyles = useFontSizeStyles()
</script>
