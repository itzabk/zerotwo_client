//START IMPORTS
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
//STOP IMPORTS

//MUI STYLED COMPONENTS
export const BannerContainer = styled(Box)(({ matches, theme, bgc }) => ({
  display: "flex",
  justifyContent: "space-around",
  width: "100%",
  height: "auto",
  padding: "0px 0px",
  backgroundColor: bgc,
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "center",
  },
}));

export const BannerContent = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  maxWidth: 420,
  padding: "1.5rem",
}));

export const BannerImage = styled("img")(({ src, theme }) => ({
  src: `url(${src})`,
  marginTop: "1rem",
  backgroundImage: `url(${src})`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "fir",
  width: "330px",
  height: "230px",
  [theme.breakpoints.down("md")]: {
    width: "310px",
    height: "200px",
  },
  [theme.breakpoints.down("sm")]: {
    width: "300px",
    height: "200px",
  },
}));

export const BannerTitle = styled(Typography)(({ matches, theme }) => ({
  lineHeight: 1.5,
  fontSize: "1.6rem",
  marginBottom: "0.7rem",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1rem",
  },
  [theme.breakpoints.down("xs")]: {
    fontSize: "0.6rem",
  },
}));

export const BannerDescription = styled(Typography)(({ theme }) => ({
  lineHeight: 1.35,
  letterSpacing: 1.5,
  marginBottom: "1em",
  textAlign: "justify",
  textJustify: "inter-word",
  [theme.breakpoints.down("md")]: {
    lineHeight: 1.15,
    letterSpacing: 1.15,
    marginBottom: "1.5em",
  },
  [theme.breakpoints.down("sm")]: {
    lineHeight: 1,
    letterSpacing: 1,
    marginBottom: "0.8rem",
  },
}));
