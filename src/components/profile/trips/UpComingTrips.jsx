import React, { useEffect, useState } from 'react'
import instance from '../../../app/api'
import Trip from '../trips/Trips'
import { useNavigate } from 'react-router-dom'

const UpComingTrips = ({
    travelMateId
}) => {
    const nav = useNavigate()
    const [trips, setTrips] = useState([])
    const [currentTripId,setCurrentTripId] = useState('')
    const [currentTripName,setCurrentTripName] = useState('')
    const [showCommentModal,setShowCommentModal] = useState(false)

    const getUpcomingTrips = () =>{
        let url = `/trips?travel_mate_id=${travelMateId}&type=upcoming`
        instance.get(url)
        .then(response=>response.data)
        .then(data => {
            setTrips(data)
        })
    }
    useEffect(()=>{
        getUpcomingTrips()
    },[travelMateId])

  return (
    <div>

        {
            trips.map(trip => <Trip
                onClick = {()=>nav(`/trip/${trip.trip_id}`)}
                key={trip.trip_id}
                setShowCommentModal = {setShowCommentModal} 
                setCurrentTripId = {setCurrentTripId}
                setCurrentTripName = {setCurrentTripName}
                tripData = {trip}                
            />)
        }
        {
            trips.length === 0 ?
            <div className='mt-10 animate-pulse text-center text-lg text-gray-500'>
                <h2>No Upcoming Trips</h2>
            </div>
            : ''
        }
    </div>
  )
}

export default UpComingTrips