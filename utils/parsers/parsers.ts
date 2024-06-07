export const capitalise = (input?: string) => {
  if (!input || typeof input !== 'string') {
    return '';
  }

  return input.slice(0, 1).toUpperCase() + input.slice(1).toLowerCase();
};

export const toUpperCase = (input?: string) => {
  if (!input || typeof input !== 'string') {
    return '';
  }

  return input.toUpperCase();
};

export const fromKebabToSentenceCase = (input?: string) => {
  if (!input || typeof input !== 'string') {
    return '';
  }

  const res = input
    .split('-')
    .map((chunk, index) => {
      if (index === 0) {
        return capitalise(chunk);
      }

      return chunk.toLowerCase();
    })
    .join(' ');

  return res;
};

export const fromKebabArrayToSentenceArray = (input?: string[]) => {
  if (!input || !Array.isArray(input)) {
    return [];
  }

  return input.map((item) => fromKebabToSentenceCase(item));
};

export const toNumber = (input?: string | number) => {
  if (typeof input === 'number') {
    return input;
  }

  if (!input || typeof input !== 'string') {
    return 0;
  }

  return parseInt(input, 10);
};

export const fromKebabObjectToSentenceObject = (input?: object) => {
  if (!input || typeof input !== 'object') {
    return {};
  }

  const result: Record<string, unknown> = {};

  Object.entries(input).map(([key, value]) => {
    if (typeof value === 'string') {
      result[key] = fromKebabToSentenceCase(value);
    } else {
      result[key] = value;
    }
  });

  return result;
};

export const fromKebabArrayOfObjectsToSentenceArrayOfObjects = (
  input?: object[],
) => {
  if (!input || !Array.isArray(input)) {
    return [];
  }

  return input.map((item) => fromKebabObjectToSentenceObject(item));
};
