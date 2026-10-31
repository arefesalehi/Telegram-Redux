import '../assets/styles/telegram.css';
import Sidebar from './Sidebar';
import ChatSide from './ChatSide';
import { useLocation } from 'react-router-dom';

const Telegram = () => {
  const location = useLocation();
  const isChatOpen = location.pathname.startsWith('/contacts/');

  return (
    <div className={`telegram${isChatOpen ? ' is-chat-open' : ''}`}>
      <Sidebar/>
      <ChatSide/>
    </div>
  )
}

export default Telegram
