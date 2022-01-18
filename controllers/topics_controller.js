const { selectTopics } = require('../models/topics_model.js');

exports.getTopics = (req, res, next) => {
     selectTopics().then((topics) => {
       if (topics) {
       res.status(200).send({ topics }); 
       } else {
         return Promise.reject({ status: 404, msg: "Not Found"});
       }
      })
      .catch((err) => {
        next(err);
        });
    };