const cookie = require("@hapi/cookie");
const dotenv = require("dotenv");
const db = require("../utils/db");

dotenv.config();

exports.register = async (server) => {
  await server.register(cookie);
  server.auth.strategy("session", "cookie", {
    cookie: {
      name: "dataTables-cookie",
      password: process.env.COOKIE_PASSWORD,
      isSecure: false,
    },
    // validateFunc: async (request, session) => {
    //   const user = await db.isUserExists(session.username);
    //   if (!user) {
    //     return { valid: false };
    //   }
    //   return { valid: true };
    // },
  });
  server.auth.default("session");
};
