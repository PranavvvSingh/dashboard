/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import axios from "axios";
import Chart from "chart.js/auto";
import Select from "react-select";
import {regions, countries} from "../data/constants"

const BubbleChart = () => {
  const [userData, setUserData] = useState([]);
  const [region, setRegion] = useState("");
  const [country, setCountry] = useState("");

  useEffect(() => {
    axios
      .get("https://visdashboard.onrender.com/chart/bubble", {
        params: {
          region: region,
          country: country,
        },
      })
      .then((response) => {
        setUserData(response.data);
      });
  }, [region, country]);

  const data = {
    datasets: [
      {
        label: "Relevance",
        data: userData.map((item) => ({
          x: item.intensity,
          y: item.likelihood,
          r: item.relevance * 2,
          color: `rgba(0, 0, 255, ${item.relevance / 5 + 0.5})`,
        })),
      },
    ],
  };
  const options = {
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: { size: 14 },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Intensity",
          font: { size: 16 },
        },
      },
      y: {
        title: {
          display: true,
          text: "Likelihood",
          font: { size: 16 },
        },
      },
    },
  };

  const chartRef = React.useRef();

  useEffect(() => {
    const chart = new Chart(chartRef.current, {
      type: "bubble",
      data: data,
      options: options,
    });

    return () => chart.destroy();
  }, [userData]);

  const handleRegionChange = (selectedOption) => {
    setRegion(selectedOption.value);
  };
  const handleCountryChange = (selectedOption) => {
    setCountry(selectedOption.value);
  };

  return (
    <div className="w-[calc(100%-350px)] p-5 flex flex-col items-center justify-evenly space-y-2">
      <div className="flex justify-center space-x-7">
        <div className="flex items-center gap-1">
          Region:
          <Select
            options={regions}
            defaultValue={{ value: "", label: "All" }}
            onChange={handleRegionChange}
            placeholder="Select Region"
            className="w-48"
          />
        </div>
        <div className="flex items-center gap-1">
          Country:
          <Select
            options={countries}
            defaultValue={{ value: "", label: "All" }}
            onChange={handleCountryChange}
            placeholder="Select Country"
            className="w-48"
          />
        </div>
      </div>
      <div className="w-[700px] mt-5">
        <canvas ref={chartRef} />
      </div>
      <div className="text-center px-5">
        🔗Bubble chart shows the relationship between intensity, likelihood, and
        relevance where the size of the bubble indicates its relevance.
      </div>
    </div>
  );
};

export default BubbleChart;
