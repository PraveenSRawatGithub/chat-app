import { useState, useEffect, useReducer, useRef } from "react";
import { BsSend } from "react-icons/bs";
import EmojiPicker from 'emoji-picker-react';
import useSendMessage from "../../hooks/useSendMessage";
import { useUpdateSeenStatus } from "../../hooks/useUpdateSeenStatus";
import { useGetUnseenMessages } from "../../hooks/useGetUnseenMessages";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();
  const inputRef = useRef(null);
  const [showEmoji, setShowEmoji] = useState(false);

  const handleEmojiClick = (emojiObject) => {
    let emoji = emojiObject.emoji;
    setMessage(prevInput => prevInput + emoji);
    inputRef.current.focus()
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;
    await sendMessage(message);
    setShowEmoji(false);
    setMessage("");
  };


  return (
    <>
      <div className="z-10 absolute bottom-14">
        <EmojiPicker className="ml-3" onEmojiClick={handleEmojiClick} open={showEmoji} height='400px' ></EmojiPicker>
      </div>

      <div className=" flex gap-0">
        <button onClick={() => setShowEmoji(!showEmoji)}><img className="w-6 h-6 ml-3" src="https://cdn-icons-png.flaticon.com/128/742/742751.png" alt="" /></button>
        <form onSubmit={handleSubmit} className="px-4 my-3 w-full">
          <div className="w-full flex relative shadow-sm shadow-gray-200">
            <input ref={inputRef}
              type="text"
              className="border text-sm rounded-lg block w-full p-2.5  bg-white focus:outline-none  border-gray-400 text-black  placeholder:text-gray-500 "
              placeholder="Send a message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <button type="submit" className="absolute inset-y-0 end-0 flex items-center px-3 rounded-r-lg text-white">
              {loading ? <div className="loading loading-spinner"></div> :
                <button><img className="w-7 h-7" src="https://cdn-icons-png.flaticon.com/128/10747/10747272.png" alt="" /></button>
              }
            </button>

          </div>
        </form>
      </div>
    </>
  );
};
export default MessageInput;
