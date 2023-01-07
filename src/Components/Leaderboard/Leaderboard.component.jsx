import React from 'react';
import { useEffect } from 'react';
var axios = require("axios");
var data =
  '{\r\n    "title":"Simple Bar Chart",\r\n    "theme":"Light",\r\n    "data":[\r\n        {\r\n            "value":10,\r\n            "label":"label a"\r\n        },\r\n        {\r\n            "value":20,\r\n            "label":"label b"\r\n        },\r\n        {\r\n            "value":80,\r\n            "label":"label c"\r\n        },\r\n        {\r\n            "value":50,\r\n            "label":"label d"\r\n        },\r\n        {\r\n            "value":70,\r\n            "label":"label e"\r\n        },\r\n        {\r\n            "value":25,\r\n            "label":"label f"\r\n        },\r\n        {\r\n            "value":60,\r\n            "label":"label g"\r\n        }\r\n    ]\r\n}';

var config = {
  method: "post",
  url: "https://api.apyhub.com/generate/charts/bar/file",
  headers: {
    "apy-token": "APT0VVxnNCuFDPhFzuvwppCZmW5BMDVZZaSICVhv9gwEnyLIbMTh",
    "Content-Type": "text/plain",
  },
  data: data,
};


axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });


const Leaderboard = ()=> {
  return (
    <div>
      Leaderboard
    </div>
  )
}
export default Leaderboard;