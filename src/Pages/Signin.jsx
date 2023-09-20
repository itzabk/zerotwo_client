//START IMPORTS
import React, { useState, useRef } from "react";
import * as yup from "yup";
import ReCAPTCHA from "react-google-recaptcha";
import Swal from "sweetalert2";
import {
  Grid,
  Paper,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  createTheme,
  ThemeProvider,
  InputAdornment,
  IconButton,
  Button,
  Container,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import KeyIcon from "@mui/icons-material/Key";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import FormikControl from "../components/FormikControl/FormikControl";
import { Formik, Form } from "formik";
import MailIcon from "@mui/icons-material/Mail";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import DefaultMenuBar from "../components/AppMenuBar/DefaultMenuBar";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../features/auth/authApiSlice";
import { setCredentials } from "../features/auth/authSlice";
import { useGenerateOTPMutation } from "../features/auth/authApiSlice";
import usePersist from "../hooks/usePersist";

//STOP IMPORTS

const pages = null;

const Signin = () => {
  const navigate = useNavigate();
  const captchaRef = useRef(null);
  const defaultTheme = createTheme();
  const [showPassword, setShowPassword] = useState({
    pswd: false,
  });
  const [otpLoading, setOtpLoading] = useState(false);
  const initialValues = {
    email: "",
    password: "",
    otp: "",
  };
  const [persist, setPersist] = usePersist();
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const [generateOTP, { isLoading: isOTPLoading }] = useGenerateOTPMutation();
  const dispatch = useDispatch();

  //SIGNIN FORM VALIDATION
  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Invalid email")
      .trim()
      .lowercase()
      .required("Email is required*"),
    password: yup.string().required("Password is required*"),
    otp: yup.string().required("OTP is required*"),
  });

  //PASSWORD VISIBILITY HANDLERS
  const handleClickShowPassword = () =>
    setShowPassword((prev) => {
      return { ...prev, pswd: !showPassword.pswd };
    });
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  //Handle Persist
  const handleToggle = () => setPersist((prev) => !prev);

  //OTP REQUEST HANDLER
  const handleRequestOtp = async (email) => {
    try {
      setOtpLoading(true);
      const response = await generateOTP(email).unwrap();
      console.log(response);
      if (
        response.status === 200 ||
        response.message === "OTP sent successfully"
      ) {
        Swal.fire({
          icon: "success",
          title: `OTP is sent to your registered email ID: ${email}`,
          showConfirmButton: false,
          timer: 2500,
        });
        setOtpLoading(false);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: `${error.data.message}`,
        text: `${error.status} Error has occured`,
      });
      setOtpLoading(false);
    }
  };

  //ON SUBMIT HANDLER
  const onSubmit = async (values, props) => {
    try {
      const token = captchaRef.current.getValue();
      captchaRef.current.reset();
      const finalLoginData = {
        ...values,
        token: token,
        lld: new Date(),
      };
      const response = await login(finalLoginData).unwrap();
      dispatch(setCredentials({ ...response }));
      if (response?.status === 200 || response.accessToken) {
        props.setSubmitting(false);
        const Toast = Swal.mixin({
          toast: true,
          position: "bottom",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "success",
          title: "Signed in successfully",
        }).then(() => {
          navigate("/");
        });

        props.resetForm();
      }
    } catch (error) {
      props.setSubmitting(false);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: `${error?.data?.message}`,
      });
    }
  };

  //RENDER UI
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xl">
        <DefaultMenuBar pages={pages} />
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={false}
            md={6}
            xl={8}
            sx={{
              backgroundImage: "url(/dragon2.jpg)",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Grid item sm={12} md={6} xs={12} xl={4} minWidth={"50%"}>
            <Container
              sx={{
                display: "flex",
                flexFlow: "row nowrap",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100%",
                backgroundColor: "#1b1a1a",
                // backgroundImage: "url(/signupbg-2.jpg)",
              }}
            >
              <Paper
                sx={{
                  minHeight: "50%",
                  padding: "1rem",
                  overflow: "none",
                  opacity: "0.95",
                  minWidth: "40%",
                  background: "linear-gradient(to right, white,lightgrey)",

                  border: "1px groove #fdd2ff",
                }}
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
                    User Login
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
                        <Grid container spacing={2.5} p={"0.5rem"}>
                          <Grid item xs={12} sm={12}>
                            <FormikControl
                              control="input"
                              name="email"
                              type="email"
                              placeholder="abk@examplemail.com"
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
                              autoComplete={"false"}
                            />
                          </Grid>
                          <Grid item xs={12} sm={12}>
                            <FormikControl
                              control="input"
                              type={showPassword.pswd ? "text" : "password"}
                              InputProps={{
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
                            <FormikControl
                              control="input"
                              type="text"
                              variant="standard"
                              color="secondary"
                              name="otp"
                              placeholder="Enter OTP"
                              helperText="Click on the Orange Key Icon to Generate OTP"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    {!otpLoading && !isOTPLoading ? (
                                      <IconButton
                                        edge="start"
                                        size="medium"
                                        color="warning"
                                        onClick={() =>
                                          handleRequestOtp(formik.values.email)
                                        }
                                      >
                                        <Tooltip title="Click to generate OTP">
                                          <KeyIcon />
                                        </Tooltip>
                                      </IconButton>
                                    ) : (
                                      <Box>
                                        <CircularProgress color="secondary" />
                                      </Box>
                                    )}
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </Grid>
                          <Grid item>
                            <Box
                              style={{
                                fontSize: "0.92rem",
                                color: "darkgrey",
                                fontFamily: "sans-serif",
                                fontWeight: "700",
                              }}
                            >
                              <label
                                htmlFor="persist"
                                className="form__persist"
                              >
                                <input
                                  type="checkbox"
                                  className="form__checkbox"
                                  id="persist"
                                  onChange={handleToggle}
                                  checked={persist}
                                />
                                {"  "} Trust This Device
                              </label>
                            </Box>
                          </Grid>

                          <Grid item xs={12} sm={12}>
                            <Box sx={{ overflow: "hidden" }}>
                              <ReCAPTCHA
                                sitekey={process.env.REACT_APP_SITE_KEY}
                                ref={captchaRef}
                                theme="light"
                              />
                            </Box>
                          </Grid>
                          <Grid item xs={12} sm={12}>
                            <Button
                              type="submit"
                              variant="contained"
                              color="secondary"
                              disabled={
                                !formik.isValid ||
                                !formik.dirty ||
                                formik.isSubmitting ||
                                isLoginLoading
                              }
                            >
                              {formik.isSubmitting ? (
                                <CircularProgress color="secondary" />
                              ) : (
                                "Login"
                              )}
                            </Button>
                          </Grid>
                          <Grid item xs={12} sm={12}>
                            <Box
                              sx={{
                                display: "flex",
                                flexFlow: "row",
                                justifyContent: "space-evenly",
                                gap: "10rem",
                                fontSize: "0.8em",
                              }}
                            >
                              <Link
                                to={`/accounts/reset-password?value=${encodeURIComponent(
                                  formik.values.email
                                )}`}
                                variant="body2"
                              >
                                Forgot password?
                              </Link>
                              <Link to="/accounts/signup">
                                {"Don't have an account? Sign Up"}
                              </Link>
                            </Box>
                          </Grid>
                        </Grid>
                      </Form>
                    );
                  }}
                </Formik>
              </Paper>
            </Container>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default Signin;
