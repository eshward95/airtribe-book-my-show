const { Client } = require("@elastic/elasticsearch");

const ESClient = new Client({
  node: "http://localhost:9200",
});

const connectToES = async () => {
  try {
    const { status } = await ESClient.cluster.health();
    console.log("ES health", status);
  } catch (error) {
    console.log("Error", error);
  }
};
module.exports = { connectToES, ESClient };
