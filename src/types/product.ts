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
export type GalImg ={
  image:string
}
export type ProductEntity = {
  id: string;
  slug: string; 
  titleShort: string;
  titleFull: string;
  description: string;
  warning?: string;
  remember?: string;
  categoryId: number;
  priceRub: number;
  img: string;
  instructionUrl?: string;
  variants: ProductVariant[];
  application: GalImg[];
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
    kind: "instruct_characteristics";
    leftTitle: string;
    instructSrc: string;
    instructPdf: string;
    rightTitle: string;
    characteristics: Characteristic[];
  }| {
    kind: "installation";
    leftTitle: string;
    instructSrc: string;
    instructPdf: string;
    rightTitle: string;
    advantages: string[];
  }
  | {
    kind: "advantages_characteristics";
    leftTitle: string;
    advantages: string[];
    rightTitle: string;
    characteristics: Characteristic[];
  }| {
    kind: "advantages";
    leftTitle: string;
    advantages: string[];
    rightTitle: string;
    advantages2: string[];
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
  content?: TabContent;
  fileUrl?: string;
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
  imgMob?: string; // изображение для мобильных устройств
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
  titleW?: string;
};