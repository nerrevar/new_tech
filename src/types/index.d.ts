import { TSelectItem } from './CustomSelect'
import { TItem, TItemOption } from './Item'
import { TCategory } from './Category'
import {
  State,
  IFilter,
  ICategory,
  IItemInCart,
  IOptionInCart,
  IOption,
} from './State'

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
  State,
  IFilter,
  ICategory,
  IItemInCart,
  IOptionInCart,
  IOption,

  TSelectItem,
  TImgDescription,

  TRequestConfig,

  TItem,
  TItemOption,
  TCategory,
}
