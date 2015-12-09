'use strict';

require('mocha');
var expect = require('expect.js');

var Term = require('../src/Term');

describe('Term', function() {
    describe('new Term(token, projectId, languageCode, params)', function() {
        function testProperty(name, value, expected) {
            var params = {};
            params[name] = value;

            var term = new Term('my token', 123, 'de_DE', params);

            expect(term[name]).to.eql(expected);
            expect(function() { term[name] = value + ' edited'; }).to.throwError();
        }

        it('should set term', function() {
            testProperty('term', 'a term', 'a term');
        });

        it('should set context', function() {
            testProperty('context', 'a context', 'a context');
        });

        it('should set created', function() {
            testProperty('created', '2015-09-13', '2015-09-13');
        });

        it('should set updated', function() {
            testProperty('updated', '2015-09-13', '2015-09-13');
        });

        it('should set reference', function() {
            testProperty('reference', 'a reference', 'a reference');
        });

        it('should set tags', function() {
            testProperty('tags', ['tag 1', 'tag 2'], ['tag 1', 'tag 2']);
        });

        it('should set fuzzy to false if definition is empty', function() {
            var term = new Term('my token', 123, 'de_DE', { definition: {} });

            expect(term.fuzzy).to.be(false);
        });

        it('should set fuzzy to false if definition.fuzzy is falsy', function() {
            var term = new Term('my token', 123, 'de_DE', { definition: { fuzzy: 0 } });

            expect(term.fuzzy).to.be(false);
        });

        it('should set fuzzy to true if definition.fuzzy is truthy', function() {
            var term = new Term('my token', 123, 'de_DE', { definition: { fuzzy: 1 } });

            expect(term.fuzzy).to.be(true);
        });

        it('should set translation to undefined if definition is empty', function() {
            var term = new Term('my token', 123, 'de_DE', { definition: {} });

            expect(term.translation).to.be(undefined);
        });

        it('should set translation from definition.form', function() {
            var term = new Term('my token', 123, 'de_DE', { definition: { form: 'a translation' } });

            expect(term.translation).to.be('a translation');
        });
    });
});
