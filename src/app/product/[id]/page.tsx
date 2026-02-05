"use client";

import ProductHero from "@/components/section/productPage/ProductHero/ProductHero";

export default function ProductCard({ params }: { params: { id: string } }) {
  // позже: fetch / react-query / server actions
  // const product = await getProductById(params.id)

  return (
    <main style={{ background: "var(--temnyy-1)" }}>
      <ProductHero />
    </main>
  );
}
