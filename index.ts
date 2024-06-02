import dotenv from 'dotenv';
import express, { Application } from 'express';

import appRoutes from './routes/app';

dotenv.config();

const app: Application = express();
const host = process.env.HOST || 'localhost';
const protocol = host === 'localhost' ? 'http' : 'https';
const port = process.env.PORT || 8000;
const sizeLimit = '10mb';

const urlEncoder = express.urlencoded({ limit: sizeLimit, extended: false });
const jsonParser = express.json({ limit: sizeLimit });

app.use(urlEncoder);
app.use(jsonParser);

app.use('/app', appRoutes);

app.listen(port, () => {
  console.info(`Server started at ${protocol}://${host}:${port}`);
});
