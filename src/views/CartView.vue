<template>
  <div
    class="items"
    v-if="cart.length !== 0"
  >
    <ItemCard
      class="item"
      v-for="(item, index) in cart"
      :key="index"
      :item="item"
      :short="false"
      :inCart="true"
    />
  </div>
  <span
    v-else
  >
    Корзина пуста
  </span>
  <div
    class="button"
    v-if="cart.length !== 0"
    @click="buy"
  >
    Оформить заказ
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'

import ItemCard from '@/components/ItemCard.vue'

export default defineComponent({
  name: 'Cart',
  components: {
    ItemCard,
  },
  setup () {
    const store = useStore()

    const cart = computed(() => store.state.cart)

    const buy = () => {
      alert(`Поздравляем! Вы купили ${store.state.countInCart} товар(а)!!!`)
      store.commit('clearCart')
    }

    return {
      cart,
      buy,
    }
  },
})
</script>

<style lang="sass" scoped>
*
  margin: 0.3em

.button
  padding: 0.5em
  background-color: orange
  max-width: 300px
</style>
