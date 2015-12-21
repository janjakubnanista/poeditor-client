'use strict';

require('mocha');
var expect = require('expect.js');
var sinon = require('sinon');
var utils = require('../src/utils');
var q = require('q');

var Project = require('../src/Project');

describe('Project', function() {
    beforeEach(function() {
        this.deferred = q.defer();

        this.call = sinon.stub(utils, 'call').returns(this.deferred.promise);
        this.project = new Project('my token', {
            id: 123
        });
    });

    afterEach(function() {
        this.call.restore();

        delete this.call;
        delete this.deferred;
        delete this.project;
    });

    describe('new Project(token, params)', function() {
        function testProperty(name, value, expected) {
            var params = {};
            params[name] = value;

            var project = new Project('my token', params);

            expect(project[name]).to.be(expected);
            expect(function() { project[name] = value + ' edited'; }).to.throwError();
        }

        it('should set id', function() {
            testProperty('id', 123, 123);
        });

        it('should set name', function() {
            testProperty('name', 'A project', 'A project');
        });

        it('should set created', function() {
            testProperty('created', '2015-09-13', '2015-09-13');
        });

        it('should set reference_language', function() {
            testProperty('reference_language', 'de', 'de');
        });

        it('should set public to true if params.public is 1', function() {
            testProperty('public', '1', true);
        });

        it('should set public to false if params.public is 0', function() {
            testProperty('public', '0', false);
        });

        it('should set open to true if params.open is 1', function() {
            testProperty('open', '1', true);
        });

        it('should set open to false if params.open is 0', function() {
            testProperty('open', '0', false);
        });
    });

    describe('export()', function () {
        it('should send export action', function() {
            this.project.export('de_DE', 'json');

            expect(this.call.calledWith('my token', {action: 'export', id: 123, language: 'de_DE', type: 'json' })).to.be(true);
        });

        it('should support optional arguments', function () {
            var options = {
                filters: ['translated', 'fuzzy'],
                tags: ['Tag 1', 'Tag 2']
            };
            this.project.export('de_DE', 'json', options);

            expect(this.call.calledWith('my token', {action: 'export', id: 123, language: 'de_DE', type: 'json', filters: options.filters, tags: options.tags })).to.be(true);
        });

        it('should resolve with an export file URL', function (done) {
            this.project.export('en', 'json').done(function(url) {
                expect(url).to.be('http://my-file-url');
                done();
            }, done);

            this.deferred.resolve({ item: 'http://my-file-url' });
        });
    });
});
