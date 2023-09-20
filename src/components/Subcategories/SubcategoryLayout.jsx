//START IMPORTS
import React from "react";
import AddSubcategory from "./AddSubcategory";
import SelectCategory from "./SelectCategory";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Card, Typography, Container } from "@mui/material";
//STOP IMPORTS

const SubcategoryLayout = () => {
  //render UI
  return (
    <Container sx={{ mt: "1rem" }}>
      <Card sx = {{backgroundColor:'whitesmoke'}}>
        <Accordion sx={{ backgroundColor: "whitesmoke" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography
              variant="h5"
              color={"primary"}
              sx={{ fontWeight: "500" }}
            >
              Sub Category Details
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <AddSubcategory />
            <SelectCategory />
          </AccordionDetails>
        </Accordion>
      </Card>
    </Container>
  );
};

export default SubcategoryLayout;
