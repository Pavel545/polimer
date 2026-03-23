import { use } from 'react';
import { getAllProducts, getProductBySlug, getProductInfo } from '@/lib/products';
import ProductHero from '@/components/section/productPage/ProductHero/ProductHero';
import ProductInfo from '@/components/section/productPage/ProductInfo/ProductInfo';
import { notFound } from 'next/navigation';
import Certificates from '@/components/section/certificates/certificates';

// Генерируем статические параметры для SSG
export async function generateStaticParams() {
  const products = getAllProducts();
  
  return products.map((product) => ({
    slug: product.slug,
  }));
}

// Генерируем метаданные для SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
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
  const { slug } = await params;
  
  const product = getProductBySlug(slug);
  const productInfo = getProductInfo(slug);
  
  if (!product) {
    notFound();
  }
  
  return (
    <main style={{ background: "var(--temnyy-1)" }}>
      {/* Используем slug как key для принудительного перемонтирования */}
      <ProductHero key={`hero-${slug}`} product={product} />
      {productInfo && <ProductInfo key={`info-${slug}`} data={productInfo} />}
      <Certificates />
    </main>
  );
}