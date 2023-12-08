import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import logo from '../../assests/plane.png'
import travelersInactive from '../../assests/navbar/tra2.png'
import travelActive from '../../assests/navbar/tra.png'
import profileInactive from '../../assests/navbar/profile2.png'
import profileActive from '../../assests/navbar/profile.png'
import createIcon from '../../assests/navbar/add3.png'
import msgInactive from '../../assests/navbar/msg2.png'
import msgActive from '../../assests/navbar/msg.png'
import interactionsInactive from '../../assests/navbar/noti.png'
import interactionsActive from '../../assests/navbar/noti2.png'
import Loading from '../global/Loading'
import Home from '../../pages/home/Home'

const Drawer = (p) => {
  
    const nav = useNavigate()
    const [activeLabel, setActiveLabel] = React.useState(window.location.pathname);
    const userProfile = JSON.parse(localStorage.getItem('travel_mate'))?.profile_pic
    const drawerNavElements = [
        {
            label : 'Create',
            pathname : '/trips/create',
            activeStyle : 'm-3 mx-4 underline-offset-4 underline decoration-yellow-400 text-yellow-300',
            inActiveStyle : 'text-yellow-300 m-3 my-1 mx-4',
            activeIcon : createIcon,
            inActiveIcon : createIcon
        },
        {
            label : 'Travelers',
            pathname : '/',
            activeStyle : 'm-3 mx-4 underline-offset-4 underline decoration-yellow-400',
            inActiveStyle : 'm-3 my-1 mx-4',
            activeIcon : travelActive,
            inActiveIcon : travelersInactive
        },
        {
            label : 'Messages',
            pathname : '/messages',
            activeStyle : 'm-3 mx-4 underline-offset-4 underline decoration-yellow-400',
            inActiveStyle : 'm-3 my-1 mx-4',
            activeIcon : msgActive,
            inActiveIcon : msgInactive
        },
        {
            label : 'Interations',
            pathname : '/interactions',
            activeStyle : 'm-3 mx-4 underline-offset-4 underline decoration-yellow-400',
            inActiveStyle : 'm-3 my-1 mx-4',
            activeIcon : interactionsActive,
            inActiveIcon : interactionsInactive
        },
        {
            label : 'Profile',
            pathname : '/profile/self',
            activeStyle : 'm-3 mx-4 underline-offset-4 underline decoration-yellow-400',
            inActiveStyle : 'm-3 my-1 mx-4 rounded-full',
            activeIcon : userProfile,
            inActiveIcon : userProfile
        }
    ]
    const drawerNavElements2 = [
        {
            label : 'Travelers',
            pathname : '/',
            activeStyle : 'm-3 mx-4 underline-offset-4 underline decoration-yellow-400',
            inActiveStyle : 'm-3 my-1 mx-4',
            activeIcon : travelActive,
            inActiveIcon : travelersInactive
        },
        {
            label : 'Messages',
            pathname : '/messages',
            activeStyle : 'm-3 mx-4 underline-offset-4 underline decoration-yellow-400',
            inActiveStyle : 'm-3 my-1 mx-4',
            activeIcon : msgActive,
            inActiveIcon : msgInactive
        },
        {
            label : 'Create',
            pathname : '/trips/create',
            activeStyle : 'm-3 mx-4 underline-offset-4 underline decoration-yellow-400 text-yellow-300',
            inActiveStyle : 'text-yellow-300 m-3 my-1 mx-4',
            activeIcon : createIcon,
            inActiveIcon : createIcon
        },
        {
            label : 'Interations',
            pathname : '/interactions',
            activeStyle : 'm-3 mx-4 underline-offset-4 underline decoration-yellow-400',
            inActiveStyle : 'm-3 my-1 mx-4',
            activeIcon : interactionsActive,
            inActiveIcon : interactionsInactive
        },
        {
            label : 'Profile',
            pathname : '/profile/self',
            activeStyle : 'm-3 mx-4 underline-offset-4 underline decoration-yellow-400',
            inActiveStyle : 'm-3 my-1 mx-4 rounded-full',
            activeIcon : userProfile,
            inActiveIcon : userProfile
        }
    ]

    const handleHome = () =>{
        setActiveLabel('/')
        nav('/')
    }

  
    return (
    <div className='h-screen'>
        {/* for large */}
        <div className='h-[6%] md:h-[11%]'>
            <div className='flex justify-between md:justify-around shadow-md mb-10 shadow-gray-300'>
                <div  onClick={handleHome} className='flex justify-center text-xl md:text-2xl cursor-pointer text-sky-400 font font-semibold m-5 mb-2 mt-3 text-center md:mb-5'>
                    <span><img src={logo} className='w-4 md:w-5 mt-1  md:mt-2 mx-2'/></span><h1 className='mr-20'>TravelMates<span className='text-yellow-400'>.com</span></h1>
                </div>
                <div className='hidden md:flex cursor-pointer items-center font-semibold text-sky-300'>
                    {
                        drawerNavElements.map((navElement,index) =>
                            <NavLink to={navElement.pathname} onClick={()=> setActiveLabel(navElement.pathname)} key={navElement.pathname} className={activeLabel === navElement.pathname ? navElement.activeStyle : navElement.inActiveStyle}><img src={activeLabel === navElement.pathname ? navElement.activeIcon : navElement.inActiveIcon} className={navElement.label === 'Profile' ? 'w-7 mx-auto mb-0 rounded-full' : 'w-7 mx-auto mb-0'}/>{navElement.label}</NavLink>
                        )
                    }
                </div>
            </div>
        </div>

        {/* <main></main> */}
        <div className='tra overflow-y-auto h-[84.5%] md:h-[89%]'>
            {/* <Home/> */}
            {p.children}
        </div>

    {/* for mobile */}
        <div className='h-[7%] md:h-0 bg-white'>
            <div className='md:hidden fixed top-[100%] left-0 translate-y-[-100%] w-full z-50 text-sky-300'>
                <div className='flex justify-evenly text-[12px] border-t-2 border-gray-0 shadow-xl shadow-gray-60 w-full'>
                    {
                        drawerNavElements2.map((navElement,index) =>
                            <NavLink to={navElement.pathname} onClick={()=> setActiveLabel(navElement.pathname)} key={navElement.pathname} className={activeLabel === navElement.pathname ? navElement.activeStyle : navElement.inActiveStyle}><img src={activeLabel === navElement.pathname ? navElement.activeIcon : navElement.inActiveIcon} className={navElement.label === 'Profile' ? 'w-7 mx-auto mb-0 rounded-full' : 'w-7 mx-auto mb-0'}/>{navElement.label}</NavLink>
                        )
                    }
                    
                    {/* <h1 onClick={travel_click} className={p.tra ? 'm-3 mx-4 underline-offset-4 underline decoration-yellow-400' : 'm-3 mx-4'}><img src={p.tra ? travel2 : travel} className='w-6 mx-auto mb-1'/> Travelers</h1>
                    <h1 onClick={noti_click} className={p.req ? 'm-3 mx-4 underline-offset-4 underline decoration-yellow-400' : 'm-3 mx-4'}><img src={p.req ? noti2 : noti} className='w-6 mx-auto mb-1'/> Messages</h1>
                    <h1 onClick={my_click} className={p.my ? 'm-3 mx-4 underline-offset-4 underline decoration-yellow-400 text-yellow-300' : 'text-yellow-300 m-3 my-1 mt-1 mx-4'}><img src={p.my ? createIcon : createIcon} className='w-8 mx-auto mb-1'/>Publish</h1>
                    <h1 onClick={msg_click} className={p.msg ? 'm-3 mx-4 underline-offset-4 underline decoration-yellow-400' : 'm-3 mx-4'}><img src={p.msg ? msg2 : msg} className='w-6 mx-auto mb-1'/> Interations</h1>
                    <h1 onClick={profile_click} className={p.pro ? 'm-3 mx-4 underline-offset-4 underline decoration-yellow-400' : 'm-3 mx-4'}><img src={userProfile} className='w-6 mx-auto mb-1 rounded-full'/> Profile</h1> */}
                </div>
            </div>
        </div>    
    </div>
  )
}

export default Drawer