'use strict';

var assign = require('object-assign');
var q = require('q');
var request = require('request');

exports.call = function(token, params) {
    var deferred = q.defer();
    var data = assign({}, params, {
        api_token: token
    });

    request.post('https://poeditor.com/api/', { form: data }, function(error, res, body) {
        if (error) return deferred.reject(error);
        if (res.statusCode !== 200) return deferred.reject(new Error('HTTP ' + res.statusCode));

        deferred.resolve(JSON.parse(body));
    });

    return deferred.promise;
}
