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
type TFunctionParamsNumber = (index: number) => void
type TFunctionParamsStringBoolean = (s: string, b: boolean) => void
type TFunctionParamsFilterarr = (filters: TFilter[]) => void
type TFunctionParamsTItem = (item: TItem) => void

export {
  TSelectItem,
  TImgDescription,

  TGenericFunction,
  TFunctionParamsNumber,
  TFunctionParamsStringBoolean,
  TFunctionParamsFilterarr,
  TFunctionParamsTItem,

  TFilter,

  TRequestConfig,

  TItem,
  TCategory,
}
