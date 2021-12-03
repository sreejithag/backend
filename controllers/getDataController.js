const elastic = require("../utils/elastic");
exports.getData = async (request, h) => {
  const { page, limit } = request.query;
  const from = limit * (page - 1) + 1;
  const data = await elastic.getAllData("person", from, limit);
  return data;
};

exports.getDataByName = async (request, h) => {
  const { page, limit } = request.query;
  const { name } = request.params;
  const from = limit * (page - 1) + 1;
  const data = await elastic.getDataByName("person", name, from, limit);
  return data;
};

exports.getDataByCompany = async (request, h) => {
  const { page, limit } = request.query;
  const { company } = request.params;
  const from = limit * (page - 1) + 1;
  const data = await elastic.getDataByCompany("person", company, from, limit);
  return data;
};

exports.getDataByNameAndCompany = async (request, h) => {
  const { page, limit } = request.query;
  const { name, company } = request.params;
  const from = limit * (page - 1) + 1;
  const data = await elastic.getDataByNameAndCompany(
    "person",
    name,
    company,
    from,
    limit
  );
  return data;
};

exports.getDataByCountry = async (request, h) => {
  const { page, limit } = request.query;
  const { country } = request.params;
  const from = limit * (page - 1) + 1;

  const data = await elastic.getDataByCountry("person", country, from, limit);
  return data;
};
