'use strict';

var Term = require('./Term');
var utils = require('./utils');

function Terms(token, projectId, languageCode) {
    Object.defineProperties(this, {
        __token: { value: token },
        __projectId: { value: projectId },
        __languageCode: { value: languageCode }
    });
}

Terms.prototype.list = function() {
    return utils.call(this.__token, { action: 'view_terms', id: this.__projectId, language: this.__languageCode }).then(function(response) {
        return response.list.map(function(termData) {
            return new Term(this.__token, this.__projectId, this.__languageCode, termData);
        }.bind(this));
    }.bind(this));
};

Terms.prototype.add = function(terms) {
    var payload = Array.isArray(terms) ? terms : [terms];
    var data = JSON.stringify(payload);

    return utils.call(this.__token, { action: 'add_terms', id: this.__projectId, data: data }).then(function(response) {
        return response.details;
    });
};

module.exports = Terms;
