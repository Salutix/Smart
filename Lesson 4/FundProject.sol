// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

contract FundProject {

    address[] public funders;
    mapping(address => uint256) public addressToAmountFunded;
    address public owner;
 
    constructor(){
        owner = msg.sender;
    }
    
    function fund() public payable {
        funders.push(msg.sender);
        addressToAmountFunded[msg.sender] = msg.value;
    }

    modifier onlyOwner {
        require(msg.sender == owner, "Sender isn't owner");
        _;
    }

    function withdraw () public onlyOwner {
        for(uint256 funderIndex = 0; funderIndex < funders.length; funderIndex++){
            address funder = funders[funderIndex];
            addressToAmountFunded[funder] = 0;
        }
        funders = new address[](0);
        (bool callSuccess, ) = payable(msg.sender).call{value: address(this).balance}("");
        require (callSuccess, "Call failed");
    }
}
