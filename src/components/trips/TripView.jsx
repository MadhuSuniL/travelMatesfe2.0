import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { FaLink, FaFolderOpen, FaHourglass, FaMapMarker, FaMars, FaEnvelope} from 'react-icons/fa';
import ft from '../../assests/ft.png'
import instance from '../../app/api'
import BackButton from '../global/BackButton'
import { useNavigate } from 'react-router-dom'
import UserComment from '../home/CommentComp'
import { MdSend } from 'react-icons/md'; 



const TripView = () => {

    const {trip_id} = useParams()
    const nav = useNavigate()

    const [tripId, setTripId] = useState('')
    const [title, setTitle] = useState('')
    const [travelerId, setTravelerId] = useState('')
    const [travlerName, setTravlerName] = useState('')
    const [travelerProfile, setTravelerProfile] = useState('')
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

    const travel_mate_id = JSON.parse(localStorage.getItem('travel_mate')).travel_mate_id



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
    setDistance(tripData.distance)
    setStrength(tripData.strength)
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

const addFullUrlToImg = (url) => {
  const baseUrl = process.env.REACT_APP_API_URL || "";
  if (!url.includes("https://")) {
    return baseUrl + url
  }
  return url
};

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
                  <div className='flex cursor-pointer justify-between items-center'>
                  <div className=''>
                      <h1 title='open' className='cursor-pointer m-3 text-xl text-left font-semibold'>{title}</h1> 
                      <h1 className='m-3 mt-0 mb-0 text-[12px]  font-semibold text-left text-yellow-400'>@{travlerName}</h1> 
                  </div>
                  <img onClick={()=> nav(`/profile/${travelerId}`)}  src={addFullUrlToImg(travelerProfile)} className='w-14 mx-2 rounded-full'/>
              </div>
        
              <h1 className='m-3 text-sm  font-semibold text-left flex items-center'><FaLink className='mr-2 text-sky-400' size={12}/> {connectedCount}/{strength}</h1>
              <h1 className='m-3 text-sm  font-semibold text-left flex items-center'><FaFolderOpen className='mr-2 text-sky-400' size={12}/>{category}</h1>
              <h1 className='m-3 text-sm  font-semibold text-left flex items-center'><FaHourglass className='mr-2 text-sky-400' size={12}/>{date}</h1>
              <h1 className='m-3 text-sm  font-semibold text-left flex items-center'><FaMapMarker className='mr-2 text-sky-400' size={12}/>{distance} KM</h1>
              <h1 className='m-3 text-sm  font-semibold text-left flex items-center'><FaMars className='mr-2 text-sky-400' size={12}/>{'Only Male'}</h1>

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
              {
                travel_mate_id !== travelerId 
                ?
                <button className={isRequested ? 'bg-green-400 p-2 rounded-md w-full text-white text-sm font-bold' : 'bg-sky-400 p-2 rounded-md w-full text-white text-sm font-semibold'} onClick={()=>{
                    // !isRequested ? setRequestsCount(requestsCount+1) : setRequestsCount(requestsCount-1)
                    setIsRequested(!isRequested)
                    tripRequest()
                }}>
                  {isRequested ? `Requested` : `Request trip`}
                  </button>
                :
                <button onClick={()=> nav('/interactions', { state: "requests"})} className='bg-sky-400 p-2 rounded-md w-full text-white text-sm font-semibold'> Show Requets</button>
              }

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