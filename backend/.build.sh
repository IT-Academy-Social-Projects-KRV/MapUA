#!/bin/bash

echo "\n$(tput setaf 3)Build script start\n"
rm -rf ./dist
yarn build

cp ./package.json ./dist
cp .gitignore ./dist
cp .env ./dist

cd dist/
yarn install --production=true
echo "\n$(tput setaf 3)Build script end\n"