#!/bin/bash
# runs webpack in node container

NODE_ENV=${1:-production}
echo "Running with NODE_ENV=$NODE_ENV"

# stop and remove the containers if they are running
stop_and_remove_container()
{
    docker stop react-json-view
    docker rm react-json-view
}
stop_and_remove_container || true

# run the workbench container
docker run \
    -v $(pwd)/src:/react/src \
    -v $(pwd)/dist:/react/dist \
    -v $(pwd)/entrypoints:/react/entrypoints \
    -v $(pwd)/webpack.config.js:/react/webpack.config.js \
    --name=react-json-view \
    -e NODE_ENV=$NODE_ENV \
    --entrypoint=/react/entrypoints/prepublish.sh \
    -t react-json-view