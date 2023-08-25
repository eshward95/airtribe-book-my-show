const app = require("./app");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const { connectToDb, connectToMongo } = require("./src/models");
const { connectToES } = require("./src/config/elasticsearch");
const port = process.env.PORT || 12345;

console.log(`Node environment: ${process.env.NODE_ENV}`);

app.listen(port, async (err) => {
  console.log(`Listening on port ${port}`);
  await connectToDb();
  await connectToMongo();
  await connectToES();
});
