import { useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../zustand/useConversation";
import { useUpdateSeenStatus } from "../../hooks/useUpdateSeenStatus";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === authUser._id;
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const bubbleBgColor = fromMe ? "chat-bubble bg-gray-300 text-black" : "chat-bubble-primary bg-blue-400";

  const bubbleStyle = {
    maxWidth: "80%",
    overflowWrap: "break-word",
    wordWrap: "break-word",
    wordBreak: "break-word",
  };

  const { updateSeenStatus } = useUpdateSeenStatus();


  const handleSeenStatus = () => {
    if (message.senderId !== authUser._id && message.seen === false) {
      updateSeenStatus(message._id);
    }
  }

  useEffect(() => {
    handleSeenStatus();
  }, [])

  return (
    <div className={`chat ${chatClassName}`}>
      <div className={`chat-bubble text-sm ${bubbleBgColor} pb-2`} style={bubbleStyle}>
        {message.message}
      </div>
      <div className='chat-footer font-semibold opacity-80 flex gap-1 items-center'>
        <p className=" text-xs">
          {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
        <div>
          <div className=" flex items-center gap-1">
            {message.senderId === authUser._id && (
              <div className=" flex items-center gap-1">
                <span className=" bg-gray-700 w-[0.2rem] h-[0.2rem] rounded-full"></span>
                {message.seen === true ? <span className="text-blue-900 ">seen</span> : <span className=" text-gray-700">sent</span>}
              </div>
            )
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
