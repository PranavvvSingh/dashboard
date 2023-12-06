import React, { useState, useEffect } from "react";
import axios from "axios";
import Chart from "chart.js/auto";
import Select from "react-select";
import {pestle as options} from "../data/constants"

const RadarChart = () => {
  const [userData, setUserData] = useState([]);
  const [pestle, setPestle] = useState("Economic");
  useEffect(() => {
    axios
      .get("https://visdashboard.onrender.com/chart/radar", {
        params: {
          pestle: pestle,
        },
      })
      .then((response) => {
        setUserData(response.data);
      });
  }, [pestle]);
  const data = {
    labels: ["Intensity", "Likelihood", "Relevance"],
    datasets: [
      {
        label: "pestle",
        data: userData.map((item) => item.average),
        fill: true,
        backgroundColor: ["#FF8080", "#8EA7E9", "#C7DCA7"],
      },
    ],
  };

  const bar = React.useRef();

  useEffect(() => {
    const chart = new Chart(bar.current, {
      type: "bar",
      data: data,
      options: {
        scales: {
          y: { title: { display: true, text: "Mean", font: { size: 16 } } },
          x: { ticks: { font: { size: 16 } } },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
    return () => chart.destroy();
  }, [userData]);


  const handleChange = (selectedOption) => {
    setPestle(selectedOption.value);
  };
  return (
    <div className="w-[calc(100%-350px)] flex flex-col p-5 justify-evenly items-center space-y-2">
      <div className="flex items-center gap-1">
        PESTLE:
        <Select
          options={options}
          onChange={handleChange}
          defaultValue={{ value: "Environmental", label: "Environmental" }}
          placeholder="Select PESTLE"
          className="w-48"
        />
      </div>
      <div className="w-[600px]">
        <canvas ref={bar} />
      </div>
      <div className="text-center px-5">
        🔗The chart provides a view of the mean values for intensity,
        likelihood, and relevance across various PESTLE (Political, Economic,
        Sociocultural, Technological, Legal, Environmental) fields.
      </div>
    </div>
  );
};

export default RadarChart;
