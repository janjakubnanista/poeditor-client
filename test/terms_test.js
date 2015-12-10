'use strict';

require('mocha');
var expect = require('expect.js');
var sinon = require('sinon');
var utils = require('../src/utils');
var q = require('q');

var Term = require('../src/Term');
var Terms = require('../src/Terms');

describe('Terms', function() {
    beforeEach(function() {
        this.deferred = q.defer();

        this.call = sinon.stub(utils, 'call').returns(this.deferred.promise);
        this.terms = new Terms('my token', 123, 'de_DE');
    });

    afterEach(function() {
        this.call.restore();

        delete this.call;
        delete this.deferred;
        delete this.terms;
    });

    describe('list()', function() {
        it('should return a promise', function() {
            expect(this.terms.list().then).to.be.a(Function);
        });

        it('should send view_terms action', function() {
            this.terms.list();

            expect(this.call.calledWith('my token', { action: 'view_terms', id: 123, language: 'de_DE' })).to.be(true);
        });

        it('should resolve with a list of Term objects', function(done) {
            this.terms.list().done(function(projects) {
                expect(projects).to.be.an('array');
                expect(projects).to.have.length(2);

                expect(projects[0]).to.be.a(Term);
                expect(projects[1]).to.be.a(Term);

                done();
            }, done);

            this.deferred.resolve({
                list: [{}, {}]
            });
        });

        it('should populate project objects', function(done) {
            this.terms.list().done(function(terms) {
                var term1 = terms[0];
                expect(term1.term).to.be('term 1');
                expect(term1.context).to.be('context 1');
                expect(term1.reference).to.be('');
                expect(term1.created).to.be('2015-09-13');
                expect(term1.updated).to.be('2015-09-14');
                expect(term1.fuzzy).to.be(false);
                expect(term1.translation).to.be(undefined);
                expect(term1.tags).to.eql(['tag 1', 'tag 2']);

                var term2 = terms[1];
                expect(term2.term).to.be('term 2');
                expect(term2.context).to.be('context 2');
                expect(term2.reference).to.be('');
                expect(term2.created).to.be('2015-09-15');
                expect(term2.updated).to.be('2015-09-16');
                expect(term2.fuzzy).to.be(false);
                expect(term2.translation).to.be(undefined);
                expect(term2.tags).to.eql(['tag 2']);

                done();
            }, done);

            this.deferred.resolve({
                list: [{
                    term: 'term 1',
                    context: 'context 1',
                    reference: '',
                    definition: {},
                    created: '2015-09-13',
                    updated: '2015-09-14',
                    tags: ['tag 1', 'tag 2']
                }, {
                    term: 'term 2',
                    context: 'context 2',
                    reference: '',
                    definition: {},
                    created: '2015-09-15',
                    updated: '2015-09-16',
                    tags: ['tag 2']
                }]
            });
        });

        it('should reject if underlying call rejects', function(done) {
            this.terms.list().done(null, function() { done(); });

            this.deferred.reject();
        });
    });

    describe('add()', function() {
        beforeEach(function() {
            this.termData = { term: 'A term' };
        });

        it('should return a promise', function() {
            expect(this.terms.add(this.termData).then).to.be.a(Function);
        });

        it('should send add_terms action', function() {
            this.terms.add(this.termData);

            expect(this.call.calledWith('my token', { action: 'add_terms', id: 123, data: JSON.stringify([this.termData]) })).to.be(true);
        });

        it('should resolve with details object', function(done) {
            this.terms.add(this.termData).done(function(result) {
                expect(result).to.be.an(Object);
                expect(result.parsed).to.be(2);
                expect(result.added).to.be(1);

                done();
            }, done);

            this.deferred.resolve({ details: { parsed: 2, added: 1 } });
        });

        it('should reject if underlying call rejects', function(done) {
            this.terms.add(this.termData).done(null, function() { done(); });

            this.deferred.reject();
        });
    });

    describe('delete()', function() {
        beforeEach(function() {
            this.termData = { term: 'A term' };
        });

        it('should return a promise', function() {
            expect(this.terms.delete(this.termData).then).to.be.a(Function);
        });

        it('should send delete_terms action', function() {
            this.terms.delete(this.termData);

            expect(this.call.calledWith('my token', { action: 'delete_terms', id: 123, data: JSON.stringify([this.termData]) })).to.be(true);
        });

        it('should resolve with details object', function(done) {
            this.terms.delete(this.termData).done(function(result) {
                expect(result).to.be.an(Object);
                expect(result.parsed).to.be(2);
                expect(result.deleted).to.be(1);

                done();
            }, done);

            this.deferred.resolve({ details: { parsed: 2, deleted: 1 } });
        });

        it('should reject if underlying call rejects', function(done) {
            this.terms.delete(this.termData).done(null, function() { done(); });

            this.deferred.reject();
        });
    });

    describe('comment()', function() {
        beforeEach(function() {
            this.termData = { term: 'A term' };
        });

        it('should return a promise', function() {
            expect(this.terms.comment(this.termData).then).to.be.a(Function);
        });

        it('should send add_terms action', function() {
            this.terms.comment(this.termData);

            expect(this.call.calledWith('my token', { action: 'add_comment', id: 123, data: JSON.stringify([this.termData]) })).to.be(true);
        });

        it('should resolve with details object', function(done) {
            this.terms.comment(this.termData).done(function(result) {
                expect(result).to.be.an(Object);
                expect(result.parsed).to.be(2);
                expect(result.added).to.be(1);

                done();
            }, done);

            this.deferred.resolve({ details: { parsed: 2, added: 1 } });
        });

        it('should reject if underlying call rejects', function(done) {
            this.terms.comment(this.termData).done(null, function() { done(); });

            this.deferred.reject();
        });
    });
});
