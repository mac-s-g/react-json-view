#!/bin/bash
# runs webpack in react container

NODE_ENV=${1:-local}
echo "Running with NODE_ENV=$NODE_ENV"

# stop and remove the containers if they are running
stop_and_remove_container()
{
    docker stop react-json-viewer
    docker rm react-json-viewer
}
stop_and_remove_container || true

# run the workbench container
docker run \
    -v $(pwd)/src:/react/src \
    -v $(pwd)/test:/react/test \
    -v $(pwd)/entrypoints:/react/entrypoints \
    -v $(pwd)/webpack.config.js:/react/webpack.config.js \
    --name=react-json-viewer \
    -e NODE_ENV=$NODE_ENV \
    --publish 2000:2000 \
    --entrypoint=/react/entrypoints/server.sh \
    -t react-json-viewer