#!/bin/bash
echo Running Coverage Report

cd /react

exec npm run unit_test && npm run coverage
