#!/bin/bash
# runs webpack dev server /react directory

mkdir -p /react/build || true
cp /react/src/html/index.html.template /react/build/index.html
cd /react
exec npm run dev:hot
