# movies-explorer-frontend
-----------------------------------------------------------------------------------------
## Функционал
* доступен на мобильных устройствах,
* у всех интерактивных элементов есть анимация,
* регистрация и авторизация пользователя,
* вид шапки меняется в зависимости от авторизации,
* пользователь получает сообщение в случае любой ошибки,
* при поиске текст запроса, найденные фильмы и состояние переключателя короткометражек сохраняются в хранилище,
* поля формы заблокированы во время отправки запросов, и у пользователя нет возможности отправить новый запрос до завершения предыдущего,
* все формы валидируются на стороне клиента, пользователь не может отправить запрос с невалидными данными,
* редактирование профиля (имя, электронная почта),
* пользователю отображается уведомление об успешном запросе к серверу при сохранении профиля,
* если на странице редактирования профиля введённая информация соответствует текущим данным пользователя, кнопка «Сохранить» заблокирована и нельзя отправить запрос сохранения,
* прелоадер крутится во время выполнения запроса фильмов,
* если карточки уже были отображены на странице в блоке результатов, клик по чекбоксу «Короткометражки» приводит к повторной фильтрации результата,
* для оптимизации запрос на получение всех фильмов выполняется только один раз, после чего они сохраняются в локальном хранилище,
* сетка фильмов зависит от ширины экрана. При клике на кнопку «Ещё» отобразится такое количество фильмов, сколько их в сейчас отображается в одном ряду (3, 2 или 5).
* сохранение/удаление фильмов. При смене страниц отображаются актуальнные данные. На странице «Сохранённые» можно только удалять,
* при клике на постер фильма в новой вкладке открывает трейлер (если он есть),
* при попытке перейти на любой защищённый роут происходит редирект на главную,
* если пользователь был авторизован и закрыл вкладку, он может вернуться сразу на любую страницу приложения по URL-адресу, кроме страниц авторизации и регистрации,
при попытке перейти на несуществующую страницу происходит редирект на страницу «404».
*
*
*
*
*
*
*
*
*


Figma-файл https://disk.yandex.ru/d/MnBw_rwwoFkfqQ

Ссылка на Pull request https://github.com/Timon27M/movies-explorer-frontend/pull/2

Ссылка на сайт https://tim2772.nomoredomains.work/

