## Backend

You need **node.js** (preferably LTS version and at least Node.js ≥ v10.5.0). Also, in this project we are using **yarn** package manager.  
To run backend, you can use **docker** installed on your machine as well.

### Steps to start backend locally

1. cd backend/
2. yarn install to install all packages
3. yarn dev to run local server (default port is 3001)
4. Done!

### Technologies Used

- **express** - a web framework for node.js;
- **mongoose** - an ODM for MongoDB  
  and more, this list will be updated in the near future...

[Server on which backend located](https://mapua-backend-app.herokuapp.com/)

To run Swagger http://localhost:3001/api-docs/

### Step to deploy Backend

1. Create **.env** file if one doesn't exist and put all necessary variables on it (use **.envExample** as an example). It is **VERY** important not to use any spaces or tabs nor \n and similar symbols in .env file. Every new variable must be from a new line without any tabular symbol. (in frontend part, it is not necessary, as deploy script doesn't use .env file directly)
2. Go to folder **ROOT_FOLDER/backend/**
3. Run **bash .deploy.sh** command, to start auto-deploy bash script. You would see in the console _Deploy script start_ message
4. During the deployment process, you will be required to provide an email and password of heroku account. You can get the credentials from a responsible person
5. After passing credentials, the deployment would continue and by the end of the day, you would see _Deploy script end_ message which means a successful deployment

You will be automatically redirected to the corresponding heroku page, on which the website was deployed.  
The deployment of a backend service takes a little bit longer than a frontend as it does some additional steps with .env variables and project build.
