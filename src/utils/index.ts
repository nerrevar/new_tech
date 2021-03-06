import { reactive } from 'vue'

import { IFilter, TCategory, TItem, TRequestConfig } from '@/types'

const storeId = '58958138'

const requestConfig = reactive<TRequestConfig>({
  storeId: storeId,
  token: 'public_7BxbJGWyDaZfSQqjVS5Ftr4jzXkS43UD',
  baseUrl: `https://app.ecwid.com/api/v3/${storeId}`,
  itemOnPage: 20,
  currentPage: 0,
})

const itemRequest = async (sortValue: number, filters: IFilter[]): Promise<TItem[]> => {
  let request = `${
    requestConfig.baseUrl
  }/products?limit=${
    requestConfig.itemOnPage
  }&offset=${
    requestConfig.currentPage * requestConfig.itemOnPage
  }&sortBy=${
    Object.keys(SortValues)[sortValue]
  }&token=${
    requestConfig.token
  }`
  for (let filter of filters)
    if (filter.value)
      request += `&${filter.name}=${filter.value}`
  return fetch(
    request
  ).then(
    r => r.json()
  ).then(
    r => r.items
  )
}

const singleItemRequest = async (id: string): Promise<TItem> => {
  return fetch(
    `${requestConfig.baseUrl}/products/${id}?token=${requestConfig.token}`
  ).then(
    r => r.json()
  )
}

const categoryRequest = async ():Promise<TCategory[]> => {
  return fetch(
    `${requestConfig.baseUrl}/categories?token=${requestConfig.token}`
  ).then(
    r => r.json()
  ).then(
    r => r.items
  )
}

const SortValues = {
  RELEVANCE: 0,
  DEFINED_BY_STORE_OWNER: 1,
  ADDED_TIME_DESC: 2,
  ADDED_TIME_ASC: 3,
  NAME_ASC: 4,
  NAME_DESC: 5,
  PRICE_ASC: 6,
  PRICE_DESC: 7,
  UPDATED_TIME_ASC: 8,
  UPDATED_TIME_DESC: 9,
}

export { categoryRequest, itemRequest, singleItemRequest, requestConfig, SortValues }
