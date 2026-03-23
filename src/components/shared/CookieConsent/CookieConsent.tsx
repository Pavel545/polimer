"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./CookieConsent.module.css";

export type CookieConsentState = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
  decidedAt: string | null;
  utmData?: Record<string, string>;
};

export type CookieConsentProps = {
  siteName?: string;
  policyUrl?: string;
  storageKey?: string;
  onChange?: (consent: CookieConsentState) => void;
  showFunctional?: boolean;
  testMode?: boolean;
  testId?: string;
};

const OPEN_EVENT = "open-cookie-settings";

let globalSetDrawerOpen: ((open: boolean) => void) | null = null;
let globalSetDraft: ((draft: any) => void) | null = null;
let globalConsent: any = null;
let globalBase: any = null;

const UTMParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'utm_referrer'];
const YCLIDParam = 'yclid';
const GCLIDParam = 'gclid';
const FBParam = 'fbclid';
const VKParam = 'vkcid';

export function CookieConsent({
  siteName = "73полимер.рф",
  policyUrl = "/politiko",
  storageKey = "cookie_consent_v1",
  showFunctional = false,
  testMode = false,
  testId = "cookie-consent",
  onChange,
}: CookieConsentProps) {
  const base = useMemo<CookieConsentState>(
    () => ({
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
      decidedAt: null,
      utmData: {},
    }),
    []
  );

  const [visible, setVisible] = useState<boolean>(false);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [consent, setConsent] = useState<CookieConsentState>(base);
  const [draft, setDraft] = useState<CookieConsentState>(base);

  useEffect(() => {
    globalSetDrawerOpen = setDrawerOpen;
    globalSetDraft = setDraft;
    globalConsent = consent;
    globalBase = base;
    
    return () => {
      globalSetDrawerOpen = null;
      globalSetDraft = null;
      globalConsent = null;
      globalBase = null;
    };
  }, [consent, base]);

  useEffect(() => {
    const handler = () => {
      console.log('[CookieConsent] OPEN_EVENT received');
      setDraft(consent?.decidedAt ? consent : base);
      setDrawerOpen(true);
      setVisible(true);
    };
    
    window.addEventListener(OPEN_EVENT, handler);
    console.log('[CookieConsent] Listener attached');
    
    return () => {
      window.removeEventListener(OPEN_EVENT, handler);
      console.log('[CookieConsent] Listener removed');
    };
  }, [consent, base]);

  const captureUTMParams = (): Record<string, string> => {
    const params = new URLSearchParams(window.location.search);
    const utmData: Record<string, string> = {};
    
    [...UTMParams, YCLIDParam, GCLIDParam, FBParam, VKParam].forEach(param => {
      const value = params.get(param);
      if (value) {
        utmData[param] = value;
        sessionStorage.setItem(`last_${param}`, value);
        document.cookie = `${param}=${value}; path=/; max-age=31536000; SameSite=Lax`;
      }
    });
    
    return utmData;
  };

  useEffect(() => {
    if (testMode) {
      setVisible(true);
      return;
    }

    try {
      const raw = localStorage.getItem(storageKey);
      if (!raw) {
        setVisible(true);
        return;
      }

      const parsed = JSON.parse(raw) as Partial<CookieConsentState> | null;

      if (parsed?.necessary === true) {
        const isExpired = parsed.decidedAt && 
          new Date(parsed.decidedAt) < new Date(Date.now() - 365 * 24 * 60 * 60 * 1000);
        
        if (isExpired) {
          setVisible(true);
          return;
        }

        const normalized: CookieConsentState = {
          ...base,
          analytics: Boolean(parsed.analytics),
          marketing: Boolean(parsed.marketing),
          functional: Boolean(parsed.functional),
          utmData: parsed.utmData || {},
          decidedAt: typeof parsed.decidedAt === "string" ? parsed.decidedAt : null,
          necessary: true,
        };
        
        setConsent(normalized);
        setDraft(normalized);
        setVisible(false);
        
        onChange?.(normalized);
      } else {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, [testMode]);

  const save = (next: Partial<CookieConsentState>) => {
    const utmData = captureUTMParams();
    
    const payload: CookieConsentState = {
      ...base,
      ...consent,
      ...next,
      utmData: { ...utmData, ...consent.utmData, ...next.utmData },
      necessary: true,
      decidedAt: new Date().toISOString(),
    };
    
    setConsent(payload);
    setDraft(payload);
    
    localStorage.setItem(storageKey, JSON.stringify(payload));
    document.cookie = `${storageKey}=${encodeURIComponent(JSON.stringify(payload))}; path=/; max-age=31536000; SameSite=Lax`;
    
    setVisible(false);
    setDrawerOpen(false);
    onChange?.(payload);
  };

  const acceptAll = () => save({ 
    analytics: true, 
    marketing: true, 
    functional: showFunctional ? true : false 
  });
  
  const acceptNecessary = () => save({ 
    analytics: false, 
    marketing: false, 
    functional: false 
  });

  const openSettings = () => {
    setDraft(consent?.decidedAt ? consent : base);
    setDrawerOpen(true);
  };

  const toggle = (key: "analytics" | "marketing" | "functional") => {
    setDraft((p) => ({ ...p, [key]: !p[key] }));
  };

  if (!visible) {
    return testMode ? (
      <div 
        data-testid={`${testId}-hidden`}
        data-cookie-consent-status="hidden"
        data-cookie-consent-analytics={consent.analytics}
        data-cookie-consent-marketing={consent.marketing}
        data-cookie-consent-functional={consent.functional}
        data-cookie-consent-decided={consent.decidedAt || 'never'}
        style={{ display: 'none' }}
      />
    ) : null;
  }

  return (
    <>
      {/* compact bar */}
      {!drawerOpen && (
        <div 
          className={styles.cookieMiniBar}
          data-testid={`${testId}-bar`}
          data-cookie-consent-visible="true"
          data-cookie-consent-stage="bar"
        >
          <div className={styles.cookieMiniInner}>
            <div className={styles.cookieMiniRow}>
              <div className={styles.cookieMiniText}>
                <span className={styles.uiGoldText} style={{ fontWeight: 500 }}>
                  Cookies
                </span>
                — мы ценим вашу приватность. Используем cookies для аналитики и рекламы.
                <a 
                  className={styles.cookieLink} 
                  href={policyUrl}
                  data-testid={`${testId}-policy-link`}
                >
                  Подробнее
                </a>.
              </div>

              <div className={styles.cookieMiniActions}>
                <button 
                  className={styles.uiBtnGhost} 
                  onClick={openSettings}
                  data-testid={`${testId}-settings-button`}
                >
                  Настроить
                </button>
                <button 
                  className={`${styles.butT2} ${styles.uiBtnTiny}`} 
                  onClick={acceptNecessary}
                  data-testid={`${testId}-reject-button`}
                >
                  Только нужные
                </button>
                <button 
                  className={`${styles.butT1} ${styles.uiBtnTiny}`} 
                  onClick={acceptAll}
                  data-testid={`${testId}-accept-button`}
                >
                  Принять все
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* drawer */}
      {drawerOpen && (
        <div
          className={styles.uiOverlay}
          role="dialog"
          aria-modal="true"
          aria-label="Настройки cookies"
          data-testid={`${testId}-drawer`}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setDrawerOpen(false);
          }}
        >
          <div className={styles.uiDrawer}>
            <div className={styles.uiDrawerHead}>
              <div style={{ display: "grid", gap: 6 }}>
                <div style={{ fontSize: 18, fontWeight: 500 }}>
                  <span className={styles.uiGoldText}>Настройки cookies</span>
                </div>
                <div className={styles.cookieMiniText} style={{ maxWidth: 620 }}>
                  Обязательные cookies включены всегда. Остальные — по вашему выбору.
                </div>
              </div>
              <button 
                className={styles.uiClose} 
                onClick={() => setDrawerOpen(false)} 
                aria-label="Закрыть"
                data-testid={`${testId}-close-drawer`}
              >
                ×
              </button>
            </div>

            <div 
              className={styles.cookieOpt}
              data-testid={`${testId}-option-necessary`}
            >
              <div className={styles.cookieOptTop}>
                <div className={styles.cookieOptName}>Обязательные</div>
                <div className={styles.sw2} data-on="true" aria-disabled="true">
                  <div className={styles.sw2Dot} />
                </div>
              </div>
              <div className={styles.cookieOptDesc}>
                Нужны для корректной работы сайта (навигация, безопасность, формы).
              </div>
            </div>

            <div 
              className={styles.cookieOpt}
              data-testid={`${testId}-option-analytics`}
            >
              <div className={styles.cookieOptTop}>
                <div className={styles.cookieOptName}>Аналитика</div>
                <div
                  className={styles.sw2}
                  data-on={String(draft.analytics)}
                  role="switch"
                  aria-checked={draft.analytics}
                  tabIndex={0}
                  onClick={() => toggle("analytics")}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") toggle("analytics");
                  }}
                  data-testid={`${testId}-toggle-analytics`}
                >
                  <div className={styles.sw2Dot} />
                </div>
              </div>
              <div className={styles.cookieOptDesc}>
                Помогает понимать, что улучшать на сайте. Обезличенная статистика.
              </div>
            </div>

            <div 
              className={styles.cookieOpt}
              data-testid={`${testId}-option-marketing`}
            >
              <div className={styles.cookieOptTop}>
                <div className={styles.cookieOptName}>Маркетинг</div>
                <div
                  className={styles.sw2}
                  data-on={String(draft.marketing)}
                  role="switch"
                  aria-checked={draft.marketing}
                  tabIndex={0}
                  onClick={() => toggle("marketing")}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") toggle("marketing");
                  }}
                  data-testid={`${testId}-toggle-marketing`}
                >
                  <div className={styles.sw2Dot} />
                </div>
              </div>
              <div className={styles.cookieOptDesc}>
                Для оценки эффективности рекламы и персонализации предложений.
                Сохранение UTM-меток.
              </div>
            </div>

            {showFunctional && (
              <div 
                className={styles.cookieOpt}
                data-testid={`${testId}-option-functional`}
              >
                <div className={styles.cookieOptTop}>
                  <div className={styles.cookieOptName}>Синхронизация данных</div>
                  <div
                    className={styles.sw2}
                    data-on={String(draft.functional)}
                    role="switch"
                    aria-checked={draft.functional}
                    tabIndex={0}
                    onClick={() => toggle("functional")}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") toggle("functional");
                    }}
                    data-testid={`${testId}-toggle-functional`}
                  >
                    <div className={styles.sw2Dot} />
                  </div>
                </div>
                <div className={styles.cookieOptDesc}>
                  Актуальные остатки на складе, быстрая загрузка цен и наличия.
                </div>
              </div>
            )}

            <div 
              className={styles.drawerActions}
              data-testid={`${testId}-drawer-actions`}
            >
              <button 
                className={styles.uiBtnGhost} 
                onClick={acceptNecessary}
                data-testid={`${testId}-drawer-reject`}
              >
                Отклонить необязательные
              </button>
              <button 
                className={`${styles.butT2} ${styles.uiBtnTiny}`} 
                onClick={() => save(draft)}
                data-testid={`${testId}-drawer-save`}
              >
                Сохранить настройки
              </button>
              <button 
                className={`${styles.butT1} ${styles.uiBtnTiny}`} 
                onClick={acceptAll}
                data-testid={`${testId}-drawer-accept-all`}
              >
                Принять все
              </button>
            </div>

            <div className={styles.cookieMiniText} style={{ marginTop: 10, color: '#6b7280' }}>
              {siteName}:{" "}
              <a 
                className={styles.cookieLink} 
                href={policyUrl}
                data-testid={`${testId}-drawer-policy`}
              >
                политика конфиденциальности
              </a>
              {" • "}
              <a 
                className={styles.cookieLink} 
                href="/politika-cookies"
                data-testid={`${testId}-drawer-cookie-policy`}
              >
                управление cookies
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function openCookieSettings(): void {
  if (typeof window === 'undefined') return;
  
  console.log('[openCookieSettings] Called');
  
  try {
    window.dispatchEvent(new Event(OPEN_EVENT));
    console.log('[openCookieSettings] Event dispatched');
  } catch (e) {
    console.error('[openCookieSettings] Event error:', e);
  }
  
  setTimeout(() => {
    if (globalSetDrawerOpen) {
      console.log('[openCookieSettings] Using fallback direct call');
      globalSetDraft?.(globalConsent?.decidedAt ? globalConsent : globalBase);
      globalSetDrawerOpen(true);
    } else {
      console.log('[openCookieSettings] Component not mounted yet');
      sessionStorage.setItem('pending_cookie_settings', 'true');
    }
  }, 100);
}

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    VK?: any;
    mt?: (...args: any[]) => void;
    ct?: (...args: any[]) => void;
    _gaInitialized?: boolean;
    _gtmLoaded?: boolean;
  }
}