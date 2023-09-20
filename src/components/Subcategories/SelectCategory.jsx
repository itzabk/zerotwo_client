//START IMPORT
import React, { useState } from "react";
import { selectAllCategories } from "../../features/category/categoryApiSlice";
import { useSelector } from "react-redux";
import {
  TextField,
  MenuItem,
  Typography,
  Container,
  FormControl,
  FormLabel,
  Box,
} from "@mui/material";
import ListSubcategories from "./ListSubcategories";
//STOP IMPORT

const SelectCategory = () => {
  //select cat
  const categories = useSelector(selectAllCategories);
  const [selected, setSelected] = useState("");
  const [id, setId] = useState("");
  //handle cat change
  const handleChange = (e) => {
    const foundCat = categories.find((ele) => ele.cname === e.target.value);
    setId(foundCat);
    setSelected(e.target.value);
  };
  //render UI
  return (
    <Container>
      {categories?.length > 0 && (
        <>
          <FormControl>
            <FormLabel htmlFor={"select"}>Select Category</FormLabel>
            <TextField
              value={selected}
              onChange={handleChange}
              id={"select"}
              select
            >
              {categories?.map((item) => {
                return (
                  <MenuItem
                    key={item.cname}
                    value={item.cname}
                    sx={{ color: "secondary", fontSize: "0.9rem" }}
                  >
                    <Typography>{item.cname}</Typography>
                  </MenuItem>
                );
              })}
            </TextField>
          </FormControl>
          <br />
          <Box>{id !== "" ? <ListSubcategories catId={id} /> : null}</Box>
        </>
      )}
    </Container>
  );
};

export default SelectCategory;
