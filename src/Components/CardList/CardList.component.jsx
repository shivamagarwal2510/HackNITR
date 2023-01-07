    import React from "react";
    import Card from "../Card/Card.component";
    
    const CardList = ({playlists})=>{
        
        return(
            <> 
            
            <div className="cardList flex flex-col flex-wrap ">
            {
            (playlists[0]!==undefined)?(

            <strong className="mt-12 ml-10 text-2xl">Courses by {playlists[0].snippet.channelTitle}</strong>):(
                <h1>Loading...</h1>
            )
            }
                <div className="cards flex flex-wrap m-auto w-[95vw]">
                {
                    playlists.map(playlist=>{
                        const course ={
                            id:playlist.id,
                            title:playlist.snippet.title,
                            thumbnail:playlist.snippet.thumbnails.medium.url
                        }
                        return(
                            <Card playlist={course}/>
                        )
                    })
                }
                </div>
            </div>
            </>
        )
    }
    
    export default CardList;