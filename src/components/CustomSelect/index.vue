<template>
  <div
    class="select"
    @click="opened = !opened"
    :style="{
      'background-color': backgroundColor || '#F3E5F5',
      'color': fontColor || 'black',
      'width': selectWidth,
    }"
  >
    <SelectOption
      :item="selectedItem"
      :selectType="selectType"
    />
    <div
      class="select__list"
      v-show="opened"
      :style="{
        'background-color': backgroundColorSecondary || backgroundColor || '#F8BBD0',
        'color': fontColorSecondary || fontColor || 'black',
        'width': selectWidth,
      }"
    >
      <SelectOption
        class="select__list-option_hoverable"
        v-for="(item, index) in itemList"
        :key="index"
        :item="item"
        :selectType="selectType"
        @click="setSelected(item)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import SelectOption from './SelectOption.vue'

import { TSelectItem } from '@/types/index'

export default defineComponent({
  name: 'CustomSelect',
  components: { SelectOption },
  props: {
    defaultIndex: {
      type: Number,
      required: false,
    },
    itemList: {
      type: Array as () => Array<TSelectItem>,
      required: true,
    },
    width: {
      type: String,
      required: false,
    },
    backgroundColor: {
      type: String,
      required: false,
    },
    backgroundColorSecondary: {
      type: String,
      required: false,
    },
    fontColor: {
      type: String,
      required: false,
    },
    fontColorSecondary: {
      type: String,
      required: false,
    },
    selectType: {
      type: String,
      required: false,
      validator: (value: string) => {
        return ['text', 'image', 'textWithImage'].indexOf(value) !== -1
      },
      default: 'text',
    },
  },
  setup (props, { emit }) {
    const getWidth = () => {
      if (props.width !== undefined)
        return props.width
      else
        switch (props.selectType) {
          case 'image': return '3em' // 1 for image, 2 for arrow
          case 'text': {
            let length = 0
            for (let item of props.itemList)
              if (item.text !== undefined)
                if (item.text.length > length)
                  length = item.text.length
            return `${length * 0.75 + 2}em` // text + arrow
          }
          case 'textWithImage': {
            let length = 0
            for (let item of props.itemList)
              if (item.text !== undefined)
                if (item.text.length > length)
                  length = item.text.length
            return `${1 + length * 0.75 + 2}em` // image + text + arrow
          }
        }
    }
    const initSelectedItem = () => props.defaultIndex ? props.itemList[props.defaultIndex] : props.itemList[0]

    let opened = ref<boolean>(false)
    const selectedItem = ref<TSelectItem>(initSelectedItem())
    const selectWidth = getWidth()

    const setSelected = (item: TSelectItem) => {
      opened = ref<boolean>(false) // костыль, opened.value не реактивно
      selectedItem.value = item
      emit('itemSelected', item.propValue)
    }

    return {
      opened,
      selectWidth,
      selectedItem,
      setSelected,
    }
  },
})
</script>

<style lang="sass" scoped>
.select
  cursor: pointer
  display: flex
  flex-flow: row nowrap
  justify-content: space-between

  &:after
    content: "\2B9F"
    font-weight: 100
    padding: 0.25em
    width: 1.5em

  &__list
    position: absolute
    margin-top: 2.4em
    padding: 0.5em 0

  &__list-option_hoverable:hover
    filter: brightness(90%)
</style>
