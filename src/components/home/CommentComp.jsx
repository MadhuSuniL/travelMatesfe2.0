import React from 'react';

function UserComment({
    travel_mate_profile,
    travel_mate_name,
    time,
    comment,
    profile_pic
}) {
  return (
    <div className="bg-white rounded-lg hover:bg-sky-100 shadow-xl mt-2 p-1 px-2 w-100">
      <div className="flex items-center">
        <img
          src={process.env.REACT_APP_API_URL+profile_pic}
          alt="User Profile"
          className="w-10 h-10 rounded-full"
        />
        <div className="ml-4">
          <div className="text-md text-sky-400 font-semibold">{travel_mate_name}</div>
          <div className="text-gray-500 text-sm">{time}</div>
        </div>
      </div>
      <div className="mt-2">
        <p className="text-gray-700 text-sm p-2">
          {comment}
        </p>
      </div>
    </div>
  );
}

export default UserComment;
