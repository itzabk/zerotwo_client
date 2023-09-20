//START IMPORTS
import React from "react";
import ListAccounts from "./ListCustomers";
import GetSignups from "./GetSignups";
import { Paper } from "@mui/material";
import GenderDistribution from "./GenderDistribution";
//STOP IMPORTS

const CustomerLayout = () => {
  //render UI
  return (
    <>
      <Paper elevation={5} sx={{ padding: "1rem" }}>
        <ListAccounts />
        <GenderDistribution />
        <GetSignups />
      </Paper>
    </>
  );
};

export default CustomerLayout;
