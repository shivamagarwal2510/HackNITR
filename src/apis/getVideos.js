const Key = "AIzaSyDZZth3C_rCee38NWp8HA8BMPRv2OWQdao";
const _URL = "https://youtube.googleapis.com/youtube/v3/playlistItems?";
//https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=10&playlistId=PLu0W_9lII9agx66oZnT6IyhcMIbUMNMdt&key=AIzaSyDZZth3C_rCee38NWp8HA8BMPRv2OWQdao
var videoIDs = [];
var nextPageToken = "";

const getPlaylistItems = async (playlistId)=>{
    try {
        var url = _URL + "part=snippet&maxResults=1000&playlistId="+playlistId+"&key=" + Key;
        const data = await (await fetch(url)).json();
        
        videoIDs =await data.items;
        
        return videoIDs;
    } catch (error) {
        console.log(error);
    }
    
}

export default getPlaylistItems;