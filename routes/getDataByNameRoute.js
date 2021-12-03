const getDataController = require("../controllers/getDataController");
exports.register = async (server) => {
  server.route({
    method: "GET",
    path: "/getDataByName/{name}",
    handler: getDataController.getDataByName,
  });

  server.route({
    method: "GET",
    path: "/getDataByName/{name}/{company}",
    handler: getDataController.getDataByNameAndCompany,
  });
};
