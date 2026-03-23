import { CityConfigItem, CitySeoData } from "@/types/cities";

function getDefaultGenitive(city: CityConfigItem) {
  return city.titleGenitive ?? city.city;
}

function getDefaultDative(city: CityConfigItem) {
  return city.titleDative ?? city.city;
}

function getDefaultGeoRegion(city: CityConfigItem) {
  return city.geoRegion ?? city.region ?? "России";
}

function isKazakhstanCity(city: CityConfigItem) {
  return getDefaultGeoRegion(city).toLowerCase() === "казахстан";
}

export function buildCitySeo(city: CityConfigItem): CitySeoData {
  const cityNom = city.titleOnly;                 // [ГОРОД]
  const cityPrep = city.titleIn;                  // [ГОРОД_П]
  const cityGen = getDefaultGenitive(city);       // [ГОРОД_Р]
  const cityDat = getDefaultDative(city);         // [ГОРОД_Д]
  const geoRegion = getDefaultGeoRegion(city);    // [РЕГИОН]
  const isKazakhstan = isKazakhstanCity(city);

  const title = `Полимерпесчаные люки ${cityPrep} — производство и доставка | 73полимер.рф`;

  const metaDescription = isKazakhstan
    ? `Купить полимерпесчаные канализационные люки ${cityPrep}. Производство в Ульяновске, доставка по Казахстану и России за 5–12 дней. Люки с логотипом и запорным устройством.`
    : `Купить полимерпесчаные канализационные люки ${cityPrep}. Производство ООО «Полимерные технологии». Доставка по России и ${geoRegion}, люки с вашим логотипом и запорным устройством.`;

  const h1 = `Производитель канализационных полимерпесчаных люков ${cityPrep}`;

  const heroTitle = `${cityNom}: Производитель полимерпесчаных люков`;
  const heroSubtitle =
    "Всегда в наличии широкий ассортимент: полимерпесчаные люки, тротуарная плитка, водоотводы, поребрики";
  const heroText = `Более 16 лет мы производим полимерпесчаные люки, тротуарную плитку, бордюры и водоотводы в Ульяновске и доставляем напрямую ${cityDat} и по всей России. Большие складские запасы, логистика, качество, которому доверяют 100+ городов.`;

  const aboutAppendix = `Сегодня наша продукция успешно эксплуатируется ${cityPrep} и ${geoRegion}. Мы доставляем полимерпесчаные изделия напрямую ${cityGen}.`;

  const historyText2010 =
    `Начали с небольших партий полимерных люков для строительных компаний Ульяновска и быстро вышли на поставки по всей России и ${geoRegion}`;

  const historyStatsText = `> 100 городов Поставки по всей России, включая ${cityNom}`;

  const deliveryCardTitle = `Доставка ${cityPrep} и по всей России`;
  const deliveryCardText = `Служба логистики обеспечивает быструю и надежную доставку товаров напрямую от склада в Ульяновске к вашим объектам ${cityPrep}. Оперативность — в течение 3–7 дней.`;

  const footerTitle = `Продажа и доставка полимерпесчаных люков и плитки ${cityPrep}`;
  const footerText = `Мы работаем с ${cityGen} и ${geoRegion}. Собственный склад в Ульяновске, доставка от 1 дня.`;

  const breadcrumbs = ["Главная", "Продукция", "Полимерпесчаные люки", cityNom];

  const productSubtitle = `Канализационные люки для ${cityGen}`;

  const altTexts: [string, string, string] = [
    `Полимерпесчаный канализационный люк установлен ${cityPrep}`,
    `Тротуарная полимерпесчаная плитка на объекте ${cityPrep}`,
    `Монтаж полимерпесчаного бордюра и водоотвода ${cityPrep}`,
  ];

  const seoIntro = isKazakhstan
    ? `Канализационные полимерпесчаные люки ${cityPrep} от производителя ООО «Полимерные технологии» массой нагрузки от 1,5 т до 25 т для канализации, инженерных сетей, дорог и благоустройства. Более 16 лет мы выпускаем качественные полимерпесчаные люки, тротуарную плитку, бордюры и водоотводы. Доставка ${cityDat} и по Казахстану и России за 5–12 дней.`
    : `Канализационные полимерпесчаные люки ${cityPrep} от производителя ООО «Полимерные технологии» массой нагрузки от 1,5 т до 25 т для канализации, инженерных сетей, дорог и благоустройства. Более 16 лет мы выпускаем качественные полимерпесчаные люки, тротуарную плитку, бордюры и водоотводы. Доставка ${cityPrep} осуществляется логистикой напрямую со склада в Ульяновске.`;

  return {
    title,
    metaDescription,
    h1,
    heroTitle,
    heroSubtitle,
    heroText,
    aboutAppendix,
    historyText2010,
    historyStatsText,
    deliveryCardTitle,
    deliveryCardText,
    footerTitle,
    footerText,
    breadcrumbs,
    productSubtitle,
    altTexts,
    seoIntro,
    regionLabel: geoRegion,
    isKazakhstan,
  };
}