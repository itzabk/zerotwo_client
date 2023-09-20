//START IMPORT
import { GridTable } from "../Table/GridTable";
import { useGetCategoriesQuery } from "../../features/category/categoryApiSlice";
import { Container, Stack } from "@mui/material";
import React from "react";
import { format } from "date-fns";
import CategoryActions from "./CategoryActions";
import BouncingDotsLoader from "../BouncingLoader/BouncingLoader";
//STOP IMPORT

const ListCategories = () => {
  //Configure Get Category API
  const {
    data: categories,
    isLoading,
    isSuccess,
    isError,
  } = useGetCategoriesQuery();
  //configure Data Grid
  const columns = [
    {
      field: "_id",
      headerName: "ID",
      width: 260,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "cname",
      headerName: "Category Name",
      width: 200,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 200,
      editable: false,
      valueGetter: (params) => {
        return format(new Date(params?.value), "dd-MMM-yyyy");
      },
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
        return <CategoryActions params={{ ...params }} />;
      },
      disableClickEventBubbling: true,
    },
  ];
  //render UI
  return (
    <Container>
      <Stack sx={{ width: "100%" }}>
        {isLoading && <BouncingDotsLoader />}
        {categories?.ids?.length > 0 && isSuccess && (
          <GridTable
            rows={categories?.ids?.map((ele) => categories?.entities[ele])}
            columns={columns}
            loading={isLoading}
          />
        )}
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

export default ListCategories;
