const getDataController = require("../controllers/getDataController");
exports.register = async (server) => {
  server.route({
    method: "GET",
    path: "/getDataByName/{name}",
    handler: getDataController.getDataByName,
    options: {
      auth: {
        strategies: ["jwt", "session"],
      },
    },
  });

  server.route({
    method: "GET",
    path: "/getDataByName/{name}/{country}",
    handler: getDataController.getDataByNameAndCountry,
    options: {
      auth: {
        strategies: ["jwt", "session"],
      },
    },
  });
};
