import "../assets/styles/message.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Route, Routes, useParams } from "react-router-dom";
import Home from "../pages/Home/index";


const Message = () => {
  const [, setMsgs] = useState([]);
  const { id, slug } = useParams();
  console.log({ id, slug });
  
  
  useEffect((id) => {
    getMsg();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);


  const getMsg = async () => {
    try {
      const { data } = await axios({
        url: `${process.env.REACT_APP_API_URL}/friends/${id}`,
      });
      setMsgs(data.chatlog);
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/message/*" element={<Message />}>
          <Route path="/message/*/:id" element={<Message />} />
          <Route path="/message/*/:id/:slug" element={<Message />} />
        </Route>
      </Routes>
    </>
  );
};

export default Message;
