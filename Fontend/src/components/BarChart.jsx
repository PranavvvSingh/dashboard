import React, { useEffect, useState } from "react";
import axios from "axios";
import Chart from "chart.js/auto";

const BarChart = () => {
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3000/chart/bar").then((response) => {
      setUserData(response.data);
      console.log(response.data)
    });
  }, []);

  const data = {
    labels: userData.map((item) => item.sector),
    datasets: [
      {  
        data: userData.map((item) => item.count),
        backgroundColor: [
          "rgb(255, 99, 132)", // Red
          "rgb(54, 162, 235)", // Blue
          "rgb(255, 205, 86)", // Yellow
          "rgb(75, 192, 192)", // Green
        ],
        borderWidth: 1,
      },
    ],
  };

  const radar = React.useRef();

  useEffect(() => {
    const chart = new Chart(radar.current, {
      type: "bar",
      data: data,
      options: {
        y: {
          min: 0,
          max: 500,
        },
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            title: { display: true, text: "Frequency", font: { size: 16 } },
            ticks: { font: { size: 14 } },
          },
          x: {
            ticks: { font: { size: 14 } },
          },
        },
      },
    });

    return () => chart.destroy();
  }, [userData]);

  return (
    <div className="w-[calc(100%-350px)] flex flex-col justify-evenly items-center">
      <div className="w-[800px]">
        <canvas ref={radar} />
      </div>
      <div className="text-center px-5">
        🔗This chart depicts the distrubution of frequency across various sectors.
      </div>
    </div>
  );
};

export default BarChart;
