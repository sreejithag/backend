const { Client } = require("@elastic/elasticsearch");
const dotenv = require("dotenv");
dotenv.config();

const client = new Client({
  node: process.env.ELASTIC_NODE,
  auth: {
    username: process.env.ELASTIC_USERNAME,
    password: process.env.ELASTIC_PASSWORD,
  },
});

exports.getAllData = async (index, from, limit) => {
  const response = await client.search({
    index: index,
    from: from,
    size: limit,
    track_total_hits: true,
  });
  const { hits } = response.body;

  const max = hits.total.value;
  const returnData = {
    results: hits.hits.map((hit) => hit._source),
    max: max,
    page: (from - 1) / limit + 1,
  };

  return returnData;
};

exports.getDataByName = async (index, name, from, limit) => {
  const body = {
    query: {
      match: {
        name: name,
      },
    },
  };

  const response = await client.search({
    index: index,
    from: from,
    size: limit,
    track_total_hits: true,
    body: body,
  });

  const { hits } = response.body;

  const max = hits.total.value;
  const returnData = {
    results: hits.hits.map((hit) => hit._source),
    max: max,
    page: (from - 1) / limit + 1,
  };

  return returnData;
};

exports.getDataByCompany = async (index, company, from, limit) => {
  const body = {
    query: {
      match: {
        worksAt: company,
      },
    },
  };

  const response = await client.search({
    index: index,
    from: from,
    size: limit,
    track_total_hits: true,
    body: body,
  });

  const { hits } = response.body;

  const max = hits.total.value;
  const returnData = {
    results: hits.hits.map((hit) => hit._source),
    max: max,
    page: (from - 1) / limit + 1,
  };

  return returnData;
};

exports.getDataByCountry = async (index, country, from, limit) => {
  const body = {
    query: {
      match: {
        address: country,
      },
    },
  };
  const response = await client.search({
    index: index,
    from: from,
    size: limit,
    track_total_hits: true,
    body: body,
  });

  const { hits } = response.body;

  const max = hits.total.value;
  const returnData = {
    results: hits.hits.map((hit) => hit._source),
    max: max,
    page: (from - 1) / limit + 1,
  };

  return returnData;
};

exports.getDataByNameAndCompany = async (index, name, company, from, limit) => {
  const body = {
    query: {
      bool: {
        must: [
          {
            match: {
              name: name,
            },
          },
          {
            match: {
              worksAt: company,
            },
          },
        ],
      },
    },
  };

  const response = await client.search({
    index: index,
    from: from,
    size: limit,
    track_total_hits: true,
    body: body,
  });

  const { hits } = response.body;

  const max = hits.total.value;
  const returnData = {
    results: hits.hits.map((hit) => hit._source),
    max: max,
    page: (from - 1) / limit + 1,
  };

  return returnData;
};

exports.getAllCountry = async (index) => {
  const body = {
    size: 10000,
    _source: ["name"],
  };

  const response = await client.search({
    index: index,
    body: body,
  });
  const { hits } = response.body;
  return hits.hits.map((hit) => hit._source.name);
};
