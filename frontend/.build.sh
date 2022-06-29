#!/bin/bash

echo "$(tput setaf 3)Build script start"
rm -rf ./server/build

# Typescript must be installed locally for this command to be executed
yarn build --production=true
mv build/ server/

echo "$(tput setaf 3)Build script end"
