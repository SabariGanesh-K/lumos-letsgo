// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Lock {
    struct Transaction {
        address to;
        uint256 valuesent;
        string purpose;
        string attach_evidence;
        uint256 for_votes;
        uint256 against_votes;
        uint256 id;
    }

    struct UserInfo {
        address wallet;
        uint256[] raiseIds;
        bool deactivated;
    }

    struct Raise {
        uint256 raised;
        uint256 raising;
        bool InDispute;
        string title;
        string desc;
        address admin;
        uint256 timeadded;
        uint256 timeclosed;
        address[] donors;
        Transaction[] transactions;
    }

    uint256 RInd;
    uint256 Tind;
    uint256 raisect;
    uint256 counter = 0;
    mapping(address => UserInfo) public userInfo;
    mapping(uint256 => Raise) public raiseInfo;

    function performRaise(
        uint256 raising,
        string memory title,
        string memory desc
    ) public {
        require(
            !userInfo[msg.sender].deactivated,
            "User banned from the network"
        );
        raiseInfo[counter].raising = raising;
        raiseInfo[counter].admin = msg.sender;
        raiseInfo[counter].desc = desc;
        raiseInfo[counter].title = title;
        raiseInfo[counter].timeadded = block.timestamp;
        userInfo[msg.sender].raiseIds.push(counter);
        counter++;
    }
}
