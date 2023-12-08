import React, { useState } from 'react';

const Requests = () => {
  const [requests, setRequests] = useState([
    {
      trip_request_id: '123',
      requesterName: 'John Doe',
      tripDetails: 'New York City Trip',
      profileImg: 'https://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG.png',
    },
    {
      id: '456',
      requesterName: 'Jane Smith',
      tripDetails: 'Paris Adventure',
      profileImg: 'https://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG.png',
    },
  ]);

  const handleAccept = (requestId) => {
    // Handle logic for accepting the request
    console.log(`Accepted request with ID: ${requestId}`);
  };

  const handleCancel = (requestId) => {
    // Handle logic for canceling the request
    console.log(`Canceled request with ID: ${requestId}`);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Requests</h1>
      <div className="space-y-4">
        {requests.map((request) => (
          <div key={request.id} className="bg-gray-100 p-4 rounded-md flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src={request.profileImg}
                alt={`${request.requesterName}'s Profile`}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="text-lg font-semibold">{request.requesterName}</p>
                <p className="text-sm text-gray-500">{request.tripDetails}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleAccept(request.id)}
                className="bg-sky-400 border-sky-400 border-[1px] hover:scale-105 duration-150 text-white px-4 py-1 rounded-md"
              >
                Accept
              </button>
              <button
                onClick={() => handleCancel(request.id)}
                className="bg-white border-black border-[1px] hover:scale-105 duration-150 text-black px-4 py-1 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Requests;
