# reactive-json
interactive json viewer wrapped up in a react component

## Usage
### Implementation Example:
![alt text](https://github.com/mac-s-g/reactive-json/blob/master/docs/source-example-v1.png?raw=true "Usage Example")

### Output Example:
![alt text](https://github.com/mac-s-g/reactive-json/blob/master/docs/output-example-v1.png?raw=true "Output Example")

## Customizing Style
update or override `src/style/_variables.scss` to apply your own theme.

## Working with the source code:
You can use Docker to run the source code in your browser:
  1. Clone this repo
  2. Make sure docker is installed
  3. Build the docker image
    * `docker build -t reactive-json .`
    * *note:* you may need to use `sudo` to run docker commands
  4. Run the docker container on port 2000
    * `cd reactive-json`
    * `./docker/server.sh`
    * *note:* you may need to use `sudo` to run the server file
  5. open port 2000 in your browser
    * navigate to localhost:2000
  
Your source code will be mounted inside the docker container.  The container is built on the standard Node image.  

Webpack-dev-server is running in the container and hot-reloading when changes are made locally.

All node modules are installed within the container, so make sure to rebuild your container if you make changes to package.json (see step 3, above).

## ToDo's
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
4. add collapsed attributes to objects and support collapse / expand functionality
