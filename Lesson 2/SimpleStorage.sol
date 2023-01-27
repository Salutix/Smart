// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8; // all versions between work ^0.8.7 (most stable versions and higher)
// also possible f.e. >=0.8.0 <0.9.0;

/* Boolean – true/false, 
uint – whole numbers non-negative, 
int – positive or negative whole number, 
address, bytes 
Value – holders for different values
string - words
*/
// Just do not give up and continue doing no matter what conditions are :-)
// EVM - Eth Virtual Machine (also Avalanche, Fantom, Polygon)
contract SimpleStorage {
    
    // If no "= n" at the end, then automatically it = 0
    uint256 favoriteNumber;
    

    mapping(string => uint256) public nameToFavoriteNumber; //mapping is kind of dictionary
    // data structure where key is "mapped" to a single value. In our case name is mapped to specific number

    struct People {
        uint256 favoriteNumber;
        string name;
    }
    
    People[] public people; //array is a data structure that holds a list of other types (objects)
    //dynamic array, because seize isn't given (f.e. we can set [3], then only 3 names possible)
    // uint256[] public favoriteNumbersList;

    function store(uint256 _favoriteNumber) public {
        favoriteNumber = _favoriteNumber;
    }

    // view - only read state from this contract, pure - can't even read
    // gas paid only when modifying blockchain (if func call view/pure, then have to pay gas)
    function retrieve() public view returns(uint256){
        return favoriteNumber;
    }

    // calldata (temporary variable, that can't be modified), memory (temporary variable, that
    // can be modified), storage - permanent and stay 4ever
    // push = adding
    // function parameters cannot be storage variables, because
    // they exist only 4 duration of function
    function addPerson(string memory _name, uint256 _favoriteNumber) public {
        people.push(People(_favoriteNumber, _name));
        nameToFavoriteNumber[_name] = _favoriteNumber;
    }
}
