const Cookie = require("@hapi/cookie");
const dotenv = require("dotenv");
const db = require("../utils/db");
const redis = require("../utils/redis");
const Bell = require("@hapi/bell");
const Jwt = require("@hapi/jwt");

dotenv.config();

const validateUserByEmail = async (email) => {
  const user = (await redis.isUserAvailable(email))
    ? true
    : await db.isUserExists(email);

  if (!user) {
    return { isValid: false };
  }

  return { isValid: true, credentials: true };
};

exports.register = async (server) => {
  await server.register(Cookie);
  await server.register(Bell);
  await server.register(Jwt);

  server.auth.strategy("session", "cookie", {
    cookie: {
      name: "dataTables-cookie",
      password: process.env.COOKIE_PASSWORD,
      isSecure: false,
    },
    validateFunc: async (request, session) => {
      const email = session.email;
      const user = (await redis.isUserAvailable(email))
        ? true
        : await db.isUserExists(email);

      if (!user) {
        return { valid: false };
      }

      return { valid: true, credentials: true };
    },
  });

  server.auth.strategy("google", "bell", {
    provider: "google",
    password: process.env.COOKIE_PASSWORD,
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    isSecure: false,
  });

  server.auth.strategy("jwt", "jwt", {
    keys: {
      key: process.env.JWT_KEY,
      algorithms: ["HS256"],
    },
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: 14400,
    },
    validate: async (artifacts, request, h) => {
      const emailInToken = artifacts.decoded.payload.email;
      return await validateUserByEmail(emailInToken);
    },
  });

  server.auth.default("session");
};
