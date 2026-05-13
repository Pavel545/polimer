import { createObjectCsvWriter } from 'csv-writer';
import { extractAllProducts, flattenForBitrix } from './extract-data';
import path from 'path';

async function exportToCsv() {
  console.log('📦 Извлекаем данные из JSON...');
  const products = extractAllProducts();
  
  console.log(`Найдено ${products.length} товаров`);
  
  // Группируем по категориям для удобства импорта в Bitrix
  const categories = {
    1: 'lyuki',      // Люки
    2: 'plitka',     // Плитка и бордюры
    3: 'kolodcy'     // Кольца и днища
  };

  // Для каждой категории создаем отдельный CSV
  for (const [catId, catName] of Object.entries(categories)) {
    const categoryProducts = products.filter(
      p => p.categoryId === parseInt(catId)
    );
    
    if (categoryProducts.length === 0) continue;
    
    const flatProducts = categoryProducts.map(flattenForBitrix);
    
    const csvWriter = createObjectCsvWriter({
      path: path.join(process.cwd(), 'exports', `bitrix_${catName}.csv`),
      header: [
        { id: 'id', title: 'ID' },
        { id: 'title_short', title: 'НАЗВАНИЕ' },
        { id: 'title_full', title: 'ПОЛНОЕ_НАЗВАНИЕ' },
        { id: 'description', title: 'ОПИСАНИЕ' },
        { id: 'price_rub', title: 'ЦЕНА' },
        { id: 'category_id', title: 'КАТЕГОРИЯ' },
        { id: 'characteristics', title: 'ХАРАКТЕРИСТИКИ' },
        { id: 'advantages', title: 'ПРЕИМУЩЕСТВА' },
        { id: 'installation_instructions', title: 'ИНСТРУКЦИЯ_МОНТАЖА' },
        { id: 'main_image', title: 'ОСНОВНОЕ_ИЗОБРАЖЕНИЕ' },
        { id: 'application_images', title: 'ИЗОБРАЖЕНИЯ_ПРИМЕНЕНИЯ' },
      ],
      fieldDelimiter: ';', // Bitrix часто использует точку с запятой
      encoding: 'utf8'
    });

    await csvWriter.writeRecords(flatProducts);
    console.log(`✅ Создан файл: bitrix_${catName}.csv (${flatProducts.length} товаров)`);
  }

  // Создаем также общий файл
  const allFlat = products.map(flattenForBitrix);
  const csvWriter = createObjectCsvWriter({
    path: path.join(process.cwd(), 'exports', 'bitrix_all_products.csv'),
    header: [
      { id: 'id', title: 'ID' },
      { id: 'title_short', title: 'НАЗВАНИЕ' },
      { id: 'title_full', title: 'ПОЛНОЕ_НАЗВАНИЕ' },
      { id: 'description', title: 'ОПИСАНИЕ' },
      { id: 'price_rub', title: 'ЦЕНА' },
      { id: 'category_id', title: 'КАТЕГОРИЯ' },
      { id: 'characteristics', title: 'ХАРАКТЕРИСТИКИ' },
      { id: 'advantages', title: 'ПРЕИМУЩЕСТВА' },
      { id: 'installation_instructions', title: 'ИНСТРУКЦИЯ_МОНТАЖА' },
      { id: 'main_image', title: 'ОСНОВНОЕ_ИЗОБРАЖЕНИЕ' },
      { id: 'application_images', title: 'ИЗОБРАЖЕНИЯ_ПРИМЕНЕНИЯ' },
    ],
    fieldDelimiter: ';',
    encoding: 'utf8'
  });

  await csvWriter.writeRecords(allFlat);
  console.log(`✅ Создан общий файл: bitrix_all_products.csv`);
}

exportToCsv().catch(console.error);