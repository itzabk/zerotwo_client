//START IMPORTS
import * as React from "react";
import { memo } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { Grid, CircularProgress } from "@mui/material";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { useUpdateProductMutation } from "../../features/product/productApiSlice";
import Swal from "sweetalert2";
import { currencyList } from "./AddProduct/currencyList";
import FormikControl from "../FormikControl/FormikControl";
//END IMPORTS

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function EditProduct({
  _id,
  pname,
  amount,
  currency,
  warranty,
  stock,
  desc,
  edit,
  setEdit,
}) {
  const handleClose = () => {
    setEdit(false);
  };
  const [updateProduct, { isLoading }] = useUpdateProductMutation();

  //Initial State
  const initialValues = {
    pname: pname,
    price: {
      amount: amount,
      currency: currency,
    },
    warranty: warranty,
    stock: stock,
    desc: desc,
  };
  //Validation Schema
  const validationSchema = yup.object({
    pname: yup
      .string()
      .min(3, "Product name must be atleast 3 characters long")
      .trim()
      .matches(
        new RegExp(/^[a-zA-Z]+$/),
        "Product name must contain only alphabets"
      )
      .required("Product name is required"),
    warranty: yup.string().trim().required("Warranty is required"),
    stock: yup.number().min(0).required("Stock count is required"),
    desc: yup
      .string()
      .min(10, "Product description must be minimum 10 characters long")
      .max(200, "Product description must be maximum 200 characters long")
      .trim()
      .required("Description is required"),
    price: yup
      .object({
        amount: yup.number().min(1).required("Amount is required"),
        currency: yup.string().trim().required("Currency type is required"),
      })
      .required("Price cannot be empty"),
  });

  //on submit handler
  const onSubmit = async (values, props) => {
    try {
      const data = {
        _id: _id,
        pname: values.pname,
        price: {
          amount: values.price.amount,
          currency: values.price.currency,
        },
        warranty: values.warranty,
        stock: values.stock,
        desc: values.desc,
      };
      const response = await updateProduct(data).unwrap();
      if (
        response.message === "Product updated successfully" ||
        response.status === 200
      ) {
        Swal.fire({
          icon: "success",
          title: "Product Updated Successfully",
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

  //primary details
  const primaryContent = (
    <>
      <Grid item>
        <FormikControl
          control={"input"}
          placeholder="Enter Product Name"
          name="pname"
          type="text"
          variant="standard"
          required
          color="secondary"
          autoFocus
          autoComplete={"false"}
        />
      </Grid>
      <Grid item>
        <FormikControl
          control="select"
          options={currencyList}
          name="price.currency"
          label="Select Currency Type"
          variant="standard"
          required
          color="secondary"
        />
      </Grid>
      <Grid item>
        <FormikControl
          control={"input"}
          placeholder="Enter Price"
          name="price.amount"
          type="number"
          variant="standard"
          required
          color="secondary"
          autoComplete={"false"}
        />
      </Grid>
      <Grid item>
        <FormikControl
          control={"input"}
          placeholder="Enter Warranty Period [1 year]"
          name="warranty"
          type="text"
          variant="standard"
          required
          color="secondary"
          autoComplete={"false"}
        />
      </Grid>
      <Grid item>
        <FormikControl
          control={"input"}
          placeholder="Enter Stock Available"
          name="stock"
          type="number"
          variant="standard"
          required
          color="secondary"
          autoComplete={"false"}
        />
      </Grid>
      <Grid item>
        <FormikControl
          control={"input"}
          placeholder="Enter Product Description"
          name="desc"
          type="text"
          multiline
          variant="standard"
          required
          color="secondary"
          autoComplete={"false"}
        />
      </Grid>
    </>
  );

  const display = {
    0: primaryContent,
  };

  return (
    <div>
      <Modal
        keepMounted
        open={edit}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
        sx={{ overflowY: "scroll" }}
      >
        <Box sx={style}>
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
                    <h2 style={{ textAlign: "center" }}>Update Product</h2>
                    <hr />
                    {display[0]}
                    <Grid item>
                      <Button
                        type="submit"
                        role="submit"
                        color="secondary"
                        variant="contained"
                        size="medium"
                      >
                        {isLoading ? (
                          <CircularProgress color="primary" />
                        ) : (
                          "Update Product"
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
    </div>
  );
}

export default memo(EditProduct);
