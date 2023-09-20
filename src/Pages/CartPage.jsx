//START IMPORTS
import {
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Box,
  Typography,
  CardActions,
} from "@mui/material";
import React from "react";
import { useGetCartItemsQuery } from "../features/cart/cartApiSlice";
import CartItem from "../components/CartItem/CartItem";
import PayButton from "../components/PayButton/PayButton";
import BouncingDotsLoader from "../components/BouncingLoader/BouncingLoader";
//STOP IMPORTS

const CartPage = () => {
  //cart id
  const userId = localStorage.getItem("userId");
  //configure get query API
  const {
    data: cart,
    isLoading,
    isError,
    isSuccess,
  } = useGetCartItemsQuery({ userId });
  //render UI
  return (
    <>
      {isLoading && <BouncingDotsLoader />}
      <Container>
        {isSuccess && cart?.ids?.length > 0 && (
          <Container>
            <Grid container>
              <Grid item xs={12} sm={12} md={8} lg={8}>
                <Card>
                  <CardHeader title="CART ITEMS" />
                  <CardContent>
                    {cart?.ids?.map((ele, i) => {
                      return (
                        <Box
                          key={ele}
                          sx={{ border: "1px solid grey", padding: "1rem" }}
                        >
                          <CartItem cart={cart} ele={ele} />
                        </Box>
                      );
                    })}
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <Card>
                  <CardHeader title="PRICE DETAILS" />
                  <CardContent>
                    {cart?.ids?.map((ele, i) => {
                      return (
                        <Box key={i}>
                          <Typography variant="h6">
                            Price: {cart?.entities[ele]?.price}
                          </Typography>
                          <Box sx={{ ml: "1rem" }}>
                            <Typography variant="subtitle1">
                              Quantity: {cart?.entities[ele]?.quantity}
                            </Typography>
                            <Typography variant="subtitle1" color={"success"}>
                              SubTotal: {cart?.entities[ele]?.subtotal}
                            </Typography>
                          </Box>
                        </Box>
                      );
                    })}
                  </CardContent>
                  <CardActions>
                    <PayButton cartItems={cart} />
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          </Container>
        )}
        {isError && (
          <div
            style={{
              backgroundImage: "url(/emptycart.png)",
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
              backgroundPosition: "center",
              width: "inherit",
              height: "100vh",
            }}
          ></div>
        )}
      </Container>
    </>
  );
};

export default CartPage;
