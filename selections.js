var datastore = require('@google-cloud/datastore')();

var LIST_NAME = 'default-list';

function entityToSelection(item) {
  var selection = item;
  selection.id = item[datastore.KEY].id;
  return selection;
}

function saveSelection(key, data, callback) {
  delete data.id;

  datastore.save({
    key: key,
    data: data
  }, function(err) {
    if (err) {
      callback(err);
      return;
    }

    data.id = key.id;
    callback(null, data);
  });
}

module.exports = {
  delete: function(id, callback) {
    var key = datastore.key(['SelectionList', LIST_NAME, 'Selection', id]);

    datastore.delete(key, function(err) {
      callback(err || null);
    });
  },

  deleteCompleted: function(callback) {
    datastore.runInTransaction(function(transaction, done) {
      var query = transaction.createQuery('Selection')
        .hasAncestor(datastore.key(['SelectionList', LIST_NAME]))
        .filter('completed', true);

      query.run(function(err, items) {
        if (err) {
          transaction.rollback(done);
          return;
        }

        transaction.delete(items.map(function(selection) {
          return selection.key;
        }));

        done();
      });
    }, callback);
  },

  get: function(id, callback) {
    var key = datastore.key(['SelectionList', LIST_NAME, 'Selection', id]);

    datastore.get(key, function(err, item) {
      if (err) {
        callback(err);
        return;
      }

      if (!item) {
        callback({
          code: 404,
          message: 'No matching entity was found.'
        });
        return;
      }

      callback(null, entityToSelection(item));
    });
  },

  getAll: function(callback) {
    var query = datastore.createQuery('Selection')
      .hasAncestor(datastore.key(['SelectionList', LIST_NAME]));

    query.run(function(err, items) {
      if (err) {
        callback(err);
        return;
      }

      callback(null, items.map(entityToSelection));
    });
  },

  insert: function(data, callback) {
    var key = datastore.key(['SelectionList', LIST_NAME, 'Selection']);

    saveSelection(key, data, callback);
  },

  update: function(id, data, callback) {
    var key = datastore.key(['SelectionList', LIST_NAME, 'Selection', id]);

    saveSelection(key, data, callback);
  }
};
