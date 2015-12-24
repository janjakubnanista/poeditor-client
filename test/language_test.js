'use strict';

require('mocha');
var expect = require('expect.js');
var sinon = require('sinon');
var utils = require('../src/utils');
var q = require('q');

var Language = require('../src/Language');

describe('Language', function() {
    beforeEach(function() {
        this.deferred = q.defer();

        this.call = sinon.stub(utils, 'call').returns(this.deferred.promise);
        this.language = new Language('my token', 123, { code: 'de_DE' });
    });

    afterEach(function() {
        this.call.restore();

        delete this.call;
        delete this.deferred;
        delete this.language;
    });

    describe('setAsReference()', function() {
        it('should return a promise', function() {
            expect(this.language.setAsReference('de_DE').then).to.be.a(Function);
        });

        it('should send set_reference_language action', function() {
            this.language.setAsReference('de_DE');

            expect(this.call.calledWith('my token', { action: 'set_reference_language', language: 'de_DE', id: 123 })).to.be(true);
        });

        it('should reject if underlying call rejects', function(done) {
            this.language.setAsReference('de_DE').done(null, function() { done(); });

            this.deferred.reject();
        });
    });

    describe('unsetAsReference()', function() {
        it('should return a promise', function() {
            expect(this.language.unsetAsReference('de_DE').then).to.be.a(Function);
        });

        it('should send clear_reference_language action', function() {
            this.language.unsetAsReference('de_DE');

            expect(this.call.calledWith('my token', { action: 'clear_reference_language', language: 'de_DE', id: 123 })).to.be(true);
        });

        it('should reject if underlying call rejects', function(done) {
            this.language.unsetAsReference('de_DE').done(null, function() { done(); });

            this.deferred.reject();
        });
    });

    describe('delete()', function() {
        it('should return a promise', function() {
            expect(this.language.delete().then).to.be.a(Function);
        });

        it('should send delete_language action', function() {
            this.language.delete();

            expect(this.call.calledWith('my token', { action: 'delete_language', language: 'de_DE', id: 123 })).to.be(true);
        });

        it('should reject if underlying call rejects', function(done) {
            this.language.delete().done(null, function() { done(); });

            this.deferred.reject();
        });
    });

    describe('export()', function() {
        it('should return a promise', function() {
            expect(this.language.export().then).to.be.a(Function);
        });

        it('should send export action', function () {
            this.language.export();

            expect(this.call.calledWith('my token', { action: 'export', language: 'de_DE', id: 123 })).to.be(true);
        });

        it('should support options', function () {
            this.language.export({ type: 'my type' });

            expect(this.call.calledWith('my token', { action: 'export', language: 'de_DE', id: 123, type: 'my type' })).to.be(true);
        });

        it('should resolve with an export file download URL', function (done) {
            this.language.export().done(function (url) {
                expect(url).to.be('http://my-url');
                done();
            }, done);

            this.deferred.resolve({ item: 'http://my-url' });
        });
    });
});
