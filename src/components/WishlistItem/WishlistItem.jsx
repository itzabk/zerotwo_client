//START IMPORTS
import React from "react";
import currencyFormatter from "../../utils/formatCurrency";
import {
  IconButton,
  Typography,
  Box,
  Grid,
  CircularProgress,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Link } from "react-router-dom";
// import Swal from "sweetalert2";
import { useDeleteWishMutation } from "../../features/wishlist/wishlistApiSlice";
//STOP IMPORTS

const WishlistItem = ({ wishlist, ele }) => {
  //get userId
  const userId = localStorage.getItem("userId");
  //configure del API
  const [deleteWish, { isLoading }] = useDeleteWishMutation();

  //handle delete
  const handleDelete = async (userId, productId) => {
    try {
      const item = {
        userId,
        productId,
      };
      await deleteWish(item).unwrap();
    } catch (error) {
      console.log(error?.data?.message);
    }
  };
  return (
    <Grid
      container
      sx={{ border: "1px solid black", padding: "1rem", maxWidth: "500px" }}
    >
      <Grid item xs={5} sm={5} md={5} lg={5}>
        <Box sx={{ fontFamily: "Monserrat" }}>
          <Typography variant="h5">
            {wishlist?.entities[ele]?.productId?.pname}
          </Typography>
          <Typography variant="subtitle2">
            {wishlist?.entities[ele]?.productId?.brand?.bname}
          </Typography>
          <Box
            component={Link}
            to={`/products/${wishlist?.entities[ele]?.productId?._id}`}
          >
            <img
              alt={wishlist?.entities[ele]?.productId.pname}
              src={wishlist?.entities[ele]?.productId.pimg}
              width={"150px"}
              height={"150px"}
              style={{ backgroundSize: "contained" }}
            />
          </Box>
        </Box>
      </Grid>
      <Grid item xs={7} sm={7} md={7} lg={7}>
        <Typography variant="h6" color={"green"}>
          Price:
          {currencyFormatter(
            wishlist?.entities[ele]?.productId?.price?.currency,
            wishlist?.entities[ele]?.productId?.price?.amount
          )}
        </Typography>
        <Typography variant="h6">
          Origin:{wishlist?.entities[ele]?.productId?.origin}
        </Typography>
        <Typography variant="h6">
          Warranty:
          {wishlist?.entities[ele]?.productId?.warranty}
        </Typography>
      </Grid>

      <Box>
        {isLoading ? (
          <CircularProgress color="secondary" />
        ) : (
          <IconButton
            color="error"
            onClick={() =>
              handleDelete(userId, wishlist?.entities[ele]?.productId?._id)
            }
          >
            <DeleteForeverIcon />
          </IconButton>
        )}
      </Box>
    </Grid>
  );
};

export default WishlistItem;
