import { useEffect, useState } from "react";
import "./Leaderboard.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

import Profiles from "./Profiles";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


const options = {
  indexAxis: "x",
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "right",
    },
    title: {
      display: true,
      text: "Level wise analysis",
    },
  },
};
const options1 = {
  indexAxis: "x",
  elements: {
    bar: {
      borderWidth: 2,
      width: "5px",
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "right",
    },
    title: {
      display: true,
      text: "Total Question Solved",
    },
  },
};

const Leaderboard = () => {
  var totalEasy = {};
  var totalMedium = {};
  var totalHard = {};
  var totalScore = {};
  var acceptanceRate = {};
  //   var rankings = new Map();

  const [totalEasys, setTotalEasy] = useState([]);
  const [totalMediums, setTotalMedium] = useState([]);
  const [totalHards, setTotalHard] = useState([]);
  const [sortedRankings, setSortedRankings] = useState({});
  const [rankings, setRankings] = useState({});
  const [data, setData] = useState({
    labels: ["itzSrish", "Shivamagarwal2510", "ipriyanshi"],
    datasets: [
      {
        label: "Easy",
        data: [],
        borderColor: "green",
        backgroundColor: "rgba(25, 90, 13, 0.5)",
      },
      {
        label: "Medium",
        data: [],
        borderColor: "yellow",
        backgroundColor: "rgba(25, 90, 13, 0.5)",
      },
      {
        label: "Hard",
        data: [],
        borderColor: "red",
        backgroundColor: "rgba(25, 90, 13, 0.5)",
      },
    ],
  });
  const [data1, setData1] = useState({
    labels: ["itzSrish", "Shivamagarwal2510", "ipriyanshi"],
    datasets: [
      {
        label: "Total",
        data: [],
        borderColor: "blue",
        backgroundColor: "blue",
      },
      {
        label: "Total",
        data: [],
        borderColor: "light green",
        backgroundColor: "light green",
      },
    ],
  });
  useEffect(() => {
    const fetchData = async () => {
      var userIds = ["itzSrish", "Shivamagarwal2510", "ipriyanshi"];
      const url = "https://leetcode-stats-api.herokuapp.com/";
      var count = 0;
      userIds.map(async (data) => {
        var finalUrl = url + data;
        console.log(finalUrl);
        await fetch(finalUrl)
          .then((data) => {
            // console.log("Api data", data);
            const res = data.json();
            return res;
          })
          .then((res) => {
            console.log("ressss", res);
            // console.log("easy", res.easySolved);
            console.log(data, res.totalSolved);
            totalEasy[data] = res.easySolved;
            totalMedium[data] = res.mediumSolved;
            totalHard[data] = res.hardSolved;
            totalScore[data] = res.totalSolved;
            acceptanceRate[data] = res.acceptanceRate;
            rankings[data] = res.ranking;
            console.log("totalScore", totalScore);
            // console.log("Easy", totalEasy);
            //  setTotalEasy(totalEasy)
            //  setTotalMedium(totalMedium)
            //  setTotalHard(totalHard)
             var totalScoreArr = [];
             var userIdsArr = [];
             for (var key in totalScore) {
               totalScoreArr.push(
                 totalScore[key]
               );
               userIdsArr.push(key);
             }
             var totalEasyArr = [];
             
             for (var key in totalEasy) {
               totalEasyArr.push(totalEasy[key]);
             }
             var totalMedArr = [];
             
             for (var key in totalMedium) {
               totalMedArr.push(totalMedium[key]);
             }
             var totalHardArr = [];
             
             for (var key in totalHard) {
               totalHardArr.push(totalHard[key]);
             }
             var acceptanceRateArr = [];
             
             for (var key in acceptanceRate) {
               acceptanceRateArr.push(acceptanceRate[key]);
             }
            setData({
              labels: userIdsArr,
              datasets: [
                {
                  label: "Easy",
                  data: totalEasyArr,
                  borderColor: "green",
                  backgroundColor: "green",
                },
                {
                  label: "Medium",
                  data: totalMedArr,
                  borderColor: "yellow",
                  backgroundColor: "yellow",
                },
                {
                  label: "Hard",
                  data: totalHardArr,
                  borderColor: "red",
                  backgroundColor: "red",
                },
              ],
            });
            setData1({
              labels: userIdsArr,
              datasets: [
                {
                  label: "Total",
                  data: totalScoreArr,
                  borderColor: "blue",
                  backgroundColor: "blue",
                },
                {
                  label: "Acceptance Rate",
                  data: acceptanceRateArr,
                  borderColor: "light green",
                  backgroundColor: "light green",
                },
              ],
            });
          });
      });
    };

    fetchData();
  }, []);

  var array = [];
  for (var key in rankings) {
    array.push({
      name: key,
      value: rankings[key],
    });
  }
  

  var sorted = array.sort(function (a, b) {
    return a.value > b.value ? 1 : b.value > a.value ? -1 : 0;
  });
  console.log("rankings", rankings);
  console.log("sorted", sorted);

  return (
    <>
      <div
        style={{
          width: "50%",
          height: "30%",
          display: "flex",
          marginTop: "50px",
        }}
      >
        <Bar data={data} options={options} />
        <Bar data={data1} options={options1} />
      </div>
      <div className="board w-[80%] mt-10 m-auto" >
        <strong className="leaderboard mt-20 text-2xl">Leaderboard</strong>
        <Profiles
          Leaderboard={sorted}
        ></Profiles>
      </div>
    </>
  );
};
export default Leaderboard;
