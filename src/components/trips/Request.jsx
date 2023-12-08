import React from 'react'
import { FaPaperPlane, FaRegPaperPlane } from 'react-icons/fa';


const Request = ({
    onClick,
    count,
    status
}) => {
  return (
    <div className='flex flex-col items-center justify-center'>
      {
        status == 'self' ?
        <>
          <FaPaperPlane onClick={status ? ()=> '' : onClick} size={status ? 20 : 30} className={status ? "text-green-400 cursor-pointer" : "text-yellow-400 cursor-pointer"}/>
          <h1 className={'text-green-400 text-sm font-bold'}>Requested({count})</h1>
        </>
          :
        <>
          <FaPaperPlane onClick={status ? ()=> '' : onClick} size={status ? 20 : 30} className={status ? "text-green-400 cursor-pointer" : "text-yellow-400 cursor-pointer"}/>
          <h1 className={status ? 'text-green-400 text-sm font-bold' : 'text-gray-400 text-sm font-semibold'}>{status ? `Requested (${count})` : `Request trip(${count})`}</h1>
        </>
      }
    </div>
  )
}

export default Request