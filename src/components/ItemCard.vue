<template>
  <div
    :class="{
      item: !short,
      item_short: short,
    }"
    @click="router.push(`/product/${item.id}`)"
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
        v-if="inCart"
        :count="item.count"
        @changeCount="changeCount($event)"
      />
      <div
        class="button_orange"
        v-else
        @click.stop="addToCart"
        :style="{
          'max-width': short ? 'auto' : '300px',
        }"
      >
        Купить
      </div>
    </div>
    <div
      class="item__delete"
      v-if="inCart"
      @click.stop="removeFromCart"
    >
      X
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, toRef } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '@/store'

import { TItem, IItemInCart } from '@/types'

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
    inCart: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  setup (props) {
    const store = useStore()
    const router = useRouter()

    const thisItem: TItem | IItemInCart = toRef(props, 'item')

    const description: string = thisItem.value.description
      .replaceAll(/\\[nt]/gi, '')
      .replaceAll(/<([^>]+)>/gi, '')

    const categories = computed(() => store.state.categories)

    const addToCart = () => store.commit('addToCart', {
      id: thisItem.value.id,
      imageUrl: thisItem.value.imageUrl,
      name: thisItem.value.name,
      price: thisItem.value.price,
      description: thisItem.value.description,
      categoryIds: thisItem.value.categoryIds,
      categoryNames: thisItem.value.categoryIds.map((id: number): string => store.state.categories[id]),
      options: [],
      count: 1,
    })

    const changeCount = (count: number) => store.commit('changeCount', { itemId: thisItem.value.id, count: count })
    const removeFromCart = () => store.commit('removeFromCart', thisItem.value.id)

    return {
      thisItem,
      router,
      description,
      categories,
      addToCart,
      changeCount,
      removeFromCart,
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

  &__delete
    padding: 0.4em
    background-color: darken(white, 3)
    display: flex
    align-items: center

    &:hover
      background-color: darken(white, 6)

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

.button_orange
  padding: 0.5em
  background-color: orange
  text-align: center
</style>
