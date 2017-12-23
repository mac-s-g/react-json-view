#!/bin/bash
echo Running Tests

cd /react

echo Installing Test Dependencies
sh ./docker/entrypoints/install-test-dependencies.sh

exec npm run test:unit
