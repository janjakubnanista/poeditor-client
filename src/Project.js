'use strict';

var assign = require('object-assign');

var Languages = require('./Languages');
var Terms = require('./Terms');
var utils = require('./utils');

function Project(token, data) {
    Object.defineProperties(this, {
        __token: { value: token },
        languages: { value: new Languages(token, data.id) },
        terms: { value: new Terms(token, data.id) },

        id: { value: data.id, enumerable: true },
        name: { value: data.name, enumerable: true },
        public: { value: data.public === '1', enumerable: true },
        open: { value: data.open === '1', enumerable: true },
        created: { value: data.created, enumerable: true },
        reference_language: { value: data.reference_language, enumerable: true }
    });
}

Project.prototype.export = function(language, type, options) {
    var params = assign({}, options, { action: 'export', id: this.id, language: language, type: type });
    return utils.call(this.__token, params).then(function(response) {
        return response.item;
    });
};

module.exports = Project;
