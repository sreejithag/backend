const getDataController = require("../controllers/getDataController");
exports.register = async (server) => {
  server.route({
    method: "GET",
    path: "/getDataByCountry/{country}",
    handler: getDataController.getDataByCountry,
  });

  //   server.route({
  //     method: "GET",
  //     path: "/getDataByName/{name}/{company}",
  //     handler: getDataController.getDataByNameAndCompany,
  //   });
};
