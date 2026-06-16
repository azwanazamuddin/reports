<template>
  <Teleport to="body">
    <Transition name="footer-toc-preview">
      <div
        v-if="visible && route && clicksContext && positionStyle"
        class="footer-toc-preview"
        :style="positionStyle"
        aria-hidden="true"
      >
        <div class="footer-toc-preview-surface">
          <div class="footer-toc-preview-stage">
            <SlideContainer
              :key="slideNo"
              :no="slideNo || undefined"
              :use-snapshot="true"
              :width="previewWidth"
              class="pointer-events-none select-none"
            >
              <SlideWrapper
                :clicks-context="clicksContext"
                :route="route"
                render-context="overview"
              />
              <DrawingPreview :page="slideNo" />
            </SlideContainer>
          </div>

          <div class="footer-toc-preview-badge">
            {{ slideNo }}
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import type { ClicksContext, SlideRoute } from '@slidev/types'
import type { CSSProperties, PropType } from 'vue'
import { slideAspect } from '@slidev/client'
import { computed } from 'vue'
import DrawingPreview from '@slidev/client/internals/DrawingPreview.vue'
import SlideContainer from '@slidev/client/internals/SlideContainer.vue'
import SlideWrapper from '@slidev/client/internals/SlideWrapper.vue'

const PREVIEW_WIDTH_PX = 248

defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  route: {
    type: Object as PropType<SlideRoute | null>,
    default: null,
  },
  slideNo: {
    type: Number,
    default: null,
  },
  clicksContext: {
    type: Object as PropType<ClicksContext | null>,
    default: null,
  },
  positionStyle: {
    type: Object as PropType<CSSProperties | null>,
    default: null,
  },
})

const previewWidth = PREVIEW_WIDTH_PX
const previewHeight = computed(() => `${previewWidth / slideAspect.value}px`)
</script>

<style scoped>
.footer-toc-preview {
  position: fixed;
  z-index: 56;
  width: 15.5rem;
  pointer-events: none;
}

.footer-toc-preview-surface {
  position: relative;
  overflow: hidden;
  border: 1px solid color-mix(in srgb, var(--slidev-theme-primary, #1e3a5f) 12%, rgba(15, 23, 42, 0.12));
  border-radius: 0.88rem;
  background: color-mix(in srgb, var(--scholarly-bg-warm, #fdfbf7) 95%, white);
  box-shadow: 0 16px 34px rgba(15, 23, 42, 0.16), 0 5px 14px rgba(15, 23, 42, 0.08);
  backdrop-filter: blur(10px);
}

.footer-toc-preview-stage {
  width: 15.5rem;
  height: v-bind(previewHeight);
  overflow: hidden;
  background: color-mix(in srgb, var(--slidev-theme-primary, #1e3a5f) 4%, var(--scholarly-bg-warm, #fdfbf7));
}

.footer-toc-preview-badge {
  position: absolute;
  top: 0.42rem;
  right: 0.42rem;
  min-width: 1.5rem;
  height: 1.5rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 0.34rem;
  border: 1px solid color-mix(in srgb, var(--slidev-theme-primary, #1e3a5f) 14%, transparent);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.78);
  color: var(--slidev-theme-primary, #1e3a5f);
  font-family: var(--scholarly-font-sans);
  font-size: 0.62rem;
  font-weight: 700;
  line-height: 1;
  font-variant-numeric: tabular-nums;
  box-shadow: 0 3px 8px rgba(15, 23, 42, 0.08);
}

.footer-toc-preview-enter-active,
.footer-toc-preview-leave-active {
  transition: opacity 160ms ease, transform 160ms ease;
}

.footer-toc-preview-enter-from,
.footer-toc-preview-leave-to {
  opacity: 0;
  transform: translateX(0.2rem) scale(0.985);
}
</style>
