const grpc = require("grpc");
const greets = require("../server/protos/greet_pb");
const service = require("../server/protos/greet_grpc_pb");

const SumService = require("../server/protos/sum_grpc_pb");
const SumAPI = require("../server/protos/sum_pb");

/*
  Implements the greet RPC method
*/
function greet(call, callback) {
  const greeting = new greets.GreetResponse();
  greeting.setResult(
    "Hello " +
      call.request.getGreeting().getFirstName() +
      " " +
      call.request.getGreeting().getLastName()
  );
  callback(null, greeting);
}

/*
  Implements the sum RPC method
*/

function sum(call, callback) {
  const sumResponse = new SumAPI.SumResponse();
  sumResponse.setResult(call.request.getA() + call.request.getB());
  callback(null, sumResponse);
}

function main() {
  const server = new grpc.Server();
  server.addService(service.GreetServiceService, { greet });
  server.addService(SumService.SumServiceService, { sum });
  server.bind("127.0.0.1:50051", grpc.ServerCredentials.createInsecure());
  server.start();
  console.log("Server running on port 127.0.0.1:50051");
}
main();
