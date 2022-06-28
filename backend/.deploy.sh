#!/bin/bash

APP_NAME="mapua-backend-app"

# Uncomment if you don't neet to build the app (as it is a time consuming process)
# source ./.build.sh;

cd dist/
echo "$(tput setaf 3)Deploy script start";

# Heroku CLI must be installed to execute this part
heroku local $APP_NAME;

git init;
git add .;
git commit -m "heroku app build";
heroku login -i;

isAlreadyCreated=$(heroku create --app $APP_NAME 2>&1);

# If application have already created, just switch go proper remote git branch
if [[ $isAlreadyCreated =~ "already taken" ]]; then
   echo "App already exists";
   heroku git:remote -a $APP_NAME;
fi
git push heroku master;

# Replace localhost and ports that maps to heroku
sed -i "s/http:\/\/localhost:3001/https:\/\/$APP_NAME.herokuapp.com/" .env;
sed -i 's/3001/80/' .env;

# Add all variables to the heroku config
cat .env | while IFS= read -r line; do
  value=${line#*=}
  name=${line%%=*}
  heroku config:set $name=$value --app $APP_NAME
done

echo "$(tput setaf 3)Deploy script end";
heroku open;