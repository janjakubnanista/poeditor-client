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
	- [Language](#components.language)

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

##### create

	Promise<Project> create(
		string name,
		[string description]
	)

Create new POEditor project with given name and optional description. This method returns a promise that resolves with newly created `Project` object. See [Project section](#components.project) for more info on `Project` objects.

#### Project<a id="components.project"></a>

`Project` represents a single POEditor project (so wow much unexpected). You can obtain an instance of `Project` by querying [Projects](#components.projects) submodule.

Apart from methods listed below every `Project` has following read-only properties:

- `string|number id`
- `string name`
- `bool public`
- `bool open`
- `string created`
- `string reference_langugage`

##### listLanguages

	Promise<Array<Language>> listLanguages()

Lists the project languages. This method returns a promise that resolves with an array of `Language` objects. See [Language section](#components.langugage) for more info on `Language` objects.

#### Language<a id="components.language"></a>

`Language` represents a single POEditor language.

Every `Language` has following read-only properties:

- `string code`
- `string name`
- `number percentage`