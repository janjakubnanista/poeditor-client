'use strict';

var Language = require('./Language');
var utils = require('./utils');

function Languages(token, projectId) {
    Object.defineProperties(this, {
        __token: { value: token },
        __projectId: { value: projectId }
    });
}

Languages.prototype.list = function() {
    return utils.call(this.__token, { action: 'list_languages', id: this.__projectId }).then(function(response) {
        return response.list.map(function(languageData) {
            return new Language(this.__token, this.__projectId, languageData);
        }.bind(this));
    }.bind(this));
};

Languages.prototype.add = function(code) {
    return utils.call(this.__token, { action: 'add_language', id: this.__projectId, language: code }).then(function() {});
};

Languages.prototype.delete = function(code) {
    return new Language(this.__token, this.__projectId, { code: code }).delete();
};

Languages.prototype.setAsReference = function(code) {
    return new Language(this.__token, this.__projectId, { code: code }).setAsReference();
};

Languages.prototype.unsetAsReference = function(code) {
    return new Language(this.__token, this.__projectId, { code: code }).unsetAsReference();
};

module.exports = Languages;
