import { use } from 'react';
import { getAllProducts, getAllProductsList, getProductBySlug, getProductInfo } from '@/lib/products';
import ProductHero from '@/components/section/productPage/ProductHero/ProductHero';
import ProductInfo from '@/components/section/productPage/ProductInfo/ProductInfo';
import { notFound } from 'next/navigation';
import Certificates from '@/components/section/certificates/certificates';
import Brak from '@/components/section/productPage/Brak/Brak';
import Gallary from '@/components/section/productPage/Gallery/Gallari';
import { ProductListItem } from '@/types/product';

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
  const allProducts: ProductListItem[] = getAllProductsList();
  const filteredProducts = allProducts.filter(product => product.slug === slug)[0];
  const productInfo = getProductInfo(slug);
  console.log(filteredProducts);

  if (!product) {
    notFound();
  }

  return (
    <main style={{ background: "var(--belyy)" }}>
      {/* Используем slug как key для принудительного перемонтирования */}
      <ProductHero key={`hero-${slug}`} product={product} />
      {product?.application && <Gallary title='Галерея -  Область применения' items={product.application} />}

      {productInfo && <ProductInfo key={`info-${slug}`} data={productInfo} />}
      <Certificates />
      {filteredProducts.categoryId == 1 && <Brak />}
    </main>
  );
}