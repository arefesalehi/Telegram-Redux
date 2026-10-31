import ChatSideContent from './ChatSideContent';
import {Route,Routes} from 'react-router-dom';
import "../assets/styles/chatside.css";
import Home from '../pages/Home/index';


const ChatSide = () => {
  return (
    <div className='chatside'>
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route path="/contacts/*" element={<ChatSideContent />}>
              <Route path="/contacts/*/:id" element={<ChatSideContent />} />
              <Route path="/contacts/*/:id/:slug" element={<ChatSideContent />} />
          </Route>
        </Routes>
    </div>
  )
}

export default ChatSide;
