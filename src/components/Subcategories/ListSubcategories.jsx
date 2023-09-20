//START IMPORTS
import { GridTable } from "../Table/GridTable";
import { useGetSubcategoriesQuery } from "../../features/subcategory/subcategoryApiSlice";
import { Container, Stack, IconButton } from "@mui/material";
import { useDeleteSubCategoryMutation } from "../../features/subcategory/subcategoryApiSlice";
import Swal from "sweetalert2";
import DeleteIcon from "@mui/icons-material/Delete";
import { format } from "date-fns";
import React from "react";
import BouncingDotsLoader from "../BouncingLoader/BouncingLoader";
//STOP IMPORTS

const ListSubcategories = ({ catId }) => {
  //configure get subcat API
  const {
    data: subcategories,
    isLoading,
    isSuccess,
    isError,
  } = useGetSubcategoriesQuery({ catId });
  //configure Delete subact API
  const [deleteSubcategory] = useDeleteSubCategoryMutation();
  //configure DataGrid
  const columns = [
    {
      field: "_id",
      headerName: "ID",
      width: 250,
      editable: false,
    },
    {
      field: "scname",
      headerName: "Subcategory Name",
      width: 200,
      editable: false,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 200,
      editable: false,
      valueGetter: (params) => {
        return format(new Date(params?.value), "dd-MMM-yyyy");
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 140,
      editable: false,
      renderCell: (params) => {
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
                const response = await deleteSubcategory({
                  scname: params.row.scname,
                }).unwrap();
                if (
                  response?.message === "Brand Deleted Successfully" ||
                  response?.status === 200
                ) {
                  Swal.fire({
                    icon: "success",
                    title: `Brand deleted successfully`,
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
          <IconButton
            variant="contained"
            color="error"
            size="small"
            style={{ marginLeft: 16 }}
            onClick={handleDelete}
          >
            <DeleteIcon />
          </IconButton>
        );
      },
      disableClickEventBubbling: true,
    },
  ];
  //render UI
  return (
    <Container>
      <Stack sx={{ width: "inherit" }}>
        {isLoading && <BouncingDotsLoader />}
        {isSuccess && subcategories?.ids?.length > 0 ? (
          <GridTable
            rows={subcategories?.ids?.map(
              (ele) => subcategories?.entities[ele]
            )}
            columns={columns}
            loading={isLoading}
          />
        ) : null}
        {isError && (
          <div
            style={{
              backgroundImage: "url(/no-results.png)",
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
              width: "inherit",
              height: "100vh",
            }}
          ></div>
        )}
      </Stack>
    </Container>
  );
};

export default ListSubcategories;
