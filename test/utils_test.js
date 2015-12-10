'use strict';

require('mocha');
var expect = require('expect.js');
var sinon = require('sinon');
var request = require('request');

var utils = require('../src/utils');
var POEditorError = require('../src/POEditorError');

describe('utils', function() {
    describe('call()', function() {
        beforeEach(function() {
            this.response = { statusCode: 200 };
            this.payload = JSON.stringify({ response: { status: 'success', message: 'OK', code: 200 } });

            this.postRequest = sinon.stub(request, 'post').yields(null, this.response, this.payload);
        });

        afterEach(function() {
            this.postRequest.restore();
        });

        it('should return a promise', function() {
            expect(utils.call('my token').then).to.be.a(Function);
        });

        it('should POST to https://poeditor.com/api/', function(done) {
            utils.call('my token').done(function() {
                expect(this.postRequest.callCount).to.be(1);
                expect(this.postRequest.calledWith('https://poeditor.com/api/')).to.be(true);

                done();
            }.bind(this), done);
        });

        it('should add API token to POST form data', function(done) {
            utils.call('my token', { action: 'list_projects' }).done(function() {
                expect(this.postRequest.calledWith('https://poeditor.com/api/', { form: { api_token: 'my token', action: 'list_projects' } })).to.be(true);

                done();
            }.bind(this), done);
        });

        it('should reject if an error occurs', function(done) {
            this.response.statusCode = 404;

            utils.call('my token').done(null, function() {
                done();
            });
        });

        it('should reject if non-success status is sent back from POEditor', function(done) {
            var payload = JSON.stringify({ response: { status: 'fail', message: 'Wrong shit', code: 4043 } });

            this.postRequest.yields(null, this.response, payload);

            utils.call('my token', { param: 'value' }).done(null, function(error) {
                expect(error).to.be.a(POEditorError);
                expect(error.message).to.be('Wrong shit');
                expect(error.code).to.be(4043);
                expect(error.status).to.be('fail');
                expect(error.response).to.eql({ status: 'fail', message: 'Wrong shit', code: 4043 });
                expect(error.request).to.eql({ api_token: 'my token', param: 'value' });

                done();
            });
        });

        it('should resolve with JSON parsed response body', function(done) {
            utils.call('my token').done(function(body) {
                expect(body).to.eql({ response: { status: 'success', message: 'OK', code: 200 } });

                done();
            }, done);
        });
    });
});
