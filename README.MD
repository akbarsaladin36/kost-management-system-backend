<h1 align="center">Portofolio - Kost Management System Backend API</h1>

This API is created by me for portofolio that will be used as backend for my app, Kost Management System. This API use Express as Nodejs framework and MySQL as store database. [More about Express](https://en.wikipedia.org/wiki/Express.js)

## Built With

[![Express.js](https://img.shields.io/badge/Express.js-5.x-orange.svg?style=rounded-square)](https://expressjs.com/en/starter/installing.html)
[![Node.js](https://img.shields.io/badge/Node.js-v.23.x-green.svg?style=rounded-square)](https://nodejs.org/)


## Requirements

1. <a href="https://nodejs.org/en/download/">Node Js</a>
2. Node_modules
3. <a href="https://swagger.io/">Swagger</a>
4. Web Server (ex. localhost)

## How to run the app ?

1. Open app's directory in CMD or Terminal
2. Type `npm install`
3. Make new file a called **.env**, set up first [here](#set-up-env-file)
4. Turn on Web Server and MySQL can using Third-party tool like xampp, etc.
5. Create a database with the name #nama_database, and Import file sql to **phpmyadmin**
6. Open Postman desktop application or Chrome web app extension that has installed before
7. Choose HTTP Method and enter request url.(ex. localhost:3000/)
8. You can see all the end point [here](http://localhost:3021/kost-management-system/api-docs)
9. Type `npm start` to activated the server.

## Set up .env file

Open .env file on your favorite code editor, and copy paste this code below :

```
SERVER_NAME = <YOUR APP SERVER NAME>
SERVER_PORT = <YOUR APP SERVER PORT>
SERVER_API_DOCUMENTATION_URL = <YOUR APP SERVER API DOCUMENTATION URL>
SERVER_URL = <YOUR APP SERVER API URL>
DB_HOST= <YOUR DATABASE HOST>
DB_USER= <YOUR DATABASE USERNAME>
DB_PASSWORD= <YOUR DATABASE PASSWORD>
DB_DATABASE= <YOUR DATABASE NAME>
JWT_SECRET_KEY = <YOUR JWT SECRET KEY>
JWT_EXPIRE_TIME = <YOUR JWT EXPIRE TIME>
```

## Feature

1. Login and Register API
2. Admin API :
    1. Users
    2. Rooms
    3. Transactions
3. User API :
    1. Rooms (Get All Rooms and Show Room Detail)
    2. Transactions (Get All Transactions, Show Transaction Detail, and Create Transaction)
3. Owner API :
    1. Rooms
    2. Transactions (Get All Transactions, and Show Transaction Detail)

## License

© [Muhammad Akbar Saladin Siregar](https://github.com/akbarsaladin36/)
