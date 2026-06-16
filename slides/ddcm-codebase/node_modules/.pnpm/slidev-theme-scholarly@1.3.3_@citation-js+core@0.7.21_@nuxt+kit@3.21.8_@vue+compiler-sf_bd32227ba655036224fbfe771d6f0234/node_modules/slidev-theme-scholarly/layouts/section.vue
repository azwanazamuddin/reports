<template>
  <CenteredLayout
    layout-name="section"
    max-width="full"
    :show-header="false"
    custom-spacing="1rem"
    :data-section-mode="resolvedSectionMode"
  >
    <slot />
  </CenteredLayout>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'
import CenteredLayout from '../components/CenteredLayout.vue'

const { $slidev, $frontmatter } = useSlideContext()

// Global themeConfig from headmatter (first slide)
const globalSectionMode = computed(() => {
  return ($slidev.configs as any)?.themeConfig?.sectionMode as 'light' | 'dark' | undefined
})

// Resolve sectionMode: per-slide > global themeConfig > 'dark'
const resolvedSectionMode = computed<'dark' | 'light'>(() => {
  // Per-slide frontmatter takes priority
  const localMode = $frontmatter.value?.sectionMode
  if (localMode === 'light' || localMode === 'dark') {
    return localMode
  }
  // Fallback to global themeConfig.sectionMode
  if (globalSectionMode.value === 'light' || globalSectionMode.value === 'dark') {
    return globalSectionMode.value
  }
  // Default to dark
  return 'dark'
})
</script>
