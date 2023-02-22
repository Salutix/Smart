const ethers = require("ethers")
const fs = require("fs")
require("dotenv").config()

async function main() {
  console.log(process.env.PRIVATE_KEY) // to check it's really printing our pr. key
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL) // the same with rpc server
  const wallet = new ethers.Wallet(
    process.env.PRIVATE_KEY, //instead of actual pr. key
    provider
  )
  // the following for more secure:
  // const encryptedJson = fs.readFileSync("./.encryptedKey.json", "utf8");
  // // next create wallet from encrypted key
  // let wallet = new ethers.Wallet.fromEncryptedJsonSync(
  //   // let - because now have to connect this wallet back to our provider
  //   encryptedJson,
  //   process.env.PRIVATE_KEY_PASSWORD
  // );
  // //connecting the wallet to provider
  // wallet = await wallet.connect(provider);
  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8")
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  )

  const contractFactory = new ethers.ContractFactory(abi, binary, wallet)
  console.log("Deploying, please, wait...")
  const contract = await contractFactory.deploy()
  await contract.deployTransaction.wait(1)
  console.log(`Contract Address: ${contract.address}`)
  const currentFavoriteNumber = await contract.retrieve()
  console.log(`Current Favorite Number: ${currentFavoriteNumber.toString()}`)
  const transactionResponse = await contract.store("7")
  const transactionReceipt = await transactionResponse.wait(1)
  const updatedFavoriteNumber = await contract.retrieve()
  console.log(`Updated favorite number is: ${updatedFavoriteNumber}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
