var datastore = require('@google-cloud/datastore')();

var LIST_NAME = 'default-list';

function datastoreItemToEntity(item) {
  var entity = item;
  entity.id = item[datastore.KEY].id;
  return entity;
}

function saveEntity(key, data, callback) {
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

module.exports = function createController(namespace, parentKey) {
  return {
    delete: function(id, callback) {
      var key = datastore.key([parentKey, LIST_NAME, namespace, id]);

      datastore.delete(key, function(err) {
        callback(err || null);
      });
    },

    // deleteCompleted: function(callback) {
    //   datastore.runInTransaction(function(transaction, done) {
    //     var query = transaction.createQuery(namespace)
    //       .hasAncestor(datastore.key([parentKey, LIST_NAME]))
    //       .filter('completed', true);
    //
    //     query.run(function(err, items) {
    //       if (err) {
    //         transaction.rollback(done);
    //         return;
    //       }
    //
    //       transaction.delete(items.map(function(entity) {
    //         return entity.key;
    //       }));
    //
    //       done();
    //     });
    //   }, callback);
    // },
    //
    get: function(id, callback) {
      var key = datastore.key([parentKey, LIST_NAME, namespace, id]);

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

        callback(null, datastoreItemToEntity(item));
      });
    },

    getAll: function(callback) {
      var query = datastore.createQuery(namespace)
        .hasAncestor(datastore.key([parentKey, LIST_NAME]));

      query.run(function(err, items) {
        if (err) {
          callback(err);
          return;
        }

        callback(null, items.map(datastoreItemToEntity));
      });
    },

    insert: function(data, callback) {
      var key = datastore.key([parentKey, LIST_NAME, namespace]);

      saveEntity(key, data, callback);
    },

    update: function(id, data, callback) {
      var key = datastore.key([parentKey, LIST_NAME, namespace, id]);

      saveEntity(key, data, callback);
    }
  }
}
