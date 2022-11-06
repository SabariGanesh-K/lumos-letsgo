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
        mapping(address=>bool ) voted;
    }
    mapping(address=>bool) public raisingStat;
    mapping(address=>uint256[]) public  raiseIds;
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
  mapping(uint256 =>  Transaction[]) public transactions;
    uint256 RInd;
    uint256 Tind;
    uint256 raisect;
    uint256 counter ;
    mapping(address => UserInfo) public userInfo;
    mapping(uint256 => Raise) public raiseInfo;

    function performRaise(
        uint256 raising,
        string memory title,
        string memory desc
    ) payable external {
        require(
            !userInfo[msg.sender].deactivated,
            "User banned from the network"
        );
        require(!raisingStat[msg.sender],"Anothe raise in progress");
        require(msg.value==raising /1 ether,"STAKE MONEY should be 1eth");
        raiseInfo[counter].raising = raising;
        raiseInfo[counter].admin = msg.sender;
        raiseInfo[counter].desc = desc;
        raiseInfo[counter].title = title;
        raiseInfo[counter].timeadded = block.timestamp;
        userInfo[msg.sender].currentRaise = counter;
        raiseIds[msg.sender].push(counter);
        counter++;
    }

    function donateRaise(uint256 raiseId) payable external{
        require(!raiseInfo[raiseId].InDispute,"raise in dispute");
        require(raiseInfo[raiseId].raising-raiseInfo[raiseId].raised>=msg.value/1 ether,"More than necessary");
        // raiseInfo[raiseId].donor[msg.sender]=true;
        donors[raiseId][msg.sender] = true;
        raiseInfo[raiseId].raised+=msg.value/1 ether;

        
        
    }

    function  handleTransaction(address payable client,uint256 amount,uint256 raiseId,string memory purpose,string memory attach_evidence) external {
        require(raiseInfo[raiseId].raising-raiseInfo[raiseId].raised==0,"Raising not yet completed");
        require(raiseInfo[raiseId].raising-raiseInfo[raiseId].spent>0,"Low balance");
        require(raiseInfo[raiseId].admin==msg.sender,"Only admin have access");
        require(raiseInfo[raiseId].lastTransaction==0||block.timestamp-raiseInfo[raiseId].lastTransaction>=1 days,"Only 1 transaction allowed per day");
    bool dispute=_checkDisputes(raiseId);
        if(dispute){
            raiseInfo[raiseId].InDispute=true;
            
        }
        require(!dispute,"Raise entered dispute");
        uint256 id =transactions[raiseId].length;
   (bool sent, bytes memory data) = client.call{value: amount*10**18}("");
        require(sent, "Failed to send Ether");
       transactions[raiseId][id].to=client;
           transactions[raiseId][id].valuesent=amount;
               transactions[raiseId][id].purpose=purpose;
                   transactions[raiseId][id].attach_evidence=attach_evidence;
                       transactions[raiseId][id].id=id;
                         transactions[raiseId][id].start=block.timestamp;


    }
    function Vote(uint256 raiseId,uint256 transactioId,bool result) external {
        require(raiseInfo[raiseId].transactions.length>=transactioId,"Invalid transaction id");
        require(!raiseInfo[raiseId].transactions[transactioId].voted[msg.sender] , "Voting completed by sender" );
        require(donors[raiseId][msg.sender],"Only donors can vote");
        if(result){
           transactions[raiseId][transactioId].for_votes++;
        }
        else{
           transactions[raiseId][transactioId].against_votes++;

        }

    }

    function _checkDisputes(uint256 raiseId) private view returns(bool){
        bool res = false;
        for (uint256 i =0;i<raiseInfo[raiseId].transactions.length;i++){
            if(block.timestamp-raiseInfo[raiseId].transactions[i].start>1 days &&transactions[raiseId][i].against_votes>=raiseInfo[raiseId].transactions[i].for_votes   ){
                res=true;

                break;
            }
        }
        return res;

    }



}