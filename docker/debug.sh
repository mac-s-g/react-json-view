#!/bin/bash
# runs webpack in react container

# debug output for production build
NODE_ENV=${1:-production}
echo "Running with NODE_ENV=$NODE_ENV"

rm -rf ./debug

mkdir debug

# run the container
docker run \
    -v $(pwd)/src:/react/src \
    -v $(pwd)/debug:/react/debug \
    -v $(pwd)/webpack/webpack.config.js:/react/webpack.config.js \
    -v $(pwd)/docker:/react/docker \
    --rm \
    -e NODE_ENV=$NODE_ENV \
    --entrypoint=/react/docker/entrypoints/debug.sh \
    -t react-json-view

