import React, { useState } from 'react';

const Interactions = () => {
  const [interactions, setInteractions] = useState([
    {
      type: 'like',
      text: 'Madhu Sunil liked your Banglore trip',
      travel_mate_profile_pic: 'https://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG.png',
      travel_mate_id: '554477',
      trip_id: '554477',
    },
    {
      type: 'comment',
      text: 'Madhu Sunil commented on your Banglore trip',
      travel_mate_profile_pic: 'https://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG.png',
      travel_mate_id: '554477',
      trip_id: '554477',
    },
  ]);

  return (
    <div>
      <h1 className="text-xl text-gray-600 font-semibold m-2 mb-0 text-center">Interactions (12)</h1>
      <div className="">
        {interactions.map((interaction, index) => (
          <div key={index} className="bg-white rounded-lg hover:bg-sky-100 shadow-xl mt-2 p-1 px-2 w-100">
            <div className='flex items-center p-1'>
              <img
                src={interaction.travel_mate_profile_pic}
                alt="Travel Mate Profile"
                className="w-10 h-10 rounded-full"
              />
              <p className="text-gray-700 text-sm p-2">{interaction.text} fdf sdf s fs</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Interactions;
