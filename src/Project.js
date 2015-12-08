'use strict';

var Language = require('./Language');
var utils = require('./utils');

function Project(token, data) {
    this.__token = token;

    Object.defineProperties(this, {
        id: { value: data.id, enumerable: true },
        name: { value: data.name, enumerable: true },
        public: { value: data.public === '1', enumerable: true },
        open: { value: data.open === '1', enumerable: true },
        created: { value: data.created, enumerable: true },
        reference_language: { value: data.reference_language, enumerable: true }
    });
}

Project.prototype.listLanguages = function() {
    return utils.call(this.__token, { action: 'list_languages', id: this.id }).then(function(response) {
        return response.list.map(function(languageData) {
            return new Language(this.__token, languageData);
        }.bind(this));
    }.bind(this));
};

module.exports = Project;
