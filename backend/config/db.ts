import mongoose from 'mongoose';

const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_HOSTNAME, MONGO_DB } =
  process.env;

const url = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}/${MONGO_DB}?retryWrites=true&w=majority`;
const options = {
  useNewUrlParser: true,
  connectTimeoutMS: 10000
};

mongoose
  .connect(url, options)
  .then(() => {
    console.log('MongoDB is connected');
  })
  .catch((err: unknown) => {
    console.log(err);
  });
