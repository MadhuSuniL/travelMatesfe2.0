import React, { useEffect, useState } from 'react';
import Modal from '../TailwindCss/Modal';
import instance from '../../app/api';

function FollowersModal({
    showFollowersModal,
    setShowFollowersModal,
    travelMateId
}) {
    const [followers, setFollowers] = useState([])

    const getFollowers = () =>{
      let url = `/interactions/followings/get-followers/${travelMateId}`
      instance.get(url)
      .then(response => response.data)
      .then(data => {
        setFollowers(data)
      })
    }

    useEffect(()=>{
      getFollowers()
    },[])



    return (
        <Modal
            isOpen={showFollowersModal}
            onClose={() => setShowFollowersModal(false)}
            title={`Followers (${followers.length})`}
        >
          {
            followers.length ?
            <div className="overflow-y-auto max-h-64">
                {followers.map((follower) => (
                    <div key={follower.id} className="border-b border-gray-300 p-2 flex items-center">
                        <img src={follower.profile_pic} alt={follower.username} className="w-10 h-10 rounded-full mr-4" />
                        <div>
                            <p className="font-semibold">{follower.first_name +' '+follower.last_name}</p>
                            <p className="text-gray-500 text-sm">{follower.bio}</p>
                        </div>
                    </div>
                ))}
            </div>
            :
            <h1 className='text-xl text-center'>No followers</h1>
          }
        </Modal>
    );
}

export default FollowersModal;
