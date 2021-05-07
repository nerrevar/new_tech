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
      :categoryNames="getCategoryNames(item.categoryIds)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, readonly, provide } from 'vue'

import { TCategory, TItem } from '@/types/index'

import { itemRequest, categoryRequest, SortValues } from '@/utils/index'

import ItemCard from '@/components/ItemCard.vue'
import ToolboxMain from '@/components/ToolboxMain.vue'

export default defineComponent({
  name: 'MainView',
  components: {
    ItemCard,
    ToolboxMain,
  },
  async setup () {
    const sortValue = ref<number>(SortValues.PRICE_ASC)
    const updateSort = async (value: number) => {
      sortValue.value = value
      itemArr.value = await itemRequest(sortValue.value)
    }
    provide('sortValue', readonly(sortValue))
    provide('updateSort', updateSort)

    const itemArr = ref<TItem[]>(await itemRequest(sortValue.value))

    const categoryArr = ref<TCategory[]>(await categoryRequest())

    const short = ref<boolean>(true)

    const getCategoryNames = (idArr: number[]): string[] => {
      const categoryNames: string[] = []
      categoryArr.value.filter(
        (c: TCategory) => idArr.indexOf(c.id) !== -1
      ).map(
        (c: TCategory) => categoryNames.push(c.name)
      )
      return categoryNames
    }

    return {
      short,
      itemArr,
      getCategoryNames,
    }
  },
})
</script>

<style lang="sass" scoped>
.items
  padding: 0.5em
  display: flex
  flex-flow: column nowrap

.items_grid
  padding: 0.5em
  display: flex
  flex-flow: row wrap
  justify-content: space-around
  align-items: stretch
</style>
