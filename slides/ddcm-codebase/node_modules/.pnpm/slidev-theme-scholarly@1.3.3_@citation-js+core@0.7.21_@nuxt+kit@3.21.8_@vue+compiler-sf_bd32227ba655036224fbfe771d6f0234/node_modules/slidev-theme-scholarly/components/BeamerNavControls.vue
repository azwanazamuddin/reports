<template>
  <div
    v-if="showNavControls"
    class="beamer-footer-nav"
    role="group"
    :aria-label="labels.group"
  >
    <button
      type="button"
      class="beamer-nav-button"
      :disabled="!$slidev.nav.hasPrev"
      :title="labels.first"
      :aria-label="labels.first"
      @click="$slidev.nav.goFirst()"
    >
      <svg
        class="beamer-nav-icon"
        viewBox="0 0 16 16"
        aria-hidden="true"
      >
        <path d="M4 3.25V12.75" />
        <path d="M10.5 4L6.5 8L10.5 12" />
      </svg>
    </button>
    <button
      type="button"
      class="beamer-nav-button"
      :disabled="!$slidev.nav.hasPrev"
      :title="labels.previous"
      :aria-label="labels.previous"
      @click="$slidev.nav.prev()"
    >
      <svg
        class="beamer-nav-icon"
        viewBox="0 0 16 16"
        aria-hidden="true"
      >
        <path d="M10.5 4L6.5 8L10.5 12" />
      </svg>
    </button>
    <button
      type="button"
      class="beamer-nav-button"
      :disabled="!$slidev.nav.hasNext"
      :title="labels.next"
      :aria-label="labels.next"
      @click="$slidev.nav.next()"
    >
      <svg
        class="beamer-nav-icon"
        viewBox="0 0 16 16"
        aria-hidden="true"
      >
        <path d="M5.5 4L9.5 8L5.5 12" />
      </svg>
    </button>
    <button
      type="button"
      class="beamer-nav-button"
      :disabled="!$slidev.nav.hasNext"
      :title="labels.last"
      :aria-label="labels.last"
      @click="$slidev.nav.goLast()"
    >
      <svg
        class="beamer-nav-icon"
        viewBox="0 0 16 16"
        aria-hidden="true"
      >
        <path d="M12 3.25V12.75" />
        <path d="M5.5 4L9.5 8L5.5 12" />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'
import { isInteractiveSlideRoute } from '../utils/presentationMode'

const { $slidev } = useSlideContext()
const slidevConfigs = computed(() => ($slidev.configs as any) || {})

const showNavControls = computed(() => {
  if (slidevConfigs.value?.themeConfig?.beamerNav === false)
    return false

  return isInteractiveSlideRoute()
})

const isChinese = computed(() => `${slidevConfigs.value?.lang || ''}`.toLowerCase().startsWith('zh'))

const labels = computed(() => {
  if (isChinese.value) {
    return {
      group: '幻灯片导航按钮',
      first: '跳到第一页',
      previous: '上一页',
      next: '下一页',
      last: '跳到最后一页',
    }
  }

  return {
    group: 'Slide navigation buttons',
    first: 'Go to the first slide',
    previous: 'Go to the previous slide',
    next: 'Go to the next slide',
    last: 'Go to the last slide',
  }
})
</script>
