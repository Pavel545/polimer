// main.js
async function main() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'products_db'
    });

    // Читаем JSON файлы
    const productsList = JSON.parse(
        fs.readFileSync('products/index.json', 'utf8')
    );

    // Загружаем детали для каждого продукта
    for (const product of productsList) {
        const detailsPath = `products/${product.slug}.json`;
        if (fs.existsSync(detailsPath)) {
            const details = JSON.parse(fs.readFileSync(detailsPath, 'utf8'));
            Object.assign(product, details);
        }

        const infoPath = `product-info/${product.slug}.json`;
        if (fs.existsSync(infoPath)) {
            const info = JSON.parse(fs.readFileSync(infoPath, 'utf8'));
            product.tabs = info.tabs;
        }
    }

    // Миграция
    const flatMigration = new ProductMigration(productsList);
    await flatMigration.migrateToMySQL(connection);

    // Экспорт в CSV
    await exportToBitrixCsv(productsList);

    await connection.end();
}

main();