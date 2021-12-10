const getDataController = require("../controllers/getDataController");
exports.register = async (server) => {
  server.route({
    method: "GET",
    path: "/getDataByCountry/{country}",
    handler: getDataController.getDataByCountry,
    options: {
      auth: {
        strategies: ["jwt", "session"],
      },
    },
  });
};
