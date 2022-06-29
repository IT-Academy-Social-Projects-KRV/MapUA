#!/bin/bash

APP_NAME="mapua-frontend-appappappapp"

# Uncomment if you don't neet to build the app (as it is a time consuming process)
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