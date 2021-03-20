const dotenv = require('dotenv').config()
const app = require("./app");
const http = require("http");

if (dotenv.error) {
  throw dotenv.error
}

const server = http.createServer(app);
const PORT = process.env.NODE_ENV === "test" ? 8010 : 8000;

server.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
