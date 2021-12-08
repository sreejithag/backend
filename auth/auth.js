const cookie = require("@hapi/cookie");
const dotenv = require("dotenv");
const db = require("../utils/db");
const redis = require("../utils/redis");

dotenv.config();

exports.register = async (server) => {
  await server.register(cookie);
  server.auth.strategy("session", "cookie", {
    cookie: {
      name: "dataTables-cookie",
      password: process.env.COOKIE_PASSWORD,
      isSecure: false,
    },
    validateFunc: async (request, session) => {
      const user = await redis.isUserAvailable(session.email);
      if (!user) {
        return { valid: false };
      }
      return { valid: true, credentials: true };
    },
  });
  server.auth.default("session");
};
