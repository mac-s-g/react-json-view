# react-json-view
Interactive JSON display wrapped up in a react component.

This component provides a responsive interface for displaying JSON in a web browser.  NPM offers a distribution of the source that's transpiled to ES5; so you can include this component with *any javascript application*.

  * Check out an [interactive demo here](http://htmlpreview.github.io/?https://raw.githubusercontent.com/mac-s-g/react-json-view/master/example/example.html).
  * Check out a [React implementation example here](https://github.com/mac-s-g/react-json-view/blob/master/example/example.js).
  * Check out an [ES5 implementation example here](https://github.com/mac-s-g/react-json-view/blob/master/example/example.html).
  * [Installation instructions](#intallation-instructions) are listed below.

### Implementation Example:
![alt text](https://github.com/mac-s-g/react-json-view/blob/master/doc/source-example-5.png?raw=true "Usage Example")

### Example Component Display:
![alt text](https://github.com/mac-s-g/react-json-view/blob/master/doc/output-example-3.png?raw=true "Output Example")

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

### Features
* Object nodes can be collapsed and expanded
* Different classes are applied to different types for style interaction.

### Customizing Style
update or override `src/style/_variables.scss` to apply your own theme.

### Working with the source code:
You can use Docker to run the source code in a local development environment:
  1. Clone this repo
  2. Make sure docker is installed
  3. Build the docker image
    * `docker build -t react-json-view .`
    * *note:* you may need to use `sudo` to run docker commands
  4. Run the docker container on port 2000
    * `cd react-json-view`
    * `./docker/server.sh`
    * *note:* you may need to use `sudo` to run the server file
  5. open port 2000 in your browser
    * navigate to localhost:2000

Your source code will be mounted inside the docker container.  The container is built on the standard Node image.

Webpack-dev-server is running in the container and hot-reloading when changes are made locally.

All node modules are installed within the container, so make sure to rebuild your container if you make changes to package.json (see step 3, above).

### ToDo's
1. Add Tests!
2. move each data type into it's own component
```
case 'string':
    return <div class="object-value string">
        <span class="data-type">string</span>
        {value}
    </div>;
```
should become
```
case 'string':
    return <PrettyString value={value} />;
```

3. improve customizability
    * add optional `depth` prop
    * consider moving to postcss
    * add a few different themes on top of `_variables.scss`
4. add array component supports collapse and expand
