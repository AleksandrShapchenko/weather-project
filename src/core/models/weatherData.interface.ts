import { weather } from './weather.interface';

export interface WeatherData {
    base: string;
    clouds: {
        all: number,
    };
    cod: number;
    coord: {
        lon: number,
        lat: number
    };
    dt: number;
    id: number;
    main: {
        temp: number,
        feels_like: number,
        temp_min: number,
        temp_max: number,
        pressure: number,
    };
    name: string;
    snow: {
        '1h': number
    };
    sys: {
        type: number,
        id: number,
        country: string,
        sunrise: number,
        sunset: number
    };
    timezone: number;
    visibility: number;
    weather: weather;
    wind: {
        speed: number,
        deg: number,
    }
}