import React, { useState, createContext } from 'react';
import { ethers } from "ethers";
import contractabi from "../contract/artifacts/contracts/Lock.sol/Lock.json";

export const AppConfig = createContext();

export const AppProvider = ({ children }) => {

    const [providerConnected, setProviderConnected] = useState(false);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contractAddress = '0x6A24a4AC86033f8A324b8BC5E28580251549966C';
    const abi = contractabi.abi;
    const providerContract = new ethers.Contract(contractAddress, abi, provider);


    const requestAccounts = async () => {
        const accns = await window.ethereum.request({ method: "eth_requestAccounts" });
        setProviderConnected(true);
    }

    const connectWallet = async () => {
        await requestAccounts();
        const signer = provider.getSigner();
        const newsignedContract = new ethers.Contract(contractAddress, abi, signer);
        console.log("connected")
    }

    const makeRaise = async (raising, title, desc) => {
        const signer = provider.getSigner();
        const newsignedContract = new ethers.Contract(contractAddress, abi, signer);
        await newsignedContract.performRaise(raising, title, desc);
    }

    return (
        <AppConfig.Provider value={{
            providerConnected, connectWallet, makeRaise
        }}>{children}</AppConfig.Provider>
    )
}