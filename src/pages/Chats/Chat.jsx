import React, { useEffect, useState } from 'react';
import Conversations from '../../components/chats/Conversations';
import Messaging from '../../components/chats/Messaging';
import instance from '../../app/api'


const Chat = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
  };

  const getConversations = () =>{
    let url = '/conversation'
    instance.get(url)
    .then(response => response.data)
    .then(data => {
      setConversations(data)
    })
  }

  useEffect(()=>{
    getConversations()
  },[])

  return (
    <div className="sm:flex-col md:flex md:flex-row  h-full max-w-[1150px] mx-auto">
      <div className='md:w-[25%] md:border-2 shadow-lg shadow-gray-300 rounded-lg py-2'>
        <div className='relative w-[97.4%]'>
          <h2 className="text-lg bg-white absolute w-full h-9 mx-2 font-bold text-gray-600">Chats (23)</h2>
        </div>
        <div className='h-full tra overflow-y-auto'>
          <Conversations conversations={conversations} onSelectConversation={handleSelectConversation} />
        </div>
      </div>
      <div className='md:w-[75%] h-full'>
        {selectedConversation && <Messaging selectedConversation={selectedConversation} />}
      </div>
    </div>
  );
};

export default Chat;
