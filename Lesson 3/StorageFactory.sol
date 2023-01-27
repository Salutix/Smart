//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./SimpleStorage.sol";

contract StorageFactory{
    SimpleStorage[] public simpleStorageArray;

    function createSimpleStorageContract() public {
        SimpleStorage simpleStorage = new SimpleStorage();
        simpleStorageArray.push(simpleStorage);
    }

    function sfStore(uint256 _simpleStorageIndex, uint256 _simpleStorageNumber) public {
        //Adress
        //ABI - Application Binary Interface
       simpleStorageArray[_simpleStorageIndex].store(_simpleStorageNumber);
       /*another variant: SimpleStorage simpleStorage = simpleStorageArray[_simpleStorageIndex]; // variable named "simpleStorage" 
        of type SimpleStorage is equal to SimpleStorage object at index ... //
        simpleStorage.store(_simpleStorageNumber);*/
    }
    // in order to read from SimpleStorage conract from StrorageFactory we create following function:
    function sfGet(uint256 _simpleStorageIndex) public view returns(uint256){
        return simpleStorageArray[_simpleStorageIndex].retrieve(); // we calling retrieve function on simpleStorage object
        /* another variant: SimpleStorage simpleStorage = simpleStorageArray[_simpleStorageIndex];
        return simpleStorage.retrieve(); */
    }
}
