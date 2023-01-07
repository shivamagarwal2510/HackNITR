import getPlaylists from "../../apis/playlists";
import getPlaylistItems from "../../apis/getVideos";
import CardList from "../../Components/CardList/CardList.component";
import { useState, useEffect } from "react";

const Courses = ()=>{

   const [playlists1, setPlaylists1]  = useState([]);
   const [playlists2, setPlaylists2]  = useState([]);
   const [playlists3, setPlaylists3]  = useState([]);
   const [playlists4, setPlaylists4]  = useState([]);
   const channelIds = ["UCeVMnSShP_Iviwkknt83cww", "UC29ju8bIPH5as8OGnQzwJyA", "UCW5YeuERMmlnqo4oq8vwUpg", "UC8butISFwT-Wl7EV0hUK0BQ"];
   
   useEffect(()=>{
    const playlistIDsres= getPlaylists("UCeVMnSShP_Iviwkknt83cww");
    playlistIDsres.then((playlistIDs)=>{
        setPlaylists1(playlistIDs);
    })
   },[])
   useEffect(()=>{
    const playlistIDsres= getPlaylists("UC29ju8bIPH5as8OGnQzwJyA");
    playlistIDsres.then((playlistIDs)=>{
        setPlaylists2(playlistIDs);
    })
   },[])
   useEffect(()=>{
    const playlistIDsres= getPlaylists("UCW5YeuERMmlnqo4oq8vwUpg");
    playlistIDsres.then((playlistIDs)=>{
        setPlaylists3(playlistIDs);
    })
   },[])
   useEffect(()=>{
    const playlistIDsres= getPlaylists("UC8butISFwT-Wl7EV0hUK0BQ");
    playlistIDsres.then((playlistIDs)=>{
        setPlaylists4(playlistIDs);
    })
   },[])
   
    return(
        <>
        <div className="allCourses">
            <CardList playlists={playlists1}></CardList>
            <CardList playlists={playlists2}></CardList>
            <CardList playlists={playlists3}></CardList>
            <CardList playlists={playlists4}></CardList>
        </div>
        </>
        
    )
}
export default Courses;