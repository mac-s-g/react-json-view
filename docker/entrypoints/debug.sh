#!/bin/bash

cd /react

echo getting source tree..
npm run modules:tree > debug/tree.json

echo Running bundle size analysis
npm run modules:size-analyzer