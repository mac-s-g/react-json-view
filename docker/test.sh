#!/bin/bash
# runs webpack in react container

NODE_ENV=${1:-local}
echo "Running with NODE_ENV=$NODE_ENV"

# run the workbench container
docker run \
    -v $(pwd):/react \
    --rm \
    -e NODE_ENV=$NODE_ENV \
    --entrypoint=/react/entrypoints/test.sh \
    -t react-json-view
