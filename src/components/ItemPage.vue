<template>
  <div class="item">
    <div class="item-img-carousel">
      <img
        class="item-img-carousel__img"
        v-for="(url, index) in itemImageUrls"
        :key="index"
        :src="url"
        alt="image"
      />
    </div>
    <span class="item__name">{{ item.name }}</span>
    <span class="item__price">{{ item.defaultDisplayedPriceFormatted }}</span>
    <span class="item__description" v-html="item.description" /> <!--May be not secure-->
    <h3>Параметры</h3>
    <span class="item__weight"><b>Вес</b> {{ item.weight || "Не указан" }}</span>
    <div
      class="item__options"
      v-if="item.options.length !== 0"
    >
      <div
        class="item-options__option"
        v-for="(option, index) in item.options"
        :key="index"
      >
        <div class="item-option__title">{{ option.name }}</div>
        <div class="item-option__choices">
          <span
            v-for="(choice, chIndex) in option.choices"
            :key="chIndex"
            :class="{
              'item-option__choice': !options[index][chIndex],
              'item-option__choice_selected': options[index][chIndex],
            }"
            @click="selectChoice(index, chIndex)"
          >
            {{ choice.text }}
          </span>
        </div>
      </div>
    </div>
    <span
      class="item__options"
      v-else
    >
      Товар не доступен
    </span>
    <div
      class="button"
      @click="addToCart"
    >
      В корзину
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useStore } from '@/store'

import { TItem, IOptionInCart } from '@/types'

import { singleItemRequest } from '@/utils'

export default defineComponent({
  name: 'ItemView',
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  async setup (props) {
    const store = useStore()

    let item = ref<TItem>(await singleItemRequest(props.id))

    const itemImageUrls = ref([item.value.imageUrl])
    for (let imageDescription of item.value.galleryImages)
      itemImageUrls.value.push(imageDescription.imageUrl)

    const options = reactive<boolean[][]>(item.value.options.map(option =>
      new Array(option.choices.length).fill(false) as Array<boolean>
    ))
    const selectChoice = (optionIndex: number, choiceIndex: number) => {
      options[optionIndex].fill(false)
      options[optionIndex][choiceIndex] = true
    }

    const addToCart = () => {
      const itemOptions: IOptionInCart[] = []
      for (let optionIndex in options) {
        let choiceIndex = options[optionIndex].indexOf(true)
        if (choiceIndex === -1) {
          alert(`Пожалуйста, выберите параметр ${item.value.options[optionIndex].name}`)
          return
        }
        else
          itemOptions.push({
            name: item.value.options[optionIndex].name,
            value: item.value.options[optionIndex].choices[choiceIndex].text,
          })
      }
      store.commit('addToCart', {
        id: item.value.id,
        imageUrl: item.value.imageUrl,
        name: item.value.name,
        price: item.value.price,
        description: item.value.description,
        categoryIds: item.value.categoryIds,
        categoryNames: item.value.categoryIds.map((id: number): string => store.state.categories[id]),
        options: itemOptions,
        count: 1,
      })
    }

    return {
      item,
      itemImageUrls,
      options,
      selectChoice,
      addToCart,
    }
  },
})
</script>

<style lang="sass" scoped>
.item
  display: flex
  flex-flow: column nowrap
  padding: 1em

  & > *
    padding: 0.5em

  &__name, &__price
    font-weight: 600

  &-option
    &__title
      font-weight: 600

    &__choices
      padding: 0.5em 0

    &__choice
      margin: 0 0.5em
      padding: 0.5em
      border: 1px solid grey

      &:hover
        background-color: rgba(200, 150, 150, 0.7)

    &__choice_selected
      margin: 0 0.5em
      padding: 0.5em
      border: 1px solid grey
      background-color: rgba(200, 180, 150, 1)

.item-img-carousel
  margin: auto
  max-width: calc(100vw - 2em)
  max-height: 60vh
  overflow-x: auto
  display: flex
  flex-wrap: nowrap

  padding: 0

  &__img
    max-height: calc(60vh - 2em)
    margin: auto

    padding: 0.5em

.button
  padding: 1em
  background-color: red
  align-self: flex-start
  cursor: pointer
</style>
