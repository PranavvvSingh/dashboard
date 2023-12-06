import React from "react";
import "./App.css";
import BubbleChart from "./components/BubbleChart";
import BarChart from "./components/BarChart";
import DoughnutChart from "./components/DoughnutChart";
import RadarChart from "./components/RadarChart";
import Layout from "./components/Layout"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BoxPlot from "./components/BoxPlot";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<BubbleChart />} />
          <Route path="radar" element={<RadarChart />} />
          <Route path="doughnut" element={<DoughnutChart />} />
          <Route path="bar" element={<BarChart />} />
          <Route path="boxplot" element={<BoxPlot />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
