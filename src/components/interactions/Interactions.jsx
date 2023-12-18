import React, { useEffect, useState } from 'react';
import instance from '../../app/api';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/global/Loading'
import {toast} from 'react-toastify'

const Interactions = () => {
  const nav = useNavigate()
  const [isLoading,setIsLoading] = useState(false)
  const [interactions, setInteractions] = useState([])

  const getInteractions = () =>{
    setIsLoading(true)
    let url = '/interactions/interactions'
    instance.get(url)
    .then(response => response.data)
    .then(data => {
      setInteractions(data)
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

  const addFullUrlToImg = (url) => {
    const baseUrl = process.env.REACT_APP_API_URL || "";
    url = "/media/profiles/cropped-image_nWk3bsA.png";
    if (!url.includes("https://")) {
      return baseUrl + url
    }
    return url
  };

  useEffect(()=>{
    getInteractions()
  },[])


  return (
    <div>
        {isLoading && <Loading/>}
      <h1 className="text-xl text-gray-600 font-semibold m-2 mb-0 text-center">Interactions ({interactions.length})</h1>
      <div className="">
        {interactions.map((interaction) => (
          <div key={interaction.id} onClick={()=> nav(interaction.link)} className="bg-white rounded-lg cursor-pointer hover:bg-sky-100 shadow-xl mt-2 p-1 px-2 w-100">
            <div className='flex items-center p-1'>
              <img
                src={addFullUrlToImg(interaction.interacter_travel_mate_profile)}
                alt="Travel Mate Profile"
                className="w-10 h-10 rounded-full cursor-pointer shadow-lg"
                onClick={() => nav(`/profile/${interaction.interacter_travel_mate}`)}
              />
              <p className="text-gray-700 text-sm p-2">{interaction.info}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Interactions;
