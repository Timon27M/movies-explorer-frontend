# movies-explorer-frontend
-----------------------------------------------------------------------------------------
## Функционал
* пользователь получает сообщение в случае любой ошибки.
* вид шапки меняется в зависимости от авторизации.
* доступен на мобильных устройствах.
* сетка фильмов зависит от ширины экрана. При клике на кнопку «Ещё» отобразится такое количество фильмов, сколько их в сейчас отображается в одном ряду (3, 2 или 5).
* регистрация и авторизация пользователя.
* у всех интерактивных элементов есть анимация.
* при поиске текст запроса, найденные фильмы и состояние переключателя короткометражек сохраняются в хранилище.
* редактирование профиля (имя, электронная почта).
* при попытке перейти на любой защищённый роут происходит редирект на главную.
* если карточки уже были отображены на странице в блоке результатов, клик по чекбоксу «Короткометражки» приводит к повторной фильтрации результата.
* поля формы заблокированы во время отправки запросов, и у пользователя нет возможности отправить новый запрос до завершения предыдущего.
* все формы валидируются на стороне клиента, пользователь не может отправить запрос с невалидными данными.
* сохранение/удаление фильмов. При смене страниц отображаются актуальнные данные. На странице «Сохранённые» можно только удалять.
* если пользователь был авторизован и закрыл вкладку, он может вернуться сразу на любую страницу приложения по URL-адресу, кроме страниц авторизации и регистрации.
* при клике на постер фильма в новой вкладке открывает трейлер (если он есть).

## Технологии
* HTML
* CSS
  - Flexbox
  - Grid Layout
  - Adaptive UI
  - Media Queries
  - БЭМ
* JavaScript
  - Rest API
  - Асинхронность
  - использование локального хранилища
* React
  - Портирование разметки в JSX
  - Функциональные компоненты
  - React Router
  - работа с API
  - Хуки (useState, useEffect, useContext)
* Webpack

## Инструкция
* Создайте папку и перейдите в неё:
  `cd <Имя-папки>`
  
Figma-файл https://disk.yandex.ru/d/MnBw_rwwoFkfqQ

Ссылка на Pull request https://github.com/Timon27M/movies-explorer-frontend/pull/2

Ссылка на сайт https://tim2772.nomoredomains.work/

