export const validateString = (input: string, label: string) => {
  if (!input || typeof input !== 'string') {
    const errMsg = `ERROR [VALIDATOR]: Invalid input - "${label}", expecting a mandatory string`;
    console.error(errMsg);
    throw { error: errMsg };
  }
};
