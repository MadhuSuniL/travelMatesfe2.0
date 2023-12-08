import React, {useState, useEffect} from 'react'
import TripCard from '../../components/explore/TripCard'
import Header from '../../Header'
import { useParams } from 'react-router-dom'
import Loading from '../../components/global/Loading'
import instance from '../../app/api'


const ExploreD = () => {
    
    const {category} = useParams()
    const [places,setPlaces] = useState([])    
    const [loading,setLoading] = useState(false)

    const getPlaces = () => {
      let url = `explore/sample_trips/${category}`
      instance.get(url)
      .then(response => response.data)
      .then(data => {
        setPlaces(data)
      })
    }
    
    useEffect(() => {
        getPlaces()
    }, [])


  function titleCase(str) {
    let words = str.toLowerCase().split(" ");
    for (let i = 0; i < words.length; i++) {
      words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }
    return words.join(" ");
  }
  const res = places.map((place,index) => {
          return <TripCard index = {index+1} key={place.id} title={place.title} img={place.image_url} content={place.content}/> 
        })
    
    return (
        <div>
        <div className='max-w-[800px] p-2 mx-auto border-0 border-sky-400'>
        <h1 className='text-center m-4 mt-2  bg-sky-400 rounded-md text-white  text-2xl  font-semibold p-1'>{places.length} Best Places to Visit in <span className='text-yellow-200'>{titleCase(category)} </span></h1>
        <div className=''>
        {res}
        </div>
        </div>
        {loading && <Loading/>}
    </div>
  )
}
export default ExploreD