const Hapi = require("@hapi/hapi");

module.exports.createServer = async (config) => {
  const server = Hapi.server(config);

  //register the routes and plugins here

  return server;
};
