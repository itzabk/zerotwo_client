import React from "react";
import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";

const GlobalOutlet = () => {
  return (
    <Container>
      <Outlet />
    </Container>
  );
};

export default GlobalOutlet;
