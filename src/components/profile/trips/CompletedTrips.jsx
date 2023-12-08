import React, { useEffect, useState } from 'react'
import instance from '../../../app/api'
import Trip from '../trips/Trips'
import { useNavigate } from 'react-router-dom'

const CompletedTrips = () => {
    const nav = useNavigate()
    const [trips, setTrips] = useState([])
    const [currentTripId,setCurrentTripId] = useState('')
    const [currentTripName,setCurrentTripName] = useState('')
    const [showCommentModal,setShowCommentModal] = useState(false)

    const getUpcomingTrips = () =>{
        let url = '/trips?type=completed'
        instance.get(url)
        .then(response=>response.data)
        .then(data => {
            console.log(data)
            setTrips(data)
        })
    }

    useEffect(()=>{
        getUpcomingTrips()
    },[])

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
            trips.length > 1 ?
            <div className='mt-0'>
            </div>
            : ''
        }


    </div>
  )
}

export default CompletedTrips