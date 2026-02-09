import { CardProductData, ProductCategory, ProductEntity, ProductInfoData, ProductListItem } from '@/types/product';

// Кэширование для production
let productsCache: ProductEntity[] | null = null;
let productInfoCache: Record<string, ProductInfoData> = {};

// Получить все продукты (для списка)
export function getAllProducts(): ProductEntity[] {
  if (productsCache) return productsCache;
  
  try {
    // @ts-ignore - динамический импорт JSON
    const data = require('@/data/products/index.json');
    productsCache = data;
    return data;
  } catch (error) {
    console.error('Error loading products:', error);
    return [];
  }
}

// Получить продукт по slug
export function getProductBySlug(slug: string): ProductEntity | undefined {
  try {
    // @ts-ignore - динамический импорт JSON
    const data = require(`@/data/products/${slug}.json`);
    return data;
  } catch (error) {
    console.error(`Error loading product ${slug}:`, error);
    return undefined;
  }
}

// Получить дополнительную информацию о продукте
export function getProductInfo(slug: string): ProductInfoData | undefined {
  if (productInfoCache[slug]) return productInfoCache[slug];
  
  try {
    // @ts-ignore - динамический импорт JSON
    const data = require(`@/data/product-info/${slug}.json`);
    productInfoCache[slug] = data;
    return data;
  } catch (error) {
    console.error(`Error loading product info for ${slug}:`, error);
    return undefined;
  }
}

// Проверить существует ли продукт
export function productExists(slug: string): boolean {
  const products = getAllProducts();
  return products.some(product => product.slug === slug);
}


// Получить все категории
export function getAllCategories(): ProductCategory[] {
  try {
    // @ts-ignore
    const data = require('@/data/categories.json');
    return data;
  } catch (error) {
    console.error('Error loading categories:', error);
    return [];
  }
}

// Получить продукты по категории
export function getProductsForCards(): CardProductData[] {
  const products = getAllProductsList();
  
  return products.map(product => ({
    id: product.id,
    slug: product.slug,
    title: product.titleShort,
    type: getTypeByCategory(product.categoryId), // функция для определения типа
    img: product.img,
    priceRub: product.priceRub,
    categoryId: product.categoryId
  }));
}

function getTypeByCategory(categoryId: number): string {
  const types: Record<number, string> = {
    1: "Люк",
    2: "Заказная позиция", 
    3: "Для благоустройства",
    4: "Для колодца"
  };
  
  return types[categoryId] || "Продукт";
}
// Получить все продукты (список)
export function getAllProductsList(): ProductListItem[] {
  return getAllProducts(); // getAllProducts уже возвращает ProductListItem[]
}