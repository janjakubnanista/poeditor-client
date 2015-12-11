# poeditor-client

JavaScript client for [POEditor](http://poeditor.com) translations solution.

**This is a placeholder module. Functionality will be added continually. You can expect it to be fully functional in version 0.1.0.**

## Installation

`poeditor-client` is an NPM module. To install please run

	npm install poeditor-client

## Usage

`poeditor-client` allows you to aceess POEditor's API from your JavaScript code. For now there is no CLI tooling, you have to use it as a JavaScript module.

- [Getting started](#howto.gettingstarted)
- [Working with projects](#howto.projects)
- [Working with project languages](#howto.languages)


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


<a id="howto.languages"></a>
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



==================================================================

### Components

- [Projects](#components.projects)
- [Project](#components.project)
- [Languages](#components.languages)
- [Language](#components.language)
- [Terms](#components.terms)
- [Term](#components.term)

#### Projects<a id="components.projects"></a>

This submodule allows you to work with Projects, their languages, terms and comments. The entry point for this submodule is `Projects` class:

	var POEditor = require('poeditor-client');
	var projects = new POEditor.Projects('<your API access token>');

##### constructor

	new Projects(
		string token
	)

Creates new instance of `Projects` class. You have to pass POEditor API access token. For more information on API access token please [see this doc](https://poeditor.com/api_reference/#Authentication).

##### list

	Promise<Array<Project>> list()

Lists the project for given API access token. This method returns a promise that resolves with an array of `Project` objects. See [Project section](#components.project) for more info on `Project` objects.

##### get

	Promise<Project> get(
		string|number id
	)

Retrieve details about a single project identified by its `id`. This method returns a promise that resolves with a `Project` object. See [Project section](#components.project) for more info on `Project` objects.

##### add

	Promise<Project> add(
        object project
	)

Create new POEditor project. The `project` parameter must have a string `name` property and an optional `description` property. This method returns a promise that resolves with newly created `Project` object. See [Project section](#components.project) for more info on `Project` objects.

#### Project<a id="components.project"></a>

`Project` represents a single POEditor project (so wow much unexpected). You can obtain an instance of `Project` by querying [Projects](#components.projects) submodule.

Every `Project` has following read-only properties:

- `string|number id`
- `string name`
- `bool public`
- `bool open`
- `string created`
- `string reference_langugage`
- `Languages languages` See [Languages section](#components.languages) for more info on `Languages` object.
- `Terms terms` See [Terms section](#components.terms) for more info on `Terms` object.

#### Languages<a id="components.languages"></a>

`Languages` provides an access to project's languages. You can list, add or delete project languages using this object.

##### constructor

	new Languages(
		string token,
		string|number projectID
	)

Creates new instance of `Languages` class. You have to pass POEditor API access token and a Project ID. You should not need to call this constructor manually, instead use `languages` property on a `Project` instance.


##### list

	Promise<Array<Language>> list()

Lists the project languages. This method returns a promise that resolves with an array of `Language` objects. See [Language section](#components.langugage) for more info on `Language` objects.

##### add

	Promise<void> add(
		string code
	)

Adds a language with language code `code` to project. The returned promise resolves with no arguments.

##### delete

	Promise<void> delete(
		string code
	)

Deletes a language with language code `code` from project. The returned promise resolves with no arguments.

##### setAsReference

	Promise<void> setAsReference(
		string code
	)

Sets a language with language code `code` as a reference language for project. The returned promise resolves with no arguments.

##### unsetAsReference

	Promise<void> unsetAsReference(
		string code
	)

Unsets a language with language code `code` as a reference language for project. The returned promise resolves with no arguments.

#### Language<a id="components.language"></a>

`Language` represents a single POEditor language.

##### constructor

	new Language(
		string token,
		string|number projectID,
		object data
	)

Creates new instance of `Language` class. You have to pass POEditor API access token, Project ID and a hash of language `data`:

	{
		string code,
		[string name]
		[string percentage]
	}

You only need to specify `code` for methods on this object to work. You should not need to call this constructor manually, instead use `languages` property on a `Project` instance to get a list of language objects.

Every `Language` has following read-only properties:

- `string code`
- `string name`
- `number percentage`
- `Terms terms` See [Terms section](#components.terms) for more info on `Terms` object.

##### delete

	Promise<void> delete()

Deletes a language from project. The returned promise resolves with no arguments.

##### setAsReference

	Promise<void> setAsReference()

Sets a language as a reference language for project. The returned promise resolves with no arguments.

##### unsetAsReference

	Promise<void> unsetAsReference()

Unsets a language as a reference language for project. The returned promise resolves with no arguments.


#### Terms<a id="components.terms"></a>

`Terms` object lets you access and manipulate individual terms.

##### constructor

	new Terms(
		string token,
		string|number projectID,
		[string languageCode]
	)

Creates new instance of `Terms` class. You have to pass POEditor API access token, Project ID and optionally a language code (if you're interested in translations too). You should not need to call this constructor manually, instead use `terms` property on either `Project` or `Language` instance.

##### list

	Promise<Array<Term>> list()

Lists the terms. This method returns a promise that resolves with an array of `Term` objects. See [Term section](#components.term) for more info on `Term` objects.

##### add

	Promise<object> add(
		array<object>|Object terms
	)

Add new terms to project. You can pass either an object with term definition (see below) or an array of these objects. This method returns a promise that resoves with an object containing two keys - `added` is a number of terms that were actually added (excluding terms that already exist in the project), `parsed` is the number of terms you provided.

Each term definition object should have the following structure:

	{
		string term,
		[string plural],
		[string comment],
		[string context],
		[string reference],
		[array<string> tags]
	}

##### delete

	Promise<object> delete(
		array<object>|Object terms
	)

Deletes terms from project. You can pass either an object with term definition (see below) or an array of these objects. This method returns a promise that resoves with an object containing two keys - `deleted` is a number of terms that were deleted, `parsed` is the number of terms you provided.

Each term definition object should have the following structure:

	{
		string term,
		[string context]
	}

##### comment

	Promise<object> comment(
		array<object>|Object terms
	)

Add comment to specified terms. You can pass either an object with term definition (see below) or an array of these objects. This method returns a promise that resoves with an object containing two keys - `added` is a number of terms that were commented on, `parsed` is the number of terms you provided.

Each term definition object should have the following structure:

	{
		string term,
		string comment,
		[string context]
	}

#### Term<a id="components.term"></a>

`Term` represents a single POEditor term.

##### constructor

	new Term(
		string token,
		string|number projectID,
		string languageCode,
		object data
	)

Creates new instance of `Term` class. You have to pass POEditor API access token, Project ID, language code (can be empty) and a hash of term `data`:

	{
		string term,
		string context,
		[string reference],
		[string created],
		[string updated],
		[array<string> tags],
		[object definition]
	}

You only need to specify `term` and `context` for methods on this object to work. You should not need to call this constructor manually, instead use `terms` property on either `Project` or `Language` instance to get a list of `Term` objects.

Every `Term` has following read-only properties:

- `string term`
- `string context`
- `string reference`
- `string created`
- `string updated`
- `array<string> tags`
- `string translation`
- `bool fuzzy`
