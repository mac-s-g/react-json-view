#!/bin/bash
# runs webpack in react container

NODE_ENV=${1:-local}
echo "Running with NODE_ENV=$NODE_ENV"

rm -rf ./coverage/*

# run the workbench container
docker run \
    -v $(pwd)/src:/react/src \
    -v $(pwd)/example:/react/example \
    -v $(pwd)/entrypoints:/react/entrypoints \
    -v $(pwd)/coverage:/react/coverage \
    -v $(pwd)/webpack.config.js:/react/webpack.config.js \
    -v $(pwd)/test:/react/test \
    --rm \
    -e NODE_ENV=$NODE_ENV \
    --entrypoint=/react/entrypoints/coverage.sh \
    -t react-json-view
