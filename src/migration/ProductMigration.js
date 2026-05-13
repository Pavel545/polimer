const fs = require('fs');
const mysql = require('mysql2/promise');

// Структура для плоского CSV (удобно для Bitrix)
class ProductMigration {
  constructor(jsonData) {
    this.products = jsonData;
  }

  // Преобразование в плоскую структуру для CSV
  flattenProduct(product) {
    const flat = {
      id: product.id,
      slug: product.slug,
      title_short: product.titleShort,
      title_full: product.titleFull,
      description: this.stripHtml(product.description),
      price_rub: product.priceRub,
      category_id: product.categoryId,
      main_image: product.img,
      variants_json: JSON.stringify(product.variants || []),
      tabs_json: JSON.stringify(product.tabs || []),
      application_images_json: JSON.stringify(product.application || [])
    };
    return flat;
  }

  stripHtml(html) {
    if (!html) return '';
    return html.replace(/<[^>]*>/g, '');
  }

  async migrateToMySQL(connection) {
    // Вставка продуктов в плоскую таблицу
    for (const product of this.products) {
      const flat = this.flattenProduct(product);
      await connection.execute(
        `INSERT INTO products_flat (id, slug, title_short, title_full, description, 
         price_rub, category_id, main_image, variants_json, tabs_json, application_images_json)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE 
         title_short=VALUES(title_short), price_rub=VALUES(price_rub)`,
        [flat.id, flat.slug, flat.title_short, flat.title_full, flat.description,
         flat.price_rub, flat.category_id, flat.main_image, flat.variants_json,
         flat.tabs_json, flat.application_images_json]
      );
    }
  }
}

// Альтернатива: реляционная структура
class RelationalMigration {
  async migrateProductWithDetails(connection, product) {
    // 1. Вставляем продукт
    await connection.execute(
      `INSERT INTO products (id, slug, title_short, title_full, description, 
       price_rub, category_id, main_image, instruction_url, who)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [product.id, product.slug, product.titleShort, product.titleFull,
       product.description, product.priceRub, product.categoryId, product.img,
       product.instructionUrl, product.who]
    );

    // 2. Вставляем табы
    if (product.tabs) {
      for (const tab of product.tabs) {
        await connection.execute(
          `INSERT INTO product_tabs (id, product_id, title, content_json)
           VALUES (?, ?, ?, ?)`,
          [tab.id, product.id, tab.title, JSON.stringify(tab.content)]
        );
      }
    }

    // 3. Вставляем варианты
    if (product.variants) {
      for (const variant of product.variants) {
        await connection.execute(
          `INSERT INTO product_variants (id, product_id, title, price_rub)
           VALUES (?, ?, ?, ?)`,
          [variant.id, product.id, variant.title, variant.priceRub]
        );

        // Цвета варианта
        if (variant.colors) {
          for (const color of variant.colors) {
            await connection.execute(
              `INSERT INTO variant_colors (id, variant_id, name, hex)
               VALUES (?, ?, ?, ?)`,
              [color.id, variant.id, color.name, color.hex]
            );
          }
        }

        // Изображения варианта
        if (variant.images) {
          for (const image of variant.images) {
            await connection.execute(
              `INSERT INTO product_images (id, product_id, variant_id, url, alt, color_id, sort, type)
               VALUES (?, ?, ?, ?, ?, ?, ?, 'variant')`,
              [image.id, product.id, variant.id, image.url, image.alt, 
               image.colorId, image.sort]
            );
          }
        }
      }
    }
  }
}