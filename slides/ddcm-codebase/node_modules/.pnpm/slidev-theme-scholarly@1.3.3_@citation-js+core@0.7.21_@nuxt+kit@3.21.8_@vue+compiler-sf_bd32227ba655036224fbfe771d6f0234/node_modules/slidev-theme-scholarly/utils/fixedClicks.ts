import type {
  ClicksContext,
  ClicksInfo,
  ClicksElement,
  NormalizedRangeClickValue,
  NormalizedSingleClickValue,
  RawAtValue,
  RawRangeAtValue,
  RawSingleAtValue,
  SlideRoute,
} from '@slidev/types'
import type { MaybeRefOrGetter, Ref } from 'vue'
import { computed, isReadonly, onMounted, onUnmounted, ref, shallowReactive, toValue, watch } from 'vue'

export const CLICKS_MAX = 999999

const clamp = (value: number, min: number, max: number) => {
  return Math.min(Math.max(value, min), max)
}

const sum = (...values: number[]) => values.reduce((total, value) => total + value, 0)

export function normalizeSingleAtValue(at: RawSingleAtValue): NormalizedSingleClickValue {
  if (at === false || at === 'false')
    return null
  if (at == null || at === true || at === 'true')
    return '+1'
  if (typeof at === 'string' && '+-'.includes(at[0]))
    return at

  const value = +at
  if (Number.isNaN(value))
    return null

  if (value <= 0)
    return 1

  return value
}

export function normalizeRangeAtValue(at: RawAtValue): NormalizedRangeClickValue {
  if (Array.isArray(at))
    return [normalizeSingleAtValue(at[0])!, normalizeSingleAtValue(at[1])!]

  return null
}

export function createClicksContextBase(
  current: Ref<number>,
  clicksStart = 0,
  clicksTotalOverrides?: number,
): ClicksContext {
  const isMounted = ref(false)
  let relativeSizeMap: ClicksContext['relativeSizeMap'] = new Map()
  let maxMap: ClicksContext['maxMap'] = new Map()

  const context: ClicksContext = {
    get current() {
      return clamp(+current.value, clicksStart, context.total)
    },
    set current(value) {
      current.value = isMounted.value
        ? clamp(value, clicksStart, context.total)
        : value
    },
    clicksStart,
    get relativeSizeMap() {
      return relativeSizeMap
    },
    get maxMap() {
      return maxMap
    },
    get isMounted() {
      return isMounted.value
    },
    setup() {
      onMounted(() => {
        isMounted.value = true
        maxMap = shallowReactive(maxMap)
        if (!isReadonly(current))
          context.current = current.value
      })

      onUnmounted(() => {
        isMounted.value = false
        relativeSizeMap = new Map()
        maxMap = new Map()
      })
    },
    calculateSince(rawAt, size = 1) {
      const at = normalizeSingleAtValue(rawAt)
      if (at == null)
        return null

      let start: number
      let max: number
      let delta: number

      if (typeof at === 'string') {
        const offset = context.currentOffset
        const value = +at
        start = offset + value
        max = offset + value + size - 1
        delta = value + size - 1
      }
      else {
        start = at
        max = at + size - 1
        delta = 0
      }

      return {
        start,
        end: Number.POSITIVE_INFINITY,
        max,
        delta,
        currentOffset: computed(() => context.current - start),
        isCurrent: computed(() => context.current === start),
        isActive: computed(() => context.current >= start),
      } satisfies ClicksInfo
    },
    calculateRange(rawAt) {
      const at = normalizeRangeAtValue(rawAt)
      if (at == null)
        return null

      const [startAt, endAt] = at
      let start: number
      let end: number
      let delta: number

      if (typeof startAt === 'string') {
        const offset = context.currentOffset
        start = offset + +startAt
        delta = +startAt
      }
      else {
        start = startAt
        delta = 0
      }

      if (typeof endAt === 'string') {
        end = start + +endAt
        delta += +endAt
      }
      else {
        end = endAt
      }

      return {
        start,
        end,
        max: end,
        delta,
        currentOffset: computed(() => context.current - start),
        isCurrent: computed(() => context.current === start),
        isActive: computed(() => start <= context.current && context.current < end),
      } satisfies ClicksInfo
    },
    calculate(at) {
      if (Array.isArray(at))
        return context.calculateRange(at as RawRangeAtValue)

      return context.calculateSince(at)
    },
    register(el, info) {
      if (!info)
        return

      const { delta, max } = info
      relativeSizeMap.set(el, delta)
      maxMap.set(el, max)
    },
    unregister(el) {
      relativeSizeMap.delete(el)
      maxMap.delete(el)
    },
    get currentOffset() {
      return sum(...relativeSizeMap.values())
    },
    get total() {
      return clicksTotalOverrides
        ?? (isMounted.value
          ? Math.max(0, ...maxMap.values())
          : 0)
    },
  }

  return context
}

export function createFixedClicks(
  route?: SlideRoute | undefined,
  currentInit: MaybeRefOrGetter<number> = 0,
): ClicksContext {
  const clicksStart = route?.meta.slide?.frontmatter.clicksStart ?? 0
  const clicks = ref(Math.max(toValue(currentInit), clicksStart))

  watch(() => toValue(currentInit), (value) => {
    clicks.value = Math.max(value, clicksStart)
  })

  return createClicksContextBase(
    clicks,
    clicksStart,
    route?.meta?.clicks,
  )
}
