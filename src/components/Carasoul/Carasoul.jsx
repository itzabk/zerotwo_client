//START IMPORTS
import React from "react";
import { selectAllProducts } from "../../features/product/productApiSlice";
import { useSelector } from "react-redux";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import currencyFormatter from "../../utils/formatCurrency";
import { Box, Typography } from "@mui/material";
//STOP IMPORTS

const Carasoul = () => {
  const products = useSelector(selectAllProducts);
  const result = products?.map((ele) => (
    <Box sx={{ backgroundColor: "whitesmoke" }} key={ele?.pname}>
      <img src={ele?.pimg} alt={ele?.pname} height={"100px"} width={"100px"} />
      <Box sx={{ fontFamily: "monserrat" }}>
        {" "}
        <Typography variant="h5" color={"secondary"}>
          {ele?.pname}
        </Typography>
        <Typography variant="h6" color={"primary"}>
          {currencyFormatter(ele?.price?.currency, ele?.price?.amount)}
        </Typography>
        <Typography variant="subtitle1" color={"success"}>
          Brand:{ele?.brand?.bname}
        </Typography>
        <Typography variant="subtitle2">Origin:{ele?.origin}</Typography>
      </Box>
    </Box>
  ));
  return (
    <div
      style={{
        minHeight: "300px",
        backgroundColor: "#292929",
        border: "1px solid black",
      }}
    >
      <Carousel
        showIndicators={false}
        interval={3500}
        useKeyboardArrows
        autoPlay
        infiniteLoop
      >
        {result}
      </Carousel>
    </div>
  );
};

export default Carasoul;
