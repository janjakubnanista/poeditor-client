'use strict';

require('mocha');
var expect = require('expect.js');
var sinon = require('sinon');
var utils = require('../src/utils');
var q = require('q');

var Project = require('../src/Project');
var Projects = require('../src/Projects');

describe('Projects', function() {
    beforeEach(function() {
        this.deferred = q.defer();

        this.call = sinon.stub(utils, 'call').returns(this.deferred.promise);
        this.projects = new Projects('my token');
    });

    afterEach(function() {
        this.call.restore();

        delete this.call;
        delete this.deferred;
        delete this.projects;
    });

    describe('list()', function() {
        it('should return a promise', function() {
            expect(this.projects.list().then).to.be.a(Function);
        });

        it('should send list_projects action', function() {
            this.projects.list();

            expect(this.call.calledWith('my token', { action: 'list_projects' })).to.be(true);
        });

        it('should resolve with a list of Project objects', function(done) {
            this.projects.list().done(function(projects) {
                expect(projects).to.be.an('array');
                expect(projects).to.have.length(2);

                expect(projects[0]).to.be.a(Project);
                expect(projects[1]).to.be.a(Project);

                done();
            }, done);

            this.deferred.resolve({
                list: [{}, {}]
            });
        });

        it('should populate project objects', function(done) {
            this.projects.list().done(function(projects) {
                var project1 = projects[0];
                expect(project1.id).to.be(123);
                expect(project1.name).to.be('Project 1');
                expect(project1.public).to.be(false);
                expect(project1.open).to.be(false);
                expect(project1.created).to.be('2015-09-13');

                var project2 = projects[1];
                expect(project2.id).to.be(456);
                expect(project2.name).to.be('Project 2');
                expect(project2.public).to.be(true);
                expect(project2.open).to.be(true);
                expect(project2.created).to.be('2012-09-13');

                done();
            }, done);

            this.deferred.resolve({
                list: [{
                    id: 123,
                    name: 'Project 1',
                    public: '0',
                    open: '0',
                    created: '2015-09-13'
                }, {
                    id: 456,
                    name: 'Project 2',
                    public: '1',
                    open: '1',
                    created: '2012-09-13'
                }]
            });
        });

        it('should reject if underlying call rejects', function(done) {
            this.projects.list().done(null, function() { done(); });

            this.deferred.reject();
        });
    });

    describe('get()', function() {
        it('should return a promise', function() {
            expect(this.projects.get(123).then).to.be.a(Function);
        });

        it('should send view_project action', function() {
            this.projects.get(123);

            expect(this.call.calledWith('my token', { action: 'view_project', id: 123 })).to.be(true);
        });

        it('should resolve with a Project object', function(done) {
            this.projects.get().done(function(project) {
                expect(project).to.be.a(Project);

                done();
            }, done);

            this.deferred.resolve({ item: {} });
        });

        it('should populate project object', function(done) {
            this.projects.get(123).done(function(project) {
                expect(project.id).to.be(123);
                expect(project.name).to.be('Project 1');
                expect(project.public).to.be(false);
                expect(project.open).to.be(false);
                expect(project.created).to.be('2015-09-13');

                done();
            }, done);

            this.deferred.resolve({
                item: {
                    id: 123,
                    name: 'Project 1',
                    public: '0',
                    open: '0',
                    created: '2015-09-13'
                }
            });
        });

        it('should reject if underlying call rejects', function(done) {
            this.projects.get().done(null, function() { done(); });

            this.deferred.reject();
        });
    });

    describe('add()', function() {
        it('should return a promise', function() {
            expect(this.projects.add('A Project', 'Some description').then).to.be.a(Function);
        });

        it('should send create_project action', function() {
            this.projects.add('A Project', 'Some description');

            expect(this.call.calledWith('my token', { action: 'create_project', name: 'A Project', description: 'Some description' })).to.be(true);
        });

        it('should resolve with a Project object', function(done) {
            // .add() calls .get() internally
            this.call.withArgs('my token', { action: 'view_project', id: 123 }).returns(q({ item: {} }));

            this.projects.add('A Project', 'Some description').done(function(project) {
                expect(project).to.be.a(Project);

                done();
            }, done);

            this.deferred.resolve({ response: { item: { id: 123 } } });
        });

        it('should populate project object', function(done) {
            // .add() calls .get() internally
            this.call.withArgs('my token', { action: 'view_project', id: 123 }).returns(q({ item: { id: 123, name: 'A Project' } }));

            this.projects.add('A Project', 'Some description').done(function(project) {
                expect(project.id).to.be(123);
                expect(project.name).to.be('A Project');

                done();
            }, done);

            this.deferred.resolve({ response: { item: { id: 123 } } });
        });

        it('should reject if underlying call rejects', function(done) {
            this.projects.add('A Project', 'Some description').done(null, function() { done(); });

            this.deferred.reject();
        });
    });
});
