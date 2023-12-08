import React, { useEffect, useState } from 'react';
import { FaPaperPlane,FaSync } from 'react-icons/fa';
import instance from '../../app/api';
import { FaCheckDouble } from 'react-icons/fa'

const Messaging = ({ selectedConversation }) => {
  const [currentMessesage, setCurrentMessage] = useState('')
  const [isLoading,setIsloading] = useState(false)
  const [messages, setMessages] = useState([]);


  const getMessages = ()=>{
    setIsloading(true)
    let url = `message/?conversation=${selectedConversation.conversation_id}`
    instance.get(url)
    .then(response => response.data)
    .then(data => {
      setMessages(data)
      setIsloading(false)
    })
  }

  const sendMessage = (f) => {
    f.preventDefault()
    let url = `message/?conversation=${selectedConversation.conversation_id}`
    let body = {
      message : currentMessesage
    }
    instance.post(url, body)
    .then(response => response.data)
    .then(data => {
      getMessages()
      setCurrentMessage('')
    })
  }

  useEffect(()=>{
    getMessages()
  },[])



  const scrollToBottom = (id) => {
    let ele = document.getElementById(id);
    ele.scrollTo({ behavior: 'smooth', top: ele.scrollHeight });
  };

  useEffect(()=>{
    scrollToBottom('messages')
  },[messages])

  return (
    <div className="flex-grow p-4 h-full bg-gray-100 rounded-lg">
        <div className='relative w-[100%]'>
            <div className="flex items-center absolute w-full mb-4 bg-white p-2 rounded-none">
                <img
                src={selectedConversation.travel_mate.profile_pic}
                alt={`${selectedConversation.travel_mate.first_name}'s Profile`}
                className="w-10 h-10 rounded-full object-cover mr-2"
                />
                <span className="text-lg font-bold">{selectedConversation.travel_mate.first_name}</span>
            </div>
        </div>
      <div id='messages' className="h-full tra p-4 pt-20 rounded-md overflow-y-auto">
        {messages.map((message) => (
            <div className={`mb-2 flex ${message.is_self_sender ? 'justify-end' : 'justify-start'}`}>
                <div
                    key={message.message_id}
                    className={`mb-2 p-1 rounded-lg shadow-md  ${!message.is_self_sender ? 'bg-sky-100 ' : 'bg-yellow-400 text-white'}`}
                >
                    {/* <strong>{message.sender}:</strong> */}
                    <p className='p-2'>
                     {message.message}
                    </p>
                     <span className='flex justify-end items-center text-[10px]'>{message.message_sent_time} {message.is_self_sender && message.is_seen ? <FaCheckDouble className='mx-1' /> : '' }</span>
                </div>
            </div>
        ))}
      <div className='relative w-[100%]'>
          <form onSubmit={sendMessage}>
            <div className="mt-4 absolute w-full flex items-center">
              <FaSync onClick={getMessages} className={isLoading ? 'mx-2 text-sky-400 animate-spin' : 'mx-2 text-sky-400'} size={20} />
              <input type="text" value={currentMessesage} onChange={(e)=>setCurrentMessage(e.target.value)} className="flex-grow ring-none active:ring-sky-400 focus:ring-none hover:border-sky-400 rounded-2xl px-3 w-full p-2 border-2 border-sky-300" placeholder="Type your message..." />
              <button type='submit' disabled = {!currentMessesage}  className="bg-sky-400 text-white p-2 ml-2 rounded-md">
              <FaPaperPlane className='' />
            </button>
            </div>
          </form>
      </div>
      </div>

    </div>
  );
};

export default Messaging;
