import React, { useContext, useEffect, useState } from 'react'
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import { AppConfig } from './context/AppConfig';

function SendTransac() {
    const [loader, setLoader] = useState(false)
    const [raiseInfo, setRaiseInfo] = useState([])
    const [address, setAddress] = useState("")
    const [purpose, setPurpose] = useState("")
    const [evidence, setEvidence] = useState("")
    const [amount, setAmount] = useState("")

    const { returnAllRaiseProgress, transactionHandle, routeIndexMore, returnTransactionInfo } = useContext(AppConfig);
    const userData = async () => {
        setLoader(true);
        const temp = await returnAllRaiseProgress();
        setRaiseInfo(temp);
        setLoader(false);
        // console.log(raiseInfo[routeIndexMore][0][0]);
    }

    const handleTransaction = async (address, amount, raiseId, purpose, evidence) => {
        await transactionHandle(address, amount, raiseId, purpose, evidence);

    }

    const getInfo = async () => {
        await returnTransactionInfo();
    }

    useEffect(() => {
        userData();
        getInfo();
    }, [])
    return (
        <div className='h-screen bg-gradient-to-b from-red-600 to-pink-600 m-0 flex flex-col'>
            <main>
                <div>
                    <div className='flex'>
                        <div className='font-extrabold text-5xl font-rubik drop-shadow-2xl text-gray-900 mt-12 mx-6'>Send Raise Money</div>
                    </div>
                    <div className='font-extrabold text-3xl font-rubik drop-shadow-2xl text-gray-700 my-8 mx-12'>Fill in the following fields and complete the transaction</div>
                </div>

                <div className='transacfields my-10 mx-12 flex flex-col gap-3'>
                    <div className='flex flex-col gap-2'>
                        <div className='font-bold text-xl font-rubik drop-shadow-2xl text-black'>Enter the Wallet Address of the Client</div>
                        <input value={address} onChange={e => setAddress(e.target.value)} type="text" className='p-2 rounded-lg focus-within:bg-purple-200 w-1/3 shadow-md shadow-purple-600 outline-none' />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <div className='font-bold text-xl font-rubik drop-shadow-2xl text-black'>Specify the purpose of this transaction</div>
                        <input value={purpose} onChange={e => setPurpose(e.target.value)} type="text" className='p-2 rounded-lg focus-within:bg-purple-200 w-1/3 shadow-md shadow-purple-600 outline-none' />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <div className='font-bold text-xl font-rubik drop-shadow-2xl text-black'>Attach a link to evidence proof</div>
                        <input value={evidence} onChange={e => setEvidence(e.target.value)} type="text" className='p-2 rounded-lg focus-within:bg-purple-200 w-1/3 shadow-md shadow-purple-600 outline-none' />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <div className='font-bold text-xl font-rubik drop-shadow-2xl text-black'>Enter the Amount</div>
                        <input value={amount} onChange={e => setAmount(e.target.value)} type="text" className='p-2 rounded-lg focus-within:bg-purple-200 w-24 shadow-md shadow-purple-600 outline-none' />
                    </div>
                    <button onClick={() => handleTransaction(address, parseInt(amount), routeIndexMore, purpose, evidence)} className='p-2 bg-gradient-to-l from-purple-600 to-pink-800 rounded-lg  drop-shadow-lg hover:scale-105 transition-all ease-in-out hover:drop-shadow-2xl active:border-2 font-rubik flex gap-2 w-fit'> <div>Send</div> </button>


                </div>
            </main>
        </div>
    )
}

export default SendTransac