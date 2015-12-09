'use strict';

var Terms = require('./Terms');
var utils = require('./utils');

function Language(token, projectId, data) {
    Object.defineProperties(this, {
        __token: { value: token },
        __projectId: { value: projectId },
        terms: { value: new Terms(token, projectId, data.code) },

        name: { value: data.name, enumerable: true },
        code: { value: data.code, enumerable: true },
        percentage: { value: data.percentage, enumerable: true }
    });
}

Language.prototype.delete = function() {
    return utils.call(this.__token, { action: 'delete_language', id: this.__projectId, language: this.code }).then(function(response) {
        return null;
    }.bind(this));
};

Language.prototype.setAsReference = function() {
    return utils.call(this.__token, { action: 'set_reference_language', id: this.__projectId, language: this.code }).then(function(response) {
        return null;
    }.bind(this));
};

Language.prototype.unsetAsReference = function() {
    return utils.call(this.__token, { action: 'clear_reference_language', id: this.__projectId, language: this.code }).then(function(response) {
        return null;
    }.bind(this));
};

module.exports = Language;
