#!/bin/bash
# runs webpack in react container

NODE_ENV=${1:-local}
echo "Running with NODE_ENV=$NODE_ENV"

rm -rf ./coverage/*

# run the container
docker run \
    -v $(pwd)/src:/react/src \
    -v $(pwd)/dev-server:/react/dev-server \
    -v $(pwd)/coverage:/react/coverage \
    -v $(pwd)/webpack/webpack.config.js:/react/webpack.config.js \
    -v $(pwd)/.nyc_output:/react/.nyc_output \
    -v $(pwd)/test:/react/test \
    -v $(pwd)/docker:/react/docker \
    --rm \
    -e NODE_ENV=$NODE_ENV \
    --entrypoint=/react/docker/entrypoints/coverage.sh \
    -t react-json-view

