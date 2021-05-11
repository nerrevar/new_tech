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
      :countEnabled="true"
    />
  </div>
  <span
    v-else
  >
    Корзина пуста
  </span>
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

    return {
      cart,
    }
  },
})
</script>
