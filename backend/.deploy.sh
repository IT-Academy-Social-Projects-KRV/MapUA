#!/bin/bash

# sh ./.build.sh

echo "\n$(tput setaf 3)Deploy script start\n"

# Heroku CLI must be installed to execute this part

heroku local map-ua-backend

git add .
git commit -m "heroku app build"
heroku login -i

heroku create
git push heroku main

heroku open