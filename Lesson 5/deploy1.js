// synchronous (solidity) - one line after another
// asynchronous (javascript) - code running at the same time:
// cooking
// sychr: 1. put popcorn in microwave -> Promise 2. Wait for popcorn to finish 3. Pour drinks for everyone
// asynchr: 1. put popcorn in the microwave 2. (while popcorne in microwave) pour drinks for everyone
// 3. Waiting for popcorn to finish
// Promis - Pending/ Fulfilled/ Rejected
async function main() {
  // http://127.0.0.1:7545
  ///console.log("hi");
  // uint256 variable = 33 (sol)
  ///let variable = 33;
  /// console.log(variable);
  // deploy a contract? Wait for it to be deployed
  // if sync fundtion -> wouldn't wait for it to be deployed
  // compile them in our code or compile them separately
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
