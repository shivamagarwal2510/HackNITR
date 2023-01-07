import { useEffect, useState } from "react";
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
  var totalEasy = [];
  var totalMedium = [];
  var totalHard = [];
  var totalScore = [];
  var acceptanceRate = [];
  const [totalEasys, setTotalEasy] = useState([]);
  const [totalMediums, setTotalMedium] = useState([]);
  const [totalHards, setTotalHard] = useState([]);
  const [data, setData] = useState({
    labels: ["Shivam", "Srishti"],
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
    labels: ["Shivam", "Srishti"],
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
      var userIds = ["itzSrish", "Shivamagarwal2510"];
      const url = "https://leetcode-stats-api.herokuapp.com/";
      var count = 0;
      userIds.map( (data) => {
        var finalUrl = url + data;
        console.log(finalUrl);
        fetch(finalUrl)
          .then((data) => {
            // console.log("Api data", data);
            const res = data.json();
            return res;
          })
          .then((res) => {
            console.log("ressss", res);
            // console.log("easy", res.easySolved);
            console.log(data, res.totalSolved);
            totalEasy.push(res.easySolved);
            totalMedium.push(res.mediumSolved);
            totalHard.push(res.hardSolved);
            totalScore.push(res.totalSolved);
            acceptanceRate.push(res.acceptanceRate);
            // console.log("Easy", totalEasy);
            //  setTotalEasy(totalEasy)
            //  setTotalMedium(totalMedium)
            //  setTotalHard(totalHard)

            setData({
              labels: userIds,
              datasets: [
                {
                  label: "Easy",
                  data: totalEasy,
                  borderColor: "green",
                  backgroundColor: "green",
                },
                {
                  label: "Medium",
                  data: totalMedium,
                  borderColor: "yellow",
                  backgroundColor: "yellow",
                },
                {
                  label: "Hard",
                  data: totalHard,
                  borderColor: "red",
                  backgroundColor: "red",
                },
              ],
            });
            setData1({
              labels: userIds,
              datasets: [
                {
                  label: "Total",
                  data: totalScore,
                  borderColor: "blue",
                  backgroundColor: "blue",
                },
                {
                  label: "Acceptance Rate",
                  data: acceptanceRate,
                  borderColor: "light green",
                  backgroundColor: "light green",
                },
              ],
            });
          });
      });
      console.log("final", userIds, totalScore);
    };

    fetchData();
  }, []);

  return (
    <div
      style={{
        width: "50%",
        height: "30%",
        display: "flex",
        marginTop: "140px",
      }}
    >
      <Bar data={data} options={options} />
      <Bar data={data1} options={options1} />
    </div>
  );
};
export default Leaderboard;
