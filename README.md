# poeditor-client

JavaScript client for [POEditor](http://poeditor.com) translations solution.

**This is a placeholder module. Functionality will be added continually. You can expect it to be fully functional in version 0.1.0.**

## Installation

`poeditor-client` is an NPM module. To install please run

	npm install poeditor-client

## Usage

`poeditor-client` consists of three more or less autonomous submodules for working with Projects, Languages and Contributors. For now there is no CLI tooling, you have to use it as a JavaScript module.

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