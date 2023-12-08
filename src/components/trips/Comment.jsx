import React from 'react'
import { FaComment, FaRegComment } from 'react-icons/fa';


const Comment = ({
    onClick,
    count,
}) => {
  return (
    <div className='flex flex-col items-center justify-center'>
      <FaRegComment onClick={onClick} size={20} className="text-sky-400 cursor-pointer" />
        <h1 className='text-gray-400 text-sm'>Comment ({count})</h1>
    </div>
  )
}

export default Comment