import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../zustand/useConversation";

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

  return (
    <div className={`chat ${chatClassName}`}>
      <div className={`chat-bubble text-sm ${bubbleBgColor} pb-2`} style={bubbleStyle}>
        {message.message}
      </div>
      <div className='chat-footer font-semibold opacity-50 text-xs flex gap-1 items-center'>
        {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
    </div>
  );
};

export default Message;
