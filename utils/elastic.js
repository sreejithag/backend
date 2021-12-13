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

const getDataFromHits = (hits, from, limit) => {
  const max = hits.total.value;
  const returnData = {
    results: hits.hits.map((hit) => hit._source),
    max: max,
    page: from / limit + 1,
  };
  return returnData;
};

exports.getAllData = async (index, from, limit) => {
  const response = await client.search({
    index: index,
    from: from,
    size: limit,
    track_total_hits: true,
  });
  const { hits } = response.body;

  const returnData = getDataFromHits(hits, from, limit);
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

  const returnData = getDataFromHits(hits, from, limit);
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

  const returnData = getDataFromHits(hits, from, limit);
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

  const returnData = getDataFromHits(hits, from, limit);
  return returnData;
};

exports.getDataByNameAndCountry = async (index, name, country, from, limit) => {
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
              address: country,
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
    //track_total_hits: true,
    body: body,
  });

  const { hits } = response.body;

  const returnData = getDataFromHits(hits, from, limit);
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

exports.getSuggestion = async (index, phrase) => {
  const body = {
    query: {
      match_phrase_prefix: {
        name: phrase,
      },
    },
  };

  const response = await client.search({
    index: index,
    size: 15,
    _source: ["name"],
    body: body,
  });
  const { hits } = response.body;
  return hits.hits.map((hit) => hit._source.name);
};
