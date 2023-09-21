//START IMPORTS
import React, { useRef } from "react";
import {
  Container,
  Grid,
  Paper,
  Button,
  InputAdornment,
  Box,
  Avatar,
  Typography,
  CircularProgress,
} from "@mui/material";
import FormikControl from "../components/FormikControl/FormikControl";
import { Formik, Form } from "formik";
import MailIcon from "@mui/icons-material/Mail";
import LockResetIcon from "@mui/icons-material/LockReset";
import * as yup from "yup";
import ReCAPTCHA from "react-google-recaptcha";
import Swal from "sweetalert2";
import { useSearchParams } from "react-router-dom";
import { useResetPasswordMutation } from "../features/auth/authApiSlice";
//STOP IMPORTS

const ResetPassword = () => {
  const captchaRef = useRef(null);
  // eslint-disable-next-line
  const [searchParams, setSearhParams] = useSearchParams();
  const parsedEmail = decodeURIComponent(searchParams.get("value"));
  const initialValues = {
    email: parsedEmail === "null" ? "" : parsedEmail,
  };
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  //VALIDATION FOR RESET PASSWORD FORM
  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Invalid email")
      .trim()
      .lowercase()
      .required("Email is required*"),
  });

  //ON SUBMIT HANDLER
  const onSubmit = async (values, props) => {
    try {
      const token = captchaRef.current.getValue();
      captchaRef.current.reset();
      const finalResponse = {
        email: values.email,
        token: token,
      };
      const response = await resetPassword(finalResponse).unwrap();
      if (
        response.status === 200 ||
        response.message === "Password Reset Link sent successfully"
      ) {
        props.setSubmitting(false);
        Swal.fire({
          icon: "success",
          title: `Password Reset link has been sent to mail id: ${values.email}`,
          showConfirmButton: false,
          timer: 2500,
        });
        props.resetForm();
      }
    } catch (error) {
      console.log(error?.data?.message);
      props.setSubmitting(false);
      Swal.fire({
        icon: "error",
        title: "Password reset failed",
        text: `${error?.data?.message}`,
      });
    }
  };

  //UI RENDER
  return (
    <Container
      component="main"
      maxWidth="lg"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundImage: "url(/random1.jpg)",
      }}
    >
      <Paper
        sx={{
          minWidth: "70%",
          minHeight: "50%",
          padding: "1rem",
          overflow: "none",
          opacity: "0.95",
          background: "linear-gradient(to right, white,lightgrey)",
          border: "1px groove #fdd2ff",
        }}
        elevation={7}
      >
        <Box
          sx={{
            display: "flex",
            flexFlow: "column nowrap",
            justifyContent: "center",
            alignItems: "center",
            mt: "1em",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockResetIcon />
          </Avatar>
          <Typography
            component="h1"
            variant="h6"
            fontSize={"1.7em"}
            color="secondary"
          >
            Reset Password
          </Typography>
        </Box>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => {
            return (
              <Form>
                <Grid
                  container
                  sx={{ display: "flex", flexFlow: "column nowrap", p: "3rem" }}
                  spacing={3}
                >
                  <Grid item>
                    <FormikControl
                      control="input"
                      name="email"
                      type="email"
                      placeholder="alex@examplemail.com"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <MailIcon color="secondary" />
                          </InputAdornment>
                        ),
                      }}
                      variant="standard"
                      required
                      color="secondary"
                      error={formik.errors?.email === true}
                      autoFocus
                      autoComplete="false"
                    />
                  </Grid>
                  <Grid item>
                    <Box>
                      <ReCAPTCHA
                        sitekey={process.env.REACT_APP_SITE_KEY}
                        ref={captchaRef}
                        theme="light"
                      />
                    </Box>
                  </Grid>
                  <Grid item>
                    <Button
                      type="submit"
                      role="submit"
                      size="large"
                      variant="contained"
                      color="secondary"
                      disabled={
                        !formik.isValid || formik.isSubmitting || isLoading
                      }
                    >
                      {formik.isSubmitting ? (
                        <CircularProgress color="secondary" />
                      ) : (
                        "Reset Password"
                      )}
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            );
          }}
        </Formik>
      </Paper>
    </Container>
  );
};

export default ResetPassword;
