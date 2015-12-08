'use strict';

require('mocha');
var expect = require('expect.js');
var sinon = require('sinon');
var utils = require('../src/utils');
var q = require('q');

var Language = require('../src/Language');
var Project = require('../src/Project');

describe('Project', function() {
    beforeEach(function() {
        this.deferred = q.defer();

        this.call = sinon.stub(utils, 'call').returns(this.deferred.promise);
        this.project = new Project('my token', { id: 123, name: 'A Project' });
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

    describe('listLanguages()', function() {
        it('should return a promise', function() {
            expect(this.project.listLanguages().then).to.be.a(Function);
        });

        it('should send list_languages action', function() {
            this.project.listLanguages();

            expect(this.call.calledWith('my token', { action: 'list_languages', id: 123 })).to.be(true);
        });

        it('should resolve with array of Language objects', function(done) {
            this.project.listLanguages().done(function(languages) {
                expect(languages).to.be.an('array');
                expect(languages).to.have.length(2);

                expect(languages[0]).to.be.a(Language);
                expect(languages[1]).to.be.a(Language);

                done();
            });

            this.deferred.resolve({ list: [{}, {}] });
        });

        it('should populate Language objects', function(done) {
            this.project.listLanguages().done(function(languages) {
                var language1 = languages[0];
                expect(language1.code).to.be('de');
                expect(language1.name).to.be('German');
                expect(language1.percentage).to.be(99.25);

                var language2 = languages[1];
                expect(language2.code).to.be('sk');
                expect(language2.name).to.be('Slovak');
                expect(language2.percentage).to.be(99.00);

                done();
            });

            this.deferred.resolve({
                list: [{
                    name: 'German',
                    code: 'de',
                    percentage: 99.25
                }, {
                    name: 'Slovak',
                    code: 'sk',
                    percentage: 99.00
                }]
            });
        });

        it('should reject if underlying call rejects', function(done) {
            this.project.listLanguages().done(null, function() { done(); });

            this.deferred.reject();
        });
    });
});
