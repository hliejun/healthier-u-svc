import { Request } from 'express';

import { validateString } from '../../utils/validators';
import { generateContentInJson } from '../vertex';

export const discoverGroceries = async (req: Request) => {
  const mimeType = req.body?.mimeType;
  const data = req.body?.data;
  const token = req.body?.token;

  validateString(mimeType, 'mimeType');
  validateString(data, 'data');

  const promptText = `Return a formatted JSON with keys 
    "brand", "productName", "isHealthierChoice" and "nutrigrade", 
    with "brand" being the brand name of the product, 
    "productName" being the name of the product in pascal case, 
    "isHealthierChoice" value being whether the product packaging has a 
    Healthier Choice pyramid logo printed on, 
    and "nutrigrade" being the value ("A", "B", "C", or "D") of the magnified letter in 
    the "A, B, C, D" nutri-grade grading scale, if present`;

  const res = await generateContentInJson(promptText, mimeType, data, token);

  // TODO: validate and typecast res

  return res;
};

export const discoverMeal = async (req: Request) => {
  const mimeType = req.body?.mimeType;
  const data = req.body?.data;
  const token = req.body?.token;

  validateString(mimeType, 'mimeType');
  validateString(data, 'data');

  const promptText = `TBC`; // TODO: implement this

  const res = await generateContentInJson(promptText, mimeType, data, token);

  // TODO: validate and typecast res

  return res;
};

export const discoverNutrition = async (req: Request) => {
  const mimeType = req.body?.mimeType;
  const data = req.body?.data;
  const token = req.body?.token;

  validateString(mimeType, 'mimeType');
  validateString(data, 'data');

  const promptText = `TBC`; // TODO: implement this

  const res = await generateContentInJson(promptText, mimeType, data, token);

  // TODO: validate and typecast res

  return res;
};

export const discoverReceipt = async (req: Request) => {
  const mimeType = req.body?.mimeType;
  const data = req.body?.data;
  const token = req.body?.token;

  validateString(mimeType, 'mimeType');
  validateString(data, 'data');

  const promptText = `TBC`; // TODO: implement this

  const res = await generateContentInJson(promptText, mimeType, data, token);

  // TODO: validate and typecast res

  return res;
};
