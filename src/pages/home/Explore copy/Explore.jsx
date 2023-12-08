import React from 'react'
import TripCard from './Components/TripCard'
import Header from '../Header'
import ContryCard from './Components/ContryCard'
const Explore = () => {
  return (
    <div>
        <Header/>
        <div className='max-w-[1150px] p-2 mx-auto border-0 border-sky-400'>
        <h1 className='text-center m-4 mt-2 text-2xl text-sky-400 font-semibold'>Our Collection Places</h1>
        {/* cRDS */}
        <div className='grid md:grid-cols-4 tra h-[550px] md:h-[520px] overflow-y-scroll'>
        <ContryCard contry={'world'}/>
        <ContryCard contry={'australia'}/>
        <ContryCard contry={'canada'}/>
        <ContryCard contry={'china'}/>
        <ContryCard contry={'egypt'}/>
        <ContryCard contry={'france'}/>
        <ContryCard contry={'germany'}/>
        <ContryCard contry={'hawaii'}/>
        <ContryCard contry={'iceland'}/>
        <ContryCard contry={'india'}/>
        <ContryCard contry={'indonesia'}/>
        <ContryCard contry={'italy'}/>
        <ContryCard contry={'japan'}/>
        <ContryCard contry={'mexico'}/>
        <ContryCard contry={'russia'}/>
        <ContryCard contry={'singapore'}/>
        <ContryCard contry={'spain'}/>
        <ContryCard contry={'switzerland'}/>
        <ContryCard contry={'thailand'}/>
        <ContryCard contry={'turkey'}/>
        <ContryCard contry={'usa'}/>
        </div>

        </div>
    </div>
  )
}

export default Explore