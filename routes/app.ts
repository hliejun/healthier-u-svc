import express, { Request, Response, Router } from 'express';

import {
  discoverGroceries,
  discoverMeal,
  discoverNutrition,
} from '../service/discover';

const router: Router = express.Router();

const PATH_HEALTH = '/health';
router.get(PATH_HEALTH, (_req: Request, res: Response) => {
  console.info(`[ROUTE] Success ${PATH_HEALTH}`);

  res.send('OK');
});

const PATH_DISCOVER_GROCERIES = '/discover/groceries';
router.post(PATH_DISCOVER_GROCERIES, async (req: Request, res: Response) => {
  try {
    console.info(`[ROUTE] Pending request ${PATH_DISCOVER_GROCERIES}`);
    const data = await discoverGroceries(req);
    console.info(`[ROUTE] Success ${PATH_DISCOVER_GROCERIES}`);

    res.json(data);
  } catch (error) {
    console.error(`[ROUTE] Error requesting ${PATH_DISCOVER_GROCERIES}`);

    res.status(400).json(error);
  }
});

const PATH_DISCOVER_MEAL = '/discover/meal';
router.post(PATH_DISCOVER_MEAL, async (req: Request, res: Response) => {
  try {
    console.info(`[ROUTE] Pending request ${PATH_DISCOVER_MEAL}`);
    const data = await discoverMeal(req);
    console.info(`[ROUTE] Success ${PATH_DISCOVER_MEAL}`);

    res.json(data);
  } catch (error) {
    console.error(`[ROUTE] Error requesting ${PATH_DISCOVER_MEAL}`);

    res.status(400).json(error);
  }
});

const PATH_DISCOVER_NUTRITION = '/discover/nutrition';
router.post(PATH_DISCOVER_NUTRITION, async (req: Request, res: Response) => {
  try {
    console.info(`[ROUTE] Pending request ${PATH_DISCOVER_NUTRITION}`);
    const data = await discoverNutrition(req);
    console.info(`[ROUTE] Success ${PATH_DISCOVER_NUTRITION}`);

    res.json(data);
  } catch (error) {
    console.error(`[ROUTE] Error requesting ${PATH_DISCOVER_NUTRITION}`);

    res.status(400).json(error);
  }
});

export default router;
