#!/bin/bash

APP_NAME="mapua-frontend-app"

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

# #!/bin/bash

# APP_NAME="mapua-frontend-app"

# # Uncomment if you don't neet to build the app (as it is a time consuming process)
# # source ./.build.sh;

# cd server/
# echo "$(tput setaf 3)Deploy script start";

# # Heroku CLI must be installed to execute this part

# heroku login -i;
# heroku container:login

# # isAlreadyCreated=$(heroku create --app $APP_NAME 2>&1);
# heroku create

# # If application have already created, just switch go proper remote git branch
# # if [[ $isAlreadyCreated =~ "already taken" ]]; then
# #    echo "App already exists";
# #    heroku container:push web;
# #    heroku container:release web;
# #    echo "$(tput setaf 3)Deploy script end";
# #    heroku open;
# #    exit 0;
# # fi

# heroku container:push web
# heroku container:release web

# echo "$(tput setaf 3)Deploy script end";
# heroku open;