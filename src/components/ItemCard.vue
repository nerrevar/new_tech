<template>
  <div
    :class="{
      item: !short,
      item_short: short,
    }"
  >
    <img
      class="item__image"
      :src="item.imageUrl"
      alt="item"
    />
    <div class="item__text">
      <span class="item__name">{{ item.name }}</span>
      <span class="item__price">{{ item.defaultDisplayedPriceFormatted }}</span>
      <span
        :class="{
          item__description: !short,
          item__description_short: short,
        }"
      >
        {{ description }}
      </span>
    </div>
    <div
      class="item__categories"
      v-if="categoryNames.length !== 0"
    >
      <span
        class="item__categories-card"
        v-for="(category, index) in categoryNames"
        :key="index"
      >
        {{ category }}
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
    categoryNames: {
      type: Array as () => Array<string>,
      required: true,
    }
  },
  setup (props) {
    const description: string = props.item.description
      .replaceAll(/\\[nt]/gi, '')
      .replaceAll(/<([^>]+)>/gi, '')

    return {
      description,
    }
  }
})
</script>

<style lang="sass" scoped>
.item
  display: flex
  flex: 1 0
  flex-flow: row nowrap

  box-shadow: 1px 1px 5px 5px lightgrey
  cursor: pointer

  &__image
    max-width: calc(300px - 0.2em)

  &__text
    display: flex
    flex: 1 0
    flex-flow: column nowrap

  &__name
    font-weight: 600
    padding: 0.5em 0

  &__price
    font-weight: 800
    padding: 1em 0

  &__description_short
    display: flex
    flex: 1 0 4em
    line-height: 1em
    overflow: hidden
    font-size: 0.7em

  &__categories
    display: flex
    flex: 1 0
    flex-flow: row nowrap
    margin: 0 -0.2em

  &__categories-card
    margin: 0.2em
    padding: 0.3em 1em
    border-radius: 1em
    background-color: lightblue

.item_short
  display: flex
  flex: 0 0
  flex-flow: column nowrap
  max-width: 300px
  margin: 1em

  padding: 0.3em
  box-shadow: 1px 1px 5px 5px lightgrey
  cursor: pointer
</style>
