#!/bin/bash
# runs webpack dev server /react directory

# create the build directory if it doesn't exist
echo Creating build dir...
mkdir /react/build || true

cp /react/src/html/index.html.template /react/build/index.html
cd /react

exec npm run test
