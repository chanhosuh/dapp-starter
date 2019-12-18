pragma solidity ^0.5.8;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import '@openzeppelin/contracts/ownership/Ownable.sol';

contract SampleContract is ERC20, Ownable {
    constructor() public {
        _mint(owner(), 1000000);
    }
}
