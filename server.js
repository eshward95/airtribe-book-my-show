const app = require("./app");
const { connectToDb } = require("./src/models");
const port = process.env.PORT || 12345;

console.log(`Node environment: ${process.env.NODE_ENV}`);

app.listen(port, async (err) => {
  console.log(`Listening on port ${port}`);
  await connectToDb();
});
