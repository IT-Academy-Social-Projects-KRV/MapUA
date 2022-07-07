#!/bin/bash

echo "$(tput setaf 3)Build script start"
rm -rf ./dist

# Typescript must be installed locally for this command to be executed
node_modules/.bin/tsc -p .

cp ./package.json ./dist
cp .gitignore ./dist
cp .env ./dist
cp yarn.lock ./dist
cp -r locales/ dist/
cp swagger-config.yml ./dist

cd dist/
yarn install --production=true

echo "$(tput setaf 3)Build script end"