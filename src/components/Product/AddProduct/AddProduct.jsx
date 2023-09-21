//START IMPORTS
import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
  Grid,
  TextField,
  FormControl,
  FormLabel,
  CircularProgress,
  MenuItem,
  Tooltip,
  IconButton,
} from "@mui/material";
import { Form, Formik, FieldArray, Field } from "formik";
import * as yup from "yup";
import { useAddProductMutation } from "../../../features/product/productApiSlice";
import Swal from "sweetalert2";
import { selectAllBrands } from "../../../features/brand/brandApiSlice";
import { selectAllCategories } from "../../../features/category/categoryApiSlice";
import { useSelector } from "react-redux";
import { currencyList } from "./currencyList";
import FormikControl from "../../FormikControl/FormikControl";
import { useGetAroundProblemMutation } from "../../../features/subcategory/subcategoryApiSlice";

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

export default function AddProduct() {
  const [open, setOpen] = React.useState(false);
  const [category, setCategory] = React.useState("");
  const [subcat, setSubcat] = React.useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setCategory("");
    setSubcat("");
  };
  const [page, setPage] = React.useState(0);
  const [addProduct, { isLoading }] = useAddProductMutation();
  const categories = useSelector(selectAllCategories);
  const brands = useSelector(selectAllBrands);
  const [getAroundProblem] = useGetAroundProblemMutation();
  //transform category
  const tranCat = categories?.map((ele) => {
    return { key: ele._id, value: ele.cname };
  });
  //transform brands
  const tranBrand = brands?.map((ele) => {
    return { key: ele._id, value: ele.bname };
  });
  const handleCategory = async (e) => {
    setCategory(e.target.value);
    try {
      if (e.target.value !== "") {
        const foundCat = categories.find((ele) => ele.cname === e.target.value);
        const data = await getAroundProblem({ catId: foundCat._id }).unwrap();
        if (data.length) {
          const newData = data.map((ele) => {
            return { key: ele._id, value: ele.scname };
          });
          setSubcat(newData);
        }
      }
    } catch (err) {
      setSubcat("");
    }
  };
  //Go to prev page
  const handlePrev = () =>
    setPage((prev) => {
      if (prev > 0) {
        return prev - 1;
      } else {
        return prev;
      }
    });
  //Go to next page
  const handleNext = () =>
    setPage((prev) => {
      if (prev < 2) {
        return prev + 1;
      } else {
        return prev;
      }
    });
  //Initial State
  const initialValues = {
    brand: "",
    subcat: "",
    pname: "",
    price: {
      amount: "",
      currency: "",
    },
    warranty: "",
    pimg: "",
    origin: "",
    stock: "",
    desc: "",
    info: [{ key: "", value: "" }],
    varient: [""],
  };
  //Validation Schema
  const validationSchema = yup.object({
    brand: yup.string().required("Brand is required"),
    subcat: yup.string().required("Subcategory is required"),
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
    origin: yup.string().required("Origin is required"),
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
    info: yup.array().of(
      yup.object().shape({
        key: yup.string(),
        value: yup.string(),
      })
    ),
    pimg: yup.mixed().required("Product image is required"),
    varient: yup.array().of(yup.string()),
  });

  //on submit handler
  const onSubmit = async (values, props) => {
    try {
      //get catid
      const foundCat = categories.find((ele) => ele.cname === category);
      //get subcatid
      const foundSubcat = subcat.find((ele) => ele.value === values.subcat);
      //get brand id
      const foundBrand = brands.find((ele) => ele.bname === values.brand);

      let data = new FormData();
      data.append("pname", values.pname);
      data.append("brand", foundBrand._id);
      data.append("cat", foundCat._id);
      data.append("subcat", foundSubcat.key);
      const strVal = JSON.stringify(values.price);
      data.append("price", strVal);
      data.append("warranty", values.warranty);
      data.append("pimg", values.pimg);
      data.append("origin", values.origin);
      data.append("stock", values.stock);
      data.append("desc", values.desc);
      const serializeInfo = JSON.stringify(values.info);
      data.append("info", serializeInfo);
      const serializeVarient = JSON.stringify(values.varient);
      data.append("varient", serializeVarient);

      const response = await addProduct(data).unwrap();
      if (
        response.message === "New product added successfully" ||
        response.status === 201
      ) {
        Swal.fire({
          icon: "success",
          title: "New Product Added Successfully",
          showConfirmButton: true,
          confirmButtonText: "Ok",
        });
        props.setSubmitting(false);
        props.resetForm();
        setCategory("");
        setSubcat("");
      }
    } catch (err) {
      props.setSubmitting(false);
      props.resetForm();
      setCategory("");
      setSubcat("");
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
        <FormControl>
          <FormLabel htmlFor="cat">Select Category</FormLabel>
          <TextField
            onChange={handleCategory}
            name="category"
            value={category}
            select
            id="cat"
          >
            {tranCat?.map((ele, i) => {
              return (
                <MenuItem key={ele.key} value={ele.value}>
                  {ele.value}
                </MenuItem>
              );
            })}
          </TextField>
        </FormControl>
      </Grid>
      {subcat !== "" && (
        <Grid item>
          <FormikControl
            control="select"
            options={subcat}
            name="subcat"
            label="Select Subcategory"
            variant="standard"
            required
            color="secondary"
          />
        </Grid>
      )}

      <Grid item>
        <FormikControl
          control="select"
          options={tranBrand}
          name="brand"
          label="Select Brand"
          variant="standard"
          required
          color="secondary"
        />
      </Grid>
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
    </>
  );
  //secondary content
  const secondaryContent = (
    <>
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
          placeholder="Enter Country of Origin"
          name="origin"
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
  //ternary content
  const ternaryContent = (
    <>
      <Grid item>
        <FieldArray name="info">
          {(fieldArrayProps) => {
            const { push, remove, form } = fieldArrayProps;
            const { values } = form;
            const { info } = values;
            return (
              <Box>
                {info?.map((ele, i) => {
                  return (
                    <Box
                      key={i}
                      sx={{
                        overflowY: "auto",
                        border: "1px solid grey",
                        p: "0.5rem",
                      }}
                    >
                      <Box>
                        <Button
                          variant="outlined"
                          onClick={() => push({ key: "", value: "" })}
                        >
                          +
                        </Button>
                        <Button
                          variant="outlined"
                          onClick={() => remove(i)}
                          disabled={info?.length === 1}
                        >
                          -
                        </Button>
                      </Box>{" "}
                      <span>
                        <Field name={`info[${i}].key`} id="key">
                          {({ field, meta }) => {
                            return (
                              <FormControl>
                                <FormLabel htmlFor="key">Info Key</FormLabel>
                                <TextField
                                  {...field}
                                  variant="standard"
                                  color="secondary"
                                />
                              </FormControl>
                            );
                          }}
                        </Field>
                        <Field name={`info[${i}].value`} id="value">
                          {({ field, meta }) => {
                            return (
                              <FormControl>
                                <FormLabel htmlFor="value">
                                  Info Value
                                </FormLabel>
                                <TextField
                                  {...field}
                                  variant="standard"
                                  color="secondary"
                                />
                              </FormControl>
                            );
                          }}
                        </Field>
                      </span>
                    </Box>
                  );
                })}
              </Box>
            );
          }}
        </FieldArray>
      </Grid>
      <Grid item>
        <FieldArray name="varient">
          {function (fieldArrayProps) {
            const { push, remove, form } = fieldArrayProps;
            const { values } = form;
            const { varient } = values;
            return (
              <Box>
                {varient.map((ele, i) => {
                  return (
                    <Box key={i}>
                      <FormControl>
                        <FormLabel htmlFor="field">Varient Details</FormLabel>
                        <span>
                          <Field name={`varient[${i}]`} id="field" />
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() => remove(i)}
                            disabled={varient?.length === 1}
                          >
                            -
                          </Button>
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() => push("")}
                          >
                            +
                          </Button>
                        </span>
                      </FormControl>
                    </Box>
                  );
                })}
              </Box>
            );
          }}
        </FieldArray>
      </Grid>
    </>
  );

  const display = {
    0: primaryContent,
    1: secondaryContent,
    2: ternaryContent,
  };

  return (
    <div>
      <IconButton onClick={handleOpen}>
        <Tooltip title="Add New Product">
          <AddCircleIcon fontSize="large" sx={{ color: "green" }} />
        </Tooltip>
      </IconButton>
      <Modal
        open={open}
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
                    <h2 style={{ textAlign: "center" }}>Add New Product</h2>
                    <hr />
                    {display[page]}
                    {page === 2 && (
                      <Grid item>
                        <input
                          type="file"
                          name="bimg"
                          onChange={(event) => {
                            formik.setFieldValue("pimg", event.target.files[0]);
                          }}
                        />
                      </Grid>
                    )}
                    {page === 2 && (
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
                            "Add Product"
                          )}
                        </Button>
                      </Grid>
                    )}
                  </Grid>
                  <Grid item>
                    <span
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Button onClick={handlePrev} disabled={page === 0}>
                        Prev
                      </Button>
                      <Button onClick={handleNext} disabled={page === 2}>
                        Next
                      </Button>
                    </span>
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
