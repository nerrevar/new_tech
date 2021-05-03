<template>
  <div class="select-option">
    <img
      :class="'select-option__img'"
      v-if="selectType === 'image' || selectType === 'textWithImage'"
      :src="item.imgSrc"
      alt="&nbsp;"
    />
    <div
      class="select-option__text"
      v-if="selectType === 'text' || selectType === 'textWithImage'"
    >
      {{ item.text }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { TItem } from '@/types/index'

export default defineComponent({
  name: 'SelectOption',
  props: {
    item: {
      type: Object as () => TItem,
      required: true,
    },
    selectType: {
      type: String,
      required: true,
    },
  },
})
</script>

<style lang="sass" scoped>
.select-option
  display: flex
  flex: 1 0
  flex-flow: row nowrap

  background-color: inherit
  padding: 0.5em

  &__img
    width: 1em
    height: 1em
    object-fit: fill
</style>
