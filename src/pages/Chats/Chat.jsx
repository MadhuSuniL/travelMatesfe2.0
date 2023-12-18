import React, { useEffect, useState } from 'react';
import Conversations from '../../components/chats/Conversations';
import Messaging from '../../components/chats/Messaging';
import instance from '../../app/api'
import Loading from '../../components/global/Loading';
import {toast} from 'react-toastify'

const Chat = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [isLoading,setIsLoading] = useState(false)

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
  };

  const getConversations = () =>{
    setIsLoading(true)
    let url = '/conversation'
    instance.get(url)
    .then(response => response.data)
    .then(data => {
      setConversations(data)
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
    getConversations()
  },[])

  return (
    <div className="sm:flex-col md:flex md:flex-row  h-full max-w-[1150px] mx-auto shadow-lg shadow-gray-400 rounded-lg border-gray-200">
      {isLoading && <Loading/>}
      <div className={selectedConversation ? 'md:w-[30%] hidden md:block md:border-2 shadow-lg shadow-gray-300 rounded-lg py-2' : 'md:w-[30%] md:border-2 shadow-lg shadow-gray-300 rounded-lg py-2'}>
        <div className='relative w-[97.4%]'>
          <h2 className="text-lg bg-white absolute w-full h-9 mx-2 font-semibold text-gray-600">Travelmates ({conversations.length})</h2>
        </div>
        <div className='h-full tra overflow-y-auto'>
          <Conversations conversations={conversations} onSelectConversation={handleSelectConversation} />
        </div>
      </div>
      <div className={selectedConversation ? 'md:w-[70%] mx-0 h-full md:border-2 shadow-lg shadow-gray-300 rounded-lg' : 'hidden md:w-[70%] mx-1 h-full md:border-2 shadow-lg shadow-gray-300 rounded-lg'}>
        {selectedConversation && <Messaging selectedConversation={selectedConversation} handleSelectConversation = {handleSelectConversation} />}
      </div>
    </div>
  );
};

export default Chat;
