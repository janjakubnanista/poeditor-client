'use strict';

var assign = require('object-assign');
var q = require('q');
var request = require('request');

var POEditorError = require('./POEditorError');

exports.call = function(token, params) {
    var deferred = q.defer();
    var data = assign({}, params, {
        api_token: token
    });

    request.post('https://poeditor.com/api/', { formData: data }, function(error, res, body) {
        if (error) return deferred.reject(error);
        if (res.statusCode !== 200) return deferred.reject(new Error('HTTP ' + res.statusCode));

        var response = JSON.parse(body);
        if (response.response.status !== 'success') return deferred.reject(new POEditorError(response.response, data));

        deferred.resolve(response);
    });

    return deferred.promise;
};
