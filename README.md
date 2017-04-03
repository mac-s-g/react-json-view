# react-json-view
Interactive JSON display wrapped up in a react component.

This component provides a responsive interface for displaying JSON in a web browser.  NPM offers a distribution of the source that's transpiled to ES5; so you can include this component with *any web-based javascript application*.

  * Check out an [interactive demo here](http://htmlpreview.github.io/?https://raw.githubusercontent.com/mac-s-g/react-json-view/master/example/example.html).
  * Check out a [React implementation example here](https://github.com/mac-s-g/react-json-view/blob/master/example/example.js).
  * Check out an [ES5 implementation example here](https://github.com/mac-s-g/react-json-view/blob/master/example/example.html).
  * [Installation instructions](#intallation-instructions) are listed below.

### Implementation Example:
![alt text](https://github.com/mac-s-g/react-json-view/blob/master/doc/source-example-8.png?raw=true "Usage Example")

### Example Component Display:
![alt text](https://github.com/mac-s-g/react-json-view/blob/master/doc/output-example-7.png?raw=true "Output Example")

### Intallation Instructions
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
`collapsed`|`boolean`|false|If set to `true`, all nodes will be collapsed by default
`indentWidth`|`integer`|4|Set the indent-width for nested objects

### Features
* Object and array nodes can be collapsed and expanded
* Object and array nodes display meta-data on hover
* Object and array nodes include a "Copy to Clipboard" feature
* Different classes are applied to different types for style interaction

### Customizing Style
update or override `src/style/_variables.scss` to apply your own theme.

### Working with the source code:
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
*Note:* This workflow is recommended for developers using a linux OS.  Mounting files into a docker container may have issues if you're running docker within a Windows OS.

You can use Docker to run the source code in a local development environment:
  1. Clone this repo
  2. Make sure docker is installed
  3. Build the docker image
      * `docker build -t react-json-view .`
      * *note:* you may need to use `sudo` to run docker commands
  4. Run the docker container on port 2000.  This will run the webpack-dev-server with hot-reloading enabled.
      * `cd react-json-view`
      * `./docker/server.sh`
      * *note:* you may need to use `sudo` to run the server file
  5. Open port 2000 in your browser
      * navigate to localhost:2000

Your source code will be mounted inside the docker container.  The container is built on the standard Node image.

Webpack-dev-server is running in the container and hot-reloading when changes are made locally.

All node modules are installed within the container, so make sure to rebuild your container if you make changes to package.json (see step 3, above).

### To-Do's
1. Add Tests!
2. Implement persistent state for expand/collapse attribute
3. improve customizability
    * add optional `showTypes` prop
    * add props to define what is expanded/collapsed by default
    * consider moving to postcss
    * add a few different themes on top of `_variables.scss`
