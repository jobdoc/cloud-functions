var selections = require('./selections');

exports.addSelection = function addSelection (req, res) {
  cors(req, res);
  if (req.body === undefined || !req.body.name || !req.body.product) {
    res.status(400).send('No selection defined!');
  } else {
    // Everything is ok
    selections.insert(req.body, _handleApiResponse(res, 201));
  }
};

exports.removeSelection = function removeSelection (req, res) {
  cors(req, res);
  if (!req.query || req.method !== 'DELETE') {
    res.status(400).send('No selection id defined in query!')
  } else {
    var id = parseInt(req.query.id, 10);
    selections.delete(id, _handleApiResponse(res, 204));
  }
}

exports.getSelections = function getSelections (req, res) {
  cors(req, res);
  selections.getAll(_handleApiResponse(res));
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
