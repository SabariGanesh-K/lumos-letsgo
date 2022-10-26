import React, { useContext, useState } from 'react'
import Navbar from './components/Navbar'
import { AppConfig } from './context/AppConfig';

function MakeRaise() {
    const { makeRaise } = useContext(AppConfig);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [funds, setFunds] = useState();
    return (
        <div className='maindash bg-gradient-to-b from-red-600 to-pink-600 m-0'>
            <Navbar />
            <main>
                <div className='header font-extrabold text-5xl font-rubik drop-shadow-2xl text-gray-900 mx-10 my-12'>Start a Raise!</div>

                <div className="raiseinfo flex flex-col gap-10 mx-16 pb-10">
                    <div className="title flex flex-col gap-4 justify-center">
                        <div className='font-bold text-2xl font-rubik drop-shadow-2xl text-slate-900'>What are you raising funds for?</div>
                        <input value={title} onChange={e => setTitle(e.target.value)} type="text" className='p-3 rounded-lg focus-within:bg-purple-200 w-1/3 shadow-md shadow-purple-600 outline-none' />
                    </div>
                    <div className="description flex flex-col gap-4 justify-center">
                        <div className='font-bold text-2xl font-rubik drop-shadow-2xl text-slate-900'>Give a short description of the fundraise</div>
                        <input value={description} onChange={e => setDescription(e.target.value)} type="text" className='p-6 rounded-lg focus-within:bg-purple-200 w-1/3 shadow-md shadow-purple-600 outline-none' />
                    </div>
                    <div className="amt flex flex-col gap-4 justify-center">
                        <div className='font-bold text-2xl font-rubik drop-shadow-2xl text-slate-900'>Target Fund</div>
                        <div className='flex items-center gap-3'>
                            <input value={funds} onChange={e => setFunds(e.target.value)} type="text" className='w-20 px-2 py-1 rounded-lg focus-within:bg-purple-200 shadow-md shadow-purple-600 outline-none' /> <p className='font-semibold font-rubik'>ETH</p>
                        </div>

                    </div>
                    <div className='conditons flex'>
                        <input type="checkbox" className='ml-0' />
                        <div>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore sapiente excepturi vitae?</div>
                    </div>
                    <button onClick={() => makeRaise(funds, title, description)} className='p-2 bg-gradient-to-l from-purple-600 to-pink-800 rounded-lg  drop-shadow-lg hover:scale-105 transition-all ease-in-out hover:drop-shadow-2xl active:border-2 font-rubik flex gap-2 w-fit'> <div>Publish Raise</div> </button>
                </div>
            </main>
        </div>

    )
}

export default MakeRaise