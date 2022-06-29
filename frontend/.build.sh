#!/bin/bash

echo "$(tput setaf 3)Build script start"
rm -rf ./build

dir=${PWD%/*};

# Typescript must be installed locally for this command to be executed
yarn build --production=true
mv "$dir/build" "$(pwd)"

echo "$(tput setaf 3)Build script end"