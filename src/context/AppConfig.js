import React, { useState, createContext } from 'react';
import { ethers } from "ethers";
import contractabi from "../contract/artifacts/contracts/Lock.sol/Lock.json";
import { useEffect } from 'react';

export const AppConfig = createContext();

export const AppProvider = ({ children }) => {

    const [providerConnected, setProviderConnected] = useState(false);
    const [currentUser, setCurrentUser] = useState("");
    const [raiseList, setraiseList] = useState();
    const [routeIndexVote, setRouteIndexVote] = useState();
    const [routeIndexMore, setRouteIndexMore] = useState();

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // const contractAddress = '0xdee029dF260132b7c9E2d659eA167a9355b0fb05'; ftm
    const contractAddress = '0x5b9f97e9917f76A02E5A8A34f25eFfeEAC040554';
    const abi = contractabi.abi;
    const providerContract = new ethers.Contract(contractAddress, abi, provider);
    const signer = provider.getSigner();




    const requestAccounts = async () => {
        const accns = await window.ethereum.request({ method: "eth_requestAccounts" });
        setProviderConnected(true);
    }

    const connectWallet = async () => {
        await requestAccounts();
        const signer = provider.getSigner();
        const newsignedContract = new ethers.Contract(contractAddress, abi, signer);
    }

    const makeRaise = async (raising, title, desc) => {
        try {
            const signer = provider.getSigner();
            const newsignedContract = new ethers.Contract(contractAddress, abi, signer);
            await newsignedContract.performRaise(raising, title, desc);
        } catch (error) {
            alert("An error Occured while performing a Raise, make sure you don't have another raise going running, error type - ", error)
        }

    }

    const returnRaiseProgress = async () => {
        const signer = provider.getSigner();
        const newsignedContract = new ethers.Contract(contractAddress, abi, signer);
        const raiseCount = await newsignedContract.userInfo(currentUser)
        let temp = []
        for (let i = 0; i < parseInt(raiseCount.currentRaise._hex) + 1; i++) {
            const raise = await newsignedContract.raiseInfo(i);
            if (raise[6] === currentUser) {
                temp.push([raise, i]);
            }
        }
        console.log(temp)
        console.log(raiseCount)
        return temp;
    }

    const returnAllRaiseProgress = async () => {
        const signer = provider.getSigner();
        const newsignedContract = new ethers.Contract(contractAddress, abi, signer);
        const raiseCount = await newsignedContract.counter();
        let temp = []
        for (let i = 0; i < parseInt(raiseCount._hex); i++) {
            const raise = await newsignedContract.raiseInfo(i);
            if (raise[4] !== '') {
                temp.push([raise]);
            }
        }
        return temp;
    }

    const donateToRaise = async (raiseId, amt) => {
        const signer = provider.getSigner();
        const newsignedContract = new ethers.Contract(contractAddress, abi, signer);
        await newsignedContract.donateRaise(raiseId, { value: ethers.utils.parseEther(String(amt)) });
    }

    const transactionHandle = async (client, amount, raiseId, purpose, attach_evidence) => {
        try {
            const signer = provider.getSigner();
            const newsignedContract = new ethers.Contract(contractAddress, abi, signer);
            await newsignedContract.handleTransaction(client, amount, raiseId, purpose, attach_evidence);
        } catch (error) {
            alert("Transaction Error Occured\n Please Check if you are performing the operation from the raiser account");
        }

    }

    const returnTransactionInfo = async (raiseId) => {

        const signer = provider.getSigner();
        const newsignedContract = new ethers.Contract(contractAddress, abi, signer);
        let temp = [];
        let i = 0;
        while (true) {
            try {
                const info = await newsignedContract.transactions(raiseId, i);
                i++;
                temp.push(info);
            }
            catch (error) {
                break
            }

        }
        console.log(temp);
        return temp;
    }

    const voteForTransac = async (raiseId, transacId, vote) => {
        const signer = provider.getSigner();
        const newsignedContract = new ethers.Contract(contractAddress, abi, signer);
        await newsignedContract.Vote(raiseId, transacId, vote);
        console.log("Voted!")
    }


    useEffect(() => {
        if (window.ethereum !== "undefined") {
            const requestAccounts = async () => {
                await provider.send("eth_requestAccounts", []);
                setProviderConnected(true);
                let current = await signer.getAddress();
                setCurrentUser(current);
            }
            requestAccounts();
            returnRaiseProgress();
        }
        else {
            console.log("Please install Metamask to continue")
        }

    }, []);




    return (
        <AppConfig.Provider value={{
            providerConnected, connectWallet, makeRaise, returnRaiseProgress, returnAllRaiseProgress, raiseList, donateToRaise, setRouteIndexVote, setRouteIndexMore, routeIndexVote, routeIndexMore, transactionHandle, returnTransactionInfo, voteForTransac
        }}>{children}</AppConfig.Provider>
    )
}