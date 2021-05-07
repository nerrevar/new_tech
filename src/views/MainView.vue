<template>
  <div class="toolbox">
    <div class="toolbox__view">
    </div>
    <div class="toolbox__filters">
    </div>
    <div class="toolbox__sort">
      <CustomSelect
        :itemList="[
          { text: '&#129041;  Цена', propValue: ESortValues.priceAsc },
          { text: '&#129043;  Цена', propValue: ESortValues.priceDesc },
          { text: '&#129041;  Рейтинг', propValue: ESortValues.ratingAsc },
          { text: '&#129043;  Рейтинг', propValue: ESortValues.ratingDesc },
        ]"
        @itemSelected="updateSort($event)"
      />
    </div>
  </div>
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
import { defineComponent, ref } from 'vue'
import CustomSelect from '@/components/CustomSelect/index.vue'
import ItemCard from '@/components/ItemCard.vue'

import { itemRequest, categoryRequest } from '@/utils/index'

import { TCategory, TItem } from '@/types/index'

enum ESortValues {
  priceAsc,
  priceDesc,
  ratingAsc,
  ratingDesc,
}

export default defineComponent({
  name: 'MainView',
  components: {
    CustomSelect,
    ItemCard,
  },
  async setup () {
    const updateSort = (value: ESortValues) => {
      console.log(ESortValues[value])
    }

    const itemArr = ref<TItem[]>(await itemRequest())

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
      ESortValues,
      updateSort,
      short,
      itemArr,
      getCategoryNames,
    }
  },
})
</script>

<style lang="sass" scoped>
.toolbox
  margin: 1rem 0
  padding: 0.25rem
  width: 100%
  display: flex
  flex: 1 1
  flex-flow: row-reverse nowrap
  background-color: #64B5F6

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
