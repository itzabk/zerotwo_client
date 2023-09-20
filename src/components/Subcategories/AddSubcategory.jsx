//START IMPORTS
import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import FormikControl from "../FormikControl/FormikControl";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { useAddSubcategoryMutation } from "../../features/subcategory/subcategoryApiSlice";
import Swal from "sweetalert2";
import { Grid, CircularProgress, IconButton, Tooltip } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { selectAllCategories } from "../../features/category/categoryApiSlice";
import { useSelector } from "react-redux";
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

export default function AddSubcategory() {
  //handle Modal Open/Close
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [addSubcategory, { isLoading }] = useAddSubcategoryMutation();
  //select Category
  const categories = useSelector(selectAllCategories);
  const categoriesNew = categories?.map((ele) => {
    return { key: ele._id, value: ele.cname, id: ele.id };
  });

  //Initial Form State
  const initialValues = {
    scname: "",
    cat: "",
  };
  //Validation schema
  const validationSchema = yup.object({
    scname: yup
      .string()
      .min(3, "Subcategory name too short")
      .matches(/^[a-zA-Z]+$/, "Subcategory must only contain letters")
      .trim()
      .required("Subcategory is required"),
    cat: yup.string().required("Category is required"),
  });
  //on Submit handler
  const onSubmit = async (values, props) => {
    try {
      //transform input [Abcd] format
      const transformedValue =
        values.scname.slice(0, 1).toUpperCase() +
        values.scname.slice(1).toLowerCase();

      const categoryFound = categories.find((ele) => {
        return ele.cname === values.cat;
      });
      const data = { scname: transformedValue, cat: categoryFound._id };
      //handle response
      const response = await addSubcategory(data).unwrap();
      if (
        response.message === "New Subcategory added successfully" ||
        response.status === 201
      ) {
        Swal.fire({
          icon: "success",
          title: "New Subategory Added Successfully",
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
        <Tooltip title="Add New Subcategory">
          <AddCircleIcon fontSize="large" sx={{ color: "orange" }} />
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
                        control={"select"}
                        label="Select Category"
                        name="cat"
                        options={categoriesNew}
                        variant="standard"
                        required
                        color="secondary"
                        error={formik.errors?.cat === true}
                        autoComplete={"false"}
                      />
                    </Grid>
                    <br />
                    <Grid item>
                      <FormikControl
                        control={"input"}
                        placeholder="Enter Subcategory"
                        name="scname"
                        type="text"
                        variant="standard"
                        required
                        color="secondary"
                        error={formik.errors?.scname === true}
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
                          "Add Subcategory"
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
