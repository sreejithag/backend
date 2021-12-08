const db = require("../utils/db");
const redis = require("../utils/redis");
exports.login = async (request, h) => {
  const { email, password } = request.payload;

  const { success, emailDB } = await db.checkUserAndValidatePassword(
    email,
    password
  );
  if (success) {
    request.cookieAuth.set({ email: emailDB });
    return {
      success: true,
    };
  }

  return {
    success: false,
  };
};

exports.signup = async (request, h) => {
  const { email, password, firstName, lastName } = request.payload;

  const success = await db.createUser(email, password, firstName, lastName);
  if (success) {
    redis.setUser(email, firstName, lastName);
    return {
      success: true,
    };
  }

  return {
    success: false,
  };
};

exports.logout = async (request, h) => {
  request.cookieAuth.clear();
  return {
    success: true,
  };
};

exports.updateUser = async (request, h) => {
  const { firstName, lastName } = request.payload;
  const { email } = request.auth.artifacts;
  const success = await db.updateUser(email, firstName, lastName);
  if (success) {
    redis.setUser(email, firstName, lastName);
    return {
      success: true,
    };
  }
  return {
    success: false,
  };
};
