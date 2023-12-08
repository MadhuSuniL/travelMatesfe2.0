import React, { useState } from 'react';
import Interactions from './Interactions'
import Requests from './Requests'

const InteractionTabs = () => {
    const [activeTab, setActiveTab] = useState('interactions'); // Initial active tab state

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="max-w-screen-md mx-auto">
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
                </button>
                <button
                    className={`${
                        activeTab === 'requests'
                            ? 'bg-sky-400 text-white duration-300'
                            : 'bg-gray-200 text-gray-700 duration-300'
                    } flex-grow py-1 rounded-tr-lg focus:outline-none`}
                    onClick={() => handleTabChange('requests')}
                >
                    Requests
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
