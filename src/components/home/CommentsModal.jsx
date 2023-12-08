import React, { useEffect, useState } from 'react';
import Modal from '../TailwindCss/Modal';
import UserComment from './CommentComp';
import { MdSend } from 'react-icons/md'; // Import the send icon from react-icons
import instance from '../../app/api';
import {toast} from 'react-toastify'

const CommentsModal = ({
    showCommentModal,
    setShowCommentModal,
    currentTripId,
    currentTripName,
    refreshTripData,
    setRefreshTripData
}) => {
    const [commentsData, setCommentsData] = useState([]);
    const [comment, setComment] = useState('')

    const getCommentsData = () =>{
        let url = `interactions/trips/comments/get-comments/${currentTripId}`
        instance.get(url)
        .then(response => response.data)
        .then(data => setCommentsData(data))
    }

    const addComment = () =>{
        let url = 'interactions/trips/comments/comment'
        let body = {
            trip : currentTripId,
            comment
        }
        instance.post(url, body)
        .then(response => response.data)
        .then(data => {
            getCommentsData()
            toast.info('Comment added successfully')
            setComment('')
            setRefreshTripData(!refreshTripData)
        })

    }

    useEffect(()=>{
        getCommentsData()
    },[currentTripId])

    return (
        <Modal
            isOpen={showCommentModal}
            onClose={() => setShowCommentModal(false)}
            title={currentTripName}
        >
            <h1 className='text-sm'>Comments ({commentsData.length})</h1>
            <div className='container tra mt-2 max-h-[400px] overflow-y-auto'>
                {
                    commentsData.map(commentItem => <UserComment
                        key={commentItem.comment_id}
                        travel_mate_profile = {commentItem.travel_mate_name}
                        travel_mate_name = {commentItem.travel_mate_name}
                        time = {commentItem.create_at}
                        comment = {commentItem.comment}
                        profile_pic = {commentItem.travel_mate_profile}
                    />)
                }    

            </div>

            <div className="mt-4 flex items-center">
                <input
                    type="text"
                    value={comment}
                    onChange={(e)=> setComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                />
                <button
                    className="bg-blue-500 text-white rounded-full p-2 ml-2"
                    onClick={addComment}
                >
                    <MdSend size={20} />
                </button>
            </div>
        </Modal>
    );
};

export default CommentsModal;
