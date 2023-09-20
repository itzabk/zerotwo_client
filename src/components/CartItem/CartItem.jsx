//START IMPORTS
import React from "react";
import currencyFormatter from "../../utils/formatCurrency";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  TextField,
  ButtonGroup,
  IconButton,
  Typography,
  Box,
  Grid,
  CircularProgress,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {
  useIncCartItemCountMutation,
  useDecCartItemCountMutation,
  useDeleteCartItemMutation,
} from "../../features/cart/cartApiSlice";
import Swal from "sweetalert2";

//STOP IMPORTS

const CartItem = ({ cart, ele }) => {
  //configure inc API
  const [incCartItemCount, { isLoading: isIncLoading }] =
    useIncCartItemCountMutation();
  //configure dec API
  const [decCartItemCount, { isLoading: isDecLoading }] =
    useDecCartItemCountMutation();
  //configure del API
  const [deleteCartitem, { isLoading: isDelLoading }] =
    useDeleteCartItemMutation();
  //handle inc
  const handleInc = async (cartId, productId, ele) => {
    try {
      if (
        cart?.entities[ele]?.quantity < cart?.entities[ele]?.productId?.stock
      ) {
        const item = { cartId, productId };
        await incCartItemCount(item).unwrap();
      } else {
        Swal.fire({
          title: "Stock quantity exceeded",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });
      }
    } catch (error) {
      console.log(error?.data?.message);
    }
  };
  //handle dec
  const handleDec = async (cartId, productId, ele) => {
    try {
      if (cart?.entities[ele]?.quantity > 1) {
        const item = { cartId, productId };
        await decCartItemCount(item).unwrap();
      } else {
        const item = { cartId, productId };
        await deleteCartitem(item).unwrap();
      }
    } catch (error) {
      console.log(error?.data?.message);
    }
  };
  //handle delete
  const handleDelete = async (cartId, productId) => {
    try {
      const item = { cartId, productId };
      await deleteCartitem(item).unwrap();
    } catch (error) {
      console.log(error?.data?.message);
    }
  };
  return (
    <Box>
      <Typography variant="h5">
        {cart?.entities[ele]?.productId?.pname}
      </Typography>
      <Typography variant="subtitle2">
        {cart?.entities[ele]?.productId?.brand?.bname}
      </Typography>
      <Grid container>
        <Grid item md={5} lg={5}>
          <img
            alt={cart?.entities[ele]?.productId.pname}
            src={cart?.entities[ele]?.productId.pimg}
            width={"150px"}
            height={"150px"}
            style={{ backgroundSize: "contained" }}
          />
        </Grid>
        <Grid item md={7} lg={7}>
          <Typography variant="h6">
            Price:
            {currencyFormatter(
              cart?.entities[ele]?.currency,
              cart?.entities[ele]?.price
            )}
          </Typography>
          <Typography variant="subtitle1">
            Origin:{cart?.entities[ele]?.productId?.origin}
          </Typography>
          <Typography variant="subtitle2">
            Warranty:
            {cart?.entities[ele]?.productId?.warranty}
          </Typography>
        </Grid>
      </Grid>
      <Box>
        <ButtonGroup>
          {isIncLoading ? (
            <CircularProgress color="secondary" />
          ) : (
            <IconButton
              onClick={() =>
                handleInc(
                  cart?.entities[ele].cartId,
                  cart?.entities[ele]?.productId?._id,
                  ele
                )
              }
            >
              <AddIcon />
            </IconButton>
          )}
          <TextField
            value={cart?.entities[ele]?.quantity}
            aria-readonly
            inputProps={{ readOnly: true }}
            sx={{ width: "80px", textAlign: "center" }}
          />
          {isDecLoading ? (
            <CircularProgress color="secondary" />
          ) : (
            <IconButton
              onClick={() =>
                handleDec(
                  cart?.entities[ele].cartId,
                  cart?.entities[ele]?.productId?._id,
                  ele
                )
              }
            >
              <RemoveIcon />
            </IconButton>
          )}
        </ButtonGroup>
        {isDelLoading ? (
          <CircularProgress color="secondary" />
        ) : (
          <IconButton
            color="error"
            onClick={() =>
              handleDelete(
                cart?.entities[ele].cartId,
                cart?.entities[ele]?.productId?._id
              )
            }
          >
            <DeleteForeverIcon />
          </IconButton>
        )}
      </Box>
    </Box>
  );
};

export default CartItem;
