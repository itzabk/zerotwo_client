//START IMPORTS
import PropTypes from "prop-types";
import {
  Box,
  Card,
  Typography,
  Stack,
  CardActions,
  IconButton,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import currencyFormatter from "../../../utils/formatCurrency";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StarsIcon from "@mui/icons-material/Stars";
import { useAddCartItemMutation } from "../../../features/cart/cartApiSlice";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useAddWishMutation } from "../../../features/wishlist/wishlistApiSlice";
import { useDeleteCartItemMutation } from "../../../features/cart/cartApiSlice";
import { useDeleteWishMutation } from "../../../features/wishlist/wishlistApiSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useState } from "react";
//STOP IMPORTS

const StyledProductImg = styled("img")({
  top: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
});

ShopProductCard.propTypes = {
  product: PropTypes.object,
};

export default function ShopProductCard({ product }) {
  const { pname, price, pimg, brand, _id, origin } = product;
  const cartId = localStorage.getItem("cartId");
  const userId = localStorage.getItem("userId");
  //configure add to cart API
  const [addCartItem, { isLoading }] = useAddCartItemMutation();
  //configure add to wishlist API
  const [addWish, { isLoading: isWishLoading }] = useAddWishMutation();
  //configure delete cart item API
  const [deleteCartItem, { isLoading: isCartDelLoading }] =
    useDeleteCartItemMutation();
  //configure delete wishlist API
  const [deleteWish, { isLoading: isDelWishLoading }] = useDeleteWishMutation();
  //role
  const role = localStorage.getItem("userId");
  const [boolCart, setboolCart] = useState(localStorage.getItem("bc") || true);
  const [boolWish, setboolWish] = useState(localStorage.getItem("bw") || true);
  //handle add to wishlist
  const handleAddtoWishlist = async () => {
    try {
      const item = { userId: userId, productId: _id };
      const response = await addWish(item).unwrap();
      if (
        response.message === "Item added to Wishlist" ||
        response.status === 200
      ) {
        Swal.fire({
          title: "Item added to Wishlist",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });
        setboolWish(false);
        localStorage.setItem("bw", false);
      }
    } catch (error) {
      console.log(error?.data?.message);
      Swal.fire({
        icon: "error",
        title: error?.data?.message,
        text: "Something went wrong!",
      });
    }
  };
  //handle Delete from Wishlist
  const handleDeletefromWishlist = async () => {
    try {
      const item = { userId: userId, productId: _id };
      const response = await deleteWish(item).unwrap();
      if (
        response.message === "Item deleted from Wishlist" ||
        response.status === 200
      ) {
        Swal.fire({
          title: "Item deleted from Wishlist",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });
        setboolWish(true);
        localStorage.setItem("bw", true);
      }
    } catch (error) {
      console.log(error?.data?.message);
      Swal.fire({
        icon: "error",
        title: error?.data?.message,
        text: "Something went wrong!",
      });
    }
  };
  //handle add to cart
  const handleAddtoCart = async () => {
    try {
      const item = { cartId: cartId, productId: _id };
      const response = await addCartItem(item).unwrap();
      if (
        response.message === "Item added to cart successfully" ||
        response.status === 200
      ) {
        Swal.fire({
          title: "Item added to Cart",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });
        setboolCart(false);
        localStorage.setItem("bc", false);
      }
    } catch (error) {
      console.log(error?.data?.message);
      Swal.fire({
        icon: "error",
        title: error?.data?.message,
        text: "Something went wrong!",
      });
    }
  };
  //handle Delete from Cart
  const handleDeletefromCart = async () => {
    try {
      const item = { cartId: cartId, productId: _id };
      const response = await deleteCartItem(item).unwrap();
      if (response.message === "Cart Item Deleted" || response.status === 200) {
        Swal.fire({
          title: "Item deleted from Cart",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });
        setboolCart(true);
        localStorage.setItem("bc", true);
      }
    } catch (error) {
      console.log(error?.data?.message);
      Swal.fire({
        icon: "error",
        title: error?.data?.message,
        text: "Something went wrong!",
      });
    }
  };
  return (
    <Box sx={{ border: "2px solid black" }}>
      <Card sx={{ maxHeight: "500px" }}>
        <Box component={Link} to={`/products/${_id}`}>
          <Box
            sx={{
              pt: "100%",
              position: "relative",
              borderBottom: "1px solid black",
            }}
          >
            <StyledProductImg
              alt={pname}
              src={pimg}
              sx={{ textDecoration: "none" }}
            />
          </Box>
        </Box>
        <Stack spacing={0} sx={{ padding: "0.8rem" }}>
          <Typography variant="h6" noWrap>
            {pname}
          </Typography>
          <Typography variant="subtitle1" noWrap>
            {brand?.bname}
          </Typography>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="subtitle2">
              <Typography
                component="span"
                variant="subtitle1"
                sx={{
                  color: "darkgreen",
                }}
              >
                {currencyFormatter(price.currency, price.amount)}
              </Typography>
              <Typography variant="body1"> {origin}</Typography>
            </Typography>
          </Stack>
        </Stack>
        {role?.length > 0 && (
          <CardActions
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            {boolCart ? (
              <Tooltip title="Add to Cart">
                {" "}
                <IconButton onClick={handleAddtoCart}>
                  {isLoading ? (
                    <CircularProgress color="secondary" />
                  ) : (
                    <ShoppingCartIcon />
                  )}
                </IconButton>{" "}
              </Tooltip>
            ) : (
              <Tooltip title="Remove from Cart">
                <IconButton onClick={handleDeletefromCart}>
                  {isCartDelLoading ? (
                    <CircularProgress color="secondary" />
                  ) : (
                    <DeleteIcon sx={{ color: "red" }} />
                  )}
                </IconButton>
              </Tooltip>
            )}
            {boolWish ? (
              <Tooltip title="Add to Wishlist">
                {" "}
                <IconButton onClick={handleAddtoWishlist}>
                  {" "}
                  {isWishLoading ? (
                    <CircularProgress color="secondary" />
                  ) : (
                    <StarsIcon />
                  )}
                </IconButton>{" "}
              </Tooltip>
            ) : (
              <Tooltip title="Delete from Wishlist">
                <IconButton onClick={handleDeletefromWishlist}>
                  {isDelWishLoading ? (
                    <CircularProgress color="secondary" />
                  ) : (
                    <HighlightOffIcon sx={{ color: "red" }} />
                  )}
                </IconButton>
              </Tooltip>
            )}
          </CardActions>
        )}
      </Card>
    </Box>
  );
}
