//START IMPORTS
import { useEffect } from "react";
import { useEmptyCartMutation } from "../features/cart/cartApiSlice";
import { Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
//STOP IMPORTS

const CheckoutSuccess = () => {
  //navigate
  const navigate = useNavigate();
  //get cart id
  const cartId = localStorage.getItem("cartId");
  //configure empty cartAPI
  const [emptyCart] = useEmptyCartMutation();
  useEffect(() => {
    async function empty() {
      try {
        const response = await emptyCart({ cartId: cartId }).unwrap();
        if (response?.message === "Cart emptied successfully") {
          console.log("Cart is refreshed successfully!");
          navigate("/");
        }
      } catch (error) {
        console.log(error?.data?.message);
      }
    }
    empty();
    //eslint-disable-next-line
  }, []);

  return (
    <Container
      sx={{
        minHeight: "80vh",
        maxWwidth: "800px",
        width: "100%",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h2">Checkout Successful</Typography>
      <Typography variant="h2" color={"success"}>
        Payment Recieved
      </Typography>
      <Typography>
        Incase of any inqueries contact the support at{" "}
        <strong>support@zerotwo.com</strong>
      </Typography>
    </Container>
  );
};

export default CheckoutSuccess;
