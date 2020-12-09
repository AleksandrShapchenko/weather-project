import './style.scss';
import { ModalComponent } from './components/modalComponent.class';
import select from './Components/Select/componentSelect';
import { getCurrPositionUser } from './UtilsForWorkWithAPI/utils';

let city: string;

document.addEventListener('DOMContentLoaded', () => {
    customElements.define('component-select', select);
    // Обьявление компонента модалки
    customElements.define('modal-component', ModalComponent);

    getCurrPositionUser();

    // Запись последнего выбранного города в Local Storage
    window.addEventListener('beforeunload', () => {
        localStorage.setItem('city', city);
    })
})
