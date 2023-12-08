import React, { useEffect, useState } from 'react'

const Toast = (props) => {
    var style= 'animate-pulse fixed top-0 mt-4 left-[50%] translate-x-[-50%] bg-sky-400 font-bold rounded-lg p-2 text-white'
    var style2= 'fixed top-0 mt-4 left-[50%] translate-x-[-50%] bg-red-400 font-bold rounded-lg p-2 text-white'
    
    const [value,setValue] = useState(0)
    //translate-y-[-150%]

    useEffect(()=>{

    },[value])


    return (
    <div className={style}>Toast</div>
  )
}

export default Toast