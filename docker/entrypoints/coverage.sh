#!/bin/bash
echo Running Coverage Report

cd /react

echo Installing Test Dependencies
sh ./entrypoints/install-test-dependencies.sh

echo Running: npm run unit_test
npm run test:unit

echo Running: npm run coverage
npm run test:coverage
