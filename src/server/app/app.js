import express from 'express';
import bodyParser from 'body-parser';
import router from './routes';

export const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/properties', router);

export default app;
