import { AxiosError } from 'axios';
import express, { Request, Response, Router } from 'express';

import { discoverHealthierChoice } from './service/discover';

const router: Router = express.Router();

router.get('/health', (_req: Request, res: Response) => {
  res.send('OK');
});

router.post('/discover', async (req: Request, res: Response) => {
  try {
    const data = await discoverHealthierChoice(req);
    res.json(data);
  } catch (error) {
    console.error(
      `Error: ${JSON.stringify((error as AxiosError)?.response?.data)}`,
    );
    res.status(400).json(
      (error as AxiosError)?.response?.data ?? {
        error: 'Encountered error when invoking Vertex API.',
      },
    );
  }
});

export default router;
