//START IMPORTS
import React from "react";
import ListCategories from "./ListCategory";
import AddCategory from "./AddCategory";
import { Box, Container, Typography, Card, Divider } from "@mui/material";
import { selectAllCategories } from "../../features/category/categoryApiSlice";
import { useSelector } from "react-redux";
import SubcategoryLayout from "../Subcategories/SubcategoryLayout";
//STOP IMPORTS

const CategoryLayout = () => {
  //Select Categories
  const categories = useSelector(selectAllCategories);
  //render UI
  return (
    <Container sx={{ minHeight: "100vh" }}>
      <Card
        sx={{
          p: "1rem",
          backgroundImage: "url(/bg1.jpg)",
          backgroundSize: "cover",
          overflow: "hidden",
        }}
      >
        <Box>
          <Typography variant="h4">Categories</Typography>
          <AddCategory />
        </Box>
        <ListCategories />
        <Divider />
        {categories?.length && <SubcategoryLayout />}
      </Card>
    </Container>
  );
};

export default CategoryLayout;
