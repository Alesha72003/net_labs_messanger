const grpc = require("@grpc/grpc-js");
var protoLoader = require("@grpc/proto-loader");
const PROTO_PATH = "./message.proto";

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};
var packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
const MessageService = grpc.loadPackageDefinition(packageDefinition).MessageService;

const client = new MessageService(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

module.exports = (app) => {};
module.exports.send = async (data) => {
  await new Promise((resolve, reject) => {
    client.Notify(data, (error, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
  });
};