import React from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa';


const Like = ({
    onClick,
    count,
    status,
}) => {
  return (
    <div className='flex flex-col items-center justify-center'>
      {status ? <FaHeart onClick={onClick} size={20} className="text-sky-400 cursor-pointer" /> : <FaRegHeart onClick={onClick} size={20} className="text-sky-400 active:animate-ping cursor-pointer ease-in-out duration-700" />}
        <h1 className='text-gray-400 text-sm'>{`Likes (${count})`}</h1>
    </div>
  )
}

export default Like