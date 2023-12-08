import React, {useState, useEffect, useContext} from 'react'
import TripCard from './Components/TripCard'
import Header from '../Header'
import { AuthContext } from '../contexts/AuthContext'
import { useParams } from 'react-router-dom'
import Loading from '../Loading'

const ExploreD = () => {
    
    const {authState} = useContext(AuthContext)
    const {contry} = useParams()
    const [data,setData] = useState([])    
    const [loading,setLoading] = useState(false)

    async function Api () {
      setLoading(true)
      const response = await fetch(`${authState.domain}explore/trips/${contry}`,{
          headers:{
              'Content-Type' : 'application/json',
              'Accept' : 'application/json',
              'Authorization':'Bearer '+authState.access
          },
          method:'GET'
      })
      const d = await response.json()
      setData(d)
      setLoading(false)

    }

  useEffect(() => {
      Api()
  }, [])


  function titleCase(str) {
    let words = str.toLowerCase().split(" ");
    for (let i = 0; i < words.length; i++) {
      words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }
    return words.join(" ");
  }
  const res = data.map((place) => {
          return <TripCard key={place.id} title={place.title} img={place.image} content={place.content}/> 
        })


    
    return (
        <div>
        <Header/>
        <div className='max-w-[800px] p-2 mx-auto border-0 border-sky-400'>
        <h1 className='text-center m-4 mt-2  bg-sky-400 rounded-md text-white  text-2xl  font-semibold p-1'>{data.length} Best Places to Visit in <span className='text-yellow-200'>{titleCase(contry)} </span></h1>
        {/* cRDS */}
        <div className='tra h-[500px] overflow-y-scroll'>
        {res}
        </div>

        </div>
        {loading && <Loading/>}
    </div>
  )
}
export default ExploreD