import React from "react";
import { CaretRightOutlined, DeleteOutlined  } from '@ant-design/icons';
import {Link, useNavigate} from "react-router-dom"
import { UserContext } from "../../contexts/user.context";
import { DeleteContext } from "../../contexts/delete.context";
import { useContext } from "react";
import { deleteCourse } from "../../utils/firebase/firebase.utils";

const Card3= ({playlist})=>{
    const navigate = useNavigate();
    const {currentUser} = useContext(UserContext);
    const {deletePressed,setDeletePressed} = useContext(DeleteContext);
    const {id, title, thumbnail} = playlist;
    
    return(
        <>
       
            <div className="card border-2 rounded shadow-xl w-56 m-2 h-[250px] hover:shadow-slate-50 relative" >
                <img src = {`${thumbnail}`} alt="image"  />
                <p className="p-3">{`${title}`}</p>
                
                <div className="mb-2 absolute bottom-2 left-12">
                <Link to="/video-player" state={{ 
                    playlistID:`${id}`}}><CaretRightOutlined/></Link>
                   
                </div>
                
                <div className="mb-2 absolute bottom-2 right-12">
               
                    <DeleteOutlined  onClick={()=>{
                        deleteCourse(currentUser, id).then(()=>{
                            console.log("render2");
                            if(deletePressed===1){
                            setDeletePressed(2);
                        }
                        else{
                            setDeletePressed(1);
                        }
                        })
                        setTimeout(() => navigate("/my-courses"), 2000);
                        
                    }} 
                    />
                
                </div>
            </div>
       
        </>
    )
}

export default Card3;