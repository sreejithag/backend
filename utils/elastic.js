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
  const result = await client.search({
    index: index,
    from: from,
    size: limit,
  });

  return result.body.hits.hits.map((hit) => hit._source);
};
