const Hapi = require("@hapi/hapi");
const getDataRoute = require("./routes/getDataRoute");
const getDataByNameRoute = require("./routes/getDataByNameRoute");
const getDataByCompanyRoute = require("./routes/getDataByCompany");
const getCountryRoute = require("./routes/getCountryRoute");
const getDataByCountryRoute = require("./routes/getDataByCountryRoute");

module.exports.createServer = async (config) => {
  const server = Hapi.server(config);

  //register the routes and plugins here
  await getDataRoute.register(server);
  await getDataByNameRoute.register(server);
  await getDataByCompanyRoute.register(server);
  await getCountryRoute.register(server);
  await getDataByCountryRoute.register(server);
  return server;
};
