import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import logo from '../../assests/plane.png'
import travelersInactive from '../../assests/navbar/tra2.png'
import travelActive from '../../assests/navbar/tra.png'
import createIcon from '../../assests/navbar/add3.png'
import msgInactive from '../../assests/navbar/msg2.png'
import msgActive from '../../assests/navbar/msg.png'
import interactionsInactive from '../../assests/navbar/noti.png'
import interactionsActive from '../../assests/navbar/noti2.png'
import Loading from '../global/Loading'
import Home from '../../pages/home/Home'
import instance from '../../app/api'

const Drawer = (p) => {
  
    const nav = useNavigate()
    const [activeLabel, setActiveLabel] = React.useState(window.location.pathname);
    const userProfile = JSON.parse(localStorage.getItem('travel_mate'))?.profile_pic
    const [chatBadge, setChatBadge] = useState(0)
    const [interactionsBadge, setInteractionsBadge] = useState(0)
    const drawerNavElements = [
        {
            label : 'Create',
            pathname : '/trips/create',
            activeStyle : 'm-3 mx-4 underline-offset-4 underline decoration-yellow-400 text-yellow-300',
            inActiveStyle : 'text-yellow-300 m-3 my-1 mx-4',
            activeIcon : createIcon,
            inActiveIcon : createIcon,
            badge : 0
        },
        {
            label : 'Travelers',
            pathname : '/',
            activeStyle : 'm-3 mx-4 underline-offset-4 underline decoration-yellow-400',
            inActiveStyle : 'm-3 my-1 mx-4',
            activeIcon : travelActive,
            inActiveIcon : travelersInactive,
            badge : 0
        },
        {
            label : 'Messages',
            pathname : '/messages',
            activeStyle : 'm-3 mx-4 underline-offset-4 underline decoration-yellow-400',
            inActiveStyle : 'm-3 my-1 mx-4',
            activeIcon : msgActive,
            inActiveIcon : msgInactive,
            badge : chatBadge
        },
        {
            label : 'Interations',
            pathname : '/interactions',
            activeStyle : 'm-3 mx-4 underline-offset-4 underline decoration-yellow-400',
            inActiveStyle : 'm-3 my-1 mx-4',
            activeIcon : interactionsActive,
            inActiveIcon : interactionsInactive,
            badge : interactionsBadge
        },
        {
            label : 'Profile',
            pathname : '/profile/self',
            activeStyle : 'm-3 mx-4 underline-offset-4 underline decoration-yellow-400',
            inActiveStyle : 'm-3 my-1 mx-4 rounded-full',
            activeIcon : userProfile,
            inActiveIcon : userProfile,
            badge : 0
        }
    ]
    const drawerNavElements2 = [
        {
            label : 'Travelers',
            pathname : '/',
            activeStyle : 'm-3 mx-4 underline-offset-4 underline decoration-yellow-400',
            inActiveStyle : 'm-3 my-1 mx-4',
            activeIcon : travelActive,
            inActiveIcon : travelersInactive,

        },
        {
            label : 'Messages',
            pathname : '/messages',
            activeStyle : 'm-3 mx-4 underline-offset-4 underline decoration-yellow-400',
            inActiveStyle : 'm-3 my-1 mx-4',
            activeIcon : msgActive,
            inActiveIcon : msgInactive,
            badge : chatBadge

        },
        {
            label : 'Create',
            pathname : '/trips/create',
            activeStyle : 'm-3 mx-4 underline-offset-4 underline decoration-yellow-400 text-yellow-300',
            inActiveStyle : 'text-yellow-300 m-3 my-1 mx-4',
            activeIcon : createIcon,
            inActiveIcon : createIcon,

        },
        {
            label : 'Interations',
            pathname : '/interactions',
            activeStyle : 'm-3 mx-4 underline-offset-4 underline decoration-yellow-400',
            inActiveStyle : 'm-3 my-1 mx-4',
            activeIcon : interactionsActive,
            inActiveIcon : interactionsInactive,
            badge : chatBadge

        },
        {
            label : 'Profile',
            pathname : '/profile/self',
            activeStyle : 'm-3 mx-4 underline-offset-4 underline decoration-yellow-400',
            inActiveStyle : 'm-3 my-1 mx-4 rounded-full',
            activeIcon : userProfile,
            inActiveIcon : userProfile,

        }
    ]

    const handleHome = () =>{
        setActiveLabel('/')
        nav('/')
    }

    const getInteractionsBadgesCounts = () =>{
        let url = '/interactions/interactions?source=badge_count'
        instance.get(url)
        .then(response => response.data)
        .then(data => {
            setInteractionsBadge(data.final_count)
        })
    }

    useEffect(()=>{
        // if (activeLabel === '/interactions'){
        //     setInteractionsBadge(0)
        // }
        // else{
            getInteractionsBadgesCounts()
        // }
    },[activeLabel])

  
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
                            <NavLink to={navElement.pathname} onClick={()=> setActiveLabel(navElement.pathname)} key={navElement.pathname}><img src={activeLabel === navElement.pathname ? navElement.activeIcon : navElement.inActiveIcon} className={navElement.label === 'Profile' ? 'w-7 mx-auto mb-0 rounded-full' : 'w-7 mx-auto mb-0'}/><span className={activeLabel === navElement.pathname ? navElement.activeStyle : navElement.inActiveStyle}>{navElement.label}</span>{navElement.badge ? <sup className='bg-yellow-400 -ml-3 px-2 rounded-xl text-white'>{navElement.badge}</sup> : '' }</NavLink>
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
            <div className='md:hidden fixed top-[100%] bg-white left-0 translate-y-[-100%] w-full z-50 text-sky-300'>
                <div className='flex justify-evenly bg-white text-[12px] border-t-2 border-gray-0 shadow-xl shadow-gray-60 w-full'>
                    {
                        drawerNavElements2.map((navElement,index) =>
                        <NavLink to={navElement.pathname} onClick={()=> setActiveLabel(navElement.pathname)} key={navElement.pathname}><img src={activeLabel === navElement.pathname ? navElement.activeIcon : navElement.inActiveIcon} className={navElement.label === 'Profile' ? 'w-7 mx-auto mb-0 rounded-full' : 'w-7 mx-auto mb-0'}/><span className={activeLabel === navElement.pathname ? navElement.activeStyle : navElement.inActiveStyle}>{navElement.label}</span>{navElement.badge ? <sup className='bg-yellow-400 text-[9px] -ml-3 px-1 rounded-xl text-white'>{navElement.badge}</sup> : '' }</NavLink>                            
                        )
                    }
                </div>
            </div>
        </div>    
    </div>
  )
}

export default Drawer