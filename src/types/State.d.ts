

type TFilterType = 'boolean' | 'radio' | 'multiple'

interface IFilter {
  displayName: string
  name: string,
  type: TFilterType,
  value: boolean | string | string[],
}

interface ICategory {
  [key: number]: string // id: name
}

interface State {
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

export default {
  State,
  IFilter,
  ICategory,
  IItemInCart,
  IOptionInCart,
  IOption,
}
