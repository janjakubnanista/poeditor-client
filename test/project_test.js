'use strict';

require('mocha');
var expect = require('expect.js');
var sinon = require('sinon');
var q = require('q');

var Project = require('../src/Project');

describe('Project', function() {
    beforeEach(function() {
        this.project = new Project('my token', {
            id: 123
        });
    });

    afterEach(function() {
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
        beforeEach(function () {
            this.languageExport = sinon.stub();
            this.urls = [
                'http://my-url-1',
                'http://my-url-2'
            ];
            this.urls.forEach(function (url, i) {
                this.languageExport.onCall(i).returns(q.Promise.resolve(url));
            }.bind(this));
            this.languagesList = sinon.stub(this.project.languages, 'list').returns(q.Promise.resolve([
                { export: this.languageExport },
                { export: this.languageExport }
            ]));
        });

        afterEach(function () {
            this.languagesList.restore();

            delete this.languageExport;
            delete this.languagesList;
        });

        it('should return a promise', function() {
            expect(this.project.export().then).to.be.a(Function);
        });

        it('should invoke Language.export() per project language', function(done) {
            this.project.export().done(function () {
                expect(this.languageExport.calledTwice).to.be(true);
                done();
            }.bind(this), done);

        });

        it('should pass options to Language.export()', function (done) {
            var options = {};
            this.project.export(options).done(function () {
                expect(this.languageExport.calledWith(options)).to.be(true);
                done();
            }.bind(this), done);
        });

        it('should resolve with an array of export file download URLs (one file per project language)', function (done) {
            this.project.export().done(function(urls) {
                expect(urls).to.eql(this.urls);
                done();
            }.bind(this), done);
        });
    });
});
