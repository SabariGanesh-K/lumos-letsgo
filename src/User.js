import React from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
function User() {
    const percentage = 64;

    return (
        <div className='maindash h-screen overflow-x-hidden bg-gradient-to-b from-red-600 to-pink-600 m-0'>
            <div>
                <div className='header font-extrabold text-5xl font-rubik drop-shadow-2xl text-gray-900 my-16  mx-10'>User Profile</div>
                <div className="grid grid-cols-2 gap-4 mx-4 my-6">
                    <div className="fundsraised p-3 border-4 border-gray-700 rounded-xl">
                        <div className="title font-bold text-3xl font-rubik drop-shadow-2xl text-gray-900 ">Funds Raised</div>
                        <div className="fundraisedlist">
                            <div className='mx-2 my-4 px-4 py-2 rounded-xl flex justify-between items-center bg-gradient-to-r from-red-400 to-purple-400 opacity-95 drop-shadow-md border-2 border-red-400 hover:scale-[1.02] transition-all ease-in-out'>
                                <div>
                                    <h3 className='font-rubik font-semibold text-lg'>Sabari Relief Fund</h3>
                                    <p className='max-w-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus iure voluptatibus facere!</p>
                                    <button className='p-2 bg-gradient-to-l from-purple-600 to-pink-800 rounded-lg m-2 drop-shadow-lg hover:scale-105 transition-all ease-in-out hover:drop-shadow-2xl active:border-2 font-rubik flex gap-2'>More</button>
                                </div>
                                <div className="progressbar font-rubik font-semibold" style={{ width: 100, height: 100 }}>
                                    <CircularProgressbar value={percentage} text={percentage === 100 ? "Complete" : percentage + "% raised"} styles={buildStyles({
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
                        </div>
                    </div>

                    <div className="donations p-3 border-4 border-gray-700 rounded-xl">
                        <div className="title font-bold text-3xl font-rubik drop-shadow-2xl text-gray-900 ">Donations</div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default User