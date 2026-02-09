export type ProductInfoTabId = 1 | 2 | 3;

export type ProductInfoData = {
  tabs: {
    id: ProductInfoTabId;
    title: string;
    content: ProductInfoTabContent;
  }[];
};

export type ProductInfoTabContent =
  | {
      kind: "advantages_characteristics";
      leftTitle: string;                 // "ПРЕИМУЩЕСТВА:"
      advantages: string[];              // пункты 1..n
      rightTitle: string;                // "ХАРАКТЕРИСТИКА:"
      characteristics: { label: string; value: string }[]; // "Диаметр крышки" -> "630 мм"
    }
  | {
      kind: "description_types";
      leftTitle: string;                 // "ОПИСАНИЕ:"
      description: string[];             // абзацы
      rightTitle: string;                // "ВИДЫ:"
      types: { title: string; text: string }[]; // список 1..n
    }
  | {
      kind: "instruction_columns";
      columns: {
        title: string;                   // "ОПЛАТА:", "ДОСТАВКА:"
        text: string[];                  // абзацы
      }[];
    };
