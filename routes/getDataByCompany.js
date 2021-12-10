const getDataController = require("../controllers/getDataController");
exports.register = async (server) => {
  server.route({
    method: "GET",
    path: "/getDataByCompany/{company}",
    handler: getDataController.getDataByCompany,
    options: {
      auth: {
        strategies: ["jwt", "session"],
      },
    },
  });
};
