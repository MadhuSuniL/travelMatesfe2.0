import React from 'react'
import TripCreationForm from '../../components/trips/TripCreateForm'
import logo from '../../assests/plane.png'

const TripCreation = () => {
  return (
    <div className='p-1 max-w-[600px] mx-auto '>
      {/* <div className='flex justify-center text-xl md:text-2xl cursor-pointer text-sky-400 font font-semibold m-5 mb-2 mt-3 text-center md:mb-5'>
          <span> <img src={logo} className='w-4 md:w-5 mt-1  md:mt-2 mx-2'/></span><h1 onClick={()=>window.location.href = '/'} className='mr-20'>TravelMates<span className='text-yellow-400'>.com</span></h1>
      </div> */}
        <TripCreationForm/>
    </div>
  )
}

export default TripCreation