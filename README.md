# Northcoders News API

![image](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![image](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![image](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![image](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)
![image](https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white)

## Website [Hosted Link](https://dans-nc-news-project.herokuapp.com/api)

## Table of contents
* [Background](#background)
* [Technologies](#technologies)
* [Setup](#setup) 
---
## Background
This is my first solo project for the Northcoders coding bootcamp. This is an API for a news article website (ie. reddit) in which users can view, sort and upvote articles as well as adding and deleting comments. 

---
## Technologies
This project is created with: 

* Javascript
* Node
* Node-postgres
* PSQL
* Express
* Jest
* Heroku
---
## Setup

### Prerequisites

- Node.js 17.x [Node.js](https://nodejs.org/en/)
- PostgreSQL 12.9 [psql](https://www.postgresql.org/)

### Dependencies
- cors 2.x [cors](https://www.npmjs.com/package/cors)
- dotenv 14.x [dotenv](https://www.npmjs.com/package/dotenv)
- express 4.x [express](https://www.npmjs.com/package/express)
- pg 8.x [node-postgres](https://www.npmjs.com/package/pg)
- pg-format 1.x [pg-format](https://www.npmjs.com/package/pg-format)

### Dev Dependencies

- jest 27.x [jest](https://www.npmjs.com/package/jest)
- supertest 6.x [supertest](https://npmjs.com/package/supertest)<br><br>

### **Cloning the repositry:**

- In your teminal:

```
$ git clone https://github.com/dweverson/nc_news_heroku.git
$ cd nc-news-heroku
``` 
### **Installing dependencies:**

- Initialise Node by installing the required dependencies from `package.json`. In your terminal:

```
$ npm install
```

### **Environment setup:**

- You will need to create _two_ `.env` files for the app: `.env.test` and `.env.development`. Into each, add `PGDATABASE = nc_news` for the `.env.development` file and `PGDATABASE = nc_news_test` for the `.env.test` file.

### **Database set-up and seeding:**

- To begin testing or using this app, you will need to setup the database seed it with data. In your terminal:

```
$ npm run setup-dbs
$ npm run seed
```

### **Testing**

- `Jest` is the framework used to test this application.
- To run tests, in your terminal:

```
$ npm test
```
### **Run Server**

- To run the server and api locally, click the link provided from this command in your terminal:

```
$ npm run dev
```

