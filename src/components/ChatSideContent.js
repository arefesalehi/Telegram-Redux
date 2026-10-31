import { Button, Input } from "antd";
import { SendOutlined, SmileOutlined, PaperClipOutlined } from "@ant-design/icons";
import { useSelector,useDispatch } from "react-redux";
import { ADD_MESSAGE} from "../redux/slices/message";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import HeaderChat from "./HeaderChat";
import "../assets/styles/message.css";
import "../assets/styles/chatsidecontent.css";
import axios from "axios";
import localDatabase from "../db.json";

const formatMessageTime = (timestamp) => {
  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) {
    const normalized = String(timestamp || "").replace(/[۰-۹٠-٩]/g, (digit) => {
      const persianDigit = "۰۱۲۳۴۵۶۷۸۹".indexOf(digit);
      return String(persianDigit >= 0 ? persianDigit : "٠١٢٣٤٥٦٧٨٩".indexOf(digit));
    });
    const time = normalized.match(/(?:^|[,،]\s*|\s)(\d{1,2}):(\d{2})(?::\d{2})?\s*(AM|PM)?\s*$/i);
    if (!time) return normalized;

    let hours = Number(time[1]);
    if (time[3]) hours = (hours % 12) + (time[3].toUpperCase() === "PM" ? 12 : 0);
    return `${String(hours).padStart(2, "0")}:${time[2]}`;
  }

  return new Intl.DateTimeFormat(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};


const ChatSideContent = () => {

  const [msgs,setMsgs]= useState([])
  const [text, setText] = useState('');
  const messageEndRef = useRef(null)
  const { id} = useParams();
  const messagelist = useSelector(state=>state.message.value)
  const dispatch =useDispatch()
   
  useEffect(()=>{
    messageEndRef.current?.scrollIntoView()
  },[messagelist])

 
  useEffect(() => {
    getMsg();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);


  const onChange = (e)=>{
    setText(e.target.value); 
  }

  
  const getMsg = async () => {
    const localContact = localDatabase.friends.find((friend) => friend.id === Number(id));
    const sidebarContact = localDatabase.profile.friends.find((friend) => friend.id === Number(id));
    const localChatlog = localContact?.chatlog?.length
      ? localContact.chatlog
      : sidebarContact?.lastChat
        ? [{ message_id: `preview-${id}`, text: sidebarContact.lastChat, side: "left", timestamp: sidebarContact.latest_timestamp }]
        : [];
    try {
        const { data } = await axios({
        url: `${process.env.REACT_APP_API_URL}/friends/${id}`,
      });
        const remoteChatlog = Array.isArray(data?.chatlog) ? data.chatlog : [];
        const chatlog = remoteChatlog.length ? remoteChatlog : localChatlog;
        setMsgs(chatlog.slice().reverse());
        } catch (error) {
        setMsgs(localChatlog.slice().reverse());
        console.warn("Using bundled chat history because the API is unavailable.", error);
    }   
  };


const onClick =()=>{
  if(!text.trim()){
    return;
  }else{
    dispatch(ADD_MESSAGE({id , text ,side:'right', timestamp:new Date().toISOString()}))
    setTimeout(() => {
      dispatch(ADD_MESSAGE({id , text:"Message recieved" ,side: 'left' , timestamp:new Date().toISOString()}))
    },2000) 
    setText(' ')
  }
}
  

  return (
    <div className="chatside1">
     <HeaderChat userProfileId= {id}/> 
     
        <div className="messageChat">
            {
              msgs?.map((msg) => {
                return (
                    <div key={msg.message_id}>
                      <div className={msg.side === "right" ? "right-side" : "left-side message"}>
                        <p>{msg.text}</p>
                        <span><small>{msg.timestamp}</small></span>
                      </div>
                    </div>
                );
            })}

            {
              messagelist[id] &&
              messagelist[id].map((message, index) => {
                return (
                    <div className={message.side === "left" ? " message" : "message2"} key={index.toString()}>
                        <div className={message.side === "left" ? "left-side message" : " right-side"} >
                          <p>{message.text}</p>
                          <span> <small>{formatMessageTime(message.timestamp)}</small> </span>
                        </div>
                    </div>
                );
            })}
            <div ref={messageEndRef}/>
        </div>


        <div className="chatside-bottom">
          <Input type="text" value={text} className="chatsidebottom-input"  onChange={onChange}   placeholder="Message"
            prefix={ <SmileOutlined style={{ color: "white", paddingRight: "5px" }} />}
            suffix={<PaperClipOutlined style={{ color: "white" }} />}/>
          <Button onClick={onClick}><SendOutlined /></Button>
        </div>
    </div>
  );
};

export default ChatSideContent;

                 
