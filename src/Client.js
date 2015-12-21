'use strict';

var Projects = require('./Projects');

function Client(token) {
    this.projects = new Projects(token);
}

module.exports = Client;
