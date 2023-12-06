import React, { useState, useEffect } from "react";
import axios from "axios";
import Chart from "chart.js/auto";
import Select from "react-select";
import {pestle as options} from "../data/constants"

const DoughnutChart = () => {
  const [userData, setUserData] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([
    options[0],
    options[1],
    options[2],
    options[3],
  ]);
  useEffect(() => {
    axios.get("http://localhost:3000/chart/pestle").then((response) => {
      setUserData(response.data);
    });
  }, []);

  const radar = React.useRef();

  useEffect(() => {
    const filteredData = userData.filter((item) =>
      selectedOptions.some((selected) => selected.value === item.pestle)
    );
    const data = {
      labels: filteredData.map((item) => item.pestle),
      datasets: [
        {
          data: filteredData.map((item) => item.count),
          backgroundColor: [
            "rgb(255, 99, 132)", // Red
            "rgb(54, 162, 235)", // Blue
            "rgb(255, 205, 86)", // Yellow
            "rgb(75, 192, 192)", // Green
            "rgb(153, 102, 255)", // Purple
            "rgb(255, 159, 64)", // Orange
            "rgb(255, 50, 50)", // Bright Red
            "rgb(0, 0, 255)", // Bright Blue
            "rgb(0, 255, 0)", // Bright Green
            "rgb(128, 0, 128)", // Violet
          ],
          hoverOffset: 4,
        },
      ],
    };

    const chart = new Chart(radar.current, {
      type: "doughnut",
      data: data,
      options: {
        aspectRatio: 1.5,
        plugins: {
          legend: {
            position: "right",
          },
        },
      },
    });

    return () => chart.destroy();
  }, [userData, selectedOptions]);

  const handleChange = (selectedOption) => {
    setSelectedOptions(selectedOption);
  };

  return (
    <div className="w-[calc(100%-350px)] flex flex-col px-5 justify-evenly items-center space-y-2">
      <div className="flex gap-1 items-center">
        PESTLE:
        <Select
          isMulti
          options={options}
          placeholder="Select PESTLE"
          value={selectedOptions}
          onChange={handleChange}
          isSearchable={true}
          className="w-[650px]"
        />
      </div>
      <div className="w-[500px]">
        <canvas ref={radar} />
      </div>
      <div className="text-center px-5">
        🔗The chart displays the distribution of frequency for the selected
        PESTLE(Political, Economic, Social, Technological, Lifestyles,
        Environmental) fields.
      </div>
    </div>
  );
};

export default DoughnutChart;
