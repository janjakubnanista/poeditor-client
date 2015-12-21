'use strict';

require('mocha');
var expect = require('expect.js');
var sinon = require('sinon');
var utils = require('../src/utils');
var q = require('q');

var AvailableLanguages = require('../src/AvailableLanguages');

describe('AvailableLanguages', function() {
    beforeEach(function() {
        this.deferred = q.defer();

        this.call = sinon.stub(utils, 'call').returns(this.deferred.promise);
        this.languages = new AvailableLanguages('my token');
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

        it('should send available_languages action', function() {
            this.languages.list();

            expect(this.call.calledWith('my token', { action: 'available_languages' })).to.be(true);
        });

        it('should resolve with array of objects', function(done) {
            this.languages.list().done(function(languages) {
                expect(languages).to.be.an('array');
                expect(languages).to.have.length(2);

                var language1 = languages[0];
                expect(language1.code).to.be('de');
                expect(language1.name).to.be('German');

                var language2 = languages[1];
                expect(language2.code).to.be('sk');
                expect(language2.name).to.be('Slovak');

                done();
            });

            this.deferred.resolve({ list: { German: 'de', Slovak: 'sk' } });
        });

        it('should reject if underlying call rejects', function(done) {
            this.languages.list().done(null, function() { done(); });

            this.deferred.reject();
        });
    });
});
