import React, { useEffect, useState } from 'react';
import instance from '../../app/api'
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/global/Loading'

const Requests = () => {
  const nav = useNavigate()
  const [isLoading,setIsLoading] = useState(false)
  const [requests, setRequests] = useState([]);


  const getRequests = ()=>{
    setIsLoading(true)
    let url = '/interactions/trips/requests/get-requests/all'
    instance.get(url)
    .then(response => response.data)
    .then(data =>{
      setRequests(data)
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

  const handleAccept = (requestId) => {
    let url = `interactions/trips/requests/accept/${requestId}`
    instance.get(url)
    .then(response => response.data)
    .then(data =>{
      toast.info('Request accepted!',{autoClose:1500})
      getRequests()
    })
  };

  const handleCancel = (requestId) => {
    let url = `interactions/trips/requests/delete-request/${requestId}`
    instance.delete(url)
    .then(response => response.data)
    .then(data =>{
      toast.warning('Request canceled!',{autoClose:1500})
      getRequests()
    })
  };

  const addFullUrlToImg = (url) => {
    const baseUrl = process.env.REACT_APP_API_URL || "";
    if (!url.includes("https://")) {
      return baseUrl + url
    }
    return url
  };
  

  useEffect(() => {
    getRequests()
  },[])

  return (
    <div>
        {isLoading && <Loading/>}
      <h1 className="text-xl text-gray-600 font-semibold m-2 mb-0 text-center">Requests ({requests.length})</h1>
      <div className="space-y-4">
        {requests.map((request) => (
          <div key={request.request_id} className="bg-gray-100 p-4 rounded-md flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src={addFullUrlToImg(request.travel_mate_profile)}
                alt={`${request.travel_mate_name}'s Profile`}
                className="w-10 h-10 rounded-full object-cover cursor-pointer shadow-lg"
                onClick={() => nav(`/profile/${request.travel_mate}`)}
              />
              <div>
                <p className="text-lg font-semibold">{request.travel_mate_name}</p>
                <p className="text-sm text-gray-500">{request.trip_name}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleAccept(request.request_id)}
                className="bg-sky-400 border-sky-400 border-[1px] hover:scale-105 duration-150 text-white px-4 py-1 rounded-md"
              >
                Accept
              </button>
              <button
                onClick={() => handleCancel(request.request_id)}
                className="bg-white border-black border-[1px] hover:scale-105 duration-150 text-black px-4 py-1 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Requests;
