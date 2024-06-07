import { Request } from 'express';

import {
  fromKebabArrayOfObjectsToSentenceArrayOfObjects,
  fromKebabArrayToSentenceArray,
  fromKebabToSentenceCase,
  toUpperCase,
} from '../../utils/parsers';
import { validateString } from '../../utils/validators';
import { generateContentInJson } from '../vertex';

export const discoverGroceries = async (req: Request) => {
  const mimeType = req.body?.mimeType;
  const data = req.body?.data;
  const token = req.body?.token;

  validateString(mimeType, 'mimeType');
  validateString(data, 'data');

  const promptText = `In a Singapore context, return a formatted JSON with keys 
    "brand", "productName", "isHealthierChoice", "nutrigrade" and "healthAdvisory", 
    with "brand" being the brand name of the product - in kebab case, 
    "productName" being the name of the product - in kebab case, 
    "isHealthierChoice" value being whether the product packaging has a 
    Healthier Choice pyramid logo printed on, 
    "nutrigrade" being the value ("A", "B", "C", or "D") of the magnified letter in 
    the "A, B, C, D" nutri-grade grading scale, if present and
    "healthAdvisory" being a short humanised paragraph (in kebab case) of advisory that a health expert would offer in regards to using such item.`;

  const res = await generateContentInJson(promptText, mimeType, data, token);

  const parsedResult = {
    brand: fromKebabToSentenceCase(res?.brand),
    productName: fromKebabToSentenceCase(res?.productName),
    isHealthierChoice: !!res?.isHealthierChoice,
    nutrigrade: toUpperCase(res?.nutrigrade) || null,
    healthAdvisory: fromKebabToSentenceCase(res?.healthAdvisory),
  };

  return parsedResult;
};

export const discoverMeal = async (req: Request) => {
  const mimeType = req.body?.mimeType;
  const data = req.body?.data;
  const token = req.body?.token;

  validateString(mimeType, 'mimeType');
  validateString(data, 'data');

  const promptText = `In a Singapore context, return a formatted JSON with keys 
  "mealName", "ingredients", "calories", "isHealthy", "isHealthyForDiabetes", 
  "isHealthyForHighCholesterol", "isHealthyForHypertension", "healthAdvisory" and "isLegitimate", 
  with "mealName" being the humanised space-separated dish name of the food - in kebab case, 
  "ingredients" being an JSON array of ingredients found in the dish - in kebab case, 
  "calories" being the estimated number of calories for that dish in cal unit,
  "isHealthy" being a boolean flag indicating whether the dish is healthy for the general public,
  "isHealthyForDiabetes" being a boolean flag indicating whether the dish is healthy for someone with diabetes,
  "isHealthyForHighCholesterol" being a boolean flag indicating whether the dish is healthy for someone with high cholesterol,
  "isHealthyForHypertension" being a boolean flag indicating whether the dish is healthy for someone with hypertension,
  "healthAdvisory" being a short humanised paragraph of advisory (in kebab case) that a dietitian would offer in regards to consuming this dish,
  "isLegitimate" being a boolean flag indicating if you think the photo is of an actual meal taken by the user or is a photo of another photo taken from internet or from printouts.`;

  const res = await generateContentInJson(promptText, mimeType, data, token);

  const parsedResult = {
    mealName: fromKebabToSentenceCase(res?.mealName),
    ingredients: fromKebabArrayToSentenceArray(res?.ingredients),
    calories: parseInt(res?.calories),
    isHealthy: !!res?.isHealthy,
    isHealthyForDiabetes: !!res?.isHealthyForDiabetes,
    isHealthyForHighCholesterol: !!res?.isHealthyForHighCholesterol,
    isHealthyForHypertension: !!res?.isHealthyForHypertension,
    healthAdvisory: fromKebabToSentenceCase(res?.healthAdvisory),
    isLegitimate: !!res?.isLegitimate,
  };

  return parsedResult;
};

export const discoverNutrition = async (req: Request) => {
  const mimeType = req.body?.mimeType;
  const data = req.body?.data;
  const token = req.body?.token;

  validateString(mimeType, 'mimeType');
  validateString(data, 'data');

  const promptText = `In a Singapore context, return a formatted JSON with keys 
  "ingredients", "nutrition", and "healthAdvisory", with 
  "ingredients" being an JSON array of ingredients (in kebab case) found in the ingredient list if applicable, 
  "nutrition" being an JSON array of nutrition with each nutrition being represented as 
  a JSON object containing keys 
  "nutrient" which is the name of the nutrition (in kebab case), 
  "value" which is the corresponding numerical value or amount of that nutrient, and 
  "unit" which is the unit of the nutrient value,
  then finally "healthAdvisory" being a short humanised paragraph of advisory (in kebab case) that a dietitian would offer in regards to consuming this product.`;

  const res = await generateContentInJson(promptText, mimeType, data, token);

  const parsedResult = {
    ingredients: fromKebabArrayToSentenceArray(res?.ingredients),
    nutrition: fromKebabArrayOfObjectsToSentenceArrayOfObjects(res?.nutrition),
    healthAdvisory: fromKebabToSentenceCase(res?.healthAdvisory),
  };

  return parsedResult;
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
