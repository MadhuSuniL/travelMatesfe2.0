import React from 'react'

const Loading = () => {
  return (
    <div className='fixed bg-white bg-opacity-60 left-[0%] top-[0%] w-full h-full '>
    <div className='flex justify-around bg-transparent m-2 text-black font-bold p-2 px-3 shadow-0 text-2xl shadow-black rounded-lg'>
        <div className='animate-pulse flex justify-around fixed top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]'>
        <div className='bg-sky-400 w-3 h-3 rounded-full mx-1 animate-bounce '></div>        
        <div className='bg-yellow-400 w-3 h-3 rounded-full mx-1 animate-bounce '></div>        
        <div className='bg-sky-400 w-3 h-3 rounded-full mx-1 animate-bounce '></div>        
            </div>        
    </div>
    </div>
  )
}

export default Loading