<template>
  <div class="counter">
    <span
      :class="{
        'counter__button': minusEnabled,
        'counter__button_disabled': !minusEnabled,
      }"
      @click="changeCount('minus')"
    >
      -
    </span>
    <span class="counter__count">{{ count }}</span>
    <span
      :class="{
        'counter__button': plusEnabled,
        'counter__button_disabled': !plusEnabled,
      }"
      @click="changeCount('plus')"
    >
      +
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'ItemCounter',
  props: {
    count: {
      type: Number,
      required: true,
    },
    maxValue: {
      type: Number,
      required: false,
      default: Number.MAX_SAFE_INTEGER,
    }
  },
  setup (props, { emit }) {
    const minusEnabled = computed(() => props.count > 0)
    const plusEnabled = computed(() => props.count < props.maxValue)
    const changeCount = (target: string) => {
      if (target === 'minus') {
        if (minusEnabled.value)
          emit('changeCount', -1)
      }
      else {
        if (plusEnabled.value)
          emit('changeCount', 1)
      }
    }

    return {
      minusEnabled,
      plusEnabled,
      changeCount,
    }
  },
})
</script>

<style lang="sass" scoped>
.button
  background-color: lightgrey
  color: grey

  &_disabled
    background-color: lighten(lightgrey, 1)
    color: lightgrey
</style>
