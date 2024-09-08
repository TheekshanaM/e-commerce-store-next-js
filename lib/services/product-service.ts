import { ProductModel } from "../models/product";
import { productSearchParams } from "../types/productsTypes";
import dbConnect from "./db-connect";

export default async function getProducts({
  productName,
  pageNo,
  pageSize,
}: productSearchParams) {
  await dbConnect();

  const query = { name: new RegExp(productName, "i") };

  // Pagination setup: skip and limit
  const skip = (pageNo - 1) * pageSize;

  const products = await ProductModel.find(query)
    .skip(skip)
    .limit(pageSize)
    .exec();

  const totalDocuments = await ProductModel.countDocuments(query); // Get total count for pagination

  return {
    totalPages: Math.ceil(totalDocuments / pageSize),
    products: JSON.parse(JSON.stringify(products)),
  };
}
