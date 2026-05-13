'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

interface GeoLocationProps {
  onCityDetected: (city: string) => void;
  defaultCity?: string;
}

declare global {
  interface Window {
    ymaps: any;
    ym?: (...args: any[]) => void;
  }
}

export default function GeoLocation({ onCityDetected, defaultCity = 'Ульяновск' }: GeoLocationProps) {
  const [isReady, setIsReady] = useState(false);
  const [city, setCity] = useState<string | null>(null);

  useEffect(() => {
    if (!isReady) return;

    const detectCity = async () => {
      try {
        // Ждем загрузки API Яндекс.Карт
        await window.ymaps.ready();
        
        // Определяем город по IP (без запроса разрешения)
        window.ymaps.geolocation.get({
          provider: 'yandex',
          autoReverseGeocode: true
        }).then(
          (result: any) => {
            const geoObject = result.geoObjects.get(0);
            let detectedCity = geoObject.getLocalities?.[0];
            
            // Fallback если getLocalities не сработал
            if (!detectedCity) {
              const metaData = geoObject.properties.get('metaDataProperty');
              detectedCity = metaData?.GeocoderMetaData?.AddressDetails?.Country
                ?.AdministrativeArea?.SubAdministrativeArea?.Locality?.LocalityName;
            }
            
            const finalCity = detectedCity || defaultCity;
            setCity(finalCity);
            onCityDetected(finalCity);
            
            // Отправляем в Яндекс Метрику (если есть)
            if (window.ym) {
              window.ym(93515043, 'setUserParams', {
                'Город пользователя': finalCity
              });
            }
          },
          (error: any) => {
            console.error('Ошибка определения города:', error);
            setCity(defaultCity);
            onCityDetected(defaultCity);
          }
        );
      } catch (error) {
        console.error('Ошибка инициализации геолокации:', error);
        setCity(defaultCity);
        onCityDetected(defaultCity);
      }
    };

    detectCity();
  }, [isReady, defaultCity, onCityDetected]);

  return (
    <>
      {/* Подключаем API Яндекс.Карт */}
      <Script
        src="https://api-maps.yandex.ru/2.1/?apikey=ВАШ_API_КЛЮЧ&lang=ru_RU"
        strategy="afterInteractive"
        onLoad={() => setIsReady(true)}
      />
      
      {/* Скрытый элемент для хранения города (опционально) */}
      <input type="hidden" id="user-city" value={city || ''} />
    </>
  );
}