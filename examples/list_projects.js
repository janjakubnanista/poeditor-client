'use strict';

var Client = require('../src/Client');
var token = require('./token.js');
var client = new Client(token);

client.projects.list().then(function(projects) {
    console.log('%d projects:', projects.length);
    console.log('=========================');

    projects.forEach(function(project) {
        console.log(project.name);
    });
});
