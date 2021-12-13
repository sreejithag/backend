const getSuggestionController = require("../controllers/getSuggestionController");

exports.register = async (server) => {
  server.route({
    method: "GET",
    path: "/getSuggestion/{phrase}",
    handler: getSuggestionController.getSuggestion,
    options: {
      auth: {
        strategies: ["jwt", "session"],
      },
    },
  });
};
