'use strict';

var Client = require('../src/Client');
var token = require('./token.js');
var client = new Client(token);

client.languages.list().then(function(languages) {
    console.log('%d available languages:', languages.length);
    console.log('=========================');
    
    languages.forEach(function(language) {
        console.log('%s:\t%s', language.code, language.name);
    });
});
