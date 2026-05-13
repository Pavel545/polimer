-- Категории товаров
CREATE TABLE categories (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    slug VARCHAR(255)
);

-- Основная таблица товаров
CREATE TABLE products (
    id VARCHAR(50) PRIMARY KEY,
    slug VARCHAR(255),
    title_short VARCHAR(500),
    title_full TEXT,
    description TEXT,
    price_rub DECIMAL(10,2),
    category_id INT,
    main_image VARCHAR(500),
    instruction_url VARCHAR(500),
    who VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Варианты товаров (если есть)
CREATE TABLE product_variants (
    id VARCHAR(50) PRIMARY KEY,
    product_id VARCHAR(50),
    title VARCHAR(255),
    price_rub DECIMAL(10,2),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Цвета вариантов
CREATE TABLE variant_colors (
    id VARCHAR(50) PRIMARY KEY,
    variant_id VARCHAR(50),
    name VARCHAR(100),
    hex VARCHAR(7),
    FOREIGN KEY (variant_id) REFERENCES product_variants(id)
);

-- Изображения товаров/вариантов
CREATE TABLE product_images (
    id VARCHAR(50) PRIMARY KEY,
    product_id VARCHAR(50),
    variant_id VARCHAR(50),
    url VARCHAR(500),
    alt TEXT,
    color_id VARCHAR(50),
    sort INT,
    type ENUM('variant', 'application'),
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (variant_id) REFERENCES product_variants(id)
);

-- Табы с контентом
CREATE TABLE product_tabs (
    id INT PRIMARY KEY,
    product_id VARCHAR(50),
    title VARCHAR(255),
    content_json TEXT,
    FOREIGN KEY (product_id) REFERENCES products(id)
);