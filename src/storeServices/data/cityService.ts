export class city {
  selectedCity: string;

  /**
   * Loads city to local storage
   */
  loadCityToLocalStorage(): void {
    window.localStorage.setItem('city', this.selectedCity);
  }
}