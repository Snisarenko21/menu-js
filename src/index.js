import menu from './menu.json';
import menuItem from './templates/menuitem.hbs';


const refs = {
    list: document.querySelector('.js-menu'),
    checkbox: document.querySelector('#theme-switch-toggle'),
    
};

// checkboxChange();
 updateOutput();
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
    
    // e.currentTarget.reset();

    localStorage.setItem('LOCALSTORAGE_KEY', JSON.stringify(Theme));
    updateOutput();

    if (!refs.checkbox.checked) {
        document.body.classList.add(Theme.LIGHT);
        document.body.classList.remove(Theme.DARK);
    }
    else {
        document.body.classList.remove(Theme.LIGHT);
        document.body.classList.add(Theme.DARK);
    }
}

function updateOutput() {

    // localStorage.setItem('LOCALSTORAGE_KEY', document.body.className);
    // localStorage.getItem('LOCALSTORAGE_KEY') || true;
    const updateChecked = localStorage.getItem('LOCALSTORAGE_KEY');
    if (updateChecked) {
        console.log(updateChecked);
        const parsedSettings = JSON.parse(updateChecked);
        console.log(parsedSettings);
    }
}    

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








