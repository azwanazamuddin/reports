<template>
  <div class="slidev-layout focus flex flex-col h-full">
    <div class="flex-grow flex items-center justify-center">
      <div class="focus-content" :class="[`focus-${color}`]">
        <div class="focus-icon" v-if="icon">{{ icon }}</div>
        <div class="focus-main" :style="computedStyles">
          <slot />
        </div>
      </div>
    </div>
    <ScholarlyFooter class="flex-shrink-0" />
  </div>
</template>

<script setup lang="ts">
import ScholarlyFooter from '../components/ScholarlyFooter.vue'
import { useFontSizeStyles } from '../utils/useFontSizeStyles'

defineProps<{
  /** Accent color: primary (default), blue, green, amber, red, purple */
  color?: 'primary' | 'blue' | 'green' | 'amber' | 'red' | 'purple'
  /** Optional emoji or icon to display above content */
  icon?: string
}>()

const computedStyles = useFontSizeStyles()
</script>

<style scoped>
.focus-content {
  text-align: center;
  max-width: 80%;
  padding: 3rem;
  border-radius: 1rem;
  position: relative;
}

.focus-icon {
  font-size: 4rem;
  margin-bottom: 1.5rem;
}

.focus-main :deep(h1) {
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1rem;
}

.focus-main :deep(p) {
  font-size: 1.5rem;
  opacity: 0.8;
  margin: 0;
}

/* Color variants with subtle backgrounds */
.focus-primary {
  background: linear-gradient(135deg, rgba(30, 58, 95, 0.1) 0%, rgba(30, 58, 95, 0.05) 100%);
  border-left: 4px solid #1e3a5f;
}

.focus-blue {
  background: linear-gradient(135deg, rgba(44, 82, 130, 0.1) 0%, rgba(44, 82, 130, 0.05) 100%);
  border-left: 4px solid #2c5282;
}

.focus-green {
  background: linear-gradient(135deg, rgba(39, 103, 73, 0.1) 0%, rgba(39, 103, 73, 0.05) 100%);
  border-left: 4px solid #276749;
}

.focus-amber {
  background: linear-gradient(135deg, rgba(151, 90, 22, 0.1) 0%, rgba(151, 90, 22, 0.05) 100%);
  border-left: 4px solid #975a16;
}

.focus-red {
  background: linear-gradient(135deg, rgba(155, 44, 44, 0.1) 0%, rgba(155, 44, 44, 0.05) 100%);
  border-left: 4px solid #9b2c2c;
}

.focus-purple {
  background: linear-gradient(135deg, rgba(85, 60, 154, 0.1) 0%, rgba(85, 60, 154, 0.05) 100%);
  border-left: 4px solid #553c9a;
}
</style>
