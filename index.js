const dotenv = require("dotenv");
const app = require("./app");

dotenv.config();

const config = {
  port: process.env.PORT,
  host: process.env.HOST,
};

const init = async () => {
  try {
    const server = await app.createServer(config);

    await server.start();

    console.log("server is running");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

init();
