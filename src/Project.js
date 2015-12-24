'use strict';

var q = require('q');

var Languages = require('./Languages');
var Terms = require('./Terms');

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

Project.prototype.export = function(options) {
    return this.languages.list().then(function(languages) {
        return q.all(languages.map(function(language) {
            return language.export(options);
        }));
    });
};

module.exports = Project;
