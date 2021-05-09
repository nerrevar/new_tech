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

type TFilter = {
  displayName: string,
  name: string,
  value: boolean,
}

type TGenericFunction = () => void
type TFunctionParamsStringBoolean = (s: string, b: boolean) => void
type TFunctionParamsFilterarr = (filters: TFilter[]) => void

export {
  TSelectItem,
  TImgDescription,

  TGenericFunction,
  TFunctionParamsStringBoolean,
  TFunctionParamsFilterarr,

  TFilter,

  TRequestConfig,

  TItem,
  TCategory,
}
