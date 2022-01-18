const express = require("express");
const {
    getTopics
  } = require('./controllers/topics_controller');
const app = express();
app.use(express.json());

app.get('/api/topics', getTopics);

app.all("*", (req, res) => {
    res.status(404).send({ msg: "Invalid URL"});
});

app.use((err, req, res, next) => {
    if (err.code === "22P02") {
        res.status(400).send({ msg: "Bad Request"});
    } else {
        next(err);
    }
})

module.exports = app;
