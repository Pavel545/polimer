export type CitySeoData = {
  title: string;
  metaDescription: string;
  h1: string;

  heroTitle: string;
  heroSubtitle: string;
  heroText: string;

  aboutAppendix: string;

  historyText2010: string;
  historyStatsText: string;

  deliveryCardTitle: string;
  deliveryCardText: string;

  footerTitle: string;
  footerText: string;

  breadcrumbs: string[];
  productSubtitle: string;

  altTexts: [string, string, string];

  seoIntro: string;

  regionLabel: string;
  isKazakhstan: boolean;
};

export type CityConfigItem = {
  key: CityKey;
  subdomain: string;
  city: string;
  region?: string;
  titleIn: string;
  titleOnly: string;
  metrikaId?: number;
  host: string;

  // новые поля под ТЗ
  titleGenitive?: string;   // [ГОРОД_Р] -> "Казани", "Самары"
  titleDative?: string;     // [ГОРОД_Д] -> "Казани", "Самаре"
  geoRegion?: string;       // [РЕГИОН] -> "Поволжье", "Казахстан"
};

export type CityKey =
  | "volgograd"
  | "saratov"
  | "saransk"
  | "kazan"
  | "vladimir"
  | "nizhniy-novgorod"
  | "samara"
  | "tolyatti"
  | "penza"
  | "lipetsk"
  | "voronezh"
  | "perm"
  | "ufa"
  | "izhevsk"
  | "ulyanovsk"
  | "orenburg"
  | "astrakhan"
  | "cheboksary"
  | "naberezhnye-chelny"
  | "sterlitamak"
  | "moscow"
  | "yaroslavl"
  | "ryazan"
  | "balashikha"
  | "tula"
  | "kursk"
  | "tver"
  | "ivanovo"
  | "bryansk"
  | "belgorod"
  | "kaluga"
  | "smolensk"
  | "podolsk"
  | "oryol"
  | "mytishchi"
  | "kostroma"
  | "tambov"
  | "khimki"
  | "rostov-na-donu"
  | "krasnodar"
  | "sevastopol"
  | "sochi"
  | "simferopol"
  | "volzhskiy"
  | "novorossiysk"
  | "taganrog"
  | "shakhty"
  | "yekaterinburg"
  | "chelyabinsk"
  | "tyumen"
  | "surgut"
  | "magnitogorsk"
  | "nizhniy-tagil"
  | "kurgan"
  | "nizhnevartovsk"
  | "kerch"
  | "evpatoriya"
  | "yalta"
  | "feodosiya"
  | "dzhankoy"
  | "alushta"
  | "krasnoperekopsk"
  | "saki"
  | "sudak"
  | "belogorsk"
  | "shchyolkino"
  | "armyansk"
  | "donetsk"
  | "lugansk"
  | "mariupol"
  | "gorlovka"
  | "melitopol"
  | "kramatorsk"
  | "berdyansk"
  | "alchevsk"
  | "severodonetsk"
  | "slavyansk"
  | "almaty"
  | "astana"
  | "shymkent"
  | "aktobe"
  | "karaganda"
  | "taraz"
  | "pavlodar"
  | "ust-kamenogorsk"
  | "semey"
  | "atyrau"
  | "aktau"
  | "kostanay"
  | "kyzylorda"
  | "petropavlovsk"
  | "uralsk";



export const ROOT_DOMAIN_UNICODE = "73полимер.рф";
export const ROOT_DOMAIN_PUNYCODE = "xn--73-olclohlho.xn--p1ai";

export const DEFAULT_CITY = null;
