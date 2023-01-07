import React from "react";
import { PlayCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import {Link} from "react-router-dom"
import { handleAddToBookmarks } from "../../utils/firebase/firebase.utils";
import { UserContext } from "../../contexts/user.context";
import { useContext } from "react";


const Card= ({playlist})=>{
    
    const {currentUser} = useContext(UserContext);
    const {id, title, thumbnail} = playlist;
    
    return(
        <>
       
            <div className="card border-2 rounded shadow-xl w-56 m-2 h-[250px] hover:shadow-slate-50 relative" >
               
                <img src = {`${thumbnail}`} alt="house"  />
                
                <p className="p-3">{`${title} `}</p>
                
                <div className="mb-2 absolute bottom-2 left-12">
                <Link to="/video-player" state={{ 
                    playlistID:`${id}`}}><PlayCircleOutlined/></Link>
                    
                </div>
                
                <div className="mb-2 absolute bottom-2 right-12">
               
                    <PlusCircleOutlined onClick={()=>{
                        handleAddToBookmarks(currentUser, playlist);
                    }} 
                    />
                
                </div>
            </div>
       
        </>
    )
}

export default Card;