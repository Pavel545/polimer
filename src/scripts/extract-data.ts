import fs from 'fs';
import path from 'path';

interface Product {
  id: string;
  slug: string;
  titleShort: string;
  titleFull: string;
  description: string;
  priceRub: number;
  categoryId: number;
  img: string;
  // Дополнительные поля из детального JSON
  who?: string;
  instructionUrl?: string;
  tabs?: any[];
  variants?: any[];
  application?: any[];
}

export function extractAllProducts(): Product[] {
  const productsDir = path.join(process.cwd(), 'public', 'products');
  
  // Читаем основной индекс
  const indexPath = path.join(productsDir, 'index.json');
  const products: Product[] = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
  
  // Дополняем каждый продукт детальной информацией
  for (const product of products) {
    // Детальный JSON продукта
    const detailPath = path.join(productsDir, `${product.slug}.json`);
    if (fs.existsSync(detailPath)) {
      const details = JSON.parse(fs.readFileSync(detailPath, 'utf8'));
      Object.assign(product, {
        who: details.who,
        instructionUrl: details.instructionUrl,
        variants: details.variants,
        application: details.application
      });
    }
    
    // Информация о табах
    const infoDir = path.join(process.cwd(), 'public', 'product-info');
    const infoPath = path.join(infoDir, `${product.slug}.json`);
    if (fs.existsSync(infoPath)) {
      const info = JSON.parse(fs.readFileSync(infoPath, 'utf8'));
      product.tabs = info.tabs;
    }
  }
  
  return products;
}

// Функция для преобразования в плоскую структуру для CSV
export function flattenForBitrix(product: Product): any {
  const flat: any = {
    id: product.id,
    slug: product.slug,
    title_short: product.titleShort,
    title_full: product.titleFull,
    description: stripHtml(product.description || ''),
    price_rub: product.priceRub,
    category_id: product.categoryId,
    main_image: product.img,
    who: product.who || '',
    instruction_url: product.instructionUrl || '',
  };

  // Извлекаем характеристики
  if (product.tabs) {
    const charTab = product.tabs.find((t: any) => 
      t.content?.characteristics
    );
    if (charTab) {
      flat.characteristics = charTab.content.characteristics
        .map((c: any) => `${c.label}: ${c.value}`)
        .join('; ');
    }

    // Извлекаем преимущества
    const advTab = product.tabs.find((t: any) => 
      t.content?.advantages
    );
    if (advTab) {
      flat.advantages = advTab.content.advantages
        .filter((a: string) => !a.includes('Недостатки'))
        .join(' | ');
    }

    // Извлекаем инструкцию по монтажу
    const instTab = product.tabs.find((t: any) => 
      t.content?.kind === 'installation'
    );
    if (instTab) {
      flat.installation_instructions = instTab.content.advantages
        ?.join(' | ') || '';
    }
  }

  // Изображения применения
  if (product.application) {
    flat.application_images = product.application
      .map((img: any) => img.image)
      .join(', ');
  }

  return flat;
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}