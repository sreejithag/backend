const dotenv = require("dotenv");
const app = require("./app");

dotenv.config();

const config = {
  port: process.env.PORT,
  host: process.env.HOST,
  routes: {
    cors: true,
  },
};

const init = async () => {
  try {
    const server = await app.createServer(config);
    // await server.register(require("@hapi/cookie"));

    // server.auth.strategy("basic", "cookie", {
    //   cookie: {
    //     name: "dataTable-cookie",
    //     password: "!wsYhFA*C2U6nz=Bu^%A@^F#SF3&kSR6",
    //     ttl: 24 * 60 * 60 * 1000,
    //   },
    // });

    await server.start();

    console.log("server is running");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

init();
