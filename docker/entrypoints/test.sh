#!/bin/bash
echo Running Tests

cd /react

echo Installing Test Dependencies
sh ./entrypoints/install-test-dependencies.sh

exec npm run test:unit
