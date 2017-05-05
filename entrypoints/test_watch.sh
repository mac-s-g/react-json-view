#!/bin/bash
# runs webpack dev server /react directory

# create the build directory if it doesn't exist
echo Creating dist dir...
mkdir -p /react/dist || true

cp /react/src/html/index.html.template /react/dist/index.html
cd /react

exec npm run test:watch
