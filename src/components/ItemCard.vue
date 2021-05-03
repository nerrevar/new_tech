<template>
  <div
    :class="{
      item: !short,
      item_short: short,
    }"
  >
    <img
      class="item__image"
      :src="item.imgSrc"
      alt="item"
    />
    <div class="item__text">
      <span class="item__name">{{ item.name }}</span>
      <span class="item__price">{{ item.price }}</span>
      <span
        :class="{
          item__description: !short,
          item__description_short: short,
        }"
      >
        {{ item.description }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { TItem } from '@/types/index'

export default defineComponent({
  name: 'Item',
  props: {
    short: {
      type: Boolean,
      required: true,
    },
    item: {
      type: Object as () => TItem,
      required: true,
    },
  },
})
</script>

<style lang="sass" scoped>
.item
  display: flex
  flex: 1 0
  flex-flow: row nowrap

  box-shadow: 1px 1px 5px 5px lightgrey

  &__image
    padding: 0.1em
    max-width: calc(300px - 0.2em)

  &__text
    display: flex
    flex: 1 0
    flex-flow: column nowrap

    padding: 0.5em

  &__name
    font-weight: 600
    padding-bottom: 0.5em

  &__price
    font-weight: 800
    padding: 1em 0

  &__description_short
    line-height: 1.4em
    height: 2.8em

.item_short
  display: flex
  flex: 0 0
  flex-flow: column nowrap
  max-width: 300px

  box-shadow: 1px 1px 5px 5px lightgrey
</style>
