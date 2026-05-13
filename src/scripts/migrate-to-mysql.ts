import mysql from 'mysql2/promise';
import { extractAllProducts } from './extract-data';
import dotenv from 'dotenv';

dotenv.config();

async function migrateToMySQL() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'polimer_products'
  });

  console.log('📦 Извлекаем данные...');
  const products = extractAllProducts();
  
  // Создаем таблицу
  await connection.execute(`
    CREATE TABLE IF NOT EXISTS products (
      id VARCHAR(50) PRIMARY KEY,
      slug VARCHAR(255),
      title_short VARCHAR(500),
      title_full TEXT,
      description TEXT,
      price_rub DECIMAL(10,2),
      category_id INT,
      main_image VARCHAR(500),
      who VARCHAR(255),
      instruction_url VARCHAR(500),
      characteristics TEXT,
      advantages TEXT,
      installation_instructions TEXT,
      application_images TEXT,
      variants_json JSON,
      tabs_json JSON,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Вставляем данные
  for (const product of products) {
    // Извлекаем характеристики и преимущества как в CSV
    let characteristics = '';
    let advantages = '';
    let installation = '';
    
    if (product.tabs) {
      const charTab = product.tabs.find(t => t.content?.characteristics);
      if (charTab) {
        characteristics = charTab.content.characteristics
          .map((c: { label: any; value: any; }) => `${c.label}: ${c.value}`)
          .join('; ');
      }
      
      const advTab = product.tabs.find(t => t.content?.advantages);
      if (advTab) {
        advantages = advTab.content.advantages
          .filter((a: string | string[]) => !a.includes('Недостатки'))
          .join(' | ');
        
        if (advTab.content.kind === 'installation') {
          installation = advantages;
        }
      }
    }

    const applicationImages = product.application
      ? product.application.map(img => img.image).join(', ')
      : '';

    await connection.execute(
      `INSERT INTO products (
        id, slug, title_short, title_full, description, 
        price_rub, category_id, main_image, who, instruction_url,
        characteristics, advantages, installation_instructions,
        application_images, variants_json, tabs_json
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        title_short = VALUES(title_short),
        price_rub = VALUES(price_rub),
        characteristics = VALUES(characteristics)`,
      [
        product.id,
        product.slug,
        product.titleShort,
        product.titleFull,
        product.description,
        product.priceRub,
        product.categoryId,
        product.img,
        product.who || '',
        product.instructionUrl || '',
        characteristics,
        advantages,
        installation,
        applicationImages,
        JSON.stringify(product.variants || []),
        JSON.stringify(product.tabs || [])
      ]
    );
  }

  console.log(`✅ Миграция завершена! Перенесено ${products.length} товаров`);
  await connection.end();
}

migrateToMySQL().catch(console.error);