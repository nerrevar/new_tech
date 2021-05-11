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
  relatedCategory: TRelatedCategory,
}

type TDimensions = {
  length: number,
  width: number,
  height: number,
}

type TOptionChoice = {
  text: string,
  textTranslated: TNameTranslated,
  priceModifier: number,
  priceModifierType: string,
}

type TItemOption = {
  type: string,
  name: string,
  nameTranslated: TNameTranslated,
  choices: TOptionChoice[],
  defaultChoice: number,
  required: boolean,
}

type TOriginalImage = {
  url: string,
  width: number,
  height: number,
}

type TColor = {
  red: number,
  green: number,
  blue: number,
  alpha: number,
}

type TBorderInfo = {
  dominatingColor: TColor,
  homogeneity: boolean,
}

type TImage = {
  id: number,
  url: string,
  thumbnail: string,
  originalImageUrl: string,
  imageUrl: string,
  hdThumbnailUrl: string,
  thumbnailUrl: string,
  smallThumbnailUrl: string,
  width: number,
  height: number,
  orderBy: number,
  borderInfo: TBorderInfo,
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
  priceInProductList: number,
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
  options: TItemOption[],
  warningLimit: number,
  fixedShippingRateOnly: boolean,
  fixedShippingRate: number,
  shipping: TShipping,
  defaultCombinationId: number,
  imageUrl: string,
  smallThumbnailUrl: string,
  hdThumbnailUrl: string,
  originalImageUrl: string,
  originalImage: TOriginalImage,
  borderInfo: TBorderInfo,
  description: string,
  descriptionTranslated: TDescriptionTranslated,
  galleryImages: TImage[],
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
  googleItemCondition: string,
  isGiftCard: boolean,
  discountsAllowed: boolean,
  nameYourPriceEnabled: boolean,
}


export { TItem, TItemOption }
