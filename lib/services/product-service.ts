import { PRODUCT_SORT } from "@/constant/product";
import { ProductModel } from "../models/product";
import { productSearchParams } from "../types/productsTypes";
import dbConnect from "./db-connect";

export default async function getProducts({
  productName,
  pageNo,
  pageSize,
  sort = "best-match",
  minimumPrice,
  maximumPrice,
  ratingValue,
}: productSearchParams) {
  await dbConnect();

  const query = {
    name: new RegExp(productName, "i"),
    $and: [
      minimumPrice ? { sellingPrice: { $gt: minimumPrice } } : {},
      maximumPrice ? { sellingPrice: { $lt: maximumPrice } } : {},
      // ratingValue ? { rating: { $gte: ratingValue } } : {},
    ],
  };

  //   set sorting columns
  const sortingObject = PRODUCT_SORT[sort] || {};

  // base pipeline
  const pipeline: any = [
    { $match: query },
    {
      $lookup: {
        from: "orders",
        let: { productId: "$_id" },
        pipeline: [
          {
            $match: { $expr: { $in: ["$$productId", "$orderItem.productId"] } },
          },
          { $unwind: "$orderItem" },
          {
            $match: { $expr: { $eq: ["$$productId", "$orderItem.productId"] } },
          },
          {
            $lookup: {
              from: "productReviews",
              localField: "orderItem._id",
              foreignField: "orderItemId",
              as: "productReviews",
            },
          },
          {
            $unwind: {
              path: "$productReviews",
              preserveNullAndEmptyArrays: true,
            },
          },
          {
            $project: {
              quantity: "$orderItem.quantity",
              rating: "$productReviews.rating",
              ratingCount: {
                $cond: [{ $ifNull: ["$productReviews.rating", false] }, 1, 0],
              },
            },
          },
        ],
        as: "orders",
      },
    },
    {
      $project: {
        name: 1,
        price: 1,
        sellingPrice: 1,
        imageUrl: { $first: "$images.imageUrl" },
        soldCount: { $sum: "$orders.quantity" },
        rating: { $avg: "$orders.rating" },
        ratingCount: { $sum: "$orders.ratingCount" },
        _id: 1,
      },
    },
    { $match: ratingValue ? { rating: { $gte: ratingValue } } : {} },
    { $sort: sortingObject },
  ];

  // If pagination is applied (both page and limit provided)
  if (pageNo !== null && pageSize !== null) {
    // Pagination setup: skip and limit
    const skip = (pageNo - 1) * pageSize;

    pipeline.push({
      $facet: {
        products: [{ $skip: skip }, { $limit: pageSize }],
        totalCount: [{ $count: "total" }],
      },
    });

    // Execute the aggregate query
    const result = await ProductModel.aggregate(pipeline);

    const products = result[0].products;
    const totalItems =
      result[0].totalCount.length > 0 ? result[0].totalCount[0].total : 0;

    return {
      totalItems: totalItems,
      products: JSON.parse(JSON.stringify(products)),
    };
  }

  // If no pagination, execute the query without $facet
  const products = await ProductModel.aggregate(pipeline);

  return {
    totalItems: products.length,
    products: JSON.parse(JSON.stringify(products)),
  };
}
