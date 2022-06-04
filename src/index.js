import menu from './menu.json';
import menuItem from './templates/menuitem.hbs';

const THEME_LOCALSTORAGE_KEY = 'theme';
const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

const refs = {
    list: document.querySelector('.js-menu'),
    checkbox: document.querySelector('#theme-switch-toggle'),
    
};

function createMarkup(menu) {
    // const markup = menu.map(cardMarkup).join('');
    const markup =  menuItem(menu);
    refs.list.insertAdjacentHTML('beforeend', markup);
}
createMarkup(menu);

refs.checkbox.addEventListener('change', oncheckboxChange);

// повісила слухача події на віндоу. подія - load (коли сторінка завантажиться, то відбудеться ця подія і я її зловлю і оброблю)
window.addEventListener('load', onWindowLoadGetTheme);
 
// створила функцію, якою буду обробляти подію load і буду завантажувати із сторіджу тему===
function onWindowLoadGetTheme() {
    const { theme } = load(THEME_LOCALSTORAGE_KEY);
    // це те саме, аби я написала const curenttheme = load(THEME_LOCALSTORAGE_KEY):
    // запис curenttheme.theme =  const { theme } = load(THEME_LOCALSTORAGE_KEY);

    // якщо значення чекбоксу тру, то буде тема темна...
    refs.checkbox.checked = theme === 'dark';
    console.log(theme);
//  перевіряю яка тема і в залежності від стану чекбоксу із 42 рядка... стилі мають працювати. 
    if (!refs.checkbox.checked) {
        document.body.classList.add(Theme.LIGHT);
        document.body.classList.remove(Theme.DARK);   
    }
    else {
        document.body.classList.remove(Theme.LIGHT);
        document.body.classList.add(Theme.DARK);
    }
}

function oncheckboxChange(e) {
    e.preventDefault();

// ===Це об"єкт з темою, яку я буду зберігати до Локалсторіджу (в атрибуті чекед лежить або фолс, або тру, якщо чекнутий, тоді тру... За замовчуванням він фолс)=== 
    const currentTheme = {
        theme: refs.checkbox.checked ? 'dark' : 'light',
        // це те саме, як theme: e.currentTarget.checked ?'dark' : 'light',
}
    if (!refs.checkbox.checked) {
        document.body.classList.add(Theme.LIGHT);
        document.body.classList.remove(Theme.DARK);   
    }
    else {
        document.body.classList.remove(Theme.LIGHT);
        document.body.classList.add(Theme.DARK);
    }
    // зберігаю об"єкт з темою до Локалсторіджу===
    save(THEME_LOCALSTORAGE_KEY, currentTheme);
}

function save (key, value) {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error("Set state error: ", error.message);
  }
};

function load  (key) {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error("Get state error: ", error.message);
  }
};





// import menueData from './js/menu.json';
// import menueTpl from './templates/list-render.hbs';
// console.log('menueTpl :>> ', menueTpl);

// const Theme = {
//   LIGHT: 'light-theme',
//   DARK: 'dark-theme',
// };

// const KEY = 'theme';

// const refs = {
//   menu: document.querySelector('.js-menu'),
//   switcher: document.getElementById('theme-switch-toggle')
// }

// refs.menu.insertAdjacentHTML('beforeend', menueTpl(menueData));
// refs.switcher.addEventListener('change', changeThemeAndSetLocalSrorage);

// function changeThemeAndSetLocalSrorage(e) {
//   if (e.target.checked) {
//     document.body.classList.remove(Theme.LIGHT);
//     document.body.classList.add(Theme.DARK)
//   } else {
//     document.body.classList.remove(Theme.DARK);
//     document.body.classList.add(Theme.LIGHT)
//   }
//   localStorage.setItem('theme', document.body.className)
// }


// const localStorageVerify = () => {
//   if (!localStorage.getItem(KEY) || localStorage.getItem(KEY) === `${Theme.LIGHT}`) {
//     document.body.classList.add(Theme.LIGHT);
//     refs.switcher.checked = false;
//   }
//   else {
//     document.body.classList.add(localStorage.getItem(KEY))  
//     refs.switcher.checked = true;
//   }
// } 
// localStorageVerify();
