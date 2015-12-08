'use strict';

var Project = require('./Project');
var utils = require('./utils');

function Projects(token) {
    Object.defineProperties(this, {
        __token: { value: token }
    });
}

Projects.prototype.list = function() {
    return utils.call(this.__token, { action: 'list_projects' }).then(function(response) {
        return response.list.map(function(projectData) {
            return new Project(this.__token, projectData);
        }.bind(this));
    }.bind(this));
};

Projects.prototype.create = function(name, description) {
    return utils.call(this.__token, { action: 'create_project', name: name, description: description }).then(function(response) {
        return this.get(response.item.id);
    }.bind(this));
};

Projects.prototype.get = function(id) {
    return utils.call(this.__token, { action: 'view_project', id: id }).then(function(response) {
        return new Project(this.__token, response.item);
    }.bind(this));
};

module.exports = Projects;
