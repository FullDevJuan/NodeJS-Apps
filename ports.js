import net from "node:net";

function findPort(port) {
  return new Promise((res, rej) => {
    const server = net.createServer();

    server.listen(port, () => {
      const { port } = server.address();
      server.close(() => {
        res(port);
      });
    });

    server.on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        findPort(0).then((port) => res(port));
      } else {
        rej(err);
      }
    });
  });
}

module.exports = {
  findPort,
};
