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
    "1bb8aefbec9b53d13ba63e597a4dee23d7409df4cb484b1c06cfe3750a217a4d", // no real pr keys!!
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
  const contract =
    await contractFactory.deploy(/* here can be some argum{gasPrice(or gasLimit etc): 10000000}*/);
  // STOP here! Wait for contract to deploy!
  /*const transactionReceipt =*/ await contract.deployTransaction.wait(1);
  // we will wait for 1 block conf to make sure it got attached to the chain
  // transactionReciept is what we get when we wait for the block conformation
  // console.log("Here is the deployment transaction (transaction response): ");
  // // responce is what we get just when create our transaction - initially
  // console.log(contract.deployTransaction);
  // console.log("Here is the transaction receipt: ");
  // console.log(transactionReceipt);

  //   console.log("Let's deploy with only transaction data!");
  //   const nonce = await wallet.getTransactionCount();
  //   const tx = {
  //     nonce: nonce,
  //     // nonce (number only used once) is used not only in mining to solve problem, but also used in transactions
  //     // (in wallets and signers) diffrent nonce for every (unique) transaction
  //     gasPrice: 20000000000,
  //     gasLimit: 1000000,
  //     to: null,
  //     value: 0,
  //     data: "0x608060405234801561001057600080fd5b50610771806100206000396000f3fe608060405234801561001057600080fd5b50600436106100575760003560e01c80632e64cec11461005c5780636057361d1461007a5780636f760f41146100965780638bab8dd5146100b25780639e7a13ad146100e2575b600080fd5b610064610113565b604051610071919061035c565b60405180910390f35b610094600480360381019061008f91906103b7565b61011c565b005b6100b060048036038101906100ab919061052a565b610126565b005b6100cc60048036038101906100c79190610586565b6101b6565b6040516100d9919061035c565b60405180910390f35b6100fc60048036038101906100f791906103b7565b6101e4565b60405161010a929190610657565b60405180910390f35b60008054905090565b8060008190555050565b6002604051806040016040528083815260200184815250908060018154018082558091505060019003906000526020600020906002020160009091909190915060008201518160000155602082015181600101908051906020019061018c9291906102a0565b505050806001836040516101a091906106c3565b9081526020016040518091039020819055505050565b6001818051602081018201805184825260208301602085012081835280955050505050506000915090505481565b600281815481106101f457600080fd5b906000526020600020906002020160009150905080600001549080600101805461021d90610709565b80601f016020809104026020016040519081016040528092919081815260200182805461024990610709565b80156102965780601f1061026b57610100808354040283529160200191610296565b820191906000526020600020905b81548152906001019060200180831161027957829003601f168201915b5050505050905082565b8280546102ac90610709565b90600052602060002090601f0160209004810192826102ce5760008555610315565b82601f106102e757805160ff1916838001178555610315565b82800160010185558215610315579182015b828111156103145782518255916020019190600101906102f9565b5b5090506103229190610326565b5090565b5b8082111561033f576000816000905550600101610327565b5090565b6000819050919050565b61035681610343565b82525050565b6000602082019050610371600083018461034d565b92915050565b6000604051905090565b600080fd5b600080fd5b61039481610343565b811461039f57600080fd5b50565b6000813590506103b18161038b565b92915050565b6000602082840312156103cd576103cc610381565b5b60006103db848285016103a2565b91505092915050565b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b610437826103ee565b810181811067ffffffffffffffff82111715610456576104556103ff565b5b80604052505050565b6000610469610377565b9050610475828261042e565b919050565b600067ffffffffffffffff821115610495576104946103ff565b5b61049e826103ee565b9050602081019050919050565b82818337600083830152505050565b60006104cd6104c88461047a565b61045f565b9050828152602081018484840111156104e9576104e86103e9565b5b6104f48482856104ab565b509392505050565b600082601f830112610511576105106103e4565b5b81356105218482602086016104ba565b91505092915050565b6000806040838503121561054157610540610381565b5b600083013567ffffffffffffffff81111561055f5761055e610386565b5b61056b858286016104fc565b925050602061057c858286016103a2565b9150509250929050565b60006020828403121561059c5761059b610381565b5b600082013567ffffffffffffffff8111156105ba576105b9610386565b5b6105c6848285016104fc565b91505092915050565b600081519050919050565b600082825260208201905092915050565b60005b838110156106095780820151818401526020810190506105ee565b83811115610618576000848401525b50505050565b6000610629826105cf565b61063381856105da565b93506106438185602086016105eb565b61064c816103ee565b840191505092915050565b600060408201905061066c600083018561034d565b818103602083015261067e818461061e565b90509392505050565b600081905092915050565b600061069d826105cf565b6106a78185610687565b93506106b78185602086016105eb565b80840191505092915050565b60006106cf8284610692565b915081905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000600282049050600182168061072157607f821691505b60208210811415610735576107346106da565b5b5091905056fea2646970667358221220c6c3689012481c254d4edb4d6c0b272beac4c16246a46dbdd58b8b46f163449364736f6c63430008080033",
  //     chainId: 1337,
  //   };
  //   const sentTxResponse = await wallet.sendTransaction(tx);
  //   await sentTxResponse.wait(1);
  //   console.log(sentTxResponse);

  // get number
  const currentFavoriteNumber = await contract.retrieve();
  console.log(`Current Favorite Number: ${currentFavoriteNumber.toString()}`);
  const transactionResponse = await contract.store("7");
  const transactionReceipt = await transactionResponse.wait(1);
  const updatedFavoriteNumber = await contract.retrieve();
  console.log(`Updated favorite number is: ${updatedFavoriteNumber}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
