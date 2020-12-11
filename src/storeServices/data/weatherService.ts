import { Position } from '../models/position.interface';

export default class weatherService {
  selectedCity: string;
  description: string;
  temperature: number;
  icon: string;

  constructor() { }

  /**
   * Gets current user position
   * @returns current user position 
   */
  async getCurrentUserPosition(): Promise<Response> {
    let fetchedData: Promise<Response>; 

    await new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position: Position) => {
            resolve(position);
          },
          () => {
            reject('error');
            console.error(this.handleLocationError(true));
          }
        )
      } else {
        reject('error');
        console.error(this.handleLocationError(false));
      }
    }).then((position: Position) => {
      fetchedData = this.getWeatherByCoords(position);
    })

    return fetchedData; 
  }

  /**
   * Gets weather by coords
   * @param position 
   * @returns weather by coords 
   */
  getWeatherByCoords(position: Position): Promise<Response> {
    let fetchedWeather: Promise<Response> = null;

    try {
      fetchedWeather = fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=e7aadd779ff9063f45cbf092bdfd1636`);
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
      fetchedWeather = fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=e7aadd779ff9063f45cbf092bdfd1636`);
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

  /**
 * Handles location error
 * @param browserHasGeolocation 
 */
  private handleLocationError(browserHasGeolocation: boolean): string {
    return browserHasGeolocation ?
      "Error: The Geolocation service failed"
      : "Error: Your browser doesn't support geolocation.";
  }

  /**
   * Loads city to local storage
   */
  loadCityToLocalStorage(): void {
    window.localStorage.setItem('city', this.selectedCity);
  }
}