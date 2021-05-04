const { getMessage } = require("./messages");

const getValidatorError = (error, messagePath) => {
  if (!error) return null;

  const errorMessage = {};
  error.details.map((detail) => {
    const message = detail.message;
    const type = detail.type;
    const key = detail.context.key;

    const path = `${messagePath}.${key}.${type}`;

    const customMessage = getMessage(path);

    if (customMessage === undefined) {
      console.log("Erro to find message on path: " + path);
    }

    errorMessage[key] = customMessage || message;
  });

  return errorMessage;
};

module.exports = { getValidatorError };//ok