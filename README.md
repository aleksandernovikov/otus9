# Сборка UI с помощью webpack, форма логина и регистрации

#### Цель: Сборка UI с помощью webpack, форма логина и регистрации, проксирование вызовов на back-end 

https://github.com/ydvorzhetskiy/web-python-l19

https://otus.ru/nest/post/298/

https://github.com/owais/django-webpack-loader


# Начальные действия

* переходим в корень проекта
* устанавливаем зависимости python `pip install -r requirements.txt`
* выполняем миграции БД `./manage.py migrate`
* запускаем бек часть `./manage.py runserver`
* переходим в папку frontend `cd frontend`
* устанавливаем зависимости nodejs `npm i`
* запускаем webpack-dev-server с проксированием на бек `npm run proxy`
* в браузере по адресу http://0.0.0.0:3001/ тестируем функционал