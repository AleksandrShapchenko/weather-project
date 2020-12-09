import './style.scss';
import select from './Components/Select/componentSelect';
import { getCurrPositionUser } from './UtilsForWorkWithAPI/utils';

let city: string;

document.addEventListener('DOMContentLoaded', () => {
    customElements.define('component-select', select);

    getCurrPositionUser();

    // Запись последнего выбранного города в Local Storage
    window.addEventListener('beforeunload', () => {
        localStorage.setItem('city', city);
    })
})