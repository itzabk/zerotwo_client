//START IMPORTS
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { CircularProgress, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Swal from "sweetalert2";
import { useDeleteProductMutation } from "../../features/product/productApiSlice";
import EditProduct from "./EditProduct";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Link } from "react-router-dom";
//STOP IMPORTS

const ProductActions = ({ params }) => {
  const [deleteProduct, { isLoading: isDelLoading }] =
    useDeleteProductMutation();
  const [edit, setEdit] = useState(false);
  const handleEdit = () => {
    setEdit(true);
  };
  const handleDelete = async () => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await deleteProduct({
            _id: params.row._id,
          }).unwrap();
          if (
            response?.message === "Product deleted successfully" ||
            response?.status === 200
          ) {
            Swal.fire({
              icon: "success",
              title: `Product deleted successfully`,
              showConfirmButton: false,
              timer: 2500,
            });
          }
        }
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Deletion Failed",
        text: `${err?.data?.message}`,
      });
    }
  };
  return (
    <>
      <IconButton
        variant="contained"
        color="error"
        size="small"
        style={{ marginLeft: 16 }}
        onClick={handleDelete}
      >
        {isDelLoading ? <CircularProgress color="primary" /> : <DeleteIcon />}
      </IconButton>
      <IconButton
        variant="contained"
        color="primary"
        size="small"
        style={{ marginLeft: 16 }}
        onClick={handleEdit}
      >
        <EditIcon />
      </IconButton>
      {edit && (
        <EditProduct
          edit={edit}
          _id={params.row._id}
          setEdit={setEdit}
          pname={params.row.pname}
          amount={params.row.price.amount}
          currency={params.row.price.currency}
          stock={params.row.stock}
          desc={params.row.desc}
          warranty={params.row.warranty}
        />
      )}

      <IconButton component={Link} to={`/products/${params.row._id}`}>
        <RemoveRedEyeIcon />
      </IconButton>
    </>
  );
};

export default ProductActions;
