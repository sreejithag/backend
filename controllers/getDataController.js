const elastic = require("../utils/elastic");
const getFrom = (page, limit) => limit * (page - 1);

exports.getData = async (request, h) => {
  const { page, limit } = request.query;
  const from = getFrom(page, limit);
  const data = await elastic.getAllData("person", from, limit);
  return data;
};

exports.getDataByName = async (request, h) => {
  const { page, limit } = request.query;
  const { name } = request.params;
  const from = getFrom(page, limit);
  const data = await elastic.getDataByName("person", name, from, limit);
  return data;
};

exports.getDataByCompany = async (request, h) => {
  const { page, limit } = request.query;
  const { company } = request.params;
  const from = getFrom(page, limit);
  const data = await elastic.getDataByCompany("person", company, from, limit);
  return data;
};

exports.getDataByNameAndCountry = async (request, h) => {
  const { page, limit } = request.query;
  const { name, country } = request.params;
  const from = getFrom(page, limit);
  const data = await elastic.getDataByNameAndCountry(
    "person",
    name,
    country,
    from,
    limit
  );
  return data;
};

exports.getDataByCountry = async (request, h) => {
  const { page, limit } = request.query;
  const { country } = request.params;
  const from = getFrom(page, limit);

  const data = await elastic.getDataByCountry("person", country, from, limit);
  return data;
};
