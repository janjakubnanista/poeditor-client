'use strict';

function POEditorError(response, request) {
    this.code = response.code;
    this.status = response.status;
    this.message = response.message;
    this.request = request;
    this.response = response;
    this.stack = (new Error()).stack;
}

POEditorError.prototype = Object.create(Error.prototype);
POEditorError.prototype.constructor = POEditorError;
POEditorError.prototype.name = 'POEditorError';

module.exports = POEditorError;
