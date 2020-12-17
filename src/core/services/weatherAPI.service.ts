import { Position } from '../models/position.interface';

// import URL constants
import { environment as baseIconURL } from '../../environments/icon';
import { environment as baseWeatherURL } from '../../environments/weather';
import { id } from '../../environments/appid';

export class HTTPWeatherApiReq {

  constructor() {
  }

  /**
     * Gets weather by coords
     * @param position 
     * @returns weather by coords 
     */
  async getWeatherByCoords(position: Position): Promise<Response> {
    try {
      // наверное вся проблема с селектом была здесь (нужно вывести fetch на общий патерн приложения)
      return await fetch(baseWeatherURL.baseURL +
        `lat=${position.coords.latitude}&lon=${position.coords.longitude}&` +
        `units=metric&appid=${id}`);
    } catch (error) {
      throw Error('Error occured with fetch data of weather by coords -> ' + error);
    }
  }

  /**
   * Gets weather by city name
   * @param city 
   * @returns  
   */
  async getWeatherByCityName(city: string): Promise<Response> {
    try {
      return await fetch(baseWeatherURL.baseURL + `q=${city}&units=metric&appid=${id}`);
      } catch (error) {
      throw Error('Error occured with fetch data of weather by city name -> ' + error);
    }
  }

  /**
 * Gets icon of weather
 * @param icon 
 * @returns icon of weather 
 */
  async getIconOfWeather(icon: string): Promise<Response> {
    try {
      return await fetch(baseIconURL.baseURL + `${icon}@2x.png`);
    } catch (error) {
      throw Error('Error occured with fetch icon of weather -> ' + error);
    }
  }
  
}