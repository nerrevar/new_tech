<template>
  <div class="toolbox">
    <div class="toolbox__view">
      <SwitchableButton
        buttonType="img"
        :states="[
          {
            imgSrc: '/img/view_list.png',
            altText: 'Список',
          },
          {
            imgSrc: '/img/view_short.png',
            altText: 'Плитки',
          }
        ]"
        @stateSwitched="switchView($event)"
      />
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
import SwitchableButton from '@/components/SwitchableButton.vue'

export default defineComponent({
  name: 'ToolboxMain',
  components: {
    CustomSelect,
    SwitchableButton,
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

    const switchView = inject('switchView')

    return {
      updateSort,
      sortList,
      switchView,
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

  &__view
    display: flex
    margin: 0 0.3em

  &__sort
    display: flex
    margin: 0 0.3em

  &__filters
    display: flex
    margin: 0 0.3em
</style>
