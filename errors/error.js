

exports.handle404s = (req, res) => {
    res.status(404).send({ msg: "Invalid URL"});
};

exports.handlesPsqlErrors = (err, req, res, next) => {
    if (err.code === '22P02' || err.code === '23502' || err.code === '23503') {
        res.status(400).send({ msg: "Bad request" });
    } else {
        next(err);
    }
}

exports.handleCustomErrors = (err, req, res, next) => {
    if (err.status && err.msg) {
        res.status(err.status).send({ msg: err.msg });
    } else {
        next(err);
    }
}

exports.handleServerErrors = (err, req, res, next) => {
    if (err) {
        res.status(500).send({ msg: "Internal server error" });
    } else {
        next(err);
    }
}