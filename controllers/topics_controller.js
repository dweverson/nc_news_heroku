const { selectTopics } = require('../models/topics_model.js');

exports.getTopics = (req, res) => {
     
     selectTopics().then((topics) => {
       res.status(200).send({ topics }) 
      })
    };