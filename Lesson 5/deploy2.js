const ethers = require("ethers");
// now we can create our provider object in our main function
// const - we can't change this variable, require - func to import ... package
const fs = require("fs");

async function main() {
  // compile them in our code or compile them separately
  // http://192.168.208.1:7545 - have to change server in Ganache to WSL!!!
  // version of ethers 5.6.2 - via (yarn add ethers@5.6.2)!!!
  const provider = new ethers.providers.JsonRpcProvider(
    "http://192.168.208.1:7545"
  );
  const wallet = new ethers.Wallet(
    "41355f8e89ae3c9d0bfa974806466773bb4b9c58aa5c0be18f15460c5f6a093e", // no real pr keys!!
    provider
  );
  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  );
  // contract factory - object, that can be used to deploy contracts
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  // abi - code "knows" how interact with the contract
  // binary - main compiled code
  // wallet - we have pr key to sign deploying this contract
  console.log("Deploying, please, wait...");
  const contract = await contractFactory.deploy(); // STOP here! Wait for contract to deploy!
  console.log(contract);
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
