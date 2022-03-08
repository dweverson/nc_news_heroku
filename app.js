const cors = require('cors');
const express = require("express");
const { handle404s, handlesPsqlErrors, handleCustomErrors, handleServerErrors } = require('./errors/error')
const endpoints = require('./endpoints.json');
const apiRouter = require('./routers/api.router')

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', apiRouter);

app.get('/api', (req, res, next) => {
    res.send(endpoints);
})

app.all("*", handle404s)

app.use(handlesPsqlErrors)
app.use(handleCustomErrors)
app.use(handleServerErrors)

module.exports = app;
