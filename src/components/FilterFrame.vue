<template>
  <teleport to="body">
    <div
      class="overlay"
      @click="closeFilters"
    />
    <div class="frame">
      <div class="filters">
        <div
          class="filters-item"
          v-for="(filter, index) in filters"
          :key="index"
        >
          <span
            class="filters-item__name"
          >
            {{ filter.displayName }}
          </span>
          <input
            class="filters-item__value"
            type="checkbox"
            v-model="filter.value"
          />
        </div>
      </div>
      <div
        class="button-group"
      >
        <div
          class="button button_red"
          @click="applyFilters"
        >
          Применить
        </div>
        <div
          class="button button_grey"
          @click="closeFilters"
        >
          Отмена
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, inject, reactive } from 'vue'

import { TFilter, TGenericFunction, TFunctionParamsFilterarr } from '@/types/index'

export default defineComponent({
  name: 'FilterFrame',
  setup () {
    const filters = reactive<TFilter[]>(Object.assign([], inject<TFilter[]>('filters', [])))
    const globalApplyFilters: TFunctionParamsFilterarr = inject('applyFilters', () => null)
    const applyFilters = () => {
      closeFilters()
      globalApplyFilters(filters)
    }
    const closeFilters: TGenericFunction = inject('closeFilters', () => null)

    return {
      filters,
      applyFilters,
      closeFilters,
    }
  },
})
</script>

<style lang="sass" scoped>
.overlay
  position: fixed
  top: 0
  right: 0
  bottom: 0
  left: 0

  background-color: rgba(0.5, 0.5, 0.5, 0.7)

.frame
  position: fixed
  top: calc(50vh - 400px)
  right: calc(50vw - 200px)
  bottom: calc(50vh - 400px)
  left: calc(50vw - 200px)
  min-width: 300px
  min-height: 600px
  display: flex
  flex-flow: column nowrap
  justify-content: space-between

  background: white
  box-shadow: 1px 1px 5px 5px lightgrey

.filters
  display: flex
  flex: 1 0
  flex-flow: column nowrap
  justify-content: flex-start

  &-item
    display: flex
    flex: 0 0
    flex-flow: row nowrap
    justify-content: space-between

    padding: 1em

.button-group
  display: flex
  flex: 0 0
  flex-flow: row nowrap
  justify-content: space-around

.button
  flex: 1 0
  padding: 1em

  &_red
    background-color: red

  &_grey
    background-color: lightgrey
</style>
