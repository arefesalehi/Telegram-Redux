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

 
  useEffect((id) => {
    getMsg();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);


  const onChange = (e)=>{
    setText(e.target.value); 
  }

  
  const getMsg = async () => {
    try {
        const { data } = await axios({
        url: `http://localhost:7000/friends/${id}`,
      });
        setMsgs(data.chatlog.reverse());
        } catch (error) {
        console.log(error);
    }   
  };


const onClick =()=>{
  if(!text.trim()){
    return;
  }else{
    dispatch(ADD_MESSAGE({id , text ,side:'right', timestamp:new Date().toLocaleString()}))
    setTimeout(() => {
      dispatch(ADD_MESSAGE({id , text:"Message recieved" ,side: 'left' , timestamp:new Date().toLocaleString()}))
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
                          <span> <small>{new Date(message.timestamp).getHours() + ":" + new Date(message.timestamp).getMinutes()}</small> </span>
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

                 