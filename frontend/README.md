## Frontend

[Server on which frontend located](https://map-ua.herokuapp.com/)

### Run locally

1. cd frontend/
2. yarn install to install all packages
3. yarn start to run local server (default port is 3000)
4. Done!

### Technologies Used

- **prettier** - an opinionated code formatter;
- **eslint** - code analyzer based on airbnb confiburation;
- **husky** - a tool for improving commits (temprorarily removed)
- **CRA** - Create React App as a main project skeleton
- **MUI** - a library of React components which based on Material UI concepts
- **react-router v6** - a library for routing in the app Material UI  
  and more ...

_TODO: Add i18n for translations_

### Step to deploy Frontend

1. Create **.env.production** file if one doesn't exist and put all necessary variables on it (use **.envExample** as an example)
2. Go to folder **ROOT_FOLDER/frontend/server/**
3. Run **bash .deploy.sh** command, to start auto deploy bash script. You would see in the console _Deploy script start_ message
4. During the deployment process, you would be required to pass an email and password of heroku account. You can get the credentials from
   a responsible person
5. After passing credentials, the deployment would continue and by the end of the day, you would see _Deploy script end_ message which means a successful deployment

You will be automatically redirected to the corresponding heroku page, on which website were deployed. It is important to deploy backend part as well,
to produce a well working application
