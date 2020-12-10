export class city {
  selectedCity: string;

  loadCityToLocalStorage(): void {
    window.localStorage.setItem('city', this.selectedCity);
  }
}