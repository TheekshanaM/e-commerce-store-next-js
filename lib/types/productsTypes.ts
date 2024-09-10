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
