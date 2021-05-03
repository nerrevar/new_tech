<template>
  <div class="wrapper">
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
    <div class="items">
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CustomSelect from '@/components/CustomSelect/index.vue'

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
  },
  setup () {
    const updateSort = (value: ESortValues) => {
      console.log(ESortValues[value])
    }

    return {
      ESortValues,
      updateSort,
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
</style>
