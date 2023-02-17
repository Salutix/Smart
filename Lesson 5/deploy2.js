const ethers = require("ethers");
// now we can create our provider object in our main function
// const - we can't change this variable, require - func to import ... package
const fs = require("fs");

async function main() {
  // compile them in our code or compile them separately
  // http://127.0.0.1:7545
  const provider = new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:7545"
  );
  const wallet = new ethers.Wallet(
    "dc180ea145eb826d394cff6a6f4d87c8adf6265ceeb6c2ca5ebc3523acffd7ef", // no real pr keys!!
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
