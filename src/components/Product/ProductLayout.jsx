import React from "react";
import { Box, Container, Typography, Card } from "@mui/material";
import AddProduct from "./AddProduct/AddProduct";
import ListProducts from "./ListProducts";

const ProductLayout = () => {
  return (
    <Container sx={{ minHeight: "100vh" }}>
      <Card
        sx={{
          p: "1rem",
          backgroundImage: "url(/random2.jpg)",
          backgroundSize: "cover",
          overflow: "hidden",
        }}
      >
        <Box>
          <Typography variant="h4">Products</Typography>
          <AddProduct />
        </Box>
        <ListProducts />
      </Card>
    </Container>
  );
};

export default ProductLayout;
