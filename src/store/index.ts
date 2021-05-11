import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'

import { State, ICategory, IFilter, IItemInCart, TItem, TCategory } from '@/types'

import { itemRequest, singleItemRequest, categoryRequest } from '@/utils'

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
      if (state.cart.filter((i: IItemInCart) => i.id === item.id).length === 0)
        state.cart.push(item)
      else
        state.cart.filter((i: IItemInCart) => i.id === item.id)[0].count += item.count
      state.countInCart += item.count
    },
    removeFromCart (state: State, id: number) {
      const index = state.cart.findIndex((item: IItemInCart) => item.id === id)
      state.countInCart -= state.cart[index].count
      state.cart.splice(index, 1)
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
    },
    switchView (state: State) {
      state.mainViewOptions.short = !state.mainViewOptions.short
    },
    applyFilters (state: State, filters: IFilter[]) {
      state.mainViewOptions.filters = filters
    },
    setFiltersOpened (state: State, value: boolean) {
      state.mainViewOptions.filtersOpened = value
    },
    updateItemViewItem (state: State, item: TItem) {
      state.itemViewItem = item
    },
    changeCount (state: State, payload: { itemId: number, count: number }) {
      state.cart.filter((item: IItemInCart) => item.id === payload.itemId)[0].count += payload.count
      state.countInCart += payload.count
    },
    clearCart (state: State) {
      state.cart = []
      state.countInCart = 0
    },
  },
  actions: {
    updateSort ({ commit, dispatch }, value: number) {
      commit('updateSort', value)
      dispatch('updateItems')
    },
    applyFilters ({ commit, dispatch }, filters: IFilter[]) {
      commit('applyFilters', filters)
      dispatch('updateItems')
    },
    async updateItems ({ commit, state }) {
      const items: TItem[] = await itemRequest(state.mainViewOptions.sortValue, state.mainViewOptions.filters)
      commit('updateItems', items)

      const categories: TCategory[] = await categoryRequest()
      const newCategories: ICategory = {}
      categories.forEach((c: TCategory) => newCategories[c.id] = c.name)
      commit('updateCategories', newCategories)
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
