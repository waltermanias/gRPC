const grpc = require("grpc");
const SumAPI = require("../server/protos/sum_pb");
const SumServices = require("../server/protos/sum_grpc_pb");

function callPrimeNumberDecomposition() {
  const client = new SumServices.SumServiceClient(
    "localhost:50051",
    grpc.credentials.createInsecure()
  );

  const request = new SumAPI.PrimeNumberDecompositionRequest();
  const number = 567890;
  request.setNumber(number);
  const call = client.primeNumberDecomposition(request, () => {});
  call.on("data", response => {
    console.log("Prime factors found: ", response.getPrimeFactor());
  });

  call.on("error", err => {
    console.error(err);
  });

  call.on("status", status => {
    console.log(status);
  });

  call.on("end", () => {
    console.log("Streaming has ended");
  });
}

function main() {
  callPrimeNumberDecomposition();
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
