const authController = require("../controllers/authController");

exports.register = async (server) => {
  server.route({
    method: "GET",
    path: "/logout",
    handler: authController.logout,
    options: {
      auth: {
        strategies: ["jwt", "session"],
      },
    },
  });
};
