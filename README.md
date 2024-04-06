## Инструкция по запуску проекта
1. Клонируйте репозиторий: `git clone https://github.com/ваш_локальный_репозиторий.git`
2. Перейдите в каталог проекта: `cd название_каталога`
3. Установите необходимые зависимости, выполнив команду:
   `npm install`
4. Запустите проект, используя команду:
   `npm run dev`
5. Откройте браузер и перейдите по адресу `http://localhost:3000` для просмотра приложения.

## Основные используемые технологии
- React
- Redux Toolkit
- Antd Design
- react-hook-form
- swiper
- axios
- usehooks-ts

## Backend
- Для авторизации и логики с "избранным" используется бэк https://github.com/NovikovIlya/MovieReactBackend
- Для получение информации о фильмах используется API кинопоиска: https://api.kinopoisk.dev/documentation

## Структура проекта:
* `/src/`:
    * `components/`: Компоненты приложения, такие как поисковая форма, карточки фильмов и скриншоты фильма.
    * `pages/`: Страницы приложения, такие как страница с  фильмами и страница выбором рандомных фильмов.
    * `store/`: Хранилище состояния приложения с помощью Redux.
    * `store/`: Хранилище типов
    * `hooks/`: Кастомные хуки
    * `index.js`: Точка входа приложения.
  
  
