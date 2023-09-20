//START IMPORTS
import { CardHeader, Card, CardContent, Container } from "@mui/material";
import React from "react";
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
import { useGetBPDQuery } from "../../features/product/productApiSlice";
import BouncingDotsLoader from "../BouncingLoader/BouncingLoader";
//STOP IMPORTS

//register components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Brand Product Distribution",
    },
  },
  maintainAspectRatio: false,
  scales: {
    y: {
      ticks: {
        font: {
          size: 18,
        },
      },
    },
    x: {
      ticks: {
        font: {
          size: 20,
        },
      },
    },
  },
};

const BrandProductDistribution = () => {
  const {
    data: distribution_data,
    isSuccess,
    isLoading,
    isError,
  } = useGetBPDQuery();
  console.log(distribution_data);
  const labels = distribution_data?.map((ele) => ele._id[0]);
  const dataset = distribution_data?.map((ele) => ele?.ptotal);
  //config barchart

  //render UI
  return (
    <>
      <Container sx={{ mt: "1rem" }}>
        {isLoading ? (
          <BouncingDotsLoader />
        ) : (
          <Card sx={{ backgroundColor: "#f6e5ff" }}>
            <CardHeader title="Brand Product Distribution Analysis" />
            <CardContent>
              {isSuccess && labels?.length && dataset?.length > 0 && (
                <Bar
                  width={"600px"}
                  height={"600px"}
                  options={options}
                  data={{
                    labels,
                    datasets: [
                      {
                        label: "No of Products",
                        data: dataset,
                        backgroundColor: "#9256ff",
                      },
                    ],
                  }}
                />
              )}
            </CardContent>
          </Card>
        )}
        {isError && <div>Try again later</div>}
      </Container>
    </>
  );
};

export default BrandProductDistribution;
