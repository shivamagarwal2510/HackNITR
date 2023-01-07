import axios from "axios"
const Key = "";
const instance = axios.create({
    baseURL: "https://www.googleapis.com/youtube/v3/",
    params: {
      part: "snippet",
      type: "playlist",
      maxResults: 10,
      key: KEY,
    },
  });
 
  export default instance;