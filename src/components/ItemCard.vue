<template>
  <router-link
    :class="{
      item: !short,
      item_short: short,
    }"
    :to="`/product/${item.id}`"
  >
    <img
      class="item__image"
      :src="item.imageUrl"
      alt="item"
    />
    <div class="item__text">
      <span class="item__name">{{ item.name }}</span>
      <span class="item__price">{{ item.price }} руб</span>
      <span
        :class="{
          item__description: !short,
          item__description_short: short,
        }"
      >
        {{ description }}
      </span>
      <div
        class="item__categories"
        v-if="item.categoryIds.length !== 0"
      >
        <span
          class="item__categories-card"
          v-for="(categoryId, index) in item.categoryIds"
          :key="index"
        >
          {{ categories[categoryId] }}
        </span>
      </div>
      <ChangableCounter
        class="item__count"
        v-if="countEnabled"
        :count="itemCount"
        @changeCount="$emit('changeCount', $event)"
      />
    </div>
  </router-link>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'

import { TItem, IItemInCart } from '@/types/index'

import ChangableCounter from '@/components/ChangableCounter.vue'

export default defineComponent({
  name: 'Item',
  components: {
    ChangableCounter,
  },
  props: {
    short: {
      type: Boolean,
      required: true,
    },
    item: {
      type: Object as () => TItem | IItemInCart,
      required: true,
    },
    countEnabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    itemCount: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  setup (props) {
    const store = useStore()

    const description: string = props.item.description
      .replaceAll(/\\[nt]/gi, '')
      .replaceAll(/<([^>]+)>/gi, '')

    const categories = computed(() => store.state.categories)

    return {
      description,
      categories,
    }
  },
})
</script>

<style lang="sass" scoped>
.item
  display: flex
  flex: 1 0
  flex-flow: row nowrap
  margin-bottom: 1em

  text-decoration: none
  color: black
  box-shadow: 1px 1px 5px 5px lightgrey
  cursor: pointer

  &__image
    max-width: calc(300px - 0.2em)

  &__text
    display: flex
    flex: 1 0
    flex-flow: column nowrap
    justify-content: space-around

    padding: 0.3em

  &__name
    font-weight: 600
    padding: 0.5em 0

  &__price
    font-weight: 800
    padding: 1em 0

  &__description, &__description_short
    color: grey

  &__description_short
    display: flex
    flex: 1 0 4em
    line-height: 1em
    overflow: hidden
    font-size: 0.7em

  &__categories
    display: flex
    flex: 0 0
    flex-flow: row nowrap
    margin: 0 -0.2em

  &__categories-card
    margin: 0.2em
    padding: 0.3em 1em
    border-radius: 1em
    background-color: lightblue
    height: 1.8em

.item_short
  display: flex
  flex: 0 0
  flex-flow: column nowrap
  max-width: 300px
  margin: 1em auto 1em 1em

  text-decoration: none
  color: black
  padding: 0.3em
  box-shadow: 1px 1px 5px 5px lightgrey
  cursor: pointer
</style>
