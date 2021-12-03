const elastic = require("../utils/elastic");
exports.getAllCountry = async (request, h) => {
  const data = elastic.getAllCountry("country");
  return data;
};
