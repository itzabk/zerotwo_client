//START IMPORTS
import { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  CircularProgress,
  Unstable_Grid2 as Grid,
  Typography,
  Container,
  Stack,
  Avatar,
  FormLabel,
} from "@mui/material";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { useGetAccountQuery } from "../../../features/accounts/accountsApiSlice";
import FormikControl from "../../FormikControl/FormikControl";
import { Formik, Form } from "formik";
import { countryList } from "./countryList";
import * as yup from "yup";
import { useUpdateAccountMutation } from "../../../features/accounts/accountsApiSlice";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import BouncingDotsLoader from "../../BouncingLoader/BouncingLoader";
//STOP IMPORTS

export const AccountProfileDetails = () => {
  const { uid } = useParams();
  //Configure Get Accounts API
  const {
    data: user_account,
    isLoading,
    isSuccess,
    isError,
  } = useGetAccountQuery(uid);
  //configure state for date picker
  const [value, setValue] = useState(new Date());
  //configure Update Account API
  const [updateAccount, { isLoading: isUpdateLoading }] =
    useUpdateAccountMutation();
  //initial values
  const initialValues = {
    nickname: user_account?.nickname || "",
    address: {
      street: user_account?.address?.street || "",
      city: user_account?.address?.city || "",
      state: user_account?.address?.state || "",
      pincode: user_account?.address?.pincode || "",
      country: user_account?.address?.country || "",
    },
    dp: user_account?.dp || "",
  };
  //validations
  const validationSchema = yup.object({
    nickname: yup.string().trim(),
    address: yup.object({
      street: yup.string().trim().min(8).required("street is required"),
      city: yup.string().trim().min(4).required("City is required"),
      state: yup.string().trim().required("State is required"),
      pincode: yup.string().trim().required("Pincode is required "),
      country: yup.string().trim().required("Country is required"),
    }),
    dp: yup.mixed(),
  });
  //on submit handler
  const onSubmit = async (values, props) => {
    try {
      //form data
      let data = new FormData();
      data.append("_id", uid);
      data.append("nickname", values?.nickname || null);
      data.append("dp", values?.dp || null);
      const strVal = JSON.stringify(values?.address || null);
      data.append("address", strVal || null);
      data.append("dob", value || null);
      //handle response
      const response = await updateAccount(data).unwrap();
      if (
        response.message === "User details is updated successfully" ||
        response.status === 200
      ) {
        Swal.fire({
          icon: "success",
          title: "User details updated successfully",
          showConfirmButton: true,
          confirmButtonText: "Ok",
        });
        props.setSubmitting(false);
        props.resetForm();
      }
    } catch (err) {
      props.setSubmitting(false);
      props.resetForm();
      console.log(err?.data?.message);

      Swal.fire({
        icon: "error",
        title: err?.data?.message,
        text: "Something went wrong!",
      });
    }
  };
  //render UI
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <div>
            <Typography variant="h4">Account</Typography>
          </div>
          <Card
            sx={{
              padding: "2rem",
              linearGradient: "(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7))",
              backgroundImage: "url('/bg1.jpg')",
              border: "3px solid black",
            }}
          >
            <CardHeader
              title="Profile"
              component="h5"
              sx={{ textAlign: "center" }}
            />
            <CardContent sx={{ pt: 0 }}>
              <Box sx={{ m: -1.5 }}>
                {isLoading && <BouncingDotsLoader />}
                {isSuccess && (
                  <div>
                    <Grid container spacing={3}>
                      <Card
                        sx={{ width: "100%", backgroundColor: "whitesmoke" }}
                        elevation={2}
                      >
                        <CardContent>
                          <Box
                            sx={{
                              alignItems: "center",
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            <Avatar
                              src={user_account?.dp}
                              sx={{
                                height: 80,
                                mb: 2,
                                width: 80,
                              }}
                            />
                            <Box>
                              <Typography gutterBottom variant="h5">
                                {user_account.name}
                              </Typography>
                            </Box>
                            <Box>
                              <Typography gutterBottom variant="h5">
                                {user_account?.nickname}
                              </Typography>
                            </Box>
                            <Box>
                              <Typography
                                color="text.secondary"
                                variant="body2"
                              >
                                {user_account?.address?.city}{" "}
                                {user_account?.address?.country}
                              </Typography>
                            </Box>
                            <span>
                              <Typography
                                color="text.secondary"
                                variant="body2"
                                id="login"
                              >
                                {format(
                                  new Date(user_account?.lastlogin),
                                  "dd-MMM-yyyy\thh:mm:ss"
                                )}{" "}
                              </Typography>
                            </span>
                            <Box>
                              <Typography
                                color="text.secondary"
                                variant="body2"
                              >
                                {user_account.gender}
                              </Typography>
                            </Box>
                          </Box>
                        </CardContent>
                        <Divider />
                      </Card>
                    </Grid>

                    <Grid xs={12} md={6} lg={4} sx={{ mt: "1rem" }}>
                      <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                      >
                        {(formik) => {
                          return (
                            <Form encType="multipart/form-data">
                              <Grid container spacing={3}>
                                <Grid xs={12} md={6}>
                                  <Box>
                                    <FormLabel htmlFor="name">
                                      Username:
                                    </FormLabel>
                                    <Typography
                                      id="name"
                                      variant="h6"
                                      color="darkblack"
                                    >
                                      {user_account.name}
                                    </Typography>
                                  </Box>
                                </Grid>
                                <Grid xs={12} md={6}>
                                  <Box>
                                    <FormLabel htmlFor="email">Email</FormLabel>
                                    <Typography
                                      variant="h6"
                                      id="email"
                                      color="darkblack"
                                    >
                                      {user_account.email}
                                    </Typography>
                                  </Box>
                                </Grid>
                                <Grid xs={12} md={6}>
                                  <Box>
                                    <FormLabel htmlFor="phone">Phone</FormLabel>
                                    <Typography
                                      variant="h6"
                                      id="phone"
                                      color="darkblack"
                                    >
                                      {user_account.phone}
                                    </Typography>
                                  </Box>
                                </Grid>
                                <Grid xs={12} md={6}>
                                  <Box>
                                    <FormLabel htmlFor="gender">
                                      Gender
                                    </FormLabel>
                                    <Typography
                                      variant="h6"
                                      id="gender"
                                      color="darkblack"
                                    >
                                      {user_account.gender}
                                    </Typography>
                                  </Box>
                                </Grid>
                                <Grid xs={12} md={6}>
                                  <Box>
                                    <FormLabel htmlFor="gender">
                                      Address
                                    </FormLabel>
                                    <Typography
                                      variant="h6"
                                      id="gender"
                                      color="darkblack"
                                    >
                                      {Object.values(user_account.address).join(
                                        ","
                                      )}
                                    </Typography>
                                  </Box>
                                </Grid>

                                <Grid xs={12} md={6}>
                                  <FormikControl
                                    label="Nickname"
                                    control="input"
                                    name="nickname"
                                    type="text"
                                    placeholder="Nickname"
                                    variant="standard"
                                    color="secondary"
                                  />
                                </Grid>
                                <Grid xs={12} md={6}>
                                  <Box sx={{ display: "inline-block" }}>
                                    <DatePicker
                                      value={value}
                                      onChange={(newValue) =>
                                        setValue(newValue)
                                      }
                                      maxDate={new Date()}
                                      label="Date of Birth"
                                    />
                                  </Box>
                                </Grid>

                                <Grid xs={12} md={6}>
                                  <FormikControl
                                    label="Street"
                                    control="input"
                                    name="address.street"
                                    type="text"
                                    placeholder="Street"
                                    variant="standard"
                                    color="secondary"
                                  />
                                </Grid>
                                <Grid xs={12} md={6}>
                                  <FormikControl
                                    label="City"
                                    control="input"
                                    name="address.city"
                                    type="text"
                                    placeholder="City"
                                    variant="standard"
                                    color="secondary"
                                  />
                                </Grid>
                                <Grid xs={12} md={6}>
                                  <FormikControl
                                    label="State"
                                    control="input"
                                    name="address.state"
                                    type="text"
                                    placeholder="State"
                                    variant="standard"
                                    color="secondary"
                                  />
                                </Grid>
                                <Grid xs={12} md={6}>
                                  <FormikControl
                                    label="Pincode"
                                    control="input"
                                    name="address.pincode"
                                    type="text"
                                    placeholder="Pincode"
                                    variant="standard"
                                    color="secondary"
                                  />
                                </Grid>
                                <Grid xs={12} md={6}>
                                  <FormikControl
                                    control="select"
                                    name="address.country"
                                    label="Country"
                                    variant="standard"
                                    required
                                    options={countryList}
                                    color="secondary"
                                  />
                                </Grid>
                                <Grid xs={12} md={6}>
                                  <input
                                    type="file"
                                    onChange={(event) => {
                                      formik.setFieldValue(
                                        "dp",
                                        event.target.files[0]
                                      );
                                    }}
                                  />
                                </Grid>

                                <Grid xs={12} md={6}>
                                  <CardActions
                                    sx={{ justifyContent: "flex-end" }}
                                  >
                                    <Grid
                                      sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                      }}
                                      gap={10}
                                    >
                                      <Button
                                        variant="contained"
                                        role="submit"
                                        type="submit"
                                      >
                                        {isUpdateLoading ? (
                                          <CircularProgress color="secondary" />
                                        ) : (
                                          "Save details"
                                        )}
                                      </Button>

                                      <Button
                                        variant="contained"
                                        color="secondary"
                                        component={Link}
                                        to="/accounts/reset-password"
                                      >
                                        Reset Password
                                      </Button>
                                    </Grid>
                                  </CardActions>
                                </Grid>
                              </Grid>
                            </Form>
                          );
                        }}
                      </Formik>
                    </Grid>
                  </div>
                )}
                {isError && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <h1>Profile Not Found</h1>
                  </div>
                )}
              </Box>
            </CardContent>
            <Divider />
          </Card>
        </Stack>
      </Container>
    </Box>
  );
};
