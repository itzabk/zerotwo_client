//START IMPORT
import { GridTable } from "../Table/GridTable";
import { useGetAccountsQuery } from "../../features/accounts/accountsApiSlice";
import { Container, Stack, IconButton, Box } from "@mui/material";
import { useDeleteAccountMutation } from "../../features/accounts/accountsApiSlice";
import Swal from "sweetalert2";
import DeleteIcon from "@mui/icons-material/Delete";
import { format } from "date-fns";
import BlockIcon from "@mui/icons-material/Block";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { useBanAccountMutation } from "../../features/accounts/accountsApiSlice";
import { useUnbanAccountMutation } from "../../features/accounts/accountsApiSlice";
import React from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Link } from "react-router-dom";
import BouncingDotsLoader from "../BouncingLoader/BouncingLoader";
//STOP IMPORT

const ListAccounts = () => {
  //get role
  const userId = localStorage.getItem("userId");
  //configure get Account API
  const {
    data: accounts,
    isLoading,
    isSuccess,
    isError,
  } = useGetAccountsQuery();
  //configure delete,ban,unban API
  const [deleteAccount] = useDeleteAccountMutation();
  const [banAccount] = useBanAccountMutation();
  const [unbanAccount] = useUnbanAccountMutation();
  //configure DataGrid
  const columns = [
    {
      field: "_id",
      headerName: "ID",
      width: 250,
      editable: false,
    },
    {
      field: "name",
      headerName: "Name",
      width: 200,
      editable: false,
    },
    {
      field: "email",
      headerName: "Email",
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
      field: "lastlogin",
      headerName: "Last Login",
      width: 200,
      editable: false,
      valueGetter: (params) => {
        return params?.row?.lastlogin
          ? format(new Date(params?.row?.lastlogin), "dd-MMM-yyyy")
          : null;
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 300,
      editable: false,
      renderCell: (params) => {
        //Ban User
        const handleBan = async () => {
          try {
            Swal.fire({
              title: "Are you sure?",
              text: "Do you really want to ban this user?",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes, Ban user!",
            }).then(async (result) => {
              if (result.isConfirmed) {
                //handle Response
                const response = await banAccount({
                  _id: params.row._id,
                }).unwrap();
                if (
                  response?.message === "User is Banned" ||
                  response?.status === 200
                ) {
                  Swal.fire({
                    icon: "success",
                    title: `User Banned :(`,
                    showConfirmButton: false,
                    timer: 2500,
                  });
                }
              }
            });
          } catch (err) {
            Swal.fire({
              icon: "error",
              title: "Banned Failed",
              text: `${err?.data?.message}`,
            });
          }
        };

        //Unban User
        const handleUnban = async () => {
          try {
            Swal.fire({
              title: "Are you sure?",
              text: "Do you really want to revoke ban on this user?",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes, Unban user!",
            }).then(async (result) => {
              if (result.isConfirmed) {
                //handle Response
                const response = await unbanAccount({
                  _id: params.row._id,
                }).unwrap();
                if (
                  response?.message === "User is unbanned" ||
                  response?.status === 200
                ) {
                  Swal.fire({
                    icon: "success",
                    title: `User Unbanned :D`,
                    showConfirmButton: false,
                    timer: 2500,
                  });
                }
              }
            });
          } catch (err) {
            Swal.fire({
              icon: "error",
              title: "Unban Failed",
              text: `${err?.data?.message}`,
            });
          }
        };

        //Delete User
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
                const response = await deleteAccount({
                  _id: params.row._id,
                }).unwrap();
                if (
                  response?.message === "User deleted successfully" ||
                  response?.status === 200
                ) {
                  Swal.fire({
                    icon: "success",
                    title: `User deleted successfully`,
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
          <Box>
            {params.row._id !== userId && (
              <IconButton
                variant="contained"
                color="error"
                size="small"
                style={{ marginLeft: 16 }}
                onClick={handleDelete}
              >
                <DeleteIcon />
              </IconButton>
            )}
            {params.row.underBan && params.row._id !== userId && (
              <IconButton
                variant="contained"
                color="success"
                size="small"
                style={{ marginLeft: 16 }}
                onClick={handleUnban}
              >
                <RemoveCircleOutlineIcon />
              </IconButton>
            )}
            {!params.row.underBan && params.row._id !== userId && (
              <IconButton
                variant="contained"
                color="error"
                size="small"
                style={{ marginLeft: 16 }}
                onClick={handleBan}
              >
                <BlockIcon />
              </IconButton>
            )}
            <IconButton component={Link} to={`${params.row._id}`}>
              <RemoveRedEyeIcon />
            </IconButton>
          </Box>
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
        {isSuccess && accounts?.ids?.length > 0 && (
          <GridTable
            rows={accounts.ids.map((ele) => accounts.entities[ele])}
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
  );
};

export default ListAccounts;
