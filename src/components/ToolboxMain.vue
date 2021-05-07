<template>
  <div class="toolbox">
    <div class="toolbox__view">
    </div>
    <div class="toolbox__filters">
    </div>
    <div class="toolbox__sort">
      <CustomSelect
        :itemList="sortList"
        @itemSelected="updateSort($event)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'

import { SortValues } from '@/utils/index'

import CustomSelect from '@/components/CustomSelect/index.vue'

export default defineComponent({
  name: 'ToolboxMain',
  components: {
    CustomSelect,
  },
  setup () {
    const updateSort = inject('updateSort')

    const sortList = [
      { text: 'Лучшее совпадение', propValue: SortValues.RELEVANCE },
      { text: '\u{1F813}  Название', propValue: SortValues.NAME_ASC },
      { text: '\u{1F811}  Название', propValue: SortValues.NAME_DESC },
      { text: '\u{1F813}  Цена', propValue: SortValues.PRICE_ASC },
      { text: '\u{1F811}  Цена', propValue: SortValues.PRICE_DESC }
    ]

    return {
      updateSort,
      sortList,
    }
  },
})
</script>

<style lang="sass" scoped>
.toolbox
  padding: 0.25rem
  width: 100%
  display: flex
  flex: 1 1
  flex-flow: row-reverse nowrap
  background-color: #64B5F6
</style>
