import React, { useEffect, useState } from 'react'
import ft from '../../assests/ft.png'
import Like from '../trips/Like'
import { FaLink, FaFolderOpen, FaHourglass} from 'react-icons/fa';
import Comment from '../trips/Comment'
import Request from '../trips/Request'
import instance from '../../app/api'
import { useNavigate } from 'react-router-dom'

const Trip = ({
  setShowCommentModal,
  setCurrentTripId,
  setCurrentTripName,
  tripData,
  onClick
}) => {

      const nav = useNavigate()
      const [tripId, setTripId] = useState('')
      const [travelerId, setTravelerId] = useState('')
      const [travelerProfile, setTravelerProfile] = useState('')
      const [title, setTitle] = useState('')
      const [travlerName, setTravlerName] = useState('')
      const [from, setFrom] = useState('')
      const [to, setTo] = useState('')
      const [date, setDate] = useState('')
      const [category, setCategory] = useState('')
      const [likeCount, setLikeCount] = useState(1000)
      const [commentsCount, setCommentsCount] = useState(1000)
      const [requestsCount, setRequestsCount] = useState(1000)
      const [strength, setStrength] = useState(0)
      const [isLiked, setIsLiked] = useState(false)
      const [isRequested, setIsRequested] = useState(false)
      const [isFollowing, setIsFollowing] = useState(false)
      const [connectedCount, setConnectedCount] = useState(0)


    const updateSates = (tripData) =>{
      setTripId(tripData.trip_id)
      setTitle(tripData.title)
      setTravelerId(tripData.travel_mate)
      setTravlerName(tripData.travel_mate_name)
      setTravelerProfile(tripData.travel_mate_profile)
      setFrom(tripData.departure)
      setTo(tripData.destination)
      setDate(tripData.trip_date)
      setCategory(tripData.category)
      setStrength(tripData.strength)
      setLikeCount(tripData.likes.length)
      setIsLiked(tripData.is_liked)
      setCommentsCount(tripData.comments.length)
      setRequestsCount(tripData.requests.length)
      setIsRequested(tripData.is_requested)
      setIsFollowing(tripData.is_following)
      setConnectedCount(tripData.connected_travel_mates.length)
  }


  const refreshTripData = () => {
    let url = `trips/${tripId}`
    instance.get(url)
    .then(response => response.data)
    .then(data => {
      updateSates(data)
    })  
  }

  const LikeAndDisLike = () =>{
      let url = '/interactions/trips/likes/like'
      let body = {
        'trip': tripId
      }
      instance.post(url, body)
      .then(response => response.data)
      .then(data => {
        refreshTripData()
      })
  }

  const tripRequest = () =>{
    let url = 'interactions/trips/requests/request'
    let body = {
      'trip': tripId
    }
    instance.post(url, body)
    .then(response => response.data)
    .then(data => {
      refreshTripData()
    })
  }

  const addFullUrlToImg = (url) => {
    const baseUrl = process.env.REACT_APP_API_URL || "";
    if (!url.includes("https://")) {
      return baseUrl + url
    }
    return url
  };

  useEffect(()=>{
      updateSates(tripData)
  },[tripData])


  return (
    <div className='shadow-sm m-1 p-1 md:p-3 ease-in-out duration-700 shadow-gray-500 rounded-md'>
        <div className='flex cursor-pointer justify-between items-center'>
          <div className=''>
              <h1 onClick={onClick} title='open' className='cursor-pointer hover:text-sky-400 hover:scale-105 m-3 text-xl text-left font-semibold'>{title}</h1> 
              <h1 className='m-3 mt-0 mb-0 text-[12px]  font-semibold text-left text-yellow-400 flex'>@{travlerName}</h1> 
          </div>
          <img onClick={()=> nav(`/profile/${travelerId}`)}  src={addFullUrlToImg(travelerProfile)} className='w-14 mx-2 rounded-full'/>
        </div>

        <h1 className='m-3 text-sm  font-semibold text-left flex items-center'><FaLink className='mr-2 text-sky-400' size={12}/> {connectedCount}/{strength}</h1>
        <h1 className='m-3 text-sm  font-semibold text-left flex items-center'><FaFolderOpen className='mr-2 text-sky-400' size={12}/>{category}</h1>
        <h1 className='m-3 text-sm  font-semibold text-left flex items-center'><FaHourglass className='mr-2 text-sky-400' size={12}/>{date}</h1>
        {/* <br/> */}
        <div className='flex justify-around  mt-5'>
            <center>
            <h1 className='text-gray-500 font-bold'>From</h1>
            <h1 className='text-yellow-400 font-bold'>{from}</h1>
            </center>
            <img src={ft} className='w-12'/>
            <center>
            <h1 className='text-gray-500 font-bold'>To</h1>
            <h1 className='text-sky-400 font-bold'>{to}</h1>
            </center>

        </div>
        <br/>
               {/* {interations} */}
        <div className='p-2 px-5 flex justify-around items-center'>
          <Like onClick={()=>{
            !isLiked ? setLikeCount(likeCount+1) : setLikeCount(likeCount-1)
            setIsLiked(!isLiked)
            LikeAndDisLike()
          }} status={isLiked} count={likeCount} />
          <Comment onClick={()=>{
            setCurrentTripId(tripId)
            setCurrentTripName(title)
            setShowCommentModal(true)
          }} status={false} count={commentsCount} />
          {/* <Follow onClick={()=>{''}} status={isFollowing} count={commentsCount} /> */}
          <Request onClick={()=>{
            !isRequested ? setRequestsCount(requestsCount+1) : setRequestsCount(requestsCount-1)
            setIsRequested(!isRequested)
            tripRequest()
          }} status={isRequested} count={requestsCount} />
        </div>

    

    </div>
  )
}

export default Trip