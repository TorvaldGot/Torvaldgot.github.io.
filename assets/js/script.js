// Функция для инициализации всех скриптов
document.addEventListener('DOMContentLoaded', function() {
    // Обработка формы обратной связи
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        initContactForm();
    }

    // Инициализация поиска в каталоге
    const searchInput = document.getElementById('groupSearch');
    if (searchInput) {
        initGroupSearch();
    }
});

// Обработка формы обратной связи
function initContactForm() {
    const form = document.getElementById('contactForm');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const messageInput = document.getElementById('message');
    const fileInput = document.getElementById('file');
    const fileStatus = document.getElementById('fileStatus');

    // Валидация email
    emailInput.addEventListener('input', function() {
        const email = emailInput.value.trim();
        if (email && !isValidEmail(email)) {
            emailInput.classList.add('is-invalid');
        } else {
            emailInput.classList.remove('is-invalid');
        }
    });

    // Валидация телефона
    phoneInput.addEventListener('input', function() {
        const phone = phoneInput.value.trim();
        if (phone && !isValidPhone(phone)) {
            phoneInput.classList.add('is-invalid');
        } else {
            phoneInput.classList.remove('is-invalid');
        }
    });

    // Валидация сообщения
    messageInput.addEventListener('input', function() {
        const message = messageInput.value.trim();
        if (message && message.length < 10) {
            messageInput.classList.add('is-invalid');
        } else {
            messageInput.classList.remove('is-invalid');
        }
    });

    // Отслеживание выбора файла
    fileInput.addEventListener('change', function() {
        if (this.files.length > 0) {
            fileStatus.textContent = `Выбран файл: ${this.files[0].name}`;
        } else {
            fileStatus.textContent = 'Файл не выбран';
        }
    });

    // Обработка отправки формы
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        const phone = phoneInput.value.trim();
        const message = messageInput.value.trim();
        const file = fileInput.files[0];

        // Проверка валидности
        const isEmailValid = isValidEmail(email);
        const isPhoneValid = !phone || isValidPhone(phone); // Телефон не обязателен
        const isMessageValid = message.length >= 10;

        // Пометка невалидных полей
        if (!isEmailValid) emailInput.classList.add('is-invalid');
        if (!isPhoneValid) phoneInput.classList.add('is-invalid');
        if (!isMessageValid) messageInput.classList.add('is-invalid');

        if (isEmailValid && isPhoneValid && isMessageValid) {
            // Логирование данных в консоль
            console.log('Данные формы:');
            console.log('Email:', email);
            console.log('Телефон:', phone || 'не указан');
            console.log('Сообщение:', message);
            if (file) {
                console.log('Файл:', file.name, file.type, `${(file.size / 1024).toFixed(2)} KB`);
            }

            // Показ модального окна об успехе
            showModal('Успех!', 'Ваше сообщение успешно отправлено. Мы свяжемся с вами в ближайшее время.');

            // Очистка формы
            form.reset();
            fileStatus.textContent = 'Файл не выбран';
            
            // Сброс классов валидации
            emailInput.classList.remove('is-invalid');
            phoneInput.classList.remove('is-invalid');
            messageInput.classList.remove('is-invalid');
        } else {
            // Показ модального окна об ошибке
            showModal('Ошибка', 'Пожалуйста, заполните все обязательные поля корректно. Сообщение должно содержать не менее 10 символов.');
        }
    });
}

// Инициализация поиска в каталоге
function initGroupSearch() {
    const searchInput = document.getElementById('groupSearch');
    const groupCards = document.querySelectorAll('.group-card');

    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.trim().toLowerCase();
        
        groupCards.forEach(card => {
            const title = card.querySelector('.card-title').textContent.toLowerCase();
            const description = card.querySelector('.card-text').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// Валидация email
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Валидация телефона
function isValidPhone(phone) {
    const re = /^(\+7|8)[\s-]?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/;
    return re.test(phone);
}

// Показ модального окна
function showModal(title, message) {
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    
    modalTitle.textContent = title;
    modalBody.textContent = message;
    
    const modal = new bootstrap.Modal(document.getElementById('messageModal'));
    modal.show();
}