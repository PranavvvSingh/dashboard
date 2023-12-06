import React, { useState, useEffect } from "react";
import axios from "axios";
import { BoxPlotChart } from "@sgratzl/chartjs-chart-boxplot";
import Select from "react-select";
import {sectors as options} from "../data/constants"

const BoxPlot = () => {
  const [userData, setUserData] = useState([]);
  const [topic, setTopic] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:3000/chart/boxplot", {
        params: {
          topic: topic,
        },
      })
      .then((response) => {
        setUserData(response.data);
      });
  }, [topic]);
  const data = {
    labels: ["Likelihood", "Relevance"],
    datasets: [
      {
        backgroundColor: ["#FF8080", "#82A0D8"],
        borderColor: ["red","blue"],
        borderWidth: 1,
        outlierColor: "#999999",
        padding: 10,
        itemRadius: 2,
        data: [
          userData.map((item) => item.likelihood),
          userData.map((item) => item.relevance),
        ],
      },
    ],
  };

  const radar = React.useRef();

  useEffect(() => {
    const chart = new BoxPlotChart(radar.current, {
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            title: { display: true, text: "Frequency", font: { size: 16 } },
          },
          x: {
            ticks: { font: { size: 16 } },
          },
        },
      },
    });

    return () => chart.destroy();
  }, [userData]);

  const handleChange = (selectedOption) => {
    setTopic(selectedOption.value);
  };
  return (
    <div className="w-[calc(100%-350px)] flex flex-col p-5 justify-evenly items-center space-y-2">
      <div className="flex items-center gap-1">
        Topic:
        <Select
          options={options}
          defaultValue={{ value: "oil", label: "Oil" }}
          onChange={handleChange}
          className="w-48"
        />
      </div>
      <div className="w-[600px]">
        <canvas ref={radar} />
      </div>
      <div className="text-center px-5">
        🔗This boxplot shows the distribution of likelihood & relevance for a
        topic. Each box plot represents a topic, providing insights into the
        median, quartiles, and potential outliers.
      </div>
    </div>
  );
};

export default BoxPlot;
