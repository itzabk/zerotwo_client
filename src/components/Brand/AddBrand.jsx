//START IMPORTS
import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import FormikControl from "../FormikControl/FormikControl";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { useAddBrandMutation } from "../../features/brand/brandApiSlice";
import Swal from "sweetalert2";
import { CircularProgress, IconButton, Tooltip, Grid } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
//END IMPORTS

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "4px solid black",
  boxShadow: 24,
  p: 4,
};

export default function AddBrand() {
  //Handle Model Open/Close
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //Configure Add Brand API
  const [addBrand, { isLoading }] = useAddBrandMutation();

  //Initial Form State
  const initialValues = {
    bname: "",
    bimg: "",
  };
  //Validation schema
  const validationSchema = yup.object({
    bname: yup.string().trim().required("Brand name is required"),
    bimg: yup.mixed(),
  });
  //On Submit Handler
  const onSubmit = async (values, props) => {
    try {
      //Create Form Data
      let data = new FormData();
      data.append("bname", values.bname);
      data.append("bimg", values.bimg);
      //Handle Response
      const response = await addBrand(data).unwrap();
      if (
        response.message === "New Brand created successfully" ||
        response.status === 201
      ) {
        Swal.fire({
          icon: "success",
          title: "New Brand Added Successfully",
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
  //Render UI
  return (
    <Box>
      <IconButton onClick={handleOpen}>
        <Tooltip title="Add New Brand">
          <AddCircleIcon fontSize="large" sx={{ color: "green" }} />
        </Tooltip>
      </IconButton>
      <Modal
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
                <Form encType="multipart/form-data">
                  <Grid container spacing={1.2}>
                    <Grid item>
                      <FormikControl
                        control={"input"}
                        placeholder="Enter Brand name"
                        name="bname"
                        type="text"
                        variant="standard"
                        required
                        color="secondary"
                        error={formik.errors?.bname === true}
                        autoComplete={"false"}
                      />
                    </Grid>
                    <Grid item>
                      <input
                        type="file"
                        name="bimg"
                        onChange={(event) => {
                          formik.setFieldValue("bimg", event.target.files[0]);
                        }}
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
                          "Add Brand"
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
