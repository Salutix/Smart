const { task } = require("hardhat/config")

task("block-number", "Prints the current block number").setAction(
    // const blockTask = async function() => {}
    // the same with
    // async function blockTask() {}

    // anonymous function
    // hre - hardhat runtime environment
    async (taskArgs, hre) => {
        const blockNumber = await hre.ethers.provider.getBlockNumber()
        console.log(`Current block number: ${blockNumber}`)
    }
)
