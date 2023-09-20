//START IMPORTS
import React, { useState, useRef, useEffect } from "react";
import { CssBaseline } from "@mui/material";
import FormikControl from "../components/FormikControl/FormikControl";
import { Formik, Form } from "formik";
import ReCAPTCHA from "react-google-recaptcha";
import Swal from "sweetalert2";
import {
  InputAdornment,
  IconButton,
  Paper,
  Container,
  Box,
  Grid,
  ThemeProvider,
  createTheme,
  Button,
  CircularProgress,
} from "@mui/material";
import { AccountCircle, VisibilityOff, Visibility } from "@mui/icons-material";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import MailIcon from "@mui/icons-material/Mail";
import * as yup from "yup";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import Man4Icon from "@mui/icons-material/Man4";
import AddModeratorIcon from "@mui/icons-material/AddModerator";
import Tooltip from "@mui/material/Tooltip";
import SendIcon from "@mui/icons-material/Send";
import { Link } from "react-router-dom";
import DefaultMenuBar from "../components/AppMenuBar/DefaultMenuBar";
import { useRegisterMutation } from "../features/auth/authApiSlice";
import { useGenerateVerificationLinkMutation } from "../features/auth/authApiSlice";
import { useGeneratePasswordMutation } from "../features/auth/authApiSlice";
import { strengthColor, strengthIndicator } from "../utils/password-strength";
//END IMPORTS
const pages = null;
const Signup = () => {
  const defaultTheme = createTheme();
  const [showPassword, setShowPassword] = useState({
    pswd: false,
    repswd: false,
  });
  const [sentLink, setSentLink] = useState(false);
  const [sending, isSending] = useState(false);
  const captchaRef = useRef(null);
  const [register, { isLoading: isRegisterLoading }] = useRegisterMutation();
  const [generateVerificationLink, { isLoading: isVLinkLoading }] =
    useGenerateVerificationLinkMutation();
  const [generatePassword] = useGeneratePasswordMutation();
  const [level, setLevel] = useState();

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setLevel(strengthColor(temp));
  };

  useEffect(() => {
    changePassword("");
  }, []);

  //INITIAL FORMIK VALUES
  const initialValues = {
    name: "",
    email: "",
    phone: "",
    gender: "",
    password: "",
    repeat_password: "",
  };
  //GENDER ENUM
  const genderArr = [
    { key: 1, value: "Male" },
    { key: 2, value: "Female" },
    { key: 3, value: "Others" },
    { key: 4, value: "Prefer Not to Say" },
  ];

  //VALIDATION OF INPUT
  const validationSchema = yup.object({
    name: yup
      .string()
      .min(3, "Name too short")
      .trim()
      .required("Username is required*"),
    password: yup
      .string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!#%*?&])[A-Za-z\d@#$!%*?&]{8,}$/,
        "Invalid Password type"
      )
      .trim()
      .required("Password is required*"),
    email: yup
      .string()
      .email("Invalid email")
      .trim()
      .lowercase()
      .required("Email is required*"),
    phone: yup
      .string()
      .matches(
        /((\+*)((0[ -]*)*|((91 )*))((\d{12})+|(\d{10})+))|\d{5}([- ]*)\d{6}/,
        "Phone number must be valid"
      )
      .required("Phone number is required*"),
    repeat_password: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
    gender: yup
      .mixed()
      .oneOf(
        ["Male", "Female", "Others", "Prefer Not to Say"],
        "Must be a valid gender"
      )
      .required("Gender is required*"),
  });

  //ONSUBMIT HANDLER
  const onSubmit = async (values, props) => {
    try {
      const token = captchaRef.current.getValue();
      captchaRef.current.reset();
      const finalRegisterData = {
        ...values,
        token: token,
      };
      const response = await register(finalRegisterData).unwrap();
      console.log(response);
      if (
        response.status === 201 ||
        response.message === "User created successfully!"
      ) {
        Swal.fire({
          icon: "success",
          title: "User Registration Complete",
          showConfirmButton: true,
          confirmButtonText: "Ok",
        });
        props.setSubmitting(false);
        props.resetForm();
      }
    } catch (error) {
      console.log(error?.data?.message);
      Swal.fire({
        icon: "error",
        title: error?.data?.message,
        text: "Something went wrong!",
      });
    }
  };

  //SHOW/HIDE PASSWORD/RENTER PASSWORD HANDLER
  const handleClickShowPassword = () =>
    setShowPassword((prev) => {
      return { ...prev, pswd: !showPassword.pswd };
    });
  const handleClickShowRePassword = () =>
    setShowPassword((prev) => {
      return { ...prev, repswd: !showPassword.repswd };
    });
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleMouseDownRePassword = (event) => {
    event.preventDefault();
  };

  //EMAIL-SENT VERIICATION LINK HANDLER
  const handleSendVerificationLink = async (email) => {
    isSending((prev) => !prev);
    console.log(typeof email);
    try {
      const response = await generateVerificationLink(email).unwrap();
      if (
        response.status === 200 ||
        response.message === "Verification Link sent successfully"
      ) {
        isSending(false);
        setSentLink(true);
        Swal.fire({
          icon: "success",
          title: `Email Verification link has been sent to your mail id ${email}`,
          showConfirmButton: false,
          timer: 2500,
        });
      }
    } catch (error) {
      console.log("Hie", error?.data?.message);
      Swal.fire({
        icon: "error",
        title: "Verification Failed",
        text: `${error?.data?.message}`,
      });
      isSending(false);
    }
  };

  //GENERATE SECURE PASSWORD
  const handleGeneratePassword = async (setFieldValue) => {
    try {
      const { newPassword } = await generatePassword().unwrap();
      console.log(newPassword);
      const generatedPswd = newPassword;
      setFieldValue("password", generatedPswd);
      changePassword(newPassword);
    } catch (error) {
      console.log(error?.data?.message);
    }
  };

  //RENDER UI
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container maxWidth="lg">
        <DefaultMenuBar pages={pages} />
        <Container
          sx={{
            marginTop: "0.2rem",
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundImage: "url(/aaabstract.png)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          component="main"
        >
          <CssBaseline />
          <Paper
            sx={{
              width: {
                xl: "70%",
                lg: "60%",
                sm: "90%",
                xs: "95%",
              },
              margin: "auto",
              minHeight: {
                sm: "40%",
                xs: "40%",
                lg: "50%",
                xl: "50%",
              },
              overflow: "none",
              opacity: "0.96",
              background: "linear-gradient(to right,whitesmoke,#FCDEFF,)",
              border: "3px groove pink",
            }}
            elevation={8}
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
                <LockOutlinedIcon />
              </Avatar>
              <Typography
                component="h1"
                variant="h6"
                fontSize={"1.7em"}
                color="secondary"
              >
                User Registration
              </Typography>
            </Box>
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
            >
              {(formik) => {
                
                return (
                  <Form>
                    <Grid
                      container
                      spacing={{
                        xl: 1.4,
                        lg: 1.4,
                        sm: 3,
                        xs: 3,
                      }}
                      p={2}
                      sx={{
                        display: "flex",
                        flexFlow: "column nowrap",
                        justifyContent: "space-around",
                      }}
                    >
                      <Grid item xs={12} sm={12}>
                        <FormikControl
                          control="input"
                          name="name"
                          type="text"
                          placeholder="Username"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <AccountCircle color="secondary" />
                              </InputAdornment>
                            ),
                          }}
                          variant="standard"
                          required
                          color="secondary"
                          error={formik.errors?.name === true}
                          autoFocus
                        />
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <FormikControl
                          control="input"
                          name="email"
                          type="email"
                          autoComplete={"false"}
                          placeholder="abk@examplemail.com"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <MailIcon color="secondary" />
                              </InputAdornment>
                            ),
                            endAdornment:
                              !sending && !isVLinkLoading ? (
                                <IconButton
                                  size="medium"
                                  color="warning"
                                  onClick={() =>
                                    handleSendVerificationLink(
                                      formik.values?.email
                                    )
                                  }
                                >
                                  <Tooltip
                                    title="Send E-Mail Verification Link"
                                    placement="top-start"
                                  >
                                    <SendIcon />
                                  </Tooltip>
                                </IconButton>
                              ) : (
                                <Box>
                                  {" "}
                                  <CircularProgress color="secondary" />
                                </Box>
                              ),
                          }}
                          variant="standard"
                          required
                          color="secondary"
                          error={formik.errors?.email === true}
                          helperText="Enter your valid E-mail and click on the orange send icon to send the Email-verification link."
                        />
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <FormikControl
                          control="input"
                          name="phone"
                          autoComplete={"false"}
                          type="tel"
                          placeholder="9980402880"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <LocalPhoneIcon color="secondary" />
                              </InputAdornment>
                            ),
                          }}
                          variant="standard"
                          required
                          color="secondary"
                          error={formik.errors?.phone === true}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <FormikControl
                          control="input"
                          type={showPassword.pswd ? "text" : "password"}
                          onKeyUp={() => changePassword(formik.values.password)}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                {" "}
                                <IconButton
                                  size="large"
                                  color="warning"
                                  edge="start"
                                  onClick={() =>
                                    handleGeneratePassword(formik.setFieldValue)
                                  }
                                >
                                  <Tooltip
                                    title="Click on the Icon to Auto-Generate strong password"
                                    placement="top-start"
                                  >
                                    <AddModeratorIcon />
                                  </Tooltip>
                                </IconButton>
                              </InputAdornment>
                            ),
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowPassword}
                                  onMouseDown={handleMouseDownPassword}
                                >
                                  {showPassword.pswd ? (
                                    <Visibility color="error" />
                                  ) : (
                                    <VisibilityOff color="success" />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                          placeholder="Password"
                          variant="standard"
                          color="secondary"
                          name="password"
                          error={formik.errors?.password === true}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <Grid container spacing={2} alignItems="center">
                          <Grid item>
                            <Box
                              sx={{
                                bgcolor: level?.color,
                                width: 85,
                                height: 8,
                                borderRadius: "7px",
                              }}
                            />
                          </Grid>
                          <Grid item>
                            <Typography variant="subtitle1" fontSize="0.75rem">
                              {level?.label}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <FormikControl
                          control="input"
                          type={showPassword.repswd ? "text" : "password"}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowRePassword}
                                  onMouseDown={handleMouseDownRePassword}
                                >
                                  {showPassword.repswd ? (
                                    <Visibility color="error" />
                                  ) : (
                                    <VisibilityOff color="success" />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                          placeholder="Re-enter password"
                          variant="standard"
                          color="secondary"
                          name="repeat_password"
                          error={formik.errors?.repeat_password === true}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <FormikControl
                          control="select"
                          name="gender"
                          label="Gender"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Man4Icon color="secondary" />
                              </InputAdornment>
                            ),
                          }}
                          variant="standard"
                          required
                          options={genderArr}
                          color="secondary"
                          error={formik.errors?.gender === true}
                        />
                      </Grid>
                      <Grid
                        item
                        sx={{
                          opacity: "0.90",
                        }}
                        xs={12}
                        sm={12}
                      >
                        <Box sx={{ overflow: "hidden" }}>
                          <ReCAPTCHA
                            sitekey={process.env.REACT_APP_SITE_KEY}
                            ref={captchaRef}
                            theme="light"
                          />
                        </Box>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        sx={{
                          display: "flex",
                          flexFlow: "row wrap",
                          justifyContent: "space-between",
                        }}
                      >
                        <Button
                          role="submit"
                          type="submit"
                          variant="contained"
                          size="large"
                          color="secondary"
                          sx={{ width: "40%" }}
                          disabled={
                            !formik.dirty ||
                            !formik.isValid ||
                            formik.isSubmitting ||
                            !sentLink ||
                            isRegisterLoading
                          }
                        >
                          {formik.isSubmitting ? (
                            <CircularProgress color="secondary" />
                          ) : (
                            "Register"
                          )}
                        </Button>
                      </Grid>
                      <Grid
                        item
                        sx={{ display: "flex", justifyContent: "flex-end" }}
                        xs={12}
                        sm={12}
                      >
                        <Link
                          to="/accounts/signin"
                          variant="body1"
                          style={{
                            fontSize: "0.8em",
                            color: "blue",
                            fontWeight: "700",
                          }}
                        >
                          Already have an account? Sign in
                        </Link>
                      </Grid>
                    </Grid>
                  </Form>
                );
              }}
            </Formik>
          </Paper>
        </Container>
      </Container>
    </ThemeProvider>
  );
};

export default Signup;
