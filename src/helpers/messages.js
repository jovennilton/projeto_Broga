const messages = require("../config/messages.json");

const getMessage = (path) => {
  return messages[path];
};

module.exports = { getMessage }; //ok