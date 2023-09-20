//START IMPORTS
import React from "react";
import {
  BannerContainer,
  BannerImage,
  BannerContent,
  BannerTitle,
  BannerDescription,
} from "./BannerItems";
import { Typography, useMediaQuery, Box } from "@mui/material";
import { useTheme } from "@mui/material";
//END IMPORTS

const Banner = () => {
  const theme = useTheme();
  const matches = String(useMediaQuery(theme.breakpoints.down("md")));
  return (
    <Box maxWidth="100%">
      {/* BANNER 1 */}
      <BannerContainer matches={matches} bgc="#f3ddf0">
        <Box sx={{ overflow: "none" }}>
          <BannerImage src="/dragon.png" />
        </Box>
        <Box sx={{ overflow: "none" }}>
          <BannerContent>
            <Typography variant="h6">Products|Satisfaction|Story</Typography>
            <BannerTitle variant="h4" matches={matches}>
              Zero Prejudice Two Times The Benefits.{" "}
            </BannerTitle>
            <BannerDescription variant="subtitle1">
              We offer you Products, Spares and Services with Unmatched Quality,
              Unmatched Customer Support, Ultra Fast Delivery. This is the only
              place you need for all your purchases.
            </BannerDescription>
          </BannerContent>
        </Box>
      </BannerContainer>
      <hr />
      {/* BANNER -2 */}
      <BannerContainer matches={matches} bgc="#ffe5ef">
        <Box sx={{ overflow: "none" }}>
          <BannerContent>
            <Typography variant="h6">EMI|Downpayment|Paylater</Typography>
            <BannerTitle variant="h4" matches={matches}>
              Zero Downpayment Two Times The Enjoyment.{" "}
            </BannerTitle>
            <BannerDescription variant="subtitle1">
              We offer Zero downpayment facilities, Zero EMI Options , Paylater
              options and special student specific discounts. Register Now and
              buy your first product with a one time 60% discount & free
              delivery.
            </BannerDescription>
          </BannerContent>
        </Box>
        <Box sx={{ overflow: "none" }}>
          <BannerImage src="/dragon3.png" />
        </Box>
      </BannerContainer>
    </Box>
  );
};

export default Banner;
