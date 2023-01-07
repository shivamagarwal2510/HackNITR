import { useLocation } from 'react-router-dom';
import getPlaylistItems from '../../apis/getVideos';
import { useState, useEffect } from 'react';
import CardList2 from '../CardList2/CardList2.component';
import ReactPlayer from 'react-player';
import { PlayedContext } from '../../contexts/played.context';
import { useContext } from 'react';

const VideoPlayer = ()=>{
    const {played, setPlayed} = useContext(PlayedContext);

    const [playlistItems, setPlaylistItems] = useState([]);
    const [videoIds, setVideoIds] = useState([]);
    const [currentVideoId, setCurrentVideoId] = useState({currentVideoId:""});
    const [currentVideo, setCurrentVideo] = useState();
    
    const location = useLocation();
    const{playlistID} = location.state;
   
    const n = playlistItems.length;
    useEffect(()=>{
        getPlaylistItems(playlistID).then((playlistItemsRes)=>{
            setPlaylistItems(playlistItemsRes);
            var videoIds=[];
            playlistItemsRes.forEach((playlistItem)=>{
                videoIds.push(playlistItem.snippet.resourceId.videoId);

            }); 
            setVideoIds(videoIds);
            setCurrentVideoId({currentVideoId:videoIds[0], index:0});
            setCurrentVideo(playlistItemsRes[0]);
        })
    },[])
   
    console.log(played)
    const url = `https://www.youtube.com/watch?v=${currentVideoId.currentVideoId}`;
    const handleVideoEnded = ()=>{
        var i=currentVideoId.index;
        setCurrentVideoId({currentVideoId:videoIds[(i+1)%n],index:(i+1)%n});
        
        setCurrentVideo(playlistItems[(i+1)%n]);

    }
    
    let description;
    if(currentVideo!==undefined){ description = currentVideo.snippet.description;}
    
    
    // console.log(description);
    return(
        <>
        
        <div className='flex'>
            <div className='w-[80vw] h-[90vh] overflow-y-auto overflow-x-hidden'>
                <ReactPlayer 
                controls={true}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                url={url}
                playing={true}
                className="react-player"
                width="auto%"
                height={700}
                onEnded={handleVideoEnded}
                onProgress={(progress) => {
                    setPlayed(progress.playedSeconds);
                  }}
                />
                <strong>Description</strong>
                <p>
                    {
                        description
                    }
                </p>
            </div>
            <div className='h-[90vh] overflow-y-auto overflow-x-hidden'>
            <CardList2 playlistItems={playlistItems} currentVideo={currentVideo} currentVideoId={currentVideoId} setCurrentVideo={setCurrentVideo} setCurrentVideoId={setCurrentVideoId}/>
            </div>
        </div>
        </>
    )
}
export default VideoPlayer;