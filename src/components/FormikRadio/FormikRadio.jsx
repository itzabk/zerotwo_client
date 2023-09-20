//START IMPORTS
import React from "react";
import { Field } from "formik";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
//STOP IMPORTS

//REUSABLE RADIO
const FormikRadio = ({ name, label, options, ...params }) => {
  //render UI
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Field name={name}>
        {({ field, meta }) => {
          return (
            <RadioGroup {...field} aria-label={label} {...params}>
              {options?.map((item) => {
                return (
                  <FormControlLabel
                    value={item._id}
                    key={item._id}
                    control={<Radio />}
                    label={item?.cname}
                  />
                );
              })}
              {meta.touched && meta.error && (
                <div style={{ color: "red" }}>{meta.error}</div>
              )}
            </RadioGroup>
          );
        }}
      </Field>
    </FormControl>
  );
};

export default FormikRadio;
