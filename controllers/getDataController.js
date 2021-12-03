const elastic = require("../utils/elastic");
exports.getData = async (request, h) => {
  const { page, limit } = request.query;
  const from = limit * (page - 1) + 1;
  const data = await elastic.getAllData("person", from, limit);
  return data;
};
