import React from 'react'
import Navbar from './components/Navbar'
import MoneyIcon from '@mui/icons-material/Money';
import { Link } from 'react-router-dom';
function Home() {
    return (
        <div>
            <Navbar />
            <main className='maindash h-screen bg-gradient-to-b from-red-600 to-pink-600 m-0'>
                <div className="headers flex flex-col justify-center items-center max-w-md m-auto relative top-24 gap-8">
                    <div className="title font-extrabold text-5xl font-rubik drop-shadow-2xl text-gray-900">HashFunder</div>
                    <div className='text-center'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Animi vero placeat praesentium hic necessitatibus sint facere totam dolore maiores suscipit beatae inventore, nulla explicabo sunt fugit consectetur sit obcaecati veniam blanditiis voluptate!</div>
                    <div className="buttons">
                        <Link to={'/raise'}>
                            <button className='raisebtn p-2 bg-gradient-to-l from-purple-600 to-pink-800 rounded-lg m-2 drop-shadow-lg hover:scale-105 transition-all ease-in-out hover:drop-shadow-2xl active:bg-slate-50 font-rubik flex gap-2 active:border-2'>
                                <MoneyIcon /> <div> Start a Raise</div></button>
                        </Link>

                    </div>
                </div>

            </main>
        </div>
    )
}

export default Home