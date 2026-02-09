// Типы из первого компонента
export type ProductColor = {
  id: string;
  name: string;
  hex: string;
};

export type ProductImage = {
  id: string;
  url: string;
  alt?: string;
  colorId: string;
  sort?: number;
};

export type ProductVariant = {
  id: string;
  title: string;
  priceRub: number;
  colors: ProductColor[];
  images: ProductImage[];
};

export type ProductEntity = {
  id: string;
  slug: string; // добавляем slug для URL
  titleShort: string;
  titleFull: string;
  description: string;
  categoryId: number;
  priceRub: number;
  img:string;
  instructionUrl?: string;
  variants: ProductVariant[];
};

// Типы из второго компонента
export type Characteristic = {
  label: string;
  value: string;
};

export type ProductType = {
  title: string;
  text: string;
};

export type Column = {
  title: string;
  text: string[];
};

export type TabContent =
  | {
      kind: "advantages_characteristics";
      leftTitle: string;
      advantages: string[];
      rightTitle: string;
      characteristics: Characteristic[];
    }
  | {
      kind: "description_types";
      leftTitle: string;
      description: string[];
      rightTitle: string;
      types: ProductType[];
    }
  | {
      kind: "instruction_columns";
      columns: Column[];
    };

export type ProductTab = {
  id: number;
  title: string;
  content: TabContent;
};

export type ProductInfoData = {
  tabs: ProductTab[];
};


// Типы для списка продуктов (минимум данных)
export type ProductListItem = {
  id: string; // изменяем на string
  slug: string;
  titleShort: string;
  titleFull: string;
  description: string;
  priceRub: number;
  categoryId: number;
  img: string; // главное изображение
  type?: string; // опциональное поле, если хотим сохранить тип
};

export type CardProductData = {
  id: string;
  slug: string;
  title: string; // для карточки достаточно короткого названия
  type?: string;
  img: string;
  priceRub: number;
  categoryId: number;
};
// Типы для категорий
export type ProductCategory = {
  id: number;
  title: string;
};