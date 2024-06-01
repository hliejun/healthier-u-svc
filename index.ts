import dotenv from 'dotenv';
import express, { Application } from 'express';

import routes from './routes';

dotenv.config();

const app: Application = express();
const host = process.env.HOST || 'localhost';
const protocol = host === 'localhost' ? 'http' : 'https';
const port = process.env.PORT || 8000;

const urlEncoder = express.urlencoded({ limit: '10mb', extended: false });
const jsonParser = express.json({ limit: '10mb' });

app.use(urlEncoder);
app.use(jsonParser);

app.use('/app', routes);

app.listen(port, () => {
  console.info(`Server started at ${protocol}://${host}:${port}`);
});
