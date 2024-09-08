import { productSortType } from "@/lib/types/productsTypes";

export const PRODUCT_SORT: Record<productSortType, { [key: string]: 1 | -1 }> =
  {
    "best-match": { soldCount: -1, _id: 1 },
    "price-low-to-high": { price: 1, _id: 1 },
    "price-high-to-low": { price: -1, _id: 1 },
  };
