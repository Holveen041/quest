// Конфигурация
const ADMIN_PASSWORD = "admin123"; // Пароль админа по умолчанию
let passwordsDB = JSON.parse(localStorage.getItem('passwordsDB')) || {};

// Элементы DOM
const codeInput = document.getElementById('codeInput');
const checkBtn = document.getElementById('checkBtn');
const hintContainer = document.getElementById('hintContainer');
const hintText = document.getElementById('hintText');

const adminPassInput = document.getElementById('adminPassInput');
const newPassInput = document.getElementById('newPassInput');
const newHintInput = document.getElementById('newHintInput');
const addBtn = document.getElementById('addBtn');
const removeBtn = document.getElementById('removeBtn');

// Инициализация базы данных
function initDB() {
    if (!localStorage.getItem('passwordsDB')) {
        passwordsDB = {
            "12345": "Пример подсказки: всегда смотрите на вещи под разными углами",
            "qwerty": "Пример подсказки: старая добрая раскладка"
        };
        saveDB();
    }
}

// Сохранение в localStorage
function saveDB() {
    localStorage.setItem('passwordsDB', JSON.stringify(passwordsDB));
}

// Проверка пароля
function checkPassword() {
    const enteredCode = codeInput.value.trim();
    
    if (passwordsDB[enteredCode]) {
        // Правильный пароль
        checkBtn.classList.add('success');
        setTimeout(() => {
            checkBtn.classList.remove('success');
            showHint(passwordsDB[enteredCode]);
            setTimeout(hideHint, 5000);
        }, 500);
    } else {
        // Неправильный пароль
        checkBtn.classList.add('error');
        setTimeout(() => {
            checkBtn.classList.remove('error');
            codeInput.value = '';
            codeInput.focus();
        }, 500);
        hideHint();
    }
}

// Добавление пароля
function addPassword() {
    const adminPass = adminPassInput.value.trim();
    const newPass = newPassInput.value.trim();
    const newHint = newHintInput.value.trim();
    
    if (adminPass !== ADMIN_PASSWORD) {
        showAdminError("Неверный пароль админа!");
        return;
    }
    
    if (!newPass || !newHint) {
        showAdminError("Заполните все поля!");
        return;
    }
    
    passwordsDB[newPass] = newHint;
    saveDB();
    
    showAdminSuccess(`Пароль "${newPass}" добавлен!`);
    clearAdminInputs();
}

// Удаление пароля
function removePassword() {
    const adminPass = adminPassInput.value.trim();
    const passToRemove = newPassInput.value.trim();
    
    if (adminPass !== ADMIN_PASSWORD) {
        showAdminError("Неверный пароль админа!");
        return;
    }
    
    if (!passToRemove) {
        showAdminError("Введите пароль для удаления!");
        return;
    }
    
    if (!passwordsDB[passToRemove]) {
        showAdminError("Пароль не найден!");
        return;
    }
    
    delete passwordsDB[passToRemove];
    saveDB();
    
    showAdminSuccess(`Пароль "${passToRemove}" удален!`);
    clearAdminInputs();
}

// Вспомогательные функции
function showHint(text) {
    hintText.textContent = text;
    hintContainer.classList.add('hint-visible');
}

function hideHint() {
    hintContainer.classList.remove('hint-visible');
}

function showAdminError(message) {
    addBtn.classList.add('error');
    setTimeout(() => addBtn.classList.remove('error'), 500);
    alert(message);
}

function showAdminSuccess(message) {
    addBtn.classList.add('success');
    setTimeout(() => addBtn.classList.remove('success'), 500);
    alert(message);
}

function clearAdminInputs() {
    adminPassInput.value = '';
    newPassInput.value = '';
    newHintInput.value = '';
}

// Обработчики событий
document.addEventListener('DOMContentLoaded', initDB);
checkBtn.addEventListener('click', checkPassword);
codeInput.addEventListener('keypress', (e) => e.key === 'Enter' && checkPassword());
addBtn.addEventListener('click', addPassword);
removeBtn.addEventListener('click', removePassword);