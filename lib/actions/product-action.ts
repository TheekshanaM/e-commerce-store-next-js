"use server";

import getProducts from "../services/product-service";
import { actionResponse } from "../types/actionTypes";
import {
  productSearchParams,
  searchProductResult,
} from "../types/productsTypes";

export async function searchProduct({
  productName,
  pageNo,
  pageSize,
}: productSearchParams): Promise<actionResponse<searchProductResult>> {
  try {
    const response = await getProducts({ productName, pageNo, pageSize });

    return { success: true, data: response };
  } catch (error) {
    return { success: false, error: "Server error." };
  }
}
