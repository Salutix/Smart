// Get funds from users
// Withdraw funds
// Set a min funding value in USD

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./PriceConverter.sol";

// constant, immutable - not in storage slot, but in byte code

error NotOwner();

contract FundMe { // deployment cost 946,388 gas 15 142 208 wei = 0,0000000225 $

    using PriceConverter for uint256;

    uint256 public constant MINIMUM_USD = 50 * 1e18; // 1 * 10 ** 18

    address[] public funders;

    address public immutable i_owner; // i_ is how we know, that it's immutable

    constructor (){
        i_owner = msg.sender; // "=" - owner is now set to msg.sender
    }

    mapping (address => uint256) public addressToAmountFunded;

    function fund() public payable{
        // Want to be able to set a min fund amount in USD
        // How do we send ETH to this contract?
        msg.value.getConversionRate();
        require(msg.value.getConversionRate() >= MINIMUM_USD, "Didn't send enough!"); //1e18 = 1 * 10^18
        // reverting - undo any action before and send remaining gas back
        funders.push(msg.sender);
        addressToAmountFunded[msg.sender] = msg.value;
    }

    function withdraw() public onlyOwner /* before doing code inside look down at the modifier
        and do evrth and only then the rest (_) */ {
            // require(msg.sender == owner, /* otherwise error*/ "Sender is not owner!"); // "==" - these two variables are equivalents
            // for loop 
            // [1, 2, 3, 4]
            //  0. 1. 2. 3.
            /* starting index, ending index, step amount */
            for (uint256 funderIndex = 0; funderIndex < funders.length; funderIndex = funderIndex + 1){
                // (funderIndex = funderIndex + 1) = funderIndex++ 
                address funder = funders[funderIndex];
                addressToAmountFunded[funder] = 0;
            }
            // resert the array
            funders = new address[](0);
            /* actually withdraw the funds - 3 ways: transfer (automatically reverts, if tx fails),
             send and call  (reverts only if second line...)*/
            /* 1) - transfer
            msg.sender = address
            payable(msg.sender) = payable address */
          //  payable(msg.sender).transfer(address(this).balance);

            // 2) - send 
          //  bool sendSuccess = payable(msg.sender).send(address(this).balance);
          //  require(sendSuccess, "Send failed");
            
            // 3) - call
            (bool callSuccess, /* bytes memory dataReturned */ ) = payable(msg.sender).call{value: address(this).balance}("");
            require(callSuccess, "Call failed");
    }

            // modifier - a key word, that we can add right in the function declaration to modify the function with functionality
            modifier onlyOwner {
                // require(msg.sender == i_owner, "Sender is not owner!");
                if(msg.sender != /*is not */ i_owner) { revert NotOwner(); }
                _; // underscore means doing the rest of the code
            }

            // What happens if someone sends this contract ETH without calling the fund function?

            receive() external payable {
                fund(); // when accidently call the wrong function or sent money directly without using fund function
            }
            
            fallback() external payable {
                fund();
            }
        
}   
