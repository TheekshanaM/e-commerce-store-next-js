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
}

export interface searchProductResult {
  products: Array<IProductCard>;
  totalPages: number;
}
