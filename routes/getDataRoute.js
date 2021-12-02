const getDataController = require("../controllers/getDataController");

exports.register = async (server) => {
  server.route({
    method: "GET",
    path: "/getData",
    handler: getDataController.getData,
  });
};
