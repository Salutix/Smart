// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./SimpleStorage.sol";

contract ExtraStorage is SimpleStorage {
    //+5 to any number
    // "virtual" - to make the fuction overridable we need to add keyword to store function in SimpleStorage 
    // have to add "override" specifier
    function store(uint256 _favoriteNumber) public override {
        favoriteNumber = _favoriteNumber + 5;
    }
}
