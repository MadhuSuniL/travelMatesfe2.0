import React, { useState } from 'react';
import UpComingTrips from './UpComingTrips';
import CompletedTrips from './CompletedTrips';

const TripTabs = () => {
    const [activeTab, setActiveTab] = useState('upcoming'); // Initial active tab state

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="max-w-screen-md mx-auto">
            <div className="flex">
                <button
                    className={`${
                        activeTab === 'upcoming'
                            ? 'bg-sky-400 text-white duration-300'
                            : 'bg-gray-200 text-gray-700 duration-300'
                    } flex-grow py-1 rounded-tl-lg focus:outline-none`}
                    onClick={() => handleTabChange('upcoming')}
                >
                    Upcoming Trips
                </button>
                <button
                    className={`${
                        activeTab === 'completed'
                            ? 'bg-sky-400 text-white duration-300'
                            : 'bg-gray-200 text-gray-700 duration-300'
                    } flex-grow py-1 rounded-tr-lg focus:outline-none`}
                    onClick={() => handleTabChange('completed')}
                >
                    Completed Trips
                </button>
            </div>

            {/* Content for the selected tab */}
            {activeTab === 'upcoming' && (
                <div className="tra overflow-y-auto h-[600px]">
                    
                    <UpComingTrips/>
                </div>
            )}

            {activeTab === 'completed' && (
                <div className="">
                    <div className="tra overflow-y-auto h-[600px]">
                        <CompletedTrips/>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TripTabs;
