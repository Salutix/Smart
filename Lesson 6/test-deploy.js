const { ethers } = require("hardhat")
const { expect, assert } = require("chai")

// ..., () => {} - anonymous function synthax
describe("SimpleStorage", function () {
    // let simpleStorageFactory
    // let simpleStorage
    // now we can rid of const
    let simpleStorageFactory, simpleStorage
    // beforeEach() - what to do before each of our it() (test)
    // it() - is where we write code for running our tests
    // we can have describe inside of describe
    beforeEach(async function () {
        simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
        simpleStorage = await simpleStorageFactory.deploy()
    })

    it("Should start with a favorite number of 0", async function () {
        const currentValue = await simpleStorage.retrieve()
        // check, that this value is indeed 0
        const expectedValue = "0"
        // assert or expect from package "chai"
        assert.equal(currentValue.toString(), expectedValue)
        // i'm asserting retrieve() to return zero
        // the same:
        // expect(currentValue.toString()).to.equal(expectedValue)
    })
    // it.only if we want only this test
    it("Should update when we call store", async function () {
        const expectedValue = "7"
        const transactionResponse = await simpleStorage.store(expectedValue)
        await transactionResponse.wait(1)

        const currentValue = await simpleStorage.retrieve()
        assert.equal(currentValue.toString(), expectedValue)
    })
})
