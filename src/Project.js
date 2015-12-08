'use strict';

var Languages = require('./Languages');
var utils = require('./utils');

function Project(token, data) {
    this.__token = token;

    Object.defineProperties(this, {
        languages: { value: new Languages(token, data.id) },

        id: { value: data.id, enumerable: true },
        name: { value: data.name, enumerable: true },
        public: { value: data.public === '1', enumerable: true },
        open: { value: data.open === '1', enumerable: true },
        created: { value: data.created, enumerable: true },
        reference_language: { value: data.reference_language, enumerable: true }
    });
}

module.exports = Project;
