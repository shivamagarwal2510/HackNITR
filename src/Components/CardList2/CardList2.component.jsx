import React from "react";
import Card2 from "../Card2/Card2.component";

const CardList2 = ({playlistItems, currentVideo, currentVideoId, setCurrentVideo, setCurrentVideoId})=>{
    
    return(
        <>
        
        <div className="cardList ">
        
            <div className="cards  ml-auto w-[20vw]">
            {
                playlistItems.map(playlistItem=>{
                    
                    return(
                        <Card2 playlistItem={playlistItem} currentVideo={currentVideo} currentVideoId={currentVideoId} setCurrentVideo={setCurrentVideo} setCurrentVideoId={setCurrentVideoId}/>
                    )
                })
            }
            </div>
        </div>
        </>
    )
}

export default CardList2;