// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FallbackExample {
    uint256 public result;

    receive() external payable {
        result = 1;
    }

    fallback() external payable {
        result = 2;
    }
}
    /* eth is sent to contract
    is msg.data empty?
    if no - fallback()
    if yes - receive()? if yes - reveive(), if no - fallback()
