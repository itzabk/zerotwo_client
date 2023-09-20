//START IMPORTS
import { Grid, List, ListItemText, Typography, Box } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import { FooterTitle } from "./FooterItems";
import { Link } from "react-router-dom";
//END IMPORTS

export default function Footer() {
  //get user
  const userId = localStorage.getItem("userId");
  //render UI
  return (
    <Box
      sx={{
        background: "black",
        color: "white",
        p: { xs: 4, md: 10 },
        pt: 12,
        pb: 12,
        fontSize: { xs: "12px", md: "14px" },
        maxHeight: "12%",
      }}
    >
      {/* STACK 1 */}
      <Grid container spacing={2} justifyContent="center">
        <Grid item md={6} lg={6}>
          <FooterTitle variant="body1">About us</FooterTitle>
          <Typography variant="caption2">
            Lorem ipsum dolor sit amet cons adipisicing elit sed do eiusm tempor
            incididunt ut labor et dolore magna aliqua. Ut enim ad minim veniam,
            quis nostrud.
          </Typography>
          <Box
            sx={{
              mt: 4,
              color: "gray",
            }}
          >
            <FacebookIcon sx={{ mr: 1 }} />
            <TwitterIcon sx={{ mr: 1 }} />
            <InstagramIcon />
          </Box>
        </Grid>
        {/* STACK2 */}
        <Grid item md={6} lg={4}>
          <FooterTitle variant="body1">information</FooterTitle>
          <List>
            <ListItemText>
              <Typography lineHeight={2} variant="caption2">
                About Us
              </Typography>
            </ListItemText>
            <ListItemText>
              <Typography lineHeight={2} variant="caption2">
                Order Tracking
              </Typography>
            </ListItemText>
            <ListItemText>
              <Typography lineHeight={2} variant="caption2">
                Privacy &amp; Policy
              </Typography>
            </ListItemText>
            <ListItemText>
              <Typography lineHeight={2} variant="caption2">
                Terms &amp; Conditions
              </Typography>
            </ListItemText>
          </List>
        </Grid>
        <Grid item md={6} lg={2}>
          <FooterTitle variant="body1">my account</FooterTitle>
          <List>
            <ListItemText>
              <Typography
                lineHeight={2}
                variant="caption2"
                component={Link}
                to="/accounts/signin"
                sx={{ textDecoration: "none", color: "white" }}
              >
                Login
              </Typography>
            </ListItemText>
            <ListItemText>
              <Typography
                lineHeight={2}
                variant="caption2"
                component={Link}
                to="/accounts/signup"
                sx={{ textDecoration: "none", color: "white" }}
              >
                Sign Up
              </Typography>
            </ListItemText>
            <ListItemText>
              <Typography
                lineHeight={2}
                variant="caption2"
                component={Link}
                to={`/accounts/${userId}`}
                sx={{ textDecoration: "none", color: "white" }}
              >
                My Account
              </Typography>
            </ListItemText>
            <ListItemText>
              <Typography
                lineHeight={2}
                variant="caption2"
                component={Link}
                to={`/accounts/wishlist/${userId}`}
                sx={{ textDecoration: "none", color: "white" }}
              >
                Wishlist
              </Typography>
            </ListItemText>
          </List>
        </Grid>
      </Grid>
    </Box>
  );
}
