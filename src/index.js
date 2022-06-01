import menu from './menu.json';
import menuItem from './templates/menuitem.hbs';


const refs = {
    list: document.querySelector('.js-menu'),
    checkbox: document.querySelector('#theme-switch-toggle'),
    
};

checkboxChange();

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

function oncheckboxChange(e) {
    e.preventDefault();
    
    const change = e.currentTarget.value;

    localStorage.setItem('LOCALSTORAGE_KEY', change);

    // e.currentTarget.reset();

    if (!refs.checkbox.checked) {
        document.body.classList.add(Theme.LIGHT);
        document.body.classList.remove(Theme.DARK);
    }
    else {
        document.body.classList.remove(Theme.LIGHT);
        document.body.classList.add(Theme.DARK);
    }
}
    
function checkboxChange() {
    const updateChecked = localStorage.getItem('LOCALSTORAGE_KEY');
    if (updateChecked) {
        console.log(updateChecked);
        refs.checkbox.value = updateChecked;
    }
}

