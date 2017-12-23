#!/bin/bash

cd /react

echo Installing Test Dependencies
sh ./docker/entrypoints/install-test-dependencies.sh

echo getting source tree..
npm run modules:tree > debug/tree.json

echo Running bundle size analysis
npm run modules:size-analyzer