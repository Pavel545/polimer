// app/api/detect-city/route.ts
import { CITIES } from '@/config/cities';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Получаем параметр test из URL для тестирования разных городов
    const { searchParams } = new URL(request.url);
    const testCity = searchParams.get('test');
    
    // Для тестирования - можно передать город параметром
    if (testCity && process.env.NODE_ENV === 'development') {
      const mockCity = CITIES[testCity.toLowerCase()];
      if (mockCity) {
        return NextResponse.json({
          success: true,
          city: mockCity,
          detected: true,
          mock: true
        });
      }
    }
    
    // Получаем IP пользователя
    const forwardedFor = request.headers.get('x-forwarded-for');
    const ip = forwardedFor ? forwardedFor.split(',')[0] : null;
    
    // МОК ДЛЯ ТЕСТИРОВАНИЯ - без реального API
    // Можно закомментировать этот блок, когда появится ключ
    if (!process.env.YANDEX_GEOCODER_API_KEY || process.env.NODE_ENV === 'development') {
      // Имитация определения города по IP
      const mockCities = ['саратов', 'волгоград', 'саранск', 'казань'];
      const randomCity = mockCities[Math.floor(Math.random() * mockCities.length)];
      const mockCityData = CITIES[randomCity] || CITIES['волгоград'];
      
      return NextResponse.json({
        success: true,
        city: mockCityData,
        detected: true,
        mock: true,
        rawCityName: mockCityData.city
      });
    }
    
    // Реальный запрос к API (будет работать когда появится ключ)
    const response = await fetch(
      `https://geocode-maps.yandex.ru/1.x/?apikey=${process.env.YANDEX_GEOCODER_API_KEY}&geocode=${ip || '91.106.175.45'}&format=json`,
      { next: { revalidate: 3600 } }
    );
    
    const data = await response.json();
    const address = data?.response?.GeoObjectCollection?.featureMember?.[0]?.GeoObject?.metaDataProperty?.GeocoderMetaData?.AddressDetails;
    
    let detectedCityName = '';
    
    if (address) {
      const country = address.Country;
      const adminArea = country?.AdministrativeArea;
      const subAdminArea = adminArea?.SubAdministrativeArea;
      const locality = subAdminArea?.Locality;
      
      detectedCityName = locality?.LocalityName || adminArea?.AdministrativeAreaName || '';
    }
    
    // Нормализуем название города для поиска в CITIES
    const normalizedCityName = detectedCityName.toLowerCase();
    
    // Ищем город в CITIES
    let cityData = null;
    for (const [key, city] of Object.entries(CITIES)) {
      if (normalizedCityName.includes(key) || key.includes(normalizedCityName) || 
          city.city.toLowerCase() === normalizedCityName) {
        cityData = city;
        break;
      }
    }
    
    // Если город не найден в CITIES, возвращаем root
    if (!cityData) {
      cityData = {
        key: "root",
        subdomain: "",
        city: "Ульяновск",
        region: "Ульяновская область",
        titleIn: "",
        titleOnly: "Ульяновск",
        metrikaId: 107705030,
        host: "73полимер.рф",
      };
    }
    
    return NextResponse.json({
      success: true,
      city: cityData,
      detected: true,
      rawCityName: detectedCityName
    });
  } catch (error) {
    console.error('Error detecting city:', error);
    
    // Возвращаем город по умолчанию в случае ошибки
    const defaultCity = {
      key: "root",
      subdomain: "",
      city: "Ульяновск",
      region: "Ульяновская область",
      titleIn: "",
      titleOnly: "Ульяновск",
      metrikaId: 107705030,
      host: "73полимер.рф",
    };
    
    return NextResponse.json({
      success: true, // Важно: true чтобы модалка показалась
      city: defaultCity,
      detected: true,
      fallback: true
    });
  }
}