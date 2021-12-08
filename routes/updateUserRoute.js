const authController = require("../controllers/authController");

exports.register = async (server) => {
  server.route({
    method: "PUT",
    path: "/updateUser",
    handler: authController.updateUser,
  });
};
