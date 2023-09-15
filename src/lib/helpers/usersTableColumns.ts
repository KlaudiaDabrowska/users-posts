import { GridColDef } from "@mui/x-data-grid";

export const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
    align: "center",
  },
  {
    field: "username",
    headerName: "Username",
    align: "center",
  },
  {
    field: "email",
    headerName: "Email",
    align: "center",
  },
  {
    field: "phone",
    headerName: "Phone number",
    align: "center",
  },
  {
    field: "website",
    headerName: "Website",
    align: "center",
  },
  {
    field: "address",
    headerName: "City",
    align: "center",
  },
];
