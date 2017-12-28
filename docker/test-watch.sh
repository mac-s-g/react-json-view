#!/bin/bash
# runs webpack in react container

NODE_ENV=${1:-local}
echo "Running with NODE_ENV=$NODE_ENV"

# run the workbench container
docker run \
    -v $(pwd)/src:/react/src \
    -v $(pwd)/dev-server:/react/dev-server \
    -v $(pwd)/webpack/webpack.config.js:/react/webpack.config.js \
    -v $(pwd)/test:/react/test \
    -v $(pwd)/docker:/react/docker \
    --rm \
    -e NODE_ENV=$NODE_ENV \
    --entrypoint=/react/docker/entrypoints/test-watch.sh \
    -t react-json-view
