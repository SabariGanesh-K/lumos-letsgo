// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Lock {
      struct Transaction{
    address to;
    uint256 valuesent;
    string purpose;
    string attach_evidence;
    uint256 for_votes;
    uint256 against_votes;
   uint256 id;
 }

   struct UserInfo{
      address wallet;
      uint256[] raiseIds;
   }
   struct Raise{
    uint256 raised;
    uint256 raising;
    bool InDispute;
    string desc;
    address admin;
    uint256 timeadded;
    uint256 timeclosed;
    Transaction[] transactions;
   }
   uint256 RInd ;
   uint256 Tind;



   uint256 raisect;
   mapping(address => UserInfo) public userInfo;
   mapping(uint256 => Raise) public raiseInfo;
   function performRaise(uint256 raising,string memory desc) public view {
      uint256 code  = block.timestamp;
      raiseInfo[code].raising = raising;
      raiseInfo[code].admin = msg.sender;
      raiseInfo[code].desc = desc;
      raiseInfo[code].timeadded=block.timestamp;
      userInfo[msg.sender].raiseIds.push(code);


   }
   


   function



}
