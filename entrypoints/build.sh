#!/bin/bash
# builds component output files

export NODE_ENV=${NODE_ENV:-production}

echo Building react app...

# now, build the app
cd /react
npm run build
