//START IMPORTS
import React, { memo } from "react";
import { Link } from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Tooltip } from "@mui/material";
//STOP IMPORTS
const ListItemHeader = ({ name, open, link, icon }) => {
  //render UI
  return (
    <ListItem disablePadding sx={{ display: "block" }}>
      <ListItemButton
        sx={{
          minHeight: 48,
          justifyContent: open ? "initial" : "center",
          px: 2.5,
        }}
        component={Link}
        to={link}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: open ? 3 : "auto",
            justifyContent: "center",
          }}
        >
          <Tooltip title={name}>{icon}</Tooltip>
        </ListItemIcon>
        <ListItemText primary={name} sx={{ opacity: open ? 1 : 0 }} />
      </ListItemButton>
    </ListItem>
  );
};

export default memo(ListItemHeader);
