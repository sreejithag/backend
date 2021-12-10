const getCountryController = require("../controllers/getCountryController");

exports.register = async (server) => {
  server.route({
    method: "GET",
    path: "/getCountry",
    handler: getCountryController.getAllCountry,
    options: {
      auth: {
        strategies: ["jwt", "session"],
      },
    },
  });
};
