import './style.scss';
import { ModalComponent } from './components/modalComponent.class';
import select from './Components/Select/componentSelect';
import { getCurrPositionUser } from './UtilsForWorkWithAPI/utils';
import { city as cityClass } from './storeServices/data/cityService';

export let city: cityClass;

document.addEventListener('DOMContentLoaded', () => {
    city = new cityClass();

    // Обьявление компонента select
    customElements.define('component-select', select);

    // Обьявление компонента модалки
    customElements.define('modal-component', ModalComponent);

    getCurrPositionUser();

    // Запись последнего выбранного города в Local Storage
    window.addEventListener('beforeunload', () => {
        city.loadCityToLocalStorage();
    })
})
