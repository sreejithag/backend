const authController = require("../controllers/authController");

exports.register = async (server) => {
  server.route({
    method: "POST",
    path: "/signup",
    handler: authController.signup,
  });
};
