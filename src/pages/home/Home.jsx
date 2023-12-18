import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../Header'
import Trip from '../../components/home/Trip'
import explore from '../../assests/travel.png'
import Loading from '../../components/global/Loading'
import instance from '../../app/api'
import { toast } from 'react-toastify'
import CommentsModal from '../../components/home/CommentsModal'

const Home = () => {
    // states
    const nav = useNavigate()
    const [refreshTripData, setRefreshTripData] = useState(false)
    const [tripData,setTripData] = useState([])
    const [isLoading,setIsLoading] = useState(false)
    const [currentTripId,setCurrentTripId] = useState('')
    const [currentTripName,setCurrentTripName] = useState('')
    const [showCommentModal,setShowCommentModal] = useState(false)
    const [showFilterModal,setShowFilterModal] = useState(false)
    const [filtersBackendData,setFiltersBackendData] = useState({})
    const [queryString,setQueryString] = useState('')

    const [filtersData,setFiltersData] = useState({
        search:'',
        title:'',
        departure:'',
        destination:'',
        category:'',
        date:'',
        strength:'',
    })

    const getFilterQueryStrig = (f) =>{
        f.preventDefault()
        let tempQueryString = ''
        let flag = true
        for (let key in filtersData){
            let value = filtersData[key]
            if(value){
                if(flag){
                    tempQueryString += `?${key}=${value}`
                    flag = false
                }
                else{
                    tempQueryString += `&${key}=${value}`
                }
            }
        }
        setShowFilterModal(false)
        return setQueryString(tempQueryString);

    }

    const getFilterBackendData = () =>{
        setIsLoading(true)
        let url = 'trips/filter_data_keys'
        instance.get(url)
        .then(response => response.data)
        .then(data => {
            setFiltersBackendData(data)
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

    const getTripData = () => {
        setIsLoading(true)
        let url = `trips/${queryString}`
        instance.get(url)
        .then(response => response.data)
        .then(data => {
            setTripData(data)
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

    useEffect(() => {
        getTripData()
        getFilterBackendData()
    },[refreshTripData,queryString])
        

    return (
    <div className=''>
        {isLoading && <Loading/>}
        <div className='grid md:grid-cols-3 gap-2 max-w-[1030px] p-1 mx-auto border-0 border-black'>
        {/* filter */}
        <div className='hidden md:block p-0 m-3 mt-0'>
        <h1 className='text-center m-2 text-lg font-semibold'>Filters</h1>
        <form onSubmit={getFilterQueryStrig} className="">
            <div className='tra overflow-y-scroll h-[400px] px-2'>
                <div className="mb-6">
                    <label htmlFor="search" className="block text-sm font-medium text-gray-700 m-1">
                    Search
                    </label>
                    <input
                    type='search'
                    placeholder='Search Trips'
                    id="search"
                    onChange={(e)=> setFiltersData({...filtersData, search: e.target.value})}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-sky-400"
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="from" className="block text-sm font-medium text-gray-700 m-1">
                    Title
                    </label>
                    <select
                    id="from"
                    value={filtersData.title}
                    onChange={(e)=> setFiltersData({...filtersData, title: e.target.value})}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-sky-400"
                    >
                        <option value="">All</option>
                        {
                            filtersBackendData?.titles?.map(title => <option key={title} value={title}>{title}</option>)
                        }
                    </select>
                </div>
                <div className="mb-6">
                    <label htmlFor="from" className="block text-sm font-medium text-gray-700 m-1">
                    From
                    </label>
                    <select
                    id="from"
                    value={filtersData.departure}
                    onChange={(e)=> setFiltersData({...filtersData, departure: e.target.value})}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-sky-400"
                    >
                        <option value="">All</option>
                        {
                            filtersBackendData?.departures?.map(departure => <option key={departure} value={departure}>{departure}</option>)
                        }
                    </select>
                </div>
                <div className="mb-6">
                    <label htmlFor="to" className="block text-sm font-medium text-gray-700 m-1">
                    To
                    </label>
                    <select
                    id="to"
                    value={filtersData.destination}
                    onChange={(e)=> setFiltersData({...filtersData, destination: e.target.value})}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-sky-400"
                    >
                        <option value="">All</option>
                        {
                            filtersBackendData?.destinations?.map(destination => <option key={destination} value={destination}>{destination}</option>)
                        }                
                    </select>
                </div>
                <div className="mb-6">
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 m-1">
                    Category
                    </label>
                    <select
                    id="category"
                    value={filtersData.category}
                    onChange={(e)=> setFiltersData({...filtersData, category: e.target.value})}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-sky-400"
                    >
                        <option value="">All</option>
                        {
                            filtersBackendData?.categories?.map(categorie => <option key={categorie} value={categorie}>{categorie}</option>)
                        }     
                    </select>
                </div>
                <div className="mb-6">
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 m-1">
                    Date
                    </label>
                    <input
                    type="date"
                    id="date"
                    value={filtersData.date}
                    onChange={(e)=> setFiltersData({...filtersData, date: e.target.value})}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-sky-400"
                    />
                    <span className="text-gray-500"> and after</span>
                </div>
                <div className="mb-6">
                    <label htmlFor="strength" className="block text-sm font-medium text-gray-700 m-1">
                    Team Size
                    </label>
                    <select
                    id="strength"
                    value={filtersData.strength}
                    onChange={(e)=> setFiltersData({...filtersData, strength: e.target.value})}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-sky-400"
                    >
                        <option value="">All</option>
                        {
                            Array.from({ length: 15 }, (_, index) => index + 1).map(id => <option key={id} value={id+1}>{id+1} Members</option>)
                        }
                    </select>
                </div>
            </div>
            <div className="mt-6 flex justify-end">
                {/* <button
                type="button"
                onClick={() => setShowFilterModal(false)}
                className="px-4 py-2 ml-2 bg-gray-300 text-gray-700 font-bold rounded-md border border-gray-400 hover:bg-gray-400"
                >
                Cancel
                </button> */}
                <input
                type="submit"
                value="Filter"
                className="px-4 mr-2 py-2 bg-sky-400 text-white font-bold rounded-md border border-sky-400 hover:bg-sky-500"
                />
            </div>
        </form>
        </div>
        <div className='col-span-2 p-1 pb-0'>
            <div className='flex justify-around'>
                <h1 className='text-center mt-1 text-lg font-semibold'>{tripData.length} trips</h1>
                <h1 onClick={()=>setShowFilterModal(true)} className='md:hidden text-center m-2 mt-3 text-sm cursor-pointer text-sky-400 font-semibold'>Filters</h1>
            </div>
        <div className='tra flex flex-col 1overflow-y-scroll 1h-screen'>
        <div className='shadow-sm m-1 p-3 ease-in-out duration-700 shadow-gray-500 rounded-md'>
        <div className='flex items-center'>
        <img src={explore} className='w-20'/>
        <p className='p-1 text-center text-yellow-0 text-sm'>"Discover our collection of visited places across different countries! From stunning beaches to breathtaking mountains, we've got it all. Explore our curated list and get inspired for your next adventure."</p>
        </div>
        <button onClick={()=>nav('/explore')} className='border-2 p-3 m-1 float-right py-1 text-white font-semibold rounded-md bg-yellow-400 border-yellow-400 animate-pulse'>Explore</button>
        </div>
                                {/* {Trips} */}
        
        {
            tripData.map(trip => 
            trip.strength >= trip?.connected_travel_mates?.length ?
            <Trip
                onClick = {()=>nav(`/trip/${trip.trip_id}`)}
                key={trip.trip_id}
                setShowCommentModal = {setShowCommentModal} 
                setCurrentTripId = {setCurrentTripId}
                setCurrentTripName = {setCurrentTripName}
                tripData = {trip}                
                />
            :
            ''
            )

        }
            {
                tripData.length > 1 ?
            <div className='mt-0'>
            </div>
            : ''
            }

        </div>
        </div>
        {
            showFilterModal &&
        <div className='md:hidden fixed bg-white w-full h-full top-0 text-md p-5 left-0'>
        <h1 className='text-center m-2 text-lg text-sky-400 font-semibold'>Filters</h1>
        <form onSubmit={getFilterQueryStrig} className="p-4 bg-gray-100 border rounded-md">
            <div className="mb-6">
                <label htmlFor="from" className="block text-sm font-medium text-gray-700 m-1">
                Title
                </label>
                <select
                id="from"
                value={filtersData.title}
                onChange={(e)=> setFiltersData({...filtersData, title: e.target.value})}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-sky-400"
                >
                    <option value="">All</option>
                    {
                        filtersBackendData?.titles?.map(title => <option key={title} value={title}>{title}</option>)
                    }
                </select>
            </div>
            <div className="mb-6">
                <label htmlFor="from" className="block text-sm font-medium text-gray-700 m-1">
                From
                </label>
                <select
                id="from"
                value={filtersData.departure}
                onChange={(e)=> setFiltersData({...filtersData, departure: e.target.value})}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-sky-400"
                >
                    <option value="">All</option>
                    {
                        filtersBackendData?.departures?.map(departure => <option key={departure} value={departure}>{departure}</option>)
                    }
                </select>
            </div>

            <div className="mb-6">
                <label htmlFor="to" className="block text-sm font-medium text-gray-700 m-1">
                To
                </label>
                <select
                id="to"
                value={filtersData.destination}
                onChange={(e)=> setFiltersData({...filtersData, destination: e.target.value})}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-sky-400"
                >
                    <option value="">All</option>
                    {
                        filtersBackendData?.destinations?.map(destination => <option key={destination} value={destination}>{destination}</option>)
                    }                
                </select>
            </div>

            <div className="mb-6">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 m-1">
                Category
                </label>
                <select
                id="category"
                value={filtersData.category}
                onChange={(e)=> setFiltersData({...filtersData, category: e.target.value})}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-sky-400"
                >
                    <option value="">All</option>
                    {
                        filtersBackendData?.categories?.map(categorie => <option key={categorie} value={categorie}>{categorie}</option>)
                    }     
                </select>
            </div>

            <div className="mb-6">
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 m-1">
                    Date
                    </label>
                    <input
                    type="date"
                    id="date"
                    value={filtersData.date}
                    onChange={(e)=> setFiltersData({...filtersData, date: e.target.value})}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-sky-400"
                    />
                    <span className="text-gray-500"> and after</span>
                </div>
                <div className="mb-6">
                    <label htmlFor="strength" className="block text-sm font-medium text-gray-700 m-1">
                    Team Size
                    </label>
                    <select
                    id="strength"
                    value={filtersData.strength}
                    onChange={(e)=> setFiltersData({...filtersData, strength: e.target.value})}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-sky-400"
                    >
                        <option value="">All</option>
                        {
                            Array.from({ length: 15 }, (_, index) => index + 1).map(id => <option key={id} value={id+1}>{id+1} Members</option>)
                        }
                    </select>
                </div>

            <div className="mt-6 flex justify-end">
                <button
                type="button"
                onClick={() => setShowFilterModal(false)}
                className="px-4 py-2 ml-2 bg-gray-300 text-gray-700 font-bold rounded-md border border-gray-400 hover:bg-gray-400"
                >
                Cancel
                </button>
                <input
                type="submit"
                value="Filter"
                className="px-4 ml-2 py-2 bg-sky-400 text-white font-bold rounded-md border border-sky-400 hover:bg-sky-500"
                />
            </div>
        </form>
        <br></br>
        </div>
        }
        
        </div>
        {showCommentModal && <CommentsModal
        showCommentModal = {showCommentModal}
        setShowCommentModal = {setShowCommentModal} 
        currentTripId = {currentTripId}
        currentTripName = {currentTripName}
        setRefreshTripData = {setRefreshTripData}
        refreshTripData = {refreshTripData}
        />}
    </div>
  )
}

export default Home
