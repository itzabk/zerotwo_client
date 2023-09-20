// START IMPORTS
import { GridTable } from "../Table/GridTable";
import { useGetBrandsQuery } from "../../features/brand/brandApiSlice";
import { Container, Stack, IconButton, Avatar } from "@mui/material";
import { useDeleteBrandMutation } from "../../features/brand/brandApiSlice";
import Swal from "sweetalert2";
import DeleteIcon from "@mui/icons-material/Delete";
import { format } from "date-fns";
import React from "react";
import BouncingDotsLoader from "../BouncingLoader/BouncingLoader";
//STOP IMPORTS

const ListBrands = () => {
  //Get Brands
  const { data: brands, isLoading, isSuccess, isError } = useGetBrandsQuery();
  //Configure Delete API
  const [deleteBrand] = useDeleteBrandMutation();
  //Configure Data Grid
  const columns = [
    {
      field: "_id",
      headerName: "ID",
      width: 250,
      editable: false,
    },
    {
      field: "bimg",
      headerName: "Brand Logo",
      width: 200,
      editable: false,
      renderCell: (params) => {
        return (
          <Avatar variant="square" sx={{ width: "80%" }}>
            <img src={params.row?.bimg} alt={params.row?.bname} />
          </Avatar>
        );
      },
    },
    {
      field: "bname",
      headerName: "Brand Name",
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
        //Handle Brand Delete
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
                const response = await deleteBrand({
                  bname: params.row.bname,
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
    <>
      {isLoading && <BouncingDotsLoader />}
      <Container>
        <Stack sx={{ width: "inherit" }}>
          {isSuccess && brands?.ids?.length > 0 && (
            <GridTable
              rows={brands?.ids?.map((ele) => brands.entities[ele])}
              columns={columns}
              loading={isLoading}
            />
          )}
          {isError && (
            <div
              style={{
                backgroundImage: "url(/no-results.png)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "auto",
                width: "inherit",
                height: "100vh",
              }}
            ></div>
          )}
        </Stack>
      </Container>
    </>
  );
};

export default ListBrands;
