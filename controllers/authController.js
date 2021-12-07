const db = require("../utils/db");
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
    return {
      success: true,
    };
  }

  return {
    success: false,
  };
};
