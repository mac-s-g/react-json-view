![alt text](https://github.com/mac-s-g/react-json-view/blob/master/doc/rjv-icon-alt.png?raw=true)

[![npm](https://img.shields.io/npm/v/react-json-view.svg)](https://www.npmjs.com/package/react-json-view) [![npm](https://img.shields.io/npm/l/react-json-view.svg)](https://github.com/mac-s-g/react-json-view/blob/master/LISCENSE) [![Build Status](https://travis-ci.org/mac-s-g/react-json-view.svg)](https://travis-ci.org/mac-s-g/react-json-view) [![Coverage Status](https://coveralls.io/repos/github/mac-s-g/react-json-view/badge.svg?branch=master)](https://coveralls.io/github/mac-s-g/react-json-view?branch=master)

# react-json-view
Interactive react component for displaying javascript **arrays** and **JSON objects**.

This component provides a responsive interface for displaying arrays or JSON in a web browser.  NPM offers a distribution of the source that's transpiled to ES5; so you can include this component with *any web-based javascript application*.

  * Check out an [interactive demo here](https://mac-s-g.github.io/react-json-view/example/example.html).
  * Check out a [React implementation example here](https://github.com/mac-s-g/react-json-view/blob/master/example/example.js).
  * Check out an [ES5 implementation example here](https://github.com/mac-s-g/react-json-view/blob/master/example/example.html).
  * [Installation instructions](#installation-instructions) are listed below.

### Implementation Example:
```
// import the react-json-view component
import ReactJson from 'react-json-view'

// use the component in your app!
<ReactJson src={my_json_object} />
```

### Example Component Display:
![alt text](https://github.com/mac-s-g/react-json-view/blob/master/doc/output-example-11.png?raw=true "Output Example")

[See More Examples](https://mac-s-g.github.io/react-json-view/example/example.html)

### Installation Instructions
Install this package with npm:
```
npm install --save react-json-view
```
Or add to your package.json config file:
```
"dependencies": {
    "react-json-view": "latest"
}
```

### Props
Name|Type|Default|Description
|:---|:---|:---|:---
`src`|`JSON Object`|None|This property contains your input JSON
`name`|`string`|"root"|Contains the name of your root node
`theme`|`string`|"rjv-default"|RJV supports base-16 themes.  Check out the [list of supported themes here](https://github.com/gaearon/base16-js/tree/master/src). A custom "rjv-default" theme applies by default.
`indentWidth`|`integer`|4|Set the indent-width for nested objects
`collapsed`|`boolean`|`false`|When set to `true`, all nodes will be collapsed by default
`enableClipboard`|`boolean`|`true`|When set to `true`, the user can copy objects and arrays to clipboard
`displayObjectSize`|`boolean`|`true`|When set to `true`, objects and arrays are labeled with size
`displayDataTypes`|`boolean`|`true`|When set to `true`, data type labels prefix values
`onEdit`|`(edit) => {}`|`false`|When a callback function is passed in, value edits are enabled.  The callback is invoked when edits are made. [see: onEdit docs](#onedit-interaction)

### Features
* Object and array nodes can be collapsed and expanded
* Object and array nodes display meta-data
* Object and array nodes support a "Copy to Clipboard" feature
* onEdit prop allows users to edit the `src` variable
* Base-16 Theme Support

### Customizing Style
RJV now supports base-16 themes!

You can specify a `theme` prop when you instantiate your rjv component.
```
<ReactJson src={my_important_json} theme="monokai" />
```
Check out the [list of supported themes here](https://github.com/gaearon/base16-js/tree/master/src).

#### Monokai theme example
![alt text](https://github.com/mac-s-g/react-json-view/blob/master/doc/output-example-monokai-2.png?raw=true "Base-16 Theme Example")

#### Solarized theme example
![alt text](https://github.com/mac-s-g/react-json-view/blob/master/doc/output-example-solarized-2.png?raw=true "Base-16 Theme Example")

### onEdit Interaction
Click the pencil icon to initialize an edit

![alt text](https://github.com/mac-s-g/react-json-view/blob/master/doc/edit-init-1.png?raw=true "initialize an edit")

Input a new value.  RJV will attempt to recognize integer and float inputs.

![alt text](https://github.com/mac-s-g/react-json-view/blob/master/doc/edit-input-1.png?raw=true "input variable value")

Submitting a new value calls your `onEdit` callback method

![alt text](https://github.com/mac-s-g/react-json-view/blob/master/doc/edit-complete-1.png?raw=true "edit submitted")

The `onEdit` function is passed an `edit` variable. The edit variable will have the following contents:
```
const edit = {
    updated_src: src, //new src value
    name: name, //new var name
    namespace: namespace, //list, namespace indicating var location
    new_value: new_value, //new variable value
    existing_value: existing_value, //existing variable value
}
```

### Contributing to the source code:
#### Standard Workflow
  1. Clone this repo
  2. Install npm dependencies
```
cd react-json-view
npm install
```
  3. Run webpack to start webpack-dev-server with hot-reloading enabled
      * `npm run dev:hot`
  4. Open port 2000 in your browser
      * navigate to localhost:2000

#### Development within a Docker Container
You can use Docker to run the source code in a local development environment:
  1. Clone this repo
  2. Make sure docker is installed
  3. Build the docker image
      * `docker build -t react-json-view .`
      * *note:* you may need to use `sudo` to run docker commands
  4. Run the docker container on port 2000.  This will run the webpack-dev-server with hot-reloading enabled.
      * `cd react-json-view`
      * `./docker/dev-server.sh`
      * *note:* you may need to use `sudo` to run the server file
  5. Open port 2000 in your browser
      * navigate to localhost:2000

Your source code will be mounted inside the docker container.  The container is built on the standard Node image.

Webpack-dev-server is running in the container and hot-reloading when changes are made locally.

All node modules are installed within the container, so make sure to rebuild your container if you make changes to package.json (see step 3, above).

### To-Do's
1. Support "delete" capability when `onEdit` is enabled
2. Support "add" capability when `onEdit` is enabled
