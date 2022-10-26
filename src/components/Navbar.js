import React, { useContext } from 'react'
import WalletIcon from '@mui/icons-material/Wallet';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import { Link, useNavigate } from 'react-router-dom';
import { AppConfig } from '../context/AppConfig';

function Navbar() {
    const navigate = useNavigate();
    const { providerConnected, connectWallet } = useContext(AppConfig);
    return (
        <div className='navbar w-full px-4 py-2 bg-gradient-to-r to-pink-500 from-indigo-600 flex gap-4 items-center justify-between'>
            <div className='flex gap-4 items-center'>
                <button disabled={providerConnected} onClick={connectWallet} className={!providerConnected ? 'p-2 bg-gradient-to-l from-purple-600 to-pink-800 rounded-lg m-2 drop-shadow-lg hover:scale-105 transition-all ease-in-out hover:drop-shadow-2xl active:border-2 font-rubik flex gap-2' : 'p-2 bg-gradient-to-l from-purple-600 to-pink-800 rounded-lg m-2 drop-shadow-lg  font-rubik flex gap-2'}> <WalletIcon /> <div>{!providerConnected ? "Connect to Wallet" : "Connected"}</div> </button>
                <Link to={'/'}>
                    <button className='p-2 bg-gradient-to-l from-purple-600 to-pink-800 rounded-lg m-2 drop-shadow-lg hover:scale-105 transition-all ease-in-out hover:drop-shadow-2xl active:border-2 font-rubik flex gap-2'> <HomeIcon /> <div>Home</div> </button>
                </Link>
            </div>
            <div onClick={() => navigate("/user")}>
                <PersonIcon className='cursor-pointer' fontSize='large' />
            </div>


        </div>
    )

}

export default Navbar