import menu from './menu.json';
import menuItem from './templates/menuitem.hbs';


const refs = {
    list: document.querySelector('.js-menu'),
    checkbox: document.querySelector('#theme-switch-toggle'),

};

const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

function createMarkup(menu) {
    // const markup = menu.map(cardMarkup).join('');
    const markup =  menuItem(menu);
    refs.list.insertAdjacentHTML('beforeend', markup);
}
createMarkup(menu);

refs.checkbox.addEventListener('change', oncheckboxChange);

function oncheckboxChange() {
    if (!refs.checkbox.checked) {
        document.body.classList.add(Theme.LIGHT);
        document.body.classList.remove(Theme.DARK);
    }
    else {
        document.body.classList.remove(Theme.LIGHT);
        document.body.classList.add(Theme.DARK);
        
    }
        
}