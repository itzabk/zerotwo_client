//START IMPORTS
import React from "react";
import { Container } from "@mui/material";
import DefaultMenuBar from "../components/AppMenuBar/DefaultMenuBar";
import Banner from "../components/Banner/Banner";
import Footer from "../components/Footer/Footer";
import Carasoul from "../components/Carasoul/Carasoul";
import useAuth from "../hooks/useAuth";
//STOP IMPORTS

const pages = [{ name: "Products", link: "/products" }];
const settings = [
  { name: "Sign-In", link: "/accounts/signin" },
  { name: "Sign-Up", link: "/accounts/signup" },
];

const HomepageLayout = () => {
  const { isAdmin, isCustomer, _id } = useAuth();
  const role = localStorage?.getItem("role") || "";

  const adminSettings = [
    { name: "Console", link: "/admin" },
    { name: "Profile", link: `/accounts/${_id}` },
    { name: "Wishlist", link: `/accounts/wishlist/${_id}` },
    { name: "My Orders", link: `/accounts/orders/${_id}` },
    {
      name: "Logout",
      type: "Button",
    },
  ];

  const customerSettings = [
    { name: "Profile", link: `/accounts/${_id}` },
    { name: "Wishlist", link: `/accounts/${_id}/wishlist/` },
    { name: "My Orders", link: `/accounts/orders/${_id}` },
    {
      name: "Logout",
      type: "Button",
    },
  ];

  return (
    <Container maxWidth="xl">
      {isAdmin || role === "Admin" ? (
        <DefaultMenuBar pages={pages} settings={adminSettings} />
      ) : isCustomer || role === "Customer" ? (
        <DefaultMenuBar pages={pages} settings={customerSettings} />
      ) : (
        <DefaultMenuBar pages={pages} settings={settings} />
      )}
      <Carasoul />
      <Banner />
      <Footer />
    </Container>
  );
};

export default HomepageLayout;
