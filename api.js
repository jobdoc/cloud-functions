var Joi = require('joi');

module.exports = function createApi(type, schema, controller) {
  return {
    add: function(req, res) {
      cors(req, res);
      Joi.validate(req.body, schema, function (err, value) {
        if (err) {
          return res.status(400).send('Request body doesn\'t match ' + type + ' schema!');
        }
        controller.insert(req.body, _handleApiResponse(res, 201));
      });
    },
    remove: function(req, res) {
      cors(req, res);
      if (!req.query.id || req.method !== 'DELETE') {
        res.status(400).send('No ' + type + ' id defined in query!');
      } else {
        var id = parseInt(req.query.id, 10);
        controller.delete(id, _handleApiResponse(res, 204));
      }
    },
    getAll: function(req, res) {
      cors(req, res);
      controller.getAll(_handleApiResponse(res));
    },
    get: function(req, res) {
      cors(req, res);
      if (!req.query.id) {
        res.status(400).send('No ' + type + ' id defined in query!');
      }
      var id = parseInt(req.query.id, 10)
      controller.get(id, _handleApiResponse(res));
    },
    update: function(req, res) {
      cors(req, res);
      if (!req.query.id) {
        res.status(400).send('No ' + type + ' id defined in query!');
      }
      Joi.validate(req.body, schema, function (err, value) {
        if (err) {
          return res.status(400).send('Request body doesn\'t match ' + type + ' schema!');
        }
        var id = parseInt(req.query.id, 10)
        controller.update(id, req.body, _handleApiResponse(res, 201));
      });
    },
  }
}


function cors(req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');

  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.send(200);
  }
}

function _handleApiResponse(res, successStatus) {
  return function(err, payload) {
    if (err) {
      console.error(err);
      res.status(err.code).send(err.message);
      return;
    }
    if (successStatus) {
      res.status(successStatus);
    }
    res.json(payload);
  };
};
