import React from 'react'
import {  FaUserPlus} from 'react-icons/fa';


const Follow = ({
    onClick,
    count,
    status,
}) => {
  return (
    <div className='flex flex-col items-center justify-center'>
      {status ? <FaUserPlus onClick={onClick} size={20} className="text-sky-400 cursor-pointer" /> : <FaUserPlus onClick={onClick} size={20} className="text-sky-400" />}
        <h1 className='text-gray-400 text-sm'>{'Follow'}</h1>
    </div>
  )
}

export default Follow