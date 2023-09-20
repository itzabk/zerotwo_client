//START IMPORT
import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import FormikControl from "../FormikControl/FormikControl";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { useUpdateCategoryMutation } from "../../features/category/categoryApiSlice";
import Swal from "sweetalert2";
import { Grid, CircularProgress } from "@mui/material";
//STOP IMPORT

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

export default function EditCategory({ catname, catid, edit, setEdit }) {
  //handle Modal
  const handleClose = () => {
    setEdit(false);
  };
  //Configure Update Category API
  const [updateCategory, { isLoading }] = useUpdateCategoryMutation();

  //Initial Form State
  const initialValues = {
    cname: catname,
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

  //handle form Submit
  const onSubmit = async (values, props) => {
    try {
      //Transform values in [Abcd] format
      const transformedValue =
        values.cname.slice(0, 1).toUpperCase() +
        values.cname.slice(1).toLowerCase();

      const data = { newname: transformedValue, _id: catid };
      //handle response
      const response = await updateCategory(data).unwrap();
      if (
        response.message === "Category updated successfully" ||
        response.status === 200
      ) {
        Swal.fire({
          icon: "success",
          title: "Category Updated Successfully",
          showConfirmButton: true,
          confirmButtonText: "Ok",
        });
        props.setSubmitting(false);
        props.resetForm();
        setEdit(false);
      }
    } catch (error) {
      props.setSubmitting(false);
      props.resetForm();
      setEdit(false);
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
      <Modal
        keepMounted
        open={edit}
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
                          "Save Category"
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
