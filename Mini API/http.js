import * as http from "node:http";
import * as fs from "node:fs/promises";

const PORT = 8080;
const HOSTNAME = "127.0.0.1";

const server = http.createServer(async (req, res) => {
  const { url, method, headers, httpVersion } = req;
  console.log("Http", httpVersion, method, url, `(${headers["user-agent"]})`);

  switch (method) {
    case "GET":
      GET(req, res);
      res.set;
      break;

    case "POST":
      POST(req, res);
      break;
    default:
      res.statusCode = 501;
      res.end(`Not Implemented: ${method}`);
  }
});

server.listen(PORT, HOSTNAME, () => {
  console.log(`server listening on http://${HOSTNAME}:${PORT}`);
});

async function GET(req, res) {
  let dataResponse;
  const { url } = req;
  switch (url) {
    case "/":
      try {
        dataResponse = await fs.readFile("./index.html");
        res.setHeader("content-type", "text/html").end(dataResponse);
      } catch (error) {
        console.log(error.message);
        res.statusCode = 500;
        res.end("Internal error");
      }
      break;

    case "/api/users":
      dataResponse = await fs.readFile("../../files/info2.txt");
      res
        .writeHead(200, { "content-type": "application/json" })
        .end(dataResponse);
      break;
    default:
      res.statusCode = 404;
      res.end("Not Found");
  }
}

function POST(req, res) {
  const { url } = req;
  let body = "";
  switch (url) {
    case "/api/add/user":
      req.on("data", (data) => {
        body += data;
      });

      req.on("end", () => {
        res.writeHead(200, { "content-type": "application/json" }).end(body);
        console.log(body);
      });

      break;

    default:
      res.statusCode = 404;
      res.end(`Not Found: ${url}`);
      break;
  }
}
