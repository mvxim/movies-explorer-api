# movies-explorer-api

Репозиторий для бекенда дипломного проекта. Управляет авторизацией. Сохраняет понравившиеся фильмы.

### Эндпоинты
* возвращает информацию о пользователе (email и имя):  
GET, `/users/me`

* обновляет информацию о пользователе (email и имя):  
PATCH, `/users/me`

* возвращает все сохранённые текущим пользователем фильмы:  
GET, `/movies`

* создаёт фильм с переданными в теле данными:  
POST, `/movies`

* удаляет сохранённый фильм по id:  
DELETE, `/movies/_id`

Фронтенд: [https://github.com/mvxim/movies-explorer-frontend](https://github.com/mvxim/movies-explorer-frontend) <br>

Деплой проекта на Яндекс
Облаке: [https://mvxim.nomoredomains.work](https://mvxim.nomoredomains.work) <br>
IP: 51.250.16.170
