import { PRODUCT_SORT } from "./../../constant/product";
export interface IProductCard {
  _id: number;
  imageUrl: string;
  name: string;
  price: number;
  discount: number;
  soldCount: number;
  rating: number;
}

export interface productSearchParams {
  productName: string;
  pageNo: number;
  pageSize: number;
  sort?: productSortType;
  minimumPrice: string;
  maximumPrice: string;
  ratingValue: number | null;
}

export interface searchProductResult {
  products: Array<IProductCard>;
  totalPages: number;
}

export type productSortType =
  | "best-match"
  | "price-low-to-high"
  | "price-high-to-low";

export type productSortOptionType = {
  value: productSortType;
  label: string;
};

export interface IProductDetails {
  id: number;
  name: string;
  price: number;
  description: string;
  images: Array<string>;
  colors: { [key: string]: string };
  averageRating: number;
  reviews: number;
  specifications: Array<{ key: string; value: string }>;
  totalRatings: number;
  ratingData: { [key: string]: number };
}

export type TRatingView = Pick<
  IProductDetails,
  "averageRating" | "totalRatings" | "ratingData"
>;

export interface IReview {
  rating: number;
  name: string;
  date: string;
  comment: string;
  reply: { name: string; date: string; comment: string } | null;
}
