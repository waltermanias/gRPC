const grpc = require("grpc");

const greets = require("../server/protos/greet_pb");
const greetServices = require("../server/protos/greet_grpc_pb");

function main() {
  const client = new greetServices.GreetServiceClient(
    "localhost:50051",
    grpc.credentials.createInsecure()
  );

  // We're going to create our request.
  const request = new greets.GreetRequest();

  // We're going to create our message content
  let greeting = new greets.Greeting();
  greeting.setFirstName("Walter");
  greeting.setLastName("Maniás");

  // Setting the content into the request
  request.setGreeting(greeting);

  // Call our remote method
  client.greet(request, (err, response) => {
    if (!err) {
      console.log("Greeting Response: ", response.getResult());
    } else {
      console.error(err);
    }
  });
}

main();
