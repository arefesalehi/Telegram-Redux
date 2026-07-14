import {Link} from "react-router-dom";
import {slugGenerator} from "../helpers/slug";
import {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {getSidebarContacts} from "../redux/slices/sidebarContacts";



const SidebarThread = () => {
    const {sidebarContacts} = useSelector((state) => state.sidebarContact);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getSidebarContacts());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <> 
        {
         sidebarContacts?.map((contact, id) => {
            return (
                <Link to={`/contacts/${contact.id}/${slugGenerator(contact.name)}`} key={contact.id.toString()}
                    className="sidebar-thread">
                        <img className="avatar" src={contact.picture} alt="pic"/>
                        <div className="sidebarThread-detail">
                            <h4>{contact.name}</h4>
                            <div>{contact.lastChat}</div>
                            <small className="sidebarThread-timeStamp">{contact.latest_timestamp} </small>
                        </div>
                </Link>
                );
            })
        } 
        </>
    );
};

export default SidebarThread;
