//START IMPORTS
import React from "react";
import { Field } from "formik";
import { Box } from "@mui/material";
//STOP IMPORTS

//REUSABLE CHECKBOX
const FormikCheckbox = ({ name, label, options, ...params }) => {
  //render UI
  return (
    <Box>
      <label htmlFor={name}></label>
      <Field name={name} id={name} {...params}>
        {({ field, meta }) => {
          return (
            <div>
              {options.map((item) => {
                return (
                  <React.Fragment key={item.key}>
                    <input
                      type="checkbox"
                      id={item.key}
                      {...field}
                      value={item.value}
                      checked={field.value.includes(item.value)}
                    />
                    <label htmlFor={item.key}>{item.value}</label>
                  </React.Fragment>
                );
              })}
              ;
              {meta.touched && meta.error && (
                <div style={{ color: "red" }}>{meta.error}</div>
              )}
            </div>
          );
        }}
      </Field>
    </Box>
  );
};

export default FormikCheckbox;
