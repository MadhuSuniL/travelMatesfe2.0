import React, { useEffect, useState } from 'react'
import CategoryCard from '../../components/explore/CategoryCard'
import instance from '../../app/api'
import Loading from '../../components/global/Loading'
import {toast} from 'react-toastify'

const Explore = () => {

    const [categories,setCategories] = useState([])
    const [isLoading,setIsLoading] = useState(false)
    const updateMinutes = 0.15
    const [first, setFirst] = useState(true)

    const getCountries = () =>{
      if (first){
        setIsLoading(true)
        setFirst(false)
      }
      let url = 'explore/categories'
      instance.get(url)
      .then(response => response.data)
      .then(data => {
        setCategories(data)
        setIsLoading(false)
      })
      .catch(error => {
        try {
            toast.warning(error.response.data.detial)
            setIsLoading(false)
        } catch (error) {
            toast.error('Internal error: ')                
            setIsLoading(false)
        }
    })    
    }

    useEffect(()=>{
      getCountries()
    },[])

    useEffect(()=>{
      setTimeout(()=> getCountries(),updateMinutes*60*1000)
    },[categories])

  return (
    <div>
        {isLoading && <Loading/>}
        <div className='max-w-[1150px] p-2 mx-auto border-0 border-sky-400'>
        <h1 className='text-center m-4 mt-2 text-2xl text-sky-400 font-semibold'>Our Collection Places</h1>
        <div className='grid md:grid-cols-4 tra'>
          {
            categories.map(category => 
              <CategoryCard key={category.category} label={category.label} category={category.category} cover={category.cover} />
            )
          }
        </div>
        </div>
    </div>
  )
}

export default Explore