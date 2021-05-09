<template>
  <div
    class="button"
    @click="switchButton"
    :style="{
      'background-color': backgroundColor,
      'color': fontColor,
    }"
  >
    <img
      v-if="buttonType === 'img'"
      :src="stateArr[state].imgSrc"
      :alt="stateArr[state].altText"
    />
    <span
      v-else
    >
      {{ stateArr[state] }}
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRef } from 'vue'

import { TImgDescription } from '@/types/index'

export default defineComponent({
  name: 'SwitchableButton',
  props: {
    buttonType: {
      type: String,
      required: true,
      validator: (val: string) => val === 'img' || val === 'text',
    },
    states: {
      type: Array as () => TImgDescription[] | string[],
      required: true,
    },
    backgroundColor: {
      type: String,
      required: false,
      default: '#F3E5F5',
    },
    fontColor: {
      type: String,
      required: false,
      default: 'black',
    },
  },
  setup (props, { emit }) {
    const stateArr = toRef(props, 'states')
    const fixSrc = (state: TImgDescription): TImgDescription => {
      state.imgSrc = state.imgSrc.replace('@', '..')
      return state
    }
    if (props.buttonType === 'img') {
      for (let state of stateArr.value as TImgDescription[])
        state = fixSrc(state)
    }

    const state = ref<number>(0)
    const switchButton = () => {
      state.value = state.value === 0 ? 1 : 0
      emit('stateSwitched', state.value)
    }

    return {
      state,
      stateArr,
      switchButton,
    }
  },
})
</script>

<style lang="sass" scoped>
.button

  & > *
    color: inherit

  & > img
    width: 2em
    height: 2em
    object-fit: fill
</style>
