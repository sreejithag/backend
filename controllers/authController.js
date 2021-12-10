const db = require("../utils/db");
const redis = require("../utils/redis");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

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

exports.googleLogin = async (request, h) => {
  if (request.auth.isAuthenticated) {
    //get the details from the google oauth
    const { email, given_name, family_name } =
      request.auth.credentials.profile.raw;

    //check if user is already in db
    const userExists = (await redis.isUserAvailable(email))
      ? true
      : await db.isUserExists(email);

    if (!userExists) {
      const userSaved = await db.createUser(email, "", given_name, family_name);
      if (!userSaved) {
        return {
          success: false,
        };
      }
      redis.setUser(email, given_name, family_name);
    }

    //create a jwt token and redirect to react with token
    const token = jwt.sign({ email: email }, process.env.JWT_KEY);
    return h.redirect(`http://localhost:3000/googleLogin/${token}`);
  }

  console.log(`Authentication failed due to: ${request.auth.error.message}`);
  return h.redirect(`http://localhost:3000/googleLogin/error`);
};
