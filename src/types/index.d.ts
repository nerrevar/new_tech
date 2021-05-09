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

type TImgDescription = {
  imgSrc: string,
  altText: string,
}

export {
  TSelectItem,
  TImgDescription,

  TRequestConfig,

  TItem,
  TCategory,
}
