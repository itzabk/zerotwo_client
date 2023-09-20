//START IMPORTS
import { GridTable } from "../Table/GridTable";
import { useGetProductsQuery } from "../../features/product/productApiSlice";
import { Container, Stack } from "@mui/material";
import React from "react";
import currencyFormatter from "../../utils/formatCurrency";
import ProductActions from "./ProductActions";
import BouncingDotsLoader from "../BouncingLoader/BouncingLoader";
//STOP IMPORTS

const ListProducts = () => {
  const {
    data: products,
    isLoading,
    isSuccess,
    isError,
  } = useGetProductsQuery();
  const columns = [
    {
      field: "_id",
      headerName: "ID",
      width: 260,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "pname",
      headerName: "Product Name",
      width: 200,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "stock",
      headerName: "Stock",
      width: 200,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "code",
      headerName: "Currency",
      width: 200,
      editable: false,
      headerAlign: "center",
      valueGetter: (params) => {
        return params.row.price.currency;
      },
      align: "center",
    },
    {
      field: "price",
      headerName: "Price",
      width: 200,
      editable: false,
      valueGetter: (params) => {
        return currencyFormatter(
          params.row.price.currency,
          params.row.price.amount
        );
      },
      headerAlign: "center",
      align: "center",
    },
    {
      field: "desc",
      headerName: "Description",
      width: 200,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "warranty",
      headerName: "Warranty",
      width: 200,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "actions",
      headerName: "Actions",
      headerAlign: "center",
      align: "center",
      width: 140,
      renderCell: (params) => {
        return <ProductActions params={{ ...params }} />;
      },
      disableClickEventBubbling: true,
    },
  ];
  return (
    <>
      {isLoading && <BouncingDotsLoader />}
      <Container>
        <Stack sx={{ width: "100%" }}>
          {isSuccess && products?.ids?.length > 0 && (
            <GridTable
              rows={products?.ids?.map((ele) => products?.entities[ele])}
              columns={columns}
              loading={isLoading}
            />
          )}
          {isError && (
            <div>
              <h5>Products Not Found</h5>
            </div>
          )}
        </Stack>
      </Container>
    </>
  );
};

export default ListProducts;
