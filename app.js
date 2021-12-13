const Hapi = require("@hapi/hapi");
const auth = require("./auth/auth");
const getDataRoute = require("./routes/getDataRoute");
const getDataByNameRoute = require("./routes/getDataByNameRoute");
const getDataByCompanyRoute = require("./routes/getDataByCompany");
const getCountryRoute = require("./routes/getCountryRoute");
const getDataByCountryRoute = require("./routes/getDataByCountryRoute");
const loginRoute = require("./routes/loginRoute");
const signupRoute = require("./routes/signupRoute");
const logoutRoute = require("./routes/logoutRoute");
const updateUserRoute = require("./routes/updateUserRoute");
const getSuggestionRoute = require("./routes/getSuggestionRoute");

module.exports.createServer = async (config) => {
  const server = Hapi.server(config);

  //register the routes and plugins here
  await auth.register(server);

  await getDataRoute.register(server);
  await getDataByNameRoute.register(server);
  await getDataByCompanyRoute.register(server);
  await getCountryRoute.register(server);
  await getDataByCountryRoute.register(server);
  await loginRoute.register(server);
  await signupRoute.register(server);
  await logoutRoute.register(server);
  await updateUserRoute.register(server);
  await getSuggestionRoute.register(server);
  return server;
};
