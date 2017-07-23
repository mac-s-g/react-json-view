#!/bin/bash
# builds component output files

export NODE_ENV=${NODE_ENV:-production}

echo Building react app...

# remove dist files if they exist,
# otherwise create the dist directory
if [ -d /react/dist ]; then
    echo Removing dist artifacts
    rm -rf /react/dist/*
else
    echo Creating dist directory
    mkdir /react/dist
fi

# copy over the index.html file for functional test
cp /react/src/html/test-dist.html.template /react/dist/test.html

# now, build the app
cd /react
npm run build

# ... and copy files for dist
cp -a /react/dist /dist
echo Copied distribution to /dist
