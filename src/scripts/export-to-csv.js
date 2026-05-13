const fs = require('fs');
const path = require('path');

// Функция для очистки HTML
function stripHtml(html) {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}

// Извлекаем все продукты
function extractAllProducts() {
  const productsDir = path.join(process.cwd(), 'src', 'data', 'products');
  
  // Читаем основной индекс
  const indexPath = path.join(productsDir, 'index.json');
  const products = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
  
  console.log(`📦 Загружено ${products.length} продуктов из index.json`);
  
  // Дополняем каждый продукт детальной информацией
  for (const product of products) {
    // Детальный JSON продукта
    const detailPath = path.join(productsDir, `${product.slug}.json`);
    if (fs.existsSync(detailPath)) {
      try {
        const details = JSON.parse(fs.readFileSync(detailPath, 'utf8'));
        product.who = details.who;
        product.instructionUrl = details.instructionUrl;
        product.variants = details.variants;
        product.application = details.application;
        console.log(`  ✓ Загружены детали для: ${product.slug}`);
      } catch (e) {
        console.log(`  ⚠ Ошибка загрузки деталей для: ${product.slug}`);
      }
    }
    
    // Информация о табах
    const infoDir = path.join(process.cwd(), 'public', 'product-info');
    const infoPath = path.join(infoDir, `${product.slug}.json`);
    if (fs.existsSync(infoPath)) {
      try {
        const info = JSON.parse(fs.readFileSync(infoPath, 'utf8'));
        product.tabs = info.tabs;
        console.log(`  ✓ Загружены табы для: ${product.slug}`);
      } catch (e) {
        console.log(`  ⚠ Ошибка загрузки табов для: ${product.slug}`);
      }
    }
  }
  
  return products;
}

// Преобразование в плоскую структуру для CSV
function flattenForBitrix(product) {
  const flat = {
    id: product.id || '',
    slug: product.slug || '',
    title_short: product.titleShort || '',
    title_full: product.titleFull || '',
    description: stripHtml(product.description || ''),
    price_rub: product.priceRub || 0,
    category_id: product.categoryId || '',
    main_image: product.img || '',
    who: product.who || '',
    instruction_url: product.instructionUrl || '',
    characteristics: '',
    advantages: '',
    installation_instructions: '',
    application_images: ''
  };

  // Извлекаем характеристики
  if (product.tabs && Array.isArray(product.tabs)) {
    const charTab = product.tabs.find(t => 
      t.content && t.content.characteristics
    );
    if (charTab && charTab.content.characteristics) {
      flat.characteristics = charTab.content.characteristics
        .map(c => `${c.label}: ${c.value}`)
        .join('; ');
    }

    // Извлекаем преимущества
    const advTab = product.tabs.find(t => 
      t.content && t.content.advantages
    );
    if (advTab && advTab.content.advantages) {
      flat.advantages = advTab.content.advantages
        .filter(a => typeof a === 'string' && !a.includes('Недостатки'))
        .join(' | ');
    }

    // Извлекаем инструкцию по монтажу
    const instTab = product.tabs.find(t => 
      t.content && t.content.kind === 'installation'
    );
    if (instTab && instTab.content.advantages) {
      flat.installation_instructions = instTab.content.advantages
        .filter(a => typeof a === 'string')
        .join(' | ');
    }
  }

  // Изображения применения
  if (product.application && Array.isArray(product.application)) {
    flat.application_images = product.application
      .map(img => img.image || '')
      .filter(url => url)
      .join(', ');
  }

  return flat;
}

// Основная функция экспорта
async function exportToCsv() {
  console.log('🚀 Начинаем экспорт данных для Bitrix...\n');
  
  const products = extractAllProducts();
  console.log(`\n✅ Всего обработано: ${products.length} товаров\n`);
  
  // Создаем папку exports если её нет
  const exportsDir = path.join(process.cwd(), 'exports');
  if (!fs.existsSync(exportsDir)) {
    fs.mkdirSync(exportsDir);
    console.log('📁 Создана папка exports');
  }
  
  // Категории для группировки
  const categories = {
    1: { name: 'lyuki', label: 'Люки' },
    2: { name: 'plitka', label: 'Плитка и бордюры' },
    3: { name: 'kolodcy', label: 'Кольца и днища' }
  };

  // Заголовки CSV
  const headers = [
    'ID',
    'НАЗВАНИЕ',
    'ПОЛНОЕ_НАЗВАНИЕ',
    'ОПИСАНИЕ',
    'ЦЕНА',
    'КАТЕГОРИЯ',
    'ХАРАКТЕРИСТИКИ',
    'ПРЕИМУЩЕСТВА',
    'ИНСТРУКЦИЯ_МОНТАЖА',
    'ОСНОВНОЕ_ИЗОБРАЖЕНИЕ',
    'ИЗОБРАЖЕНИЯ_ПРИМЕНЕНИЯ'
  ];

  // Функция для создания CSV строки
  function createCsvLine(data) {
    return [
      data.id,
      data.title_short,
      data.title_full,
      data.description,
      data.price_rub,
      data.category_id,
      data.characteristics,
      data.advantages,
      data.installation_instructions,
      data.main_image,
      data.application_images
    ].map(field => {
      // Экранируем поля с разделителями
      const str = String(field || '');
      if (str.includes(';') || str.includes('"') || str.includes('\n')) {
        return `"${str.replace(/"/g, '""')}"`;
      }
      return str;
    }).join(';');
  }

  // Для каждой категории создаем отдельный CSV
  for (const [catId, catInfo] of Object.entries(categories)) {
    const categoryProducts = products.filter(
      p => p.categoryId === parseInt(catId)
    );
    
    if (categoryProducts.length === 0) {
      console.log(`⚠ Категория "${catInfo.label}": нет товаров`);
      continue;
    }
    
    const flatProducts = categoryProducts.map(flattenForBitrix);
    
    // Создаем CSV контент
    const csvContent = [
      headers.join(';'),
      ...flatProducts.map(createCsvLine)
    ].join('\n');
    
    // Добавляем BOM для правильной кодировки в Excel
    const BOM = '\uFEFF';
    const filename = path.join(exportsDir, `bitrix_${catInfo.name}.csv`);
    fs.writeFileSync(filename, BOM + csvContent, 'utf8');
    
    console.log(`✅ ${catInfo.label}: ${filename} (${flatProducts.length} товаров)`);
  }

  // Создаем общий файл
  const allFlat = products.map(flattenForBitrix);
  const allCsvContent = [
    headers.join(';'),
    ...allFlat.map(createCsvLine)
  ].join('\n');
  
  const allFilename = path.join(exportsDir, 'bitrix_all_products.csv');
  fs.writeFileSync(allFilename, '\uFEFF' + allCsvContent, 'utf8');
  console.log(`✅ Общий файл: ${allFilename} (${allFlat.length} товаров)`);
  
  console.log('\n🎉 Экспорт завершен! Файлы готовы для импорта в Bitrix.');
}

// Запускаем
exportToCsv().catch(error => {
  console.error('❌ Ошибка:', error);
  process.exit(1);
});