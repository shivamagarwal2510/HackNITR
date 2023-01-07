const Key = "AIzaSyDZZth3C_rCee38NWp8HA8BMPRv2OWQdao";
const _URL = "https://youtube.googleapis.com/youtube/v3/playlists?";

// https://youtube.googleapis.com/youtube/v3/playlists?part=snippet&channelId=UCeVMnSShP_Iviwkknt83cww&maxResults=10&key=AIzaSyDZZth3C_rCee38NWp8HA8BMPRv2OWQdao

var playlistIDs = [];
var nextPageToken = "";

const getPlaylists = async (channelId)=>{
    var url = _URL + "part=snippet&channelId=" + channelId + "&maxResults=10&key=" + Key;
    const data = await (await fetch(url)).json();
    playlistIDs =await data.items;
    
    return playlistIDs;
}

export default getPlaylists;