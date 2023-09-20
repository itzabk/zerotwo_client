//START IMPORTS
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Swal from "sweetalert2";
import { useDeleteCategoryMutation } from "../../features/category/categoryApiSlice";
import EditCategory from "./EditCategory";
//STOP IMPORTS

const CategoryActions = ({ params }) => {
  //Configure Delete API
  const [deleteCategory] = useDeleteCategoryMutation();
  //handle Modal
  const [edit, setEdit] = useState(false);
  const handleEdit = () => {
    setEdit(true);
  };
  //Delete Category
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
          //handle Response
          const response = await deleteCategory({
            cname: params.row.cname,
          }).unwrap();
          if (
            response?.message === "Category Deleted Successfully" ||
            response?.status === 200
          ) {
            Swal.fire({
              icon: "success",
              title: `Category deleted successfully`,
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
  //render UI
  return (
    <>
      <IconButton
        variant="contained"
        color="error"
        size="small"
        style={{ marginLeft: 16 }}
        onClick={handleDelete}
      >
        <DeleteIcon />
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
        <EditCategory
          edit={edit}
          setEdit={setEdit}
          catname={params.row.cname}
          catid={params.row._id}
        />
      )}
    </>
  );
};

export default CategoryActions;
