# poeditor-client

JavaScript client for [POEditor](http://poeditor.com) translations solution.

**This is a placeholder module. Functionality will be added continually. You can expect it to be fully functional in version 0.1.0.**

## Installation

`poeditor-client` is an NPM module. To install please run

	npm install poeditor-client

## Usage

`poeditor-client` allows you to access POEditor's API from your JavaScript code. For now there is no CLI tooling, you have to use it as a JavaScript module.

- [Getting started](#howto.gettingstarted)
- [Working with projects](#howto.projects)
	- [Working with project languages](#howto.projects.languages)
	- [Working with project terms](#howto.projects.terms)


<a id="howto.gettingstarted"></a>
### Getting started

You have to obtain your POEditor API access key. Please see [POEditor docs on authentication](https://poeditor.com/api_reference/#Authentication) to find out how.

This module exports a class, `POEditorClient`, that you need to instantiate to access all other API operations:

	var POEditorClient = require('poeditor-client');
	var client = new POEditorClient('<YOUR API ACCESS TOKEN HERE>');

Following sections will assume you have this `client` variable available in your code.

This module exposes promise-based API.


<a id="howto.projects"></a>
### Working with projects

At the heart of POEditor API there's project. You can list and add projects through `client.projects` object.

#### Listing projects

To list all the projects use `client.projects.list()` method:

	client.projects.list().then(function(projects) {
		// projects is an array of Project objects
		// see below for what can you do with a Project object
	});

#### Adding a project

To add an empty project use `client.projects.add()` method. This method accepts an object with name and (optional) description keys:

	var definition = { name: 'My project', description: 'Truly amazing POEditor project' };			
	client.projects.add(definition).then(function(project) {
		// project is an instance of Project class
		// see below for what can you do with this project object
	});


<a id="howto.projects.languages"></a>
### Working with project languages

In order for POEditor project to be functional it needs to have one or more languages attached.

*Note* In following code examples I will assume there is a `project` variable that represents a single POEditor project. See how you can obtain this object [above](#howto.projects).

You can manipulate with project languages using `project.languages` object.

#### Listing project languages

To list all the projects use `project.languages.list()` method:

	project.languages.list().then(function(languages) {
		// languages is an array of Language objects
		// see below for what can you do with a Language object
	});

#### Adding a language

To add a language to your project use `project.languages.add()` method. This method accepts an string parameter - a language code:

	project.languages.add('de-at').then(function() {
		// Yaaaay! You just added an Austrian variant
		// of German language to your project!
	});

#### Deleting a language

To remove particular language from your project use `project.languages.delete()` method. This method accepts an string parameter - a language code:

	project.languages.delete('de-at').then(function() {
		// Well maybe you didn't like Austrian German that much in the end...
	});

#### Setting a reference language

You can set a language to act as a reference language for your project. To do this, two methods are available on `project.languages` object: `setReferenceLanguage()` and `unsetReferenceLanguage()`. They both accept a language code as a parameter:

	project.languages.setReferenceLanguage('de-at').then(function() {
		// Austrian German is now your reference language
	});

	project.languages.unsetReferenceLanguage('de-at').then(function() {
		// Maybe Austrian German was not what you wanted
	});

You can perform these operations on `Language` objects too, using `setAsreference()` and `unsetAsReference()` methods (assuming that you have obtained a `language` object):

	language.setAsReference().then(function() {
		// The language is now a reference language
	});

	language.unsetAsReference().then(function() {
		// The language is not a reference language anymore
	});


<a id="howto.projects.terms"></a>
### Working with project terms

The basic building block of POEditor projects are terms.

If you are not interested in translations of terms for a specific language, you can use `project.terms` object to list, add or comment on terms.

If you need both terms and translations, you have to use `language.terms` object.

Following guide applies to both of these objects, I will assume `termsObject` variable refers to either of forementioned objects.

#### Listing project terms

In order to obtain a list of project terms you need to use `list()` method:

	termsObject.list().then(function(terms) {
		// Terms is an array of Term objects
		// See below for what you can do with Term objects
	});

#### Adding a term (or an array of terms)

You can add one or more terms at once using `add()` method:

	termsObject.add(definition).then(function(result) {

	});

	termsObject.add(arrayOfDefinitions).then(function(result) {

	});

You can pass either an object with term definition (see below) or an array of these objects. This method returns a promise that resoves with an object containing two keys - `added` is a number of terms that were added (excluding terms that already existed in the project), `parsed` is the number of terms you provided.

Each term definition object should have the following structure <a id="howto.terms.termdefinition"></a>:

	{
		string term,
		[string plural],
		[string comment],
		[string context],
		[string reference],
		[array<string> tags]
	}

#### Deleting a term (or an array of terms)

You can add one or more terms at once using `delete()` method:

	termsObject.delete(definition).then(function(result) {

	});

	termsObject.delete(arrayOfDefinitions).then(function(result) {

	});

You can pass either an object with [term definition](#howto.terms.termdefinition) or an array of these objects. This method returns a promise that resoves with an object containing two keys - `deleted` is a number of terms that were deleted, `parsed` is the number of terms you provided.

#### Commenting on a term (or an array of terms)

You can add one or more terms at once using `comment()` method:

	termsObject.comment(definition).then(function(result) {

	});

	termsObject.comment(arrayOfDefinitions).then(function(result) {

	});

You can pass either an object with [term definition](#howto.terms.termdefinition) or an array of these objects. This method returns a promise that resoves with an object containing two keys - `added` is a number of terms that were commented on, `parsed` is the number of terms you provided.
