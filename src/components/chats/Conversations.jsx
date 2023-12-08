import React from 'react';

const Conversations = ({ conversations, onSelectConversation }) => {
  return (
    <div className="flex flex-col px-2 pt-8 border-sky-400 ">
      <ul>
        {conversations.map((conversation) => (
          <li
            key={conversation.conversation_id}
            onClick={() => onSelectConversation(conversation)}
            className="cursor-pointer flex border-b-2 bg-white rounded-lg hover:bg-sky-50  p-3 w-100"
          >
            <img
              src={conversation.travel_mate.profile_pic} // Add a profileImg property to your conversation object
              alt={`${conversation.travel_mate.first_name}'s Profile`}
              className="w-8 h-8 rounded-full object-cover mr-2"
            />
            <span className="text-sky-400">{conversation.travel_mate.first_name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Conversations;
