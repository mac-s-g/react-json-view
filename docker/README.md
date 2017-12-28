### Contributing to this Project Using Docker
#### Run the Dev Server
To use Docker to run the source code in a local development environment:
  1. Clone this repo
  2. Build the docker image
      * `cd react-json-view`
      * `./docker/build-container.sh`
      * *note:* you may need to use `sudo` to run docker commands
  3. Run the docker container on port 2000.  This will run the webpack-dev-server with hot-reloading enabled.
      * `./docker/dev-server.sh`
      * *note:* you may need to use `sudo` to run the server file
  4. Open port 2000 in your browser
      * navigate to localhost:2000

Your source code will be mounted inside the docker container.  The container is built on the latest `Node:slim` image.

Webpack-dev-server is running in the container and hot-reloading when changes are made locally.

All node modules are installed within the container, so make sure to rebuild your container if you make changes to package.json (see step 2, above).

#### Run the Production Build
```bash
cd react-json-view
# build the rjv container
./docker/build-container.sh
# run the build within your docker container
./docker/build-dist.sh
```


### Motivation for adding Docker to your Development Stack

**PSA:** You do not need to use Docker to contribute to this project.  If you're not interested in using a container for development, you can ignore this directory.

You can contribute to this project with or without using Docker.  This README is here to describe _how_ to use Docker when contributing and _why_ you would benefit.

#### What is Docker?

docker manages software "containers".
a container is a stack of "images" that define an environment from the OS up.
for example, the container used with this project has the following composition:

```
[ RJV node modules ]
[ node 8.4.0       ]
[ linux debian     ]
```

#### Motivations for Docker
 * _environmental consistency_
   * this means I can completely replicate an environment for any build, on any machine
 * _portability_
   * it's easy to define an environment and share it with other developers.
   * I don't need to list steps for installing software - I can just write and share a dockerfile
 * _module fatigue_
   * I can easily add/update/remove frameworks or node modules without worrying about messing up my file system.  All packages are confined within a container, which I can easily update, rebuild or remove.

#### RJV Docker Workflow

the `Dockerfile` defines exactly how a container should be composed for an application.  Any docker-integrated workflow starts here.

Here is the [RJV Dockerfile](https://github.com/mac-s-g/react-json-view/blob/master/Dockerfile)

Notice [here](https://github.com/mac-s-g/react-json-view/blob/master/Dockerfile#L1) that my container is built on top of a node container.  If you track down that node container on docker-hub, you'll see that it's built on top of a debian container.  Also notice that `node_modules` are installed directly into my container [here](https://github.com/mac-s-g/react-json-view/blob/master/Dockerfile#L6-L7).

When I run `./docker/build-container.sh`, docker produces a container including all the `node_modules` listed in my `package.json` file.

When I run `./docker/dev-server.sh`, a few things happen:
 1. docker [runs my container and mounts some source files](https://github.com/mac-s-g/react-json-view/blob/master/docker/dev-server.sh#L16-L20) into the container
    * "mounting" is like a soft copy.  my files are linked inside the container's file system so local edits propagate to the container.
 2. docker [exposes a port](https://github.com/mac-s-g/react-json-view/blob/master/docker/dev-server.sh#L23) on the container
    * this allows me to configure my app to listen and respond to to traffic at http://localhost:2000
    * the port is arbitrary
 3. An [entrypoint will be invoked](https://github.com/mac-s-g/react-json-view/blob/master/docker/dev-server.sh#L24) once the container is running
    * With my container up and running, the [entrypoint simply runs webpack dev server](https://github.com/mac-s-g/react-json-view/blob/master/entrypoints/dev-server.sh#L6).

If you understand those steps, then you'll understand any of the docker scripts in `/docker/`.  They do the same thing as the dev-server script but call different entrypoints.

here is a workflow comparison with and without  docker:

Task|Without Docker|With Docker
|:---|:---|:---
install node modules|update package.json<br/>`npm install --save-dev`|update package.json<br/>`./docker/build-container.sh`
run dev server|`npm run dev:hot`|`./docker/dev-server.sh`
run build|`npm run build`|`./docker/build.sh`

#### is it worth it?

`/docker/` and `/entrypoint/` scripts come with some overhead.  Is it really worth the work?

Remember the problems that docker is solving.  Without docker, I have to be much more skeptical when testing contributions from the community.

What if a contributor is using a different version of node or npm?
What if a contributor has a global package installed that's affecting the behavior of their code?

running the app inside a container ensures that environmental inconsistencies like those above will not lead to bugs in production.

#### more examples

[github-help-wanted](https://github.com/mac-s-g/github-help-wanted) is a newer project that has a simpler docker workflow.
