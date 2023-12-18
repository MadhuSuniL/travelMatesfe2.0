import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Loading from '../global/Loading'


const CategoryCard = ({
    label,
    category,
    cover
}) => {

    const nav = useNavigate()
    const [data, setData] = useState({})
    const [id, setId] = useState(9)
    const [loading,setLoading] = useState(false)

    const getCountryTrips = () =>{
        
    }

    useEffect(() => {
        getCountryTrips()
    }, [])

    return (
        <div onClick={()=>nav('/explore/'+category)} className='m-2 hover:scale-105 duration-200 cursor-pointer rounded-md shadow-sm p-2 pb-1 shadow-black'>
            <img className='rounded-md shadow-sm shadow-black' src={cover} />
            <h1 className='text-xl text-center  m-1 text-sky-400 font-bold'>{label}</h1>
        {loading && <Loading/>}
        </div>
    )
}

export default CategoryCard
