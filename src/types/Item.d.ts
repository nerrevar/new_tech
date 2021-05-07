type TNameTranslated = {
  en?: string,
  ru?: string,
}

type TTax = {
  defaultLocationIncludedTaxRate: number,
  enabledManualTaxes: number[],
  taxable: boolean,
}

type TWhosalePrice = {
    quantity: number,
    price: number,
  }

type TShipping = {
  type: string,
  methodMarkup: number,
  flatRate: number,
  disabledMethods: string[],
  enabledMethods: string[],
}

type TDescriptionTranslated = {
  en: string,
  ru?: string,
}

type TImageDesciption = {
  id: string,
  isMain: boolean,
  orderBy: number,
  image160pxUrl: string,
  image400pxUrl: string,
  image800pxUrl: string,
  image1500pxUrl: string,
  imageOriginalUrl: string,
}

type TItemMedia = {
  images: TImageDesciption[],
}

type TCategory = {
  id: number,
  enabled: boolean,
}

type TFavorites = {
  count: number,
  displayedCount: string,
}

type TItemAttribute = {
  id: number,
  name: string,
  value: number,
  type: string,
  show: string,
}

type TRelatedCategory = {
  enabled: boolean,
  categoryId: number,
  productCount: number,
}

type TRelatedProducts = {
  productIds: number[],
  relatedCategory: TRelatedCategory
}

type TDimensions = {
  length: number,
  width: number,
  height: number,
}

type TItem = {
  id: number,
  sku: string,
  thumbnailUrl: string,
  quantity: number,
  unlimited: boolean,
  inStock: boolean,
  name: string,
  nameTranslated: TNameTranslated,
  price: number,
  defaultDisplayedPrice: number,
  defaultDisplayedPriceFormatted: string,
  tax: TTax,
  wholesalePrices: Array<TWhosalePrice>,
  compareToPrice: number,
  compareToPriceFormatted: string,
  compareToPriceDiscount: number,
  compareToPriceDiscountFormatted: number,
  compareToPriceDiscountPercent: number,
  compareToPriceDiscountPercentFormatted: string,
  isShippingRequired: boolean,
  weight: number,
  url: string,
  created: string,
  updated: string,
  createTimestamp: number,
  updateTimestamp: number,
  productClassId: number,
  enabled: boolean,
  options: Array,
  warningLimit: number,
  fixedShippingRateOnly: boolean,
  fixedShippingRate: number,
  shipping: TShipping,
  defaultCombinationId: number,
  description: string,
  descriptionTranslated: TDescriptionTranslated,
  media: TItemMedia,
  categoryIds: number[],
  categories: TCategory[],
  seoTitle: string,
  seoDescription: string,
  defaultCategoryId: number,
  favorites: TFavorites,
  attributes: TItemAttribute[],
  files: Array,
  relatedProducts: TRelatedProducts,
  combinations: Array,
  dimensions: TDimensions,
  showOnFrontpage: number,
  isSampleProduct: boolean,
}

export { TItem }
