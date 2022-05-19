import dotenv from 'dotenv';

dotenv.config();

import express from 'express';
import cors from 'cors';

import router from './routes';

import swaggerUI from 'swagger-ui-express';
import './config/db';
import passport from './libs/passport';
import YAML from 'yamljs';
import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import middleware from 'i18next-http-middleware';

i18next
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    fallbackLng: 'en',
    backend: {
      loadPath: './locales/{{lng}}/translation.json'
    }
  });

const app = express();

app.use(middleware.handle(i18next));
// https://stackoverflow.com/questions/23259168/what-are-express-json-and-express-urlencoded
app.use(passport.initialize());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// TODO: Change asterisc for something more particular
app.use(cors({ credentials: true, origin: '*' }));

// routes middleware
app.use('/api', router);

// turn on the server
const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// swagger
const swaggerDocument = YAML.load('./swagger-config.yml');
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
