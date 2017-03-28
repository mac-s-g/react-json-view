#!/bin/bash
# runs shell in react container

NODE_ENV=${1:-local}
echo "Running with NODE_ENV=$NODE_ENV"

# run the react-json-view container
docker run \
    --rm \
    -v $(pwd)/src:/react/src \
    -v $(pwd)/example:/react/example \
    -v $(pwd)/test:/react/test \
    -e NODE_ENV=$NODE_ENV \
    --entrypoint=/bin/bash \
    -ti react-json-view
