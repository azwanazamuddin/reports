<template>
  <header v-if="displayTitle || displaySubtitle" :class="['header-container', { 'header-centered': centered, 'header-fixed': !centered }]">
    <div :class="['beamer-header', { 'beamer-header-centered': centered }]">
      <div v-if="displayTitle" class="header-title">{{ displayTitle }}</div>
      <div v-if="displaySubtitle" class="header-subtitle">{{ displaySubtitle }}</div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'

const props = defineProps<{
  title?: string
  subtitle?: string
  centered?: boolean
}>()

// Get slide context
const { $frontmatter } = useSlideContext()

// Display title: props take priority, then frontmatter
const displayTitle = computed(() => {
  if (props.title) return props.title
  return $frontmatter?.title || ''
})

// Display subtitle: props take priority, then frontmatter
const displaySubtitle = computed(() => {
  if (props.subtitle) return props.subtitle
  return $frontmatter?.subtitle || ''
})
</script>
