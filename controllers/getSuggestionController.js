const elastic = require("../utils/elastic");

exports.getSuggestion = async (request, h) => {
  const { phrase } = request.params;
  const data = await elastic.getSuggestion("person", phrase);
  return data;
};
