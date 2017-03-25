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

    describe('upload()', function() {
        it('should return a promise', function() {
            expect(this.language.upload().then).to.be.a(Function);
        });

        it('should send upload action', function () {
            this.language.upload();

            expect(this.call.calledWith('my token', { action: 'upload', language: 'de_DE', id: 123, updating: 'definitions' })).to.be(true);
        });

        it('should set file param when terms exists', function () {
            var terms = [{
                term: 'test',
                definition: 'translated'
            }]
            this.language.upload(terms);

            var fileObject = {
                value: JSON.stringify(terms),
                options: {filename: 'upload.json', contentType: 'application/json'}
            }
            expect(this.call.calledWith('my token', { action: 'upload', language: 'de_DE', id: 123, updating: 'definitions', file: fileObject })).to.be(true);
        });

        it('should support options', function () {
            this.language.upload(null, { updating: 'terms_definitions' });

            expect(this.call.calledWith('my token', { action: 'upload', language: 'de_DE', id: 123, updating: 'terms_definitions' })).to.be(true);
        });

        it('should convert options overwrite and sync_terms to numbers', function () {
            this.language.upload(null, { overwrite: true, sync_terms: false });

            expect(this.call.calledWith('my token', { action: 'upload', language: 'de_DE', id: 123, updating: 'definitions', overwrite: 1, sync_terms: 0 })).to.be(true);
        });

        it('should resolve with an upload details', function (done) {
            var result = { definitions: { parsed: 0, added: 0, updated: 0} };
            this.language.upload().done(function (details) {
                expect(details).to.be(result);
                done();
            }, done);

            this.deferred.resolve({ details: result });
        });
    });
});
