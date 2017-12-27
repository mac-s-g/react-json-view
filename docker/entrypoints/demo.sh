#!/bin/bash
# builds component output files

export NODE_ENV=${NODE_ENV:-production}

echo Building RJV Demo...

# remove dist files if they exist,
# otherwise create the dist directory
if [ -d /react/demo/dist/main.js ]; then
    echo Removing existing dist artifacts
    rm /react/demo/dist/main.js
fi

# now, build the app
cd /react
npm run build:demo

echo Copied distribution to /demo/dist
