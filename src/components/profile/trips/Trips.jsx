import React, { useEffect, useState } from 'react'
import { FaLink, FaFolderOpen, FaHourglass, FaPaperPlane} from 'react-icons/fa';
import ft from '../../../assests/ft.png'
import Like from '../../trips/Like'
import Comment from '../../trips/Comment'
import Request from '../../trips/Request'
import instance from '../../../app/api'

const Trip = ({
  setShowCommentModal,
  setCurrentTripId,
  setCurrentTripName,
  tripData,
  onClick
}) => {

      const [tripId, setTripId] = useState('')
      const [title, setTitle] = useState('')
      const [travlerName, setTravlerName] = useState('')
      const [from, setFrom] = useState('')
      const [to, setTo] = useState('')
      const [date, setDate] = useState('')
      const [category, setCategory] = useState('')
      const [likeCount, setLikeCount] = useState()
      const [commentsCount, setCommentsCount] = useState()
      const [requestsCount, setRequestsCount] = useState()
      const [strength, setStrength] = useState(0)
      const [isLiked, setIsLiked] = useState(false)
      const [connectedCount, setConnectedCount] = useState(0)


    const updateSates = (tripData) =>{
      setTripId(tripData.trip_id)
      setTitle(tripData.title)
      setTravlerName(tripData.travel_mate_name)
      setFrom(tripData.departure)
      setTo(tripData.destination)
      setDate(tripData.trip_date)
      setCategory(tripData.category)
      setLikeCount(tripData.likes.length)
      setIsLiked(tripData.is_liked)
      setStrength(tripData.strength)
      setCommentsCount(tripData.comments.length)
      setRequestsCount(tripData.requests.length)
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


  useEffect(()=>{
      updateSates(tripData)
  },[tripData])

  return (
    <div className='shadow-sm m-1 p-1 md:p-3 ease-in-out duration-700 shadow-gray-500 rounded-md'>
        <div className='flex justify-between'>
            <div>
       <h1 onClick={onClick} title='open' className='cursor-pointer hover:scale-105 hover:text-yellow-400 m-3 text-lg text-left text-sky-400 font-semibold'>{title}</h1> 
            </div>
            <img src={''} className='w-10 rounded-full m-3 mb-0'/>
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
        <div className='p-2 flex justify-around items-center'>
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
          <div className='flex flex-col items-center justify-center'>
              <FaPaperPlane size={20} className="text-sky-400 cursor-pointer"/>
              <h1 className={'text-gray-400 text-sm'}>Requests ({requestsCount})</h1>
          </div>
          {/* <Request status={'self'} count={requestsCount} /> */}
        </div>

    </div>
  )
}

export default Trip