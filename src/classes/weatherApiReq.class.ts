import { Position } from '../core/models/position.interface';

export class HTTPWeatherApiReq {

  constructor() {

  }

  /**
     * Gets weather by coords
     * @param position 
     * @returns weather by coords 
     */
  getWeatherByCoords(position: Position): Promise<Response> {
    let fetchedWeather: Promise<Response> = null;

    try {
      fetchedWeather = fetch('http://api.openweathermap.org/data/2.5/weather?'
        + `lat=${position.coords.latitude}&lon=${position.coords.longitude}&`
        + 'units=metric&appid=e7aadd779ff9063f45cbf092bdfd1636');
    } catch (error) {
      throw Error('Error occured with fetch data of weather by coords -> ' + error);
    }

    return fetchedWeather;
  }

  /**
   * Gets weather by city name
   * @param city 
   * @returns  
   */

  getWeatherByCityName(city: string): Promise<Response> {
    let fetchedWeather: Promise<Response> = null;

    try {
      fetchedWeather = fetch('http://api.openweathermap.org/data/2.5/weather?'
        + `q=${city}&units=metric&appid=e7aadd779ff9063f45cbf092bdfd1636`);
    } catch (error) {
      throw Error('Error occured with fetch data of weather by city name -> ' + error);
    }

    return fetchedWeather;
  }

  /**
 * Gets icon of weather
 * @param icon 
 * @returns icon of weather 
 */
  getIconOfWeather(icon: string): Promise<Response> {
    let fetchedIconOfWeather: Promise<Response> = null;

    try {
      fetchedIconOfWeather = fetch(`http://openweathermap.org/img/wn/${icon}@2x.png`);
    } catch (error) {
      throw Error('Error occured with fetch icon of weather -> ' + error);
    }

    return fetchedIconOfWeather;
  }
  
}