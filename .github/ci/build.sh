#!/bin/bash
# Website build script
# @author Denis Zholob (deniszholob.com)
#
# ====================================== #

echo ' -- Build Script Started ...'

echo ' -- Running npm build script'
pnpm run build:gh-prod

# https://angular.io/guide/deployment#deploy-to-github-pages
echo ' -- Copy index.html to 404.html'
cp dist/browser/index.html dist/browser/404.html

echo ' -- Build contents'
ls -al "dist"

echo ' -- Build script finished ...'
