const Hapi = require("@hapi/hapi");
const getDataRoute = require("./routes/getDataRoute");

module.exports.createServer = async (config) => {
  const server = Hapi.server(config);

  //register the routes and plugins here
  await getDataRoute.register(server);

  return server;
};
