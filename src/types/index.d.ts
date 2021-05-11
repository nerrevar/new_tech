import { TSelectItem } from './CustomSelect'
import { TItem, TItemOption } from './Item'
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

interface IOptionInCart {
  name: string,
  value: string,
}

interface IItemInCart {
  id: number,
  imageUrl: string,
  name: string,
  price: number,
  description: string,
  categoryIds: number[],
  categoryNames: string[],
  options: IOptionInCart[],
  count: number
}

interface IOption {
  [key: string]: Array<boolean>,
}

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
  TItemOption,
  TCategory,

  IItemInCart,
  IOptionInCart,
  IOption,
}
