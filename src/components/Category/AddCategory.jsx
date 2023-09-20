//START IMPORTS
import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import FormikControl from "../FormikControl/FormikControl";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { useAddCategoryMutation } from "../../features/category/categoryApiSlice";
import Swal from "sweetalert2";
import { Grid, CircularProgress, IconButton, Tooltip } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
//STOP IMPORTS
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function AddCategory() {
  //Handle Model Open/Close
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //Configure Add Category API
  const [addCategory, { isLoading }] = useAddCategoryMutation();

  //Initial Form State
  const initialValues = {
    cname: "",
  };
  //Validation schema
  const validationSchema = yup.object({
    cname: yup
      .string()
      .min(3, "Category name too short")
      .matches(/^[a-zA-Z]+$/, "Category must only contain letters")
      .trim()
      .required("Category is required"),
  });
  //Handle Form Submit
  const onSubmit = async (values, props) => {
    try {
      //Transform data in [Abcd] format
      const transformedValue =
        values.cname.slice(0, 1).toUpperCase() +
        values.cname.slice(1).toLowerCase();
      const data = { cname: transformedValue };
      //handle Response
      const response = await addCategory(data).unwrap();
      if (
        response.message === "New Category created successfully" ||
        response.status === 201
      ) {
        Swal.fire({
          icon: "success",
          title: "New Category Added Successfully",
          showConfirmButton: true,
          confirmButtonText: "Ok",
        });
        props.setSubmitting(false);
        props.resetForm();
      }
    } catch (error) {
      props.setSubmitting(false);
      props.resetForm();
      console.log(error?.data?.message);
      Swal.fire({
        icon: "error",
        title: error?.data?.message,
        text: "Something went wrong!",
      });
    }
  };
  //render UI
  return (
    <Box>
      <IconButton onClick={handleOpen}>
        <Tooltip title="Add New Category">
          <AddCircleIcon fontSize="large" sx={{ color: "green" }} />
        </Tooltip>
      </IconButton>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(formik) => {
              return (
                <Form>
                  <Grid container spacing={2}>
                    <Grid item>
                      <FormikControl
                        control={"input"}
                        placeholder="Enter Category"
                        name="cname"
                        type="text"
                        variant="standard"
                        required
                        color="secondary"
                        error={formik.errors?.cname === true}
                        autoFocus
                        autoComplete={"false"}
                      />
                    </Grid>
                    <Grid item>
                      <Button
                        role="submit"
                        variant="contained"
                        color="secondary"
                        type="submit"
                        disabled={
                          isLoading ||
                          formik.isSubmitting ||
                          !formik.dirty ||
                          !formik.isValid
                        }
                      >
                        {isLoading ? (
                          <CircularProgress color="secondary" />
                        ) : (
                          "Add Category"
                        )}
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
              );
            }}
          </Formik>
        </Box>
      </Modal>
    </Box>
  );
}
