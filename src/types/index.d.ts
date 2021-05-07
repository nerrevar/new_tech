import { TSelectItem } from './CustomSelect'
import { TItem } from './Item'
import { TCategory } from './Category'

type TRequestConfig = {
  storeId: string,
  token: string,
  baseUrl: string,
  itemOnPage: number,
  currentPage: number,
}

export {
  TSelectItem,

  TRequestConfig,

  TItem,
  TCategory,
}
