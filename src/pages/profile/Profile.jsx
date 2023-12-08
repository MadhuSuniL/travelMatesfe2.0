import React, { useState, useContext, useEffect } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import Header from '../../Header'
import Loading from '../../components/global/Loading.jsx'
import ViewProfileModal from '../../components/profile/ProfileView.jsx'
import ProfileEditModal from '../../components/profile/ProfileEditModal'
import { FaCog,FaPen,FaSignOutAlt } from 'react-icons/fa';
import instance from '../../app/api.jsx'
import FollowersModal from '../../components/profile/Followers.jsx'
import FollowingsModal from '../../components/profile/Followings.jsx'
import ProfilePictureUploader from '../../components/profile/ProfilePicChange.jsx'
import DefaultPic from '../../assests/default_user.png'
import TripTabs from '../../components/profile/trips/TripTabs.jsx'
import explore from '../../assests/travel.png'



const Profile = () => {
    const nav = useNavigate()
    const {travel_mate_id} = useParams()
    const location = useLocation();
    const navData  = location.state;
    const [showProfileViewModal,setShowProfileViewModal] = useState(false) 
    const [showProfileEditModal,setShowProfileEditModal] = useState(false) 
    const [showChangeProfilePicModal,setShowChangeProfilePicModal] = useState(false) 
    const [showFollowersModal,setShowFollowersModal] = useState(false) 
    const [showFollowingsModal,setShowFollowingsModal] = useState(false) 
    // const [showSettingsModal,setShowSettingsModal] = useState(false)
    const [selfProfile, setSelfProfile] = useState(false)
    const [refreshProfile, setRefreshProfile] = useState(false)
    const [isLoading , setIsLoading] = useState(false)

    const [travelMateId, setTravelMateId] = useState(null)
    const [firstName, setFirstname] = useState('')
    const [lastName, setLastname] = useState('')
    const [bio, setBio] = useState('')
    const [profilePicture, setProfilePicture] = useState('')
    const [travelMateData, setTravelMateData] = useState({})
    const [trips, setTrips] = useState(0)
    const [followers, setFollowers] = useState(0)
    const [followings, setFollowings] = useState(0)

    const getTravelMateData = ()=>{
        let url = ''
        if (travel_mate_id === 'self'){
            setSelfProfile(true)
            setTravelMateId(JSON.parse(localStorage.getItem('travel_mate')).travel_mate_id)
            url = `/travel-mates/travel_mate/${JSON.parse(localStorage.getItem('travel_mate')).travel_mate_id}`
        }
        else{
            setTravelMateId(travel_mate_id)
            url = `/travel-mates/travel_mate/${travel_mate_id}`
        }
        instance.get(url)
        .then(response => response.data)
        .then(data => {
            setTravelMateData(data)
            setFirstname(data.first_name)
            setLastname(data.last_name)
            setBio(data.bio)
            setProfilePicture(data.profile_pic)
            setTrips(data.trips)
            setFollowers(data.followers)
            setFollowings(data.followings)
        })
    }

    const reDirectToSettings = () =>{
       return nav('/settings') 
    }


    useEffect(()=>{
        getTravelMateData()
    },[refreshProfile])


    return (
        <div className=''>
        <div className='max-w-[702px] mx-auto justify-between px-0'>
        </div>
        <div className='tra shadow-sm rounded-md shadow-gray-500 max-w-[695px] mx-auto'>
            <div className='flex justify-end px-0 items-center'>
            {/* <button onClick={logout} className='p-1 text-lg font-semibold text-gray-600 rounded-md flex justify-center items-center'><FaSignOutAlt className='mx-2 animate-bounce0'/> Logout</button> */}
            <button onClick={reDirectToSettings} className='px-2 py-2 text-lg font-semibold text-gray-600 rounded-md flex items-center'><FaCog className='mx-2 animate-spin0' size={20}/>Settings </button>
            </div>
            <div className='grid gap-3'>
                <div className='flex justify-around items-center px-2'>
                    <img src={profilePicture ? profilePicture : DefaultPic} onClick={()=> setShowChangeProfilePicModal(true)} className='cursor-pointer w-14 md:w-32 m-1 mb-0 rounded-full border-02 border-sky-400'/>
                    <div>
                        <h1 className='text-xl md:text-2xl text-sky-400 font-bold'>{`${firstName} ${lastName}`}</h1>
                        <h1 className='text-md md:text-md text-gray-400'>{bio}</h1>
                        
                    </div>
               
                </div>
                <div className='col-span-2 flex justify-around items-center rounded-md px-2'>
                    <div className='flex flex-col items-center cursor-pointer'>
                    <h1 className='text-md text-gray-800 font-semibold'>Trips</h1>
                    <h1 className='text-md text-gray-400 font-bold'>{trips}</h1>
                    </div>
                    
                    <div className='flex flex-col items-center cursor-pointer' onClick={()=> setShowFollowingsModal(true)}>
                    <h1 className='text-md text-gray-800 font-semibold'>Following</h1>
                    <h1 className='text-md text-gray-400 font-bold'>{followings}</h1>
                    </div>

                    <div className='flex flex-col items-center cursor-pointer' onClick={()=> setShowFollowersModal(true)}>
                    <h1 className='text-md text-gray-800 font-semibold'>Followers</h1>
                    <h1 className='text-md text-gray-400 font-bold'>{followers}</h1>
                    </div>
                </div>
            </div>

            {
            !selfProfile ? 
                <div className='mt-3 flex items-center px-5 w-full'>
                <button onClick={()=>setShowProfileEditModal(true)} className='w-full w-[50%]0 mx-2 p-1 text-lg font-semibold bg-sky-400 text-white rounded-md'>Follow</button>
                {/* <button onClick={()=>setShowProfileEditModal(true)} className='w-[50%] mx-2 p-1 text-lg font-semibold bg-sky-400 text-white rounded-md'>Edit Profile</button> */}
                </div>
            :
            <div className='mt-3 px-6 md:px-10'>
                <button onClick={()=>setShowProfileEditModal(true)} className='w-full p-1 text-lg font-semibold bg-sky-400 text-white rounded-md flex justify-center items-center'><FaPen className='mx-2'/> Edit Profile</button>
            </div>
            }
            <br />

        </div>



                                    {/* Trips     */}
        <div className='max-w-[702px] mx-auto px-0'>
            <div className='shadow-sm m-1 mt-5 p-3 ease-in-out duration-700 shadow-gray-500 rounded-md'>
            <div className='flex items-center'>
            <img src={explore} className='w-20'/>
            <p className='p-1 text-center text-yellow-0 text-sm'>"Discover our collection of visited places across different countries! From stunning beaches to breathtaking mountains, we've got it all. Explore our curated list and get inspired for your next adventure."</p>
            </div>
            <button onClick={()=>nav('/explore')} className='border-2 p-3 m-1 float-right py-1 text-white font-semibold rounded-md bg-yellow-400 border-yellow-400'>Explore</button>
            <br />
            <br />
            </div>
            <h1 className='m-2 font-bold text-center text-xl text-sky-400'>My Trips</h1>    
            <TripTabs/>
        </div>

        {showProfileEditModal && <ProfileEditModal
        showProfileEditModal = {showProfileEditModal}
        setShowProfileEditModal = {setShowProfileEditModal}   
        refreshProfile = {refreshProfile}
        setRefreshProfile = {setRefreshProfile}
        travelMateId = {travelMateId}
        />}


        {
            showFollowersModal && <FollowersModal
            showFollowersModal={showFollowersModal}
            setShowFollowersModal={setShowFollowersModal}
            travelMateId = {travelMateId}
            />
        }

        {
            showFollowingsModal && <FollowingsModal
            showFollowingsModal = {showFollowingsModal}
            setShowFollowingsModal = {setShowFollowingsModal}
            travelMateId = {travelMateId}
            />
        }

        {
            showProfileViewModal &&
            <ViewProfileModal
            showProfileViewModal = {showProfileViewModal}
            setShowProfileViewModal = {setShowProfileViewModal}
            travelMateId = {travelMateId}    
            travelMateData = {travelMateData}
            />
        }

        {
            showChangeProfilePicModal &&
            <ProfilePictureUploader
            profilePicUrl = {profilePicture ? profilePicture : DefaultPic}
            showChangeProfilePicModal = {showChangeProfilePicModal}
            setShowChangeProfilePicModal = {setShowChangeProfilePicModal}
            refreshProfile = {refreshProfile}
            setRefreshProfile = {setRefreshProfile}
            travelMateId = {travelMateId}
            />
        }
        {
            isLoading &&
            <Loading/>
        }
    </div>
)
}



export default Profile