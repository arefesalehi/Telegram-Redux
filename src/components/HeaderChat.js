import { PhoneFilled ,SearchOutlined} from "@ant-design/icons";
import RightSide from "./RightSide";
import { Space } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUserProfile } from "../redux/slices/userProfile";
import '../assets/styles/headerchat.css'
import ContactAvatar from "./ContactAvatar";



const HeaderChat =  (props) => {
  const dispatch = useDispatch();
  const userId = parseInt(props.userProfileId);
  const userProfile =  useSelector((state) => state.userProfile.userProfile);


  useEffect(() => {
    dispatch(getUserProfile());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  if(!userProfile){
    return (<div></div>);
  }

  const profiles = Array.isArray(userProfile) ? userProfile : [];
  const contact = profiles.find((value) => Number(value.id) === userId);

  if (!contact) {
    return <div className="chatside-header" />;
  }

  return (
    <div className="chatside-header">
      <Space>
        <ContactAvatar key={contact.id} name={contact.name} picture={contact.picture} id={contact.id} />
        <div className="chatsideheader-profile">
          <h4>{contact.name}</h4>
          <p>{"online"}</p>
        </div>
      </Space>

      <div className="chatsideHeader-right">
        <button ><SearchOutlined/></button>
        <button><PhoneFilled /></button>
        <RightSide />
      </div>
    </div>
  );
};

export default HeaderChat;
