//START IMPORTS
import React from "react";
import { Field } from "formik";
import { TextField, Box } from "@mui/material";
//STOP IMPORTS

//REUSABLE INPUT 
const FormikInput = ({ label, name, ...params }) => {
  //render UI
  return (
    <Box width={"100%"}>
      {label && <label htmlFor={name}>{label}</label>}
      <Field name={name} id={name}>
        {({ field, meta }) => {
          return (
            <Box sx={{ fontWeight: "bolder" }}>
              <TextField
                {...field}
                {...params}
                fullWidth
              />
              {meta.touched && meta.error && (
                <div style={{ color: "red",marginTop:'0.2rem' }}>{meta.error}</div>
              )}
            </Box>
          );
        }}
      </Field>
    </Box>
  );
};

export default FormikInput;
