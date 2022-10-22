import React from 'react'

function Home() {
    return (
        <div className='bg-p1 h-screen flex justify-center items-center'>
            <div className='flex flex-col item-center justify-center gap-36'>
                <div className='logo'>Logo Goes Here!</div>
                <div className='button'>
                    <button className='p-3 rounded-lg bg-p2 border-2 border-p3 hover:scale-105 transition-all ease-in-out'>Connect to Wallet</button>
                </div>
            </div>
        </div>
    )
}

export default Home