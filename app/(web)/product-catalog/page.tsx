"use client";
import { useSearchParams } from "next/navigation";

export default function ProductCatalog() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const filter = searchParams.get("filter");
  console.log(category, filter);

  return <>product</>;
}
