#!/bin/bash
# runs webpack dev server /react directory

mkdir -p /react/dist || true
cd /react
exec npm run dev
