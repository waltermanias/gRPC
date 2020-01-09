const grpc = require("grpc");
const SumAPI = require("../server/protos/sum_pb");
const SumServices = require("../server/protos/sum_grpc_pb");

function main() {
  const client = new SumServices.SumServiceClient(
    "localhost:50051",
    grpc.credentials.createInsecure()
  );

  // We're going to create our request.
  const request = new SumAPI.SumRequest();

  // Setting the content into the request
  request.setA(4);
  request.setB(3);

  // Call our remote method
  client.sum(request, (err, response) => {
    if (!err) {
      console.log("Sum Response: ", response.getResult());
    } else {
      console.error(err);
    }
  });
}

main();
