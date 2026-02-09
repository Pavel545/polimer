import { use } from 'react';
import { getAllProducts, getProductBySlug, getProductInfo } from '@/lib/products';
import ProductHero from '@/components/section/productPage/ProductHero/ProductHero';
import ProductInfo from '@/components/section/productPage/ProductInfo/ProductInfo';
import { notFound } from 'next/navigation';

// Генерируем статические параметры для SSG
export async function generateStaticParams() {
  const products = getAllProducts();
  
  return products.map((product) => ({
    slug: product.slug,
  }));
}

// Генерируем метаданные для SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; // Распаковываем Promise
  const product = getProductBySlug(slug);
  
  if (!product) {
    return {
      title: 'Продукт не найден',
    };
  }
  
  return {
    title: product.titleFull,
    description: product.description,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  // Распаковываем params с помощью await
  const { slug } = await params;
  
  const product = getProductBySlug(slug);
  const productInfo = getProductInfo(slug);
  
  if (!product) {
    notFound(); // покажет 404 страницу
  }
  
  return (
    <main style={{ background: "var(--temnyy-1)" }}>
      <ProductHero product={product} />
      {productInfo && <ProductInfo data={productInfo} />}
    </main>
  );
}