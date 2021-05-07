type TCategoryImageInfo = {
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

type TCategory = {
  id: number,
  orderBy: number,
  hdThumbnailUrl: string,
  thumbnailUrl: string,
  originalImageUrl: string,
  imageUrl: string,
  originalImage: TCategoryImageInfo,
  thumbnail: TCategoryImageInfo,
  borderInfo: TBorderInfo,
  name: string,
  nameTranslated: TNameTranslated,
  url: string,
  productCount: number,
  description: string,
  descriptionTranslated: TNameTranslated,
  enabled: boolean,
  isSampleCategory: boolean,
}

export { TCategory }
