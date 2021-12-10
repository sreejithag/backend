const authController = require("../controllers/authController");

exports.register = async (server) => {
  server.route({
    method: "POST",
    path: "/login",
    handler: authController.login,
    options: {
      auth: {
        mode: "try",
      },
    },
  });

  server.route({
    method: "GET",
    path: "/login/google",
    options: {
      auth: {
        mode: "try",
        strategy: "google",
      },
    },
    handler: authController.googleLogin,
  });
};
