#!/bin/bash
# builds component output files

export NODE_ENV=${NODE_ENV:-production}

echo Building RJV Distribution...

# remove dist files if they exist,
# otherwise create the dist directory
if [ -d /react/dist/main.js ]; then
    echo Removing existing dist artifacts
    rm /react/dist/main.js
fi

# now, build the app
cd /react
npm run build

# ... and copy files for dist
cp -a /react/dist /dist
echo Copied distribution to /dist
