import React, { useState, createContext } from 'react';
import { ethers } from "ethers";
import contractabi from "../contract/artifacts/contracts/Lock.sol/Lock.json";
import { useEffect } from 'react';

export const AppConfig = createContext();

export const AppProvider = ({ children }) => {

    const [providerConnected, setProviderConnected] = useState(false);
    const [currentUser, setCurrentUser] = useState("");
    const [raiseList, setraiseList] = useState()

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contractAddress = '0xC36F192a607805Ca31216D6EfB5Ac8CDD781c1E4';
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
        const signer = provider.getSigner();
        const newsignedContract = new ethers.Contract(contractAddress, abi, signer);
        await newsignedContract.performRaise(raising, title, desc);
    }

    const returnRaiseProgress = async () => {
        const signer = provider.getSigner();
        const newsignedContract = new ethers.Contract(contractAddress, abi, signer);
        const raiseCount = await newsignedContract.userInfo(currentUser)
        let temp = []
        for (let i = 0; i < parseInt(raiseCount.currentRaise._hex) + 1; i++) {
            const raise = await newsignedContract.raiseInfo(i);
            if (raise[6] === currentUser) {
                temp.push([raise]);
            }
        }
        console.log(temp)
        console.log(raiseCount)
        return temp;
    }

    const returnAllRaiseProgress = async () => {
        const signer = provider.getSigner();
        const newsignedContract = new ethers.Contract(contractAddress, abi, signer);
        const raiseCount = await newsignedContract.userInfo(currentUser)
        let temp = []
        for (let i = 0; i <= parseInt(raiseCount.currentRaise._hex) + 1; i++) {
            const raise = await newsignedContract.raiseInfo(i);
            temp.push([raise]);
        }
        return temp;
    }

    const donateToRaise = async (raiseId, amt) => {
        const signer = provider.getSigner();
        const newsignedContract = new ethers.Contract(contractAddress, abi, signer);
        await newsignedContract.donateRaise(raiseId, { value: ethers.utils.parseEther(String(amt)) });
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
            providerConnected, connectWallet, makeRaise, returnRaiseProgress, returnAllRaiseProgress, raiseList, donateToRaise
        }}>{children}</AppConfig.Provider>
    )
}