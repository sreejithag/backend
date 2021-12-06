const db = require("../utils/db");
exports.login = async (request, h) => {
  const { username, password } = request.payload;
  console.log(username);
  const success = await db.checkUserAndValidatePassword(username, password);
  if (success) {
    return {
      success: true,
    };
  }

  return {
    success: false,
  };
};

exports.signup = async (request, h) => {
  const { username, password } = request.payload;

  const success = await db.createUser(username, password);
  if (success) {
    return {
      success: true,
    };
  }

  return {
    success: false,
  };
};
