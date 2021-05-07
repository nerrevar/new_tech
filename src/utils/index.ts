import { reactive } from 'vue'

import { TCategory, TItem, TRequestConfig } from '@/types/index'

const storeId = '58958138'

const requestConfig = reactive<TRequestConfig>({
  storeId: storeId,
  token: 'public_7BxbJGWyDaZfSQqjVS5Ftr4jzXkS43UD',
  baseUrl: `https://app.ecwid.com/api/v3/${storeId}`,
  itemOnPage: 20,
  currentPage: 0,
})

const itemRequest = async (): Promise<TItem[]> => {
  return fetch(
    `${
      requestConfig.baseUrl
    }/products?limit=${
      requestConfig.itemOnPage
    }&offset=${
      requestConfig.currentPage * requestConfig.itemOnPage
    }&token=${
      requestConfig.token
    }`
  ).then(
    r => r.json()
  ).then(
    r => r.items
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

export { categoryRequest, itemRequest, requestConfig }
