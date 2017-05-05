#!/bin/bash
echo Running Coverage Report

cd /react

echo Running: npm run unit_test
npm run unit_test

echo Running: npm run coverage
npm run coverage
