'use strict';

require('mocha');
var expect = require('expect.js');
var sinon = require('sinon');
var utils = require('../src/utils');
var q = require('q');

var Language = require('../src/Language');
var Languages = require('../src/Languages');

describe('Languages', function() {
    beforeEach(function() {
        this.deferred = q.defer();

        this.call = sinon.stub(utils, 'call').returns(this.deferred.promise);
        this.languages = new Languages('my token', 123);
    });

    afterEach(function() {
        this.call.restore();

        delete this.call;
        delete this.deferred;
        delete this.languages;
    });

    describe('list()', function() {
        it('should return a promise', function() {
            expect(this.languages.list().then).to.be.a(Function);
        });

        it('should send list_languages action', function() {
            this.languages.list();

            expect(this.call.calledWith('my token', { action: 'list_languages', id: 123 })).to.be(true);
        });

        it('should resolve with array of Language objects', function(done) {
            this.languages.list().done(function(languages) {
                expect(languages).to.be.an('array');
                expect(languages).to.have.length(2);

                expect(languages[0]).to.be.a(Language);
                expect(languages[1]).to.be.a(Language);

                done();
            });

            this.deferred.resolve({ list: [{}, {}] });
        });

        it('should populate Language objects', function(done) {
            this.languages.list().done(function(languages) {
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
            this.languages.list().done(null, function() { done(); });

            this.deferred.reject();
        });
    });

    describe('add()', function() {
        it('should return a promise', function() {
            expect(this.languages.add('de_DE').then).to.be.a(Function);
        });

        it('should send add_language action', function() {
            this.languages.add('de_DE');

            expect(this.call.calledWith('my token', { action: 'add_language', language: 'de_DE', id: 123 })).to.be(true);
        });

        it('should reject if underlying call rejects', function(done) {
            this.languages.add('de_DE').done(null, function() { done(); });

            this.deferred.reject();
        });
    });

    describe('delete()', function() {
        it('should return a promise', function() {
            expect(this.languages.delete('de_DE').then).to.be.a(Function);
        });

        it('should send delete_language action', function() {
            this.languages.delete('de_DE');

            expect(this.call.calledWith('my token', { action: 'delete_language', language: 'de_DE', id: 123 })).to.be(true);
        });

        it('should reject if underlying call rejects', function(done) {
            this.languages.delete('de_DE').done(null, function() { done(); });

            this.deferred.reject();
        });
    });

    describe('unsetReferenceLanguage()', function() {
        it('should return a promise', function() {
            expect(this.languages.unsetReferenceLanguage('de_DE').then).to.be.a(Function);
        });

        it('should send clear_reference_language action', function() {
            this.languages.unsetReferenceLanguage('de_DE');

            expect(this.call.calledWith('my token', { action: 'clear_reference_language', language: 'de_DE', id: 123 })).to.be(true);
        });

        it('should reject if underlying call rejects', function(done) {
            this.languages.unsetReferenceLanguage('de_DE').done(null, function() { done(); });

            this.deferred.reject();
        });
    });

    describe('setReferenceLanguage()', function() {
        it('should return a promise', function() {
            expect(this.languages.setReferenceLanguage('de_DE').then).to.be.a(Function);
        });

        it('should send set_reference_language action', function() {
            this.languages.setReferenceLanguage('de_DE');

            expect(this.call.calledWith('my token', { action: 'set_reference_language', language: 'de_DE', id: 123 })).to.be(true);
        });

        it('should reject if underlying call rejects', function(done) {
            this.languages.setReferenceLanguage('de_DE').done(null, function() { done(); });

            this.deferred.reject();
        });
    });
});
