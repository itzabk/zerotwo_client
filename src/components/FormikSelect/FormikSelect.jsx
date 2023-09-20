//START IMPOPRTS
import React from "react";
import {
  TextField,
  Box,
  MenuItem,
  FormControl,
  FormLabel,
  Typography,
} from "@mui/material";
import { Field } from "formik";
//STOP IMPORTS

//REUSABLE SELECT
const FormikSelect = ({ name, label, options, ...params }) => {
  //render UI
  return (
    <FormControl>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Field name={name} id={name}>
        {({ field, meta }) => {
          return (
            <Box sx={{ width: "inherit" }}>
              <TextField {...field} select {...params}>
                {options.map((item, i) => {
                  return (
                    <MenuItem
                      key={item.key || i}
                      value={item.value || item}
                      sx={{ color: "secondary", fontSize: "0.9rem" }}
                    >
                      <Typography>{item.value || item}</Typography>
                    </MenuItem>
                  );
                })}
              </TextField>
              {meta.touched && meta.error && (
                <div style={{ color: "red" }}>{meta.error}</div>
              )}
            </Box>
          );
        }}
      </Field>
    </FormControl>
  );
};

export default FormikSelect;
