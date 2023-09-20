// START IMPORTS
import { GridTable } from "../Table/GridTable";
import { useGetOrderQuery } from "../../features/order/orderApiSlice";
import { Container, Stack, Paper, Typography } from "@mui/material";
import { format } from "date-fns";
import React from "react";
import BouncingDotsLoader from "../BouncingLoader/BouncingLoader";
import DefaultMenuBar from "../AppMenuBar/DefaultMenuBar";
//STOP IMPORTS

const AllCustomerOrder = () => {
  //user
  const userId = localStorage.getItem("userId");
  //Get Brands
  const {
    data: orders,
    isLoading,
    isSuccess,
    isError,
  } = useGetOrderQuery(userId);
  //Configure Data Grid
  console.log(orders);
  const columns = [
    {
      field: "_id",
      headerName: "ID",
      width: 250,
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
      field: "email",
      headerName: "Customer Email",
      width: 200,
      editable: false,
    },
    {
      field: "phone",
      headerName: "Customer Phone",
      width: 200,
      editable: false,
    },
    {
      field: "payment_status",
      headerName: "Status",
      width: 200,
      editable: false,
    },
    {
      field: "payment_no",
      headerName: "Reference Number",
      width: 200,
      editable: false,
    },
    {
      field: "payment_amt",
      headerName: "Amount",
      width: 200,
      editable: false,
    },
  ];
  //render UI
  return (
    <>
      <Container>
        <DefaultMenuBar />
        {isLoading && <BouncingDotsLoader />}

        <Paper elevation={3} sx={{ minHeight: "70vh" }}>
          <Container>
            <Typography variant="h4" color={"secondary"}>
              All Orders
            </Typography>
            <Stack sx={{ width: "inherit", padding: "1rem" }}>
              {isSuccess && orders?.length > 0 && (
                <GridTable
                  rows={orders?.map((ele) => ele)}
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
        </Paper>
      </Container>
    </>
  );
};

export default AllCustomerOrder;
