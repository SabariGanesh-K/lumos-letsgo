import React, { useContext, useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import MoneyIcon from '@mui/icons-material/Money';
import { Link, useNavigate } from 'react-router-dom';
import { AppConfig } from './context/AppConfig';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import { Box, Button, CircularProgress, Modal, Typography } from '@mui/material';
import Money from '@mui/icons-material/Money';
import { MoneyOutlined } from '@mui/icons-material';
function Home() {
    const { providerConnected, returnAllRaiseProgress, donateToRaise, setRouteIndexVote } = useContext(AppConfig);
    const [loader, setLoader] = useState(false)
    const [dashboardRaises, setDashboardRaises] = useState([])
    const [raiseId, setRaiseId] = useState();
    const [donateAmt, setDonateAmt] = useState("")

    const navigate = useNavigate();

    const moreInfo = (indexOfRaise) => {
        setRouteIndexVote(indexOfRaise);
        navigate('/vote');
    }

    // modal
    const [open, setOpen] = React.useState(false);
    const handleOpen = async (raiseId) => {
        setOpen(true);
        setRaiseId(raiseId);
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

    const userData = async () => {
        setLoader(true);
        const temp = await returnAllRaiseProgress();
        setDashboardRaises(temp);
        setLoader(false);
    }

    const donateRaise = async (raiseId, amt) => {
        await donateToRaise(raiseId, amt);
    }

    useEffect(() => {
        userData();
    }, [])
    console.log(dashboardRaises)

    return (
        <div>
            <Navbar />
            {/* <Button onClick={handleOpen}>Open modal</Button> */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} >
                    <div className='flex flex-col gap-2 items-center justify-center'>
                        <div className='m-2 text-2xl font-rubik font-semibold text-center'>Donate Amount</div>
                        <div className='mt-4 flex gap-2 justify-center items-center'>
                            <input className='rounded-xl p-3' type="text" value={donateAmt} onChange={e => setDonateAmt(e.target.value)} /> <p className='font-rubik font-semibold'>ETH</p>
                        </div>
                        <button onClick={() => donateRaise(raiseId, donateAmt)} className='p-2 bg-gradient-to-l from-purple-600 to-pink-800 rounded-lg m-2 drop-shadow-lg hover:scale-105 transition-all ease-in-out hover:drop-shadow-2xl active:border-2 font-rubik flex gap-2'> <MoneyOutlined /> <div>Donate</div> </button>
                    </div>
                </Box>
            </Modal>
            <main className='maindash bg-gradient-to-b from-red-600 to-pink-600 m-0 pb-32'>
                <div className="headers flex flex-col justify-center items-center max-w-md mx-auto relative top-24 gap-8">
                    <div className="title font-extrabold text-5xl font-rubik drop-shadow-2xl text-gray-900">HashFunder</div>
                    <div className='text-center'>A decentralized platform using blockchain that automatically handles all fundraising AND disputes. All the transaction made by fundraiser through raised money is transparent and donors can vote and file for disputes. Users can donate and get added to the Raise verification system.
                    </div>
                    <div className="buttons">
                        <Link to={'/raise'}>
                            <button disabled={!providerConnected} className='raisebtn p-2 bg-gradient-to-l from-purple-600 to-pink-800 rounded-lg m-2 drop-shadow-lg hover:scale-105 transition-all ease-in-out hover:drop-shadow-2xl active:bg-slate-50 font-rubik flex gap-2 active:border-2'>
                                <MoneyIcon /> <div> Start a Raise</div></button>
                        </Link>
                    </div>
                </div>

                <div className='dashboard mt-28 mx-6 border-t-4 border-indigo-300 py-10 relative top-10'>
                    <div className="title font-bold text-5xl font-rubik drop-shadow-2xl text-gray-900 text-center">Dashboard</div>
                    <div className='raiseList p-2 my-4 bg-gradient-to-b from-pink-500 to-pink-600 rounded-xl'>
                        {loader === true ? <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                            <CircularProgress />
                            <div className='font-rubik'>If the Dashboard is not loading at all(max=30s) either check your internet connection or maybe route into a different page and return back to the home page.</div>
                        </Box> : dashboardRaises.map((rinfo) => (
                            <div className='mx-2 my-4 px-4 py-2 rounded-xl flex justify-between items-center bg-gradient-to-r from-red-400 to-purple-400 opacity-95 drop-shadow-md border-2 border-red-400 hover:scale-[1.02] transition-all ease-in-out' >
                                <div className='flex'>
                                    <div>
                                        <h3 className='font-rubik font-semibold text-lg'>{rinfo[0][4]}</h3>
                                        <p className='max-w-sm font-rubik'>{rinfo[0][5]}</p>
                                        <div className='flex gap-4 mt-2'>
                                            {(parseInt(rinfo[0][0]._hex)) - (parseInt(rinfo[0][1]._hex)) === 0 ? <button onClick={() => moreInfo(dashboardRaises.indexOf(rinfo))} className='p-2 bg-gradient-to-l from-purple-600 to-pink-800 rounded-lg m-2 drop-shadow-lg hover:scale-105 transition-all ease-in-out hover:drop-shadow-2xl active:border-2 font-rubik flex gap-2'>Vote</button> : ""}

                                            <button onClick={() => handleOpen(dashboardRaises.indexOf(rinfo))} className='p-2 bg-gradient-to-l from-purple-600 to-pink-800 rounded-lg m-2 drop-shadow-lg hover:scale-105 transition-all ease-in-out hover:drop-shadow-2xl active:border-2 font-rubik flex gap-2'>Donate</button>
                                        </div>
                                    </div>
                                    <div>

                                    </div>
                                </div>
                                <div className="progressbar font-rubik font-semibold" style={{ width: 100, height: 100 }}>
                                    <CircularProgressbar value={((parseInt(rinfo[0][0]._hex)) / (parseInt(rinfo[0][1]._hex)) * 100).toFixed(2)} text={((parseInt(rinfo[0][0]._hex)) / (parseInt(rinfo[0][1]._hex)) * 100).toFixed(2) === 100 ? "Complete" : ((parseInt(rinfo[0][0]._hex)) / (parseInt(rinfo[0][1]._hex)) * 100).toFixed(1) + "% raised"} styles={buildStyles({
                                        rotation: -0.25,
                                        strokeLinecap: 'round',
                                        textSize: '12px',
                                        pathTransitionDuration: 0.5,
                                        pathColor: '#7909CB',
                                        textColor: '#110210',
                                        trailColor: '#00000',
                                        backgroundColor: '#CB09BF',
                                    })} />
                                </div>

                            </div>
                        ))}


                    </div>
                </div>
            </main>

        </div>
    )
}

export default Home