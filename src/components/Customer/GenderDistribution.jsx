//START IMPORTS
import React from "react";
import { selectAllUserAccounts } from "../../features/accounts/accountsApiSlice";
import { useSelector } from "react-redux";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
//STOP IMPORTS

//register donught chart
ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "User Gender Distribution",
    },
  },
  maintainAspectRatio: false,
};

const GenderDistribution = () => {
  const accounts = useSelector(selectAllUserAccounts);
  const accData = accounts?.reduce((acc, cur) => {
    return { ...acc, [cur["gender"]]: (acc[cur["gender"]] || 0) + 1 };
  }, {});
  const data = {
    labels: Object?.keys(accData),
    datasets: [
      {
        label: "Gender Count",
        data: Object?.values(accData),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default GenderDistribution;
