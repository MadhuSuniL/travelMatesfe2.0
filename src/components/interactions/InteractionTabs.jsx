import React, { useEffect, useState } from 'react';
import Interactions from './Interactions'
import { useLocation } from 'react-router-dom';
import Requests from './Requests'
import instance from '../../app/api';
import {toast} from 'react-toastify'
import Loading from '../../components/global/Loading'


const InteractionTabs = () => {
    const location = useLocation();
    const [activeTab, setActiveTab] = useState('interactions'); // Initial active tab state
    const [interactionsBadge, setInteractionsBadge] = useState(0)
    const [requestsBadges, setRequestsBadge] = useState(0)
    const [isLoading,setIsLoading] = useState(false)

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const getBadges = ()=>{
        setIsLoading(true)
        let url = '/interactions/interactions?source=badge_count'
        instance.get(url)
        .then(response => response.data)
        .then(data => {
            setInteractionsBadge(data.interactions_count)
            setRequestsBadge(data.request_count)
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

    useEffect(()=>{
        getBadges()
    },[activeTab])

    useEffect(()=>{
        if (location.state === 'requests'){
            setActiveTab('requests')
        }
    },[location])

    return (
        <div className="max-w-screen-md mx-auto">
        {isLoading && <Loading/>}
            <div className="flex">
                <button
                    className={`${
                        activeTab === 'interactions'
                            ? 'bg-sky-400 text-white duration-300'
                            : 'bg-gray-200 text-gray-700 duration-300'
                    } flex-grow py-1 rounded-tl-lg focus:outline-none`}
                    onClick={() => handleTabChange('interactions')}
                >
                    Interactions
                    {
                        interactionsBadge ?
                            <sup className='bg-yellow-400 text-white p-2 text-center py-0 rounded-lg'>{interactionsBadge}</sup>
                            :
                            ''
                    } 
                </button>
                <button
                    className={`${
                        activeTab === 'requests'
                            ? 'bg-sky-400 text-white duration-300'
                            : 'bg-gray-200 text-gray-700 duration-300'
                    } flex-grow py-1 rounded-tr-lg focus:outline-none`}
                    onClick={() => handleTabChange('requests')}
                >
                    Requests{
                        requestsBadges ?
                            <sup className='bg-yellow-400 text-white p-2 text-center py-0 rounded-lg'>{requestsBadges}</sup>
                            :
                            ''
                    } 
                </button>
            </div>

            {/* Content for the selected tab */}
            {activeTab === 'interactions' && (
                <div className="tra overflow-y-auto h-[600px]">
                    <Interactions/>
                </div>
            )}

            {activeTab === 'requests' && (
                <div className="">
                    <div className="tra overflow-y-auto h-[600px]">
                        <Requests/>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InteractionTabs;
