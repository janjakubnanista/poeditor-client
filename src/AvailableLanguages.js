'use strict';

var utils = require('./utils');

function AvailableLanguages(token) {
    Object.defineProperties(this, {
        __token: { value: token }
    });
}

AvailableLanguages.prototype.list = function() {
    return utils.call(this.__token, { action: 'available_languages' }).then(function(response) {
        var languages = response.list;

        return Object.keys(languages).map(function(languageName) {
            return { name: languageName, code: languages[languageName] };
        });
    }.bind(this));
};

module.exports = AvailableLanguages;
