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
//  перевіряю яка тема і залежності від стану чекбоксу із 42 рядка... стилі мають працювати. 
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

// ===Це об"єкт з темо, яку я буду зберігати до Локалсторіджу (в атрибуті чекед лежить або фолс, або тру, якщо чекнутий, тоді тру... За замовчуванням він фолс)=== 
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


// function updateOutput() {

//     // localStorage.setItem('LOCALSTORAGE_KEY', document.body.className);
//     // localStorage.getItem('LOCALSTORAGE_KEY') || true;
//     const updateChecked = localStorage.getItem('LOCALSTORAGE_KEY');
//     if (updateChecked) {
//         console.log(updateChecked);
//         const parsedSettings = JSON.parse(updateChecked);
//         console.log(parsedSettings);
//     }
// }    

//         refs.checkbox.value = updateChecked;




// (function(selector) {
//     // не дублируем код
//     function save(data) {
//         localStorage.setItem(selector, JSON.stringify(data));
//     }
//     // и не создаем тысячи функций в цикле
//     // а используем одну общую
//     function onChange(event) {
//         var element = event.target,
//             name = element.name,
//             value = element.value;
//         data[name] = value;
//         save(data);
//     }
//     var elements = document.querySelectorAll(selector),
//         data = localStorage.getItem(selector);
//     if(data) { // если в сторадже что-то есть
//         // то можем и распарсить
//         data = JSON.parse(data);
//     } else {
//         // иначе парсить нельзя, будет ошибка
//         // присвоим дефолтное значение и сохраним
//         save(data = {});
//     }
//     // вместо ненужного создания массива
//     // обратимся напрямую к прототипу
//     Array.prototype.forEach.call(elements, function(element) {
//         var name = element.name,
//             value = element.value;
//         if(data[name] === value) { // если текущий элемент отмечен в сторадже
//             // то отметим и на странице
//             element.checked = true;
//         }
//         // навесим созданый вне цикла хандлер на событие
//         element.addEventListener("change", onChange);        
//     });
// })








