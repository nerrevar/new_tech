<template>
  <ToolboxMain />
  <div
    :class="{
      'items': !short,
      'items_grid': short,
    }"
  >
    <ItemCard
      v-for="(item, index) in itemArr"
      :key="index"
      :item="item"
      :short="short"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onBeforeMount } from 'vue'
import { useStore } from '@/store'

import ItemCard from '@/components/ItemCard.vue'
import ToolboxMain from '@/components/ToolboxMain.vue'

export default defineComponent({
  name: 'MainView',
  components: {
    ItemCard,
    ToolboxMain,
  },
  setup () {
    const store = useStore()

    const short = computed(() => store.state.mainViewOptions.short)
    const itemArr = computed(() => store.state.mainViewOptions.items)

    onBeforeMount(() => store.dispatch('updateItems'))

    return {
      short,
      itemArr,
    }
  },
})
</script>

<style lang="sass" scoped>
.items, .items_grid
  padding: 0.5em
  display: flex

.items
  flex-flow: column nowrap

.items_grid
  flex-flow: row wrap
  justify-content: space-around
</style>
