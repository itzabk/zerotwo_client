//START IMPORTS
import React from "react";
import { useGetProductQuery } from "../features/product/productApiSlice";
import {
  Container,
  Paper,
  Grid,
  Box,
  Typography,
  Stack,
  Button,
  Card,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import currencyFormatter from "../utils/formatCurrency";
import BouncingDotsLoader from "../components/BouncingLoader/BouncingLoader";
import DefaultMenuBar from "../components/AppMenuBar/DefaultMenuBar";
//STOP IMPORTS

const SingleProduct = () => {
  const { productId } = useParams();
  const {
    data: product,
    isLoading,
    isSuccess,
    isError,
  } = useGetProductQuery(productId);

  return (
    <Container>
      <DefaultMenuBar />
      {isLoading && <BouncingDotsLoader />}
      {isSuccess && Object.values(product).length > 0 && (
        <>
          <Card sx={{ padding: "2rem" }}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Paper elevation={8}>
                  <Box sx={{ height: "50%" }}>
                    <img
                      alt={product?.pname}
                      src={product?.pimg}
                      style={{ width: "100%" }}
                    />
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={8}>
                <Paper elevation={8} spacing={2} sx={{ padding: "2rem" }}>
                  <Stack spacing={1}>
                    <Typography variant="h5">
                      Product: {product?.pname}
                    </Typography>
                    <hr />
                    <Typography variant="subtitle1">
                      Price:{" "}
                      {currencyFormatter(
                        product?.price?.currency,
                        product?.price?.amount
                      )}
                    </Typography>
                    <Typography variant="subtitle1">
                      Brand: {product?.brand?.bname}
                    </Typography>
                    <Typography variant="subtitle1">
                      Category: {product?.cat?.cname}
                    </Typography>
                    <Typography variant="subtitle1">
                      Subcategory: {product?.subcat?.scname}
                    </Typography>

                    <Typography variant="body1">Info:</Typography>
                    <hr />
                    {product?.info.map((ele, i) => {
                      return (
                        <Typography variant="body1" key={i}>
                          {ele?.key} : {ele?.value}
                        </Typography>
                      );
                    })}
                    <hr />
                    <Typography variant="body1">
                      Warranty: {product?.warranty}
                    </Typography>
                    <Typography variant="body1">
                      Description: {product?.desc}
                    </Typography>

                    <Typography
                      color={product?.stock > 5 ? "#51FF00" : "red"}
                      variant="h6"
                    >
                      Stock:{product?.stock}
                    </Typography>
                    <Link to="/products/">
                      <Button variant="contained">Back to Product</Button>
                    </Link>
                  </Stack>
                </Paper>
              </Grid>
            </Grid>
          </Card>
        </>
      )}
      {isError && <div>Something is wrong!!</div>}
    </Container>
  );
};

export default SingleProduct;
