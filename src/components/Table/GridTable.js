//START IMPORTS
import { DataGrid } from "@mui/x-data-grid";
import { Container } from "@mui/material";
import { GridToolbar } from "@mui/x-data-grid";
//STOP IMPORTS

export const GridTable = ({ rows, columns, loading }) => {
  //render UI
  return (
    <Container>
      <DataGrid
        autoHeight
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        slots={{ toolbar: GridToolbar }}
        pageSizeOptions={[5, 10]}
        disableRowSelectionOnClick
        loading={loading}
        sx={{
          boxShadow: 2,
          border: 2,
          fontFamily: "montserrat",
          fontSize: "1rem",
          borderColor: "black",
          "& .MuiDataGrid-cell:hover": {
            color: "secondary.main",
          },
        }}
      />
    </Container>
  );
};
