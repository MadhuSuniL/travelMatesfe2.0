import React, { useEffect, useState } from 'react';
import Loading from '../../components/global/Loading'
import { FaPaperPlane,FaSync } from 'react-icons/fa';
import instance from '../../app/api';
import { FaCheckDouble } from 'react-icons/fa'
import BackButton from '../global/BackButtonPlain'
import { IoMdSend } from 'react-icons/io';
import { Popover, PopoverContent, PopoverHandler } from '@material-tailwind/react';
import {
  ListItem,
  ListItemPrefix,
  Card,
} from "@material-tailwind/react";
import {toast} from 'react-toastify'
 


const Messaging = ({ selectedConversation, handleSelectConversation }) => {
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
    .catch(error => {
      try {
          toast.warning(error.response.data.detial)
          setIsloading(false)
      } catch (error) {
          toast.error('Internal error: ')                
          setIsloading(false)
      }
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
  const deleteMessage = (message_id) => {
    let url = `message/${message_id}?conversation=${selectedConversation.conversation_id}`
    instance.delete(url)
    .then(response => response.data)
    .then(data => {
      getMessages()
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

  useEffect(()=>{
    getMessages()
  },[selectedConversation])

  return (
    <div className="flex-grow h-full 1bg-sky-200 rounded-lg">
        {isLoading && <Loading/>}
        <div className='relative w-[100%]'>
            <div className="flex items-center border-b-2 absolute w-full hover:bg-sky-100 mb-4 bg-white py-2" style={{borderTopLeftRadius:'40px',borderBottomLeftRadius:'40px'}}>
                <BackButton onClick={()=>handleSelectConversation(null)}/>
                <img
                src={selectedConversation.travel_mate.profile_pic}
                alt={`${selectedConversation.travel_mate.first_name}'s Profile`}
                className="w-10 h-10 rounded-full object-cover mr-2"
                />
                <span className="text-lg text-gray-600 font-bold">{selectedConversation.travel_mate.first_name}</span>
            </div>
        </div>
      <div id='messages' className="h-full tra p-2 md:p-4 pt-20 md:pt-20 pb-10 md:pb-16 rounded-md overflow-y-auto">
        {messages.map((message) => (
          <div key = {message.message_id} className={`mb-2 cursor-pointer flex ${message.is_self_sender ? 'justify-end' : 'justify-start'}`}>
            <Popover key = {message.message_id} placement="left">
              <PopoverHandler>
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
              </PopoverHandler>
              <PopoverContent className={!message.is_self_sender ? 'hidden' : 'p-0'}>
                <Card className="overflow-hidden rounded-md">
                  <ListItem onClick={()=>deleteMessage(message.message_id)} className="rounded-none py-1.5 px-3 text-sm font-normal text-blue-gray-700 hover:bg-red-500 hover:text-white">
                      <ListItemPrefix>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="h-4 w-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </ListItemPrefix>
                      Delete
                  </ListItem>
                </Card>
              </PopoverContent>
            </Popover>
          </div>
        ))}
      </div>
      <div className='relative w-[100%] px-2'>
          <form className='bg-white h-12' onSubmit={sendMessage}>
            <div className="-mt-12 bg-white  w-full flex items-center">
              <FaSync onClick={getMessages} className={isLoading ? 'mx-3 cursor-pointer text-sky-400 animate-spin' : 'mx-3 cursor-pointer text-sky-400'} size={20} />
              <input
                type="text"
                value={currentMessesage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                className="flex-grow ring-none active:ring-none focus:ring-none hover:ring-sky-400 hover:border-sky-400 rounded-2xl px-3 w-full p-2 border-2 border-sky-300 focus:border-sky-400"
                placeholder="Type your message..."
              />
              <button type='submit' disabled = {!currentMessesage}  className="bg-sky-white cursor-pointer text-sky-400 p-2 ml-2 rounded-md">
              <IoMdSend size={25} className='' />
            </button>
            </div>
          </form>
      </div>
    </div>
  );
};

export default Messaging;
