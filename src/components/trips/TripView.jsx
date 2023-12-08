import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import connect from '../../assests/link.png'
import dis from '../../assests/distance.png'
import timer from '../../assests/timer.png'
import usb from '../../assests/usb.png'
import user from '../../assests/user.png'
import ft from '../../assests/ft.png'
import Like from './Like'
import instance from '../../app/api'
import Header from '../../Header'
import BackButton from '../global/BackButton'
import { useNavigate } from 'react-router-dom'
import UserComment from '../home/CommentComp'
import {toast} from 'react-toastify'
import { MdSend } from 'react-icons/md'; // Import the send icon from react-icons



const TripView = () => {

    const {trip_id} = useParams()
    const nav = useNavigate()

    const [tripId, setTripId] = useState('')
    const [title, setTitle] = useState('')
    const [travlerName, setTravlerName] = useState('')
    const [from, setFrom] = useState('')
    const [to, setTo] = useState('')
    const [date, setDate] = useState('')
    const [category, setCategory] = useState('')
    const [distance, setDistance] = useState(0)
    const [description, setDescription] = useState('')
    const [likeCount, setLikeCount] = useState(0)
    const [comment, setComment] = useState('')
    const [comments, setComments] = useState([])
    const [commentsCount, setCommentsCount] = useState(0)
    const [requestsCount, setRequestsCount] = useState(0)
    const [strength, setStrength] = useState(0)
    const [isLiked, setIsLiked] = useState(false)
    const [isRequested, setIsRequested] = useState(false)
    const [requestedCount, setRequestedCount] = useState(0)
    const [isFollowing, setIsFollowing] = useState(false)
    const [connectedCount, setConnectedCount] = useState(0)


  const updateSates = (tripData) =>{
    setTripId(tripData.trip_id)
    setTitle(tripData.title)
    setTravlerName(tripData.travel_mate_name)
    setFrom(tripData.departure)
    setTo(tripData.destination)
    setDate(tripData.date)
    setCategory(tripData.category)
    setDistance(tripData.distance)
    setDescription(tripData.description)
    setLikeCount(tripData.likes.length)
    setIsLiked(tripData.is_liked)
    setComments(tripData.comments)
    setRequestsCount(tripData.requests.length)
    setIsRequested(tripData.is_requested)
    setIsFollowing(tripData.is_following)
    setConnectedCount(tripData.connected_travel_mates.length)
}


const refreshTripData = () => {
  let url = `trips/${trip_id}`
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

const addComment = () =>{
  let url = 'interactions/trips/comments/comment'
  let body = {
      trip : tripId,
      comment
  }
  instance.post(url, body)
  .then(response => response.data)
  .then(data => {
      refreshTripData()
      toast.info('Comment added successfully')
      setComment('')
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

useEffect(()=>{
    refreshTripData()
},[])




  return (
    <div className=''>
        <div className='max-w-[830px] mx-auto border-0 border-black 0shadow-sm m-1 p-1 md:p-3 ease-in-out duration-700 shadow-gray-500 rounded-md'>
            <div className='grid md:grid-cols-2 gap-2'>
            <div>
              <div onClick={()=> nav('/trips')} className='pl-3'>
              <BackButton/>
              </div>
              <div className='flex justify-between'>
                  <div>
                      <h1 className='m-3 text-xl md:text-3xl text-left text-sky-400 font-semibold'>{title}</h1> 
                  </div>
                  <img src={''} className='w-10 rounded-full m-3 mb-0'/>
              </div>
              <h1 className='m-3 mt-0 text-md  font-semibold text-left  flex'><span><img src={user} className='mr-1 mt-[13%] w-4'/></span>{travlerName}</h1> 
              <h1 className='m-3 text-sm  font-semibold text-left flex '><span><img src={connect} className='mr-1 mt-[13%] w-4'/></span>{connectedCount}/{strength}</h1>
              <h1 className='m-3 text-sm  font-semibold text-left flex '><span><img src={usb} className='mr-1 mt-[13%] w-4'/></span> {category}</h1>
              <h1 className='m-3 text-sm  font-semibold text-left flex '><span><img src={dis} className='mr-1 mt-[13%] w-4'/></span> {distance}</h1>
              <h1 className='m-3 text-sm  font-semibold text-left flex '><span><img src={timer} className='mr-1 mt-[13%] w-4'/></span> {'10 days to go'}</h1>
              <h1 className='m-3 text-md mt-5 text-gray-500 font-bold'>Description</h1>
              <p className='m-3 text-md text-gray-500'>
              {description}
              </p>
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
              <button className={isRequested ? 'bg-green-400 p-2 rounded-md w-full text-white text-sm font-bold' : 'bg-sky-400 p-2 rounded-md w-full text-white text-sm font-semibold'} onClick={()=>{
                  // !isRequested ? setRequestsCount(requestsCount+1) : setRequestsCount(requestsCount-1)
                  setIsRequested(!isRequested)
                  tripRequest()
              }} >{isRequested ? `Requested` : `Request trip`}</button>

            </div>
              {/* {Comments } */}
            <div>
              <h1 className='text-sm m-1 mt-2'>Comments ({comments?.length})</h1>
              <div className="mt-4 flex items-center">
                  <input
                      type="text"
                      value={comment}
                      onChange={(e)=> setComment(e.target.value)}
                      placeholder="Add a comment..."
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  />
                  <button
                      className={comment ? "bg-blue-500 text-white rounded-full p-2 ml-2" : "bg-blue-500 text-white rounded-full p-2 ml-2 opacity-50"}
                      onClick={addComment}
                      disabled = {!comment}
                  >
                      <MdSend size={22} />
                  </button>
              </div>
              <div className='container tra mt-2 max-h-[400px] overflow-y-auto'>
                  {
                      comments?.map(commentItem => <UserComment
                          key={commentItem.comment_id}
                          travel_mate_profile = {commentItem.travel_mate_name}
                          travel_mate_name = {commentItem.travel_mate_name}
                          time = {commentItem.create_at}
                          comment = {commentItem.comment}
                      />)
                  }    

              </div>

                <div className='mt-20'>

                </div>
            </div>
            </div>

        </div>
    </div>
    )
}

export default TripView