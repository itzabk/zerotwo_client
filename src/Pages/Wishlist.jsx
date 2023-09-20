//START IMPORTS
import React from "react";
import { useParams } from "react-router-dom";
import { useGetWishlistQuery } from "../features/wishlist/wishlistApiSlice";
import {
  CardHeader,
  Container,
  Card,
  CardContent,
  Box,
  Grid,
} from "@mui/material";
import BouncingDotsLoader from "../components/BouncingLoader/BouncingLoader";
import WishlistItem from "../components/WishlistItem/WishlistItem";
import DefaultMenuBar from "../components/AppMenuBar/DefaultMenuBar";
//STOP IMPORTS

const Wishlist = () => {
  const { userId } = useParams();
  //configure get Wishlist API
  const {
    data: wishlist,
    isLoading,
    isError,
    isSuccess,
  } = useGetWishlistQuery(userId);

  return (
    <>
      {isLoading && <BouncingDotsLoader />}
      {isSuccess && wishlist?.ids?.length > 0 ? (
        <Container>
          <DefaultMenuBar />
          <Card
            sx={{
              background:
                "linear-gradient(90deg, rgba(227,218,230,1) 0%, rgba(244,246,242,1) 50%, rgba(139,130,119,1) 100%)",
            }}
          >
            <CardHeader title={"Wishlist"} />
            <CardContent>
              <Grid container spacing={1} gap={1}>
                {wishlist?.ids?.map((ele, i) => {
                  return (
                    <Grid item key={ele}>
                      <Box>
                        <WishlistItem wishlist={wishlist} ele={ele} />
                      </Box>
                    </Grid>
                  );
                })}
              </Grid>
            </CardContent>
          </Card>
        </Container>
      ) : (
        <div
          style={{
            backgroundImage: "url(/no-results.png)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            width: "inherit",
            height: "100vh",
          }}
        ></div>
      )}
      {isError && (
        <div
          style={{
            backgroundImage: "url(/no-results.png)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            width: "inherit",
            height: "100vh",
          }}
        ></div>
      )}
    </>
  );
};

export default Wishlist;
