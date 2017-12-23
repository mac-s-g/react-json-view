#!/bin/bash
# runs webpack in react container

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
    -v $(pwd)/demo:/react/demo \
    -v $(pwd)/docker:/react/docker \
    -v $(pwd)/webpack:/react/webpack \
    --name=react-json-view \
    -e NODE_ENV=$NODE_ENV \
    --entrypoint=/react/docker/entrypoints/demo.sh \
    -t react-json-view