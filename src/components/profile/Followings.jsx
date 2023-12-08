import { useState, useEffect } from 'react';
import Modal from '../TailwindCss/Modal';
import instance from '../../app/api';

function FollowingsModal({
    showFollowingsModal,
    setShowFollowingsModal,
    travelMateId
}) {

  const [followings, setFollowings] = useState([])

  const getFollowings = () =>{
    let url = `/interactions/followings/get-followings/${travelMateId}`
    instance.get(url)
    .then(response => response.data)
    .then(data => {
      setFollowings(data)
    })
  }

  useEffect(()=>{
    getFollowings()
  },[])



    return (
    <>
      <Modal
        isOpen={showFollowingsModal}
        onClose={()=> setShowFollowingsModal(false)}
        title={`Followings (${followings.length})`}
      >
        {
          followings.length ?
        <div className="overflow-y-auto max-h-64">
            {followings.map((follower) => (
                <div key={follower.travel_mate_id} className="border-b border-gray-300 p-2 flex items-center">
                    <img src={follower.profile_pic} alt={follower.first_name} className="w-10 h-10 rounded-full mr-4" />
                    <div>
                        <p className="font-semibold">{follower.first_name+' '+follower.last_name}</p>
                        <p className="text-gray-500 text-sm">{follower.bio}</p>
                    </div>
                </div>
                ))}
        </div>
        :
        <h1 className='text-xl text-center'>No followings</h1>
        }
      </Modal>
    </>
  );
}

export default FollowingsModal;