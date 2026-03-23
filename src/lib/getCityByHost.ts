import { domainToUnicode } from "node:url";
import { CITIES} from "@/config/cities";
import { ROOT_DOMAIN_PUNYCODE, ROOT_DOMAIN_UNICODE } from "@/types/cities";

export type ResolvedCity = (typeof CITIES)[keyof typeof CITIES] | null;

function normalizeHost(rawHost?: string | null): string {
  if (!rawHost) return "";

  // убираем порт
  const withoutPort = rawHost.split(":")[0].trim().toLowerCase();

  // переводим punycode -> unicode
  try {
    return domainToUnicode(withoutPort);
  } catch {
    return withoutPort;
  }
}

function isRootHost(host: string): boolean {
  return host === ROOT_DOMAIN_UNICODE || host === ROOT_DOMAIN_PUNYCODE;
}

export function getCityByHost(rawHost?: string | null): ResolvedCity {
  const host = normalizeHost(rawHost);

  if (!host) return null;
  if (isRootHost(host)) return null;

  // Проверяем, что это вообще наш домен
  const isOurDomain =
    host.endsWith(`.${ROOT_DOMAIN_UNICODE}`) ||
    host.endsWith(`.${ROOT_DOMAIN_PUNYCODE}`);

  if (!isOurDomain) return null;

  // Получаем первый уровень поддомена
  const rootUnicodeParts = ROOT_DOMAIN_UNICODE.split(".").length;
  const rootPunycodeParts = ROOT_DOMAIN_PUNYCODE.split(".").length;
  const hostParts = host.split(".");

  const rootPartsCount = host.endsWith(`.${ROOT_DOMAIN_UNICODE}`)
    ? rootUnicodeParts
    : rootPunycodeParts;

  const subdomainParts = hostParts.slice(0, hostParts.length - rootPartsCount);

  if (subdomainParts.length === 0) return null;

  // Для нашей схемы берём только первый поддомен
  const subdomain = subdomainParts[0];

  return CITIES[subdomain] ?? null;
}