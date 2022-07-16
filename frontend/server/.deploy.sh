#!/bin/bash

APP_NAME="map-ua"

source ../.build.sh;

echo "$(tput setaf 3)Deploy script start";

# Heroku CLI must be installed to execute this part
heroku login -i;

heroku container:login;

heroku create --app $APP_NAME;
heroku container:push web --app $APP_NAME;
heroku container:release web --app $APP_NAME;

echo "$(tput setaf 3)Deploy script end";
heroku open --app $APP_NAME;