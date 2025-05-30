'use strict'
document.addEventListener("DOMContentLoaded", () => {
    console.log('Скрипт отработал корректно')
});

//прокрутка

document.addEventListener('DOMContentLoaded', function() {
  const designList = document.querySelector('.design_list');
  const designItems = document.querySelectorAll('.design_item');
  const prevButton = document.querySelector('.design_prev');
  const nextButton = document.querySelector('.design_next');
  const itemWidth = designItems[0].offsetWidth; // Ширина одного элемента
  let currentIndex = 0;

  // Функция для прокрутки списка
  function scrollToItem(index) {
    const translateX = -index * itemWidth;
    designList.style.transform = `translateX(${translateX}px)`;
  }

  // Обработчик для кнопки "Следующий"
  nextButton.addEventListener('click', function() {
    currentIndex = (currentIndex + 1) % designItems.length;
    scrollToItem(currentIndex);
  });

  // Обработчик для кнопки "Предыдущий"
  prevButton.addEventListener('click', function() {
    currentIndex = (currentIndex - 1 + designItems.length) % designItems.length;
    scrollToItem(currentIndex);
  });

  // Инициализация: показываем первый элемент
  scrollToItem(0);
});


//прокрутка отзывов
document.addEventListener('DOMContentLoaded', function() {
  const reviewItems = document.querySelectorAll('.review__item');
  const prevButton = document.querySelector('.review_prev');
  const nextButton = document.querySelector('.review_next');
  let currentIndex = 0;

  if (!reviewItems.length || !prevButton || !nextButton) {
    console.error("Не удалось найти все необходимые элементы.");
    return;
  }

  function showReview(index) {
    reviewItems.forEach((item, i) => {
      item.style.display = (i === index) ? 'block' : 'none';
    });
  }

  prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + reviewItems.length) % reviewItems.length;
    showReview(currentIndex);
  });

  nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % reviewItems.length;
    showReview(currentIndex);
  });

  // Изначально показываем первый отзыв
  showReview(currentIndex);
});



//для преподавателей
document.addEventListener('DOMContentLoaded', function() {
  const teacherItems = document.querySelectorAll('.teacher__item');

  teacherItems.forEach(item => {
    const image = item.querySelector('.teacher__image');
    const description = item.querySelector('.teacher__description');

    item.addEventListener('mouseenter', () => {
      image.style.opacity = 0;
      description.style.opacity = 1;
    });

    item.addEventListener('mouseleave', () => {
      image.style.opacity = 1;
      description.style.opacity = 0;
    });
  });
});

//фильтр карточек
document.addEventListener('DOMContentLoaded', function() {
  const filterButtons = document.querySelectorAll('.filter-button');
  const cardItems = document.querySelectorAll('.card_item');

  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      const filter = this.dataset.filter; // Получаем значение data-filter

      cardItems.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.style.display = 'block'; // Показываем элемент
        } else {
          item.style.display = 'none';  // Скрываем элемент
        }
      });
    });
  });
});




//настройки
document.addEventListener('DOMContentLoaded', function() {
  const settingsOverlay = document.getElementById('settingsOverlay');
  const openSettingsButton = document.getElementById('openSettings');
  const closeSettingsButton = document.getElementById('closeSettings');
  const themeSelect = document.getElementById('themeSelect');
  const body = document.body; // Получаем элемент body

  // Функция для открытия настроек
  function openSettings() {
    settingsOverlay.classList.add('active');
  }
  // Функция для закрытия настроек
  function closeSettings() {
    settingsOverlay.classList.remove('active');
  }
  // Функция для смены темы
  function setTheme(theme) {
    // Удаляем классы тем, чтобы избежать конфликтов
    body.classList.remove('light-theme', 'dark-theme');

    // Добавляем класс выбранной темы
    body.classList.add(theme + '-theme'); // Добавляем light-theme или dark-theme

    localStorage.setItem('theme', theme); // Сохраняем выбранную тему в localStorage
  }
  // Проверяем, была ли тема сохранена ранее
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    setTheme(savedTheme);
    themeSelect.value = savedTheme; // Устанавливаем выбранное значение в select
  } else {
    // Если тема не сохранена, устанавливаем начальную тему
    setTheme('light'); // Или 'dark', если хотите темную тему по умолчанию
  }

  // Открываем настройки при нажатии на кнопку
  openSettingsButton.addEventListener('click', openSettings);

  // Закрываем настройки при нажатии на кнопку
  closeSettingsButton.addEventListener('click', closeSettings);

  // Меняем тему при выборе значения в select
  themeSelect.addEventListener('change', function() {
    setTheme(this.value);
  });
});



//скролл
document.addEventListener('DOMContentLoaded', function() {
  const scrollToTopBtn = document.getElementById("scrollToTopBtn");

  // Показываем кнопку, когда прокручиваем страницу вниз на определенное расстояние
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      scrollToTopBtn.classList.add("show");
    } else {
      scrollToTopBtn.classList.remove("show");
    }
  });

  // Прокручиваем страницу вверх при клике на кнопку
  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth" // Плавная прокрутка
    });
  });
});





//для карточек
document.addEventListener('DOMContentLoaded', function() {
  const cardItems = document.querySelectorAll('.card_item');
  const popupOverlay = document.getElementById('popupOverlay');
  const successPopup = document.getElementById('successPopup');
  const popupClose = document.getElementById('popupClose');
  const successPopupClose = document.getElementById('successPopupClose');
  const popupForm = document.getElementById('popupForm');
  const popupCourseTitle = document.getElementById('popupCourseTitle');
  // Функция для открытия всплывающего окна
  function openPopup(courseTitle) {
    popupCourseTitle.textContent = "Запись на курс: " + courseTitle;
    popupOverlay.style.display = 'flex';
  }
  // Функция для закрытия всплывающего окна
  function closePopup() {
    popupOverlay.style.display = 'none';
    popupForm.reset();
  }
  // Функция для открытия всплывающего окна успеха
  function openSuccessPopup() {
    successPopup.style.display = 'flex';
  }
  // Функция для закрытия всплывающего окна успеха
  function closeSuccessPopup() {
    successPopup.style.display = 'none';
  }
  // Обработчик клика на карточки
  cardItems.forEach(item => {
    item.addEventListener('click', function() {
      const courseTitle = this.querySelector('.card_title').textContent;
      openPopup(courseTitle);
    });
  });
  // Обработчик клика на кнопку закрытия формы
  popupClose.addEventListener('click', closePopup);
  // Обработчик клика на кнопку закрытия окна успеха
  successPopupClose.addEventListener('click', closeSuccessPopup);
  // Обработчик отправки формы
  popupForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const action = event.submitter.dataset.action;

    console.log('Имя:', name);
    console.log('Почта:', email);
    console.log('Действие:', action);
    // Здесь можно добавить код для отправки данных формы на сервер
    closePopup();
    if (action === 'записаться') {  // Только если нажата кнопка "Записаться"
        openSuccessPopup();
    }
  });
  // Закрытие окна по клику вне его области (для формы)
  popupOverlay.addEventListener('click', function(event) {
    if (event.target === this) {
      closePopup();
    }
  });
  // Закрытие окна по клику вне его области (для успешного сообщения)
  successPopup.addEventListener('click', function(event) {
      if (event.target === this) {
          closeSuccessPopup();
      }
  });
});





//загрузчик экрана
document.addEventListener('DOMContentLoaded', function() {
  const preloader = document.querySelector('.preloader');

  // Function to fade out and remove preloader
  function fadeOutPreloader() {
    preloader.style.opacity = '0'; // Fade out
    setTimeout(() => {
      preloader.style.display = 'none'; // Hide after fade
      document.body.classList.remove('loading'); // Remove loading class
    }, 500); // Wait for opacity transition (0.5s)
  }

  // Make sure everything is loaded before fading
  window.addEventListener('load', () => {
    fadeOutPreloader();
  });

  // Add loading class to body on page load
  document.body.classList.add('loading');
});





