import { MoneyOutlined, ThumbDown, ThumbUp, VolunteerActivism } from '@mui/icons-material';
import { Modal } from '@mui/material';
import { Box } from '@mui/system';
import React, { useContext, useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { AppConfig } from './context/AppConfig';

function Vote() {
    const { routeIndexVote, returnTransactionInfo, voteForTransac } = useContext(AppConfig);
    const [transacData, setTransacData] = useState([]);
    const [waiting, setWaiting] = useState(true)
    const [raiseId, setRaiseId] = useState();
    const [transacId, setTransacId] = useState();
    let high = 1;
    let low = 0;
    const getTransactionData = async () => {
        // setWaiting(false);
        const t = await returnTransactionInfo(routeIndexVote);
        setTransacData(t);
        // setWaiting(true);

    }

    // modal
    const [open, setOpen] = React.useState(false);
    const handleOpen = async (raiseId, transacId) => {
        setOpen(true);
        setRaiseId(raiseId);
        setTransacId(transacId);
    }
    const handleClose = () => setOpen(false);
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'rgba(236, 72, 153, 0.87)',
        border: '2px solid rgba(144, 72, 153, 0.87)',
        borderRadius: "12px",
        boxShadow: 24,
        p: 4,
    };
    /// modal

    const voteHandler = async (raiseId, transacId, vote) => {
        await voteForTransac(raiseId, transacId, vote);
        console.log("voted")
    }


    useEffect(() => {
        getTransactionData();
    }, []);
    console.log(routeIndexVote)
    return (
        <div className='bg-gradient-to-b from-red-600 to-pink-600 m-0'>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} >
                    <div className='flex flex-col gap-2 items-center justify-center'>
                        <div className='m-2 text-2xl font-rubik font-semibold text-center'>Vote Transaction</div>
                        <div className='mt-4 flex gap-2 justify-center items-center'>
                        </div>
                        <button onClick={() => voteHandler(raiseId, transacId, high)} className='p-2 bg-gradient-to-l from-purple-600 to-pink-800 rounded-lg m-2 drop-shadow-lg hover:scale-105 transition-all ease-in-out hover:drop-shadow-2xl active:border-2 font-rubik flex gap-2'> <ThumbUp /> <div>Vote For</div> </button>
                        <button onClick={() => voteHandler(raiseId, transacId, low)} className='p-2 bg-gradient-to-l from-purple-600 to-pink-800 rounded-lg m-2 drop-shadow-lg hover:scale-105 transition-all ease-in-out hover:drop-shadow-2xl active:border-2 font-rubik flex gap-2'> <ThumbDown /> <div>Vote Against</div> </button>
                    </div>
                </Box>
            </Modal>
            <div>
                <Navbar />
            </div>
            <main className='py-12 pb-52'>
                <h2 className='font-extrabold text-5xl font-rubik drop-shadow-2xl text-gray-900 mx-10 my-12'>Transactions</h2>
                {waiting && transacData.map((tinfo) => (
                    <section className='transactionscard p-3 border-4 border-gray-700 rounded-xl mx-5 m-4'>
                        <div className='mx-2 my-4 px-4 py-2 rounded-xl flex flex-col gap-2 bg-gradient-to-r from-red-400 to-purple-400 opacity-95 drop-shadow-md border-2 border-red-400' >
                            <div className='font-rubik font-bold text-xl'>Transaction - {transacData.indexOf(tinfo) + 1}</div>
                            <section className='mt-2 mx-4 p-2 border-y-2 border-purple-400 flex flex-col gap-4'>
                                <div className="purpose font-rubik font-semibold text-lg text-slate-800">Transaction Purpose : <p className='font-rubik font-medium text-md'>{tinfo[2]}</p></div>
                                <div className="evidencelink font-rubik font-semibold text-lg text-slate-800">Link to Evidence : <p className='font-rubik font-medium underline text-blue-600 cursor-pointer'>{tinfo[3]}</p></div>
                                <div className="evidencelink font-rubik font-semibold text-lg text-slate-800 mt-4 flex gap-2">Amount Transferred : <p className='font-rubik font-medium text-md'>{parseInt(tinfo[1]._hex)} Tokens</p></div>
                                <button onClick={() => handleOpen(routeIndexVote, transacData.indexOf(tinfo))} className='p-2 bg-gradient-to-l from-purple-600 to-pink-800 rounded-lg m-2 drop-shadow-lg hover:scale-105 transition-all ease-in-out hover:drop-shadow-2xl active:border-2 font-rubik flex gap-2 w-fit'>Vote Now</button>
                            </section>
                            <section className='flex flex-col gap-1 mx-6 my-2'>
                                <div className="flex flex-row gap-2">
                                    <div className="forvotes font-rubik font-semibold text-lg text-slate-800">For Votes : </div>
                                    <p className='font-rubik font-medium'>{parseInt(tinfo[4])} 👍</p>
                                </div>
                                <div className="flex flex-row gap-2">
                                    <div className="againstvotes font-rubik font-semibold text-lg text-slate-800">Against Votes : </div>
                                    <p className='font-rubik font-medium'>{parseInt(tinfo[5])} 👎</p>
                                </div>

                            </section>
                        </div>
                    </section>
                ))}

            </main>
        </div>

    )
}

export default Vote