//START IMPORTS
import React from "react";
import ListBrands from "./ListBrands";
import AddBrand from "./AddBrand";
import { Box, Container, Typography, Card } from "@mui/material";
import BrandProductDistribution from "./BrandProductDistribution";
//STOP IMPORTS

const BrandLayout = () => {
  //Render UI
  return (
    <Container>
      <Card
        sx={{
          height: "auto",
          p: "1rem",
          backgroundImage: "url(/logo192.png)",
          backgroundSize: "cover",
          overflow: "hidden",
        }}
      >
        <Box>
          <Typography variant="h4">Brands</Typography>
          <AddBrand />
        </Box>
        <ListBrands />
        <BrandProductDistribution />
      </Card>
    </Container>
  );
};

export default BrandLayout;
