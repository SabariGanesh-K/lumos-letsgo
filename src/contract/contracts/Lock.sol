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
        uint256 start;
        // address[] voters;
    }
    mapping(uint256 => mapping(uint256 => mapping(address => bool))) voters;
    mapping(address => bool) public raisingStat;
    mapping(address => uint256[]) public raiseIds;
    struct UserInfo {
        address wallet;
        bool deactivated;
        uint256 currentRaise;
    }

    struct Raise {
        uint256 raised;
        uint256 raising;
        uint256 spent;
        bool InDispute;
        string title;
        string desc;
        address admin;
        bool feeDeducted;
        uint256 timeadded;
        uint256 timeclosed;
        uint256 lastTransaction;
        // Transaction[] transactions;
        // mapping(address=>bool)  donor;
    }

    mapping(uint256 => mapping(address => bool)) public donors;
    mapping(uint256 => Transaction[]) public transactions;
    //   Transaction[] transactions;
    uint256 RInd;
    uint256 Tind;
    uint256 raisect;
    uint256 public counter;
    mapping(address => UserInfo) public userInfo;
    mapping(uint256 => Raise) public raiseInfo;

    function performRaise(
        uint256 raising,
        string memory title,
        string memory desc
    ) external payable {
        require(
            !userInfo[msg.sender].deactivated,
            "User banned from the network"
        );
        require(!raisingStat[msg.sender], "Anothe raise in progress");
        require(msg.value == raising / 1 ether, "STAKE MONEY should be 1eth");
        raiseInfo[counter].raising = raising;
        raiseInfo[counter].admin = msg.sender;
        raiseInfo[counter].desc = desc;
        raiseInfo[counter].title = title;
        raiseInfo[counter].timeadded = block.timestamp;
        userInfo[msg.sender].currentRaise = counter;
        raiseIds[msg.sender].push(counter);
        raisingStat[msg.sender] = true;
        counter++;
    }

    function donateRaise(uint256 raiseId) external payable {
        require(!raiseInfo[raiseId].InDispute, "raise in dispute");
        require(
            raiseInfo[raiseId].raising - raiseInfo[raiseId].raised >=
                msg.value / 1 ether,
            "More than necessary"
        );
        // raiseInfo[raiseId].donor[msg.sender]=true;
        donors[raiseId][msg.sender] = true;
        raiseInfo[raiseId].raised += msg.value / 1 ether;
    }

    function handleTransaction(
        address client,
        uint256 amount,
        uint256 raiseId,
        string memory purpose,
        string memory attach_evidence
    ) external payable {
        require(
            raiseInfo[raiseId].raising - raiseInfo[raiseId].raised == 0,
            "Raising not yet completed"
        );
        require(
            raiseInfo[raiseId].raising - raiseInfo[raiseId].spent > 0,
            "Low balance"
        );
        require(
            raiseInfo[raiseId].admin == msg.sender,
            "Only admin have access"
        );
        // require(raiseInfo[raiseId].lastTransaction==0||block.timestamp-raiseInfo[raiseId].lastTransaction>=1 days,"Only 1 transaction allowed per day");
        bool dispute = _checkDisputes(raiseId);
        if (dispute) {
            raiseInfo[raiseId].InDispute = true;
        }
        require(!dispute, "Raise entered dispute");

        uint256 id = transactions[raiseId].length;
        raiseInfo[raiseId].spent += amount;

        payable(client).transfer(amount * 10**18);
        
        raisingStat[msg.sender] = false;
        address[] memory votersEmpty;
        transactions[raiseId].push(
            Transaction(
                client,
                amount,
                purpose,
                attach_evidence,
                0,
                0,
                id,
                block.timestamp
            )
        );
    }

    function balanceOf() public view returns (uint256) {
        return address(this).balance;
    }

    function Vote(
        uint256 raiseId,
        uint256 transactioId,
        bool result
    ) external {
        require(
            transactions[raiseId].length >= transactioId,
            "Invalid transaction id"
        );
        bool votestat = CheckVote(raiseId, transactioId);
        require(votestat, "Voting completed by sender");
        require(donors[raiseId][msg.sender], "Only donors can vote");
        if (result) {
            transactions[raiseId][transactioId].for_votes++;
        } else {
            transactions[raiseId][transactioId].against_votes++;
        }
        // transactions[raiseId][transactioId].voters.push(msg.sender);
        // address client
        // voters[raiseId][transactioId].push(msg.sender);
        voters[raiseId][transactioId][msg.sender] = true;
    }

    function CheckVote(uint256 raiseId, uint256 transactionId)
        public
        view
        returns (bool)
    {
        if (transactions[raiseId].length == 0) {}
        for (uint256 i = 0; i < transactions[raiseId].length; i++) {
            if (voters[raiseId][transactionId][msg.sender] == true) {
                return false;
            }
        }
        return true;
    }

    function returnTransLegth() public view returns (uint256) {
        return transactions[0].length;
    }

    function _checkDisputes(uint256 raiseId) private view returns (bool) {
        bool res = false;
        if (transactions[raiseId].length == 0) {
            return false;
        } else {
            for (uint256 i = 0; i < transactions[raiseId].length; i++) {
                if (
                    block.timestamp - transactions[raiseId][i].start > 1 days &&
                    transactions[raiseId][i].against_votes >=
                    transactions[raiseId][i].for_votes
                ) {
                    res = true;

                    break;
                }
            }
        }
        return res;
    }
}
