import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'

import { IItemInCart, TItem } from '@/types'

import { itemRequest, singleItemRequest } from '@/utils'

type TFilterType = 'boolean' | 'radio' | 'multiple'

export interface IFilter {
  displayName: string
  name: string,
  type: TFilterType,
  value: boolean | string | string[],
}

interface ICategory {
  [key: number]: string // id: name
}

export interface State {
  cart: IItemInCart[],
  countInCart: number,
  categories: ICategory,
  mainViewOptions: {
    sortValue: number,
    short: boolean,
    filters: IFilter[],
    items: TItem[],
    filtersOpened: boolean,
  },
  itemViewItem: TItem,
}

export const key: InjectionKey<Store<State>> = Symbol('VuexStore')

export const store = createStore<State>({
  state: {
    cart: [],
    countInCart: 0,
    categories: {},
    mainViewOptions: {
      sortValue: 0,
      short: false,
      filters: [
        {
          displayName: 'На складе',
          name: 'inStock',
          type: 'boolean',
          value: false,
        }
      ],
      items: [],
      filtersOpened: false,
    },
    itemViewItem: {} as TItem,
  },
  mutations: {
    addToCart (state: State, item: IItemInCart) {
      state.cart.push(item)
      state.countInCart += item.count
    },
    updateItems (state: State, items: TItem[]) {
      state.mainViewOptions.items = items
    },
    addItems (state: State, items: TItem[]) {
      state.mainViewOptions.items.concat(items)
    },
    updateCategories (state: State, categories: ICategory) {
      state.categories = Object.assign({}, state.categories, categories)
    },
    updateSort (state: State, value: number) {
      state.mainViewOptions.sortValue = value
      // invokeUpdate
    },
    switchView (state: State) {
      state.mainViewOptions.short = !state.mainViewOptions.short
      // invokeUpdate
    },
    applyFilters (state: State, filters: IFilter[]) {
      state.mainViewOptions.filters = filters
      // invokeUpdate
    },
    setFiltersOpened (state: State, value: boolean) {
      state.mainViewOptions.filtersOpened = value
    },
    updateItemViewItem (state: State, item: TItem) {
      state.itemViewItem = item
    },
  },
  actions: {
    async updateItems ({ commit, state }) {
      const items: TItem[] = await itemRequest(state.mainViewOptions.sortValue, state.mainViewOptions.filters)
      commit('updateItems', items)
    },
    async updateItemViewItem ({ commit }, id: string) {
      const item: TItem = await singleItemRequest(id)
      commit('updateItemViewItem', item)
    },
  },
})

export function useStore () {
  return baseUseStore(key)
}
