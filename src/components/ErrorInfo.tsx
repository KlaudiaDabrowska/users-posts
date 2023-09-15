import { Typography } from "@mui/material";

export const ErrorInfo = ({ error }: { error?: string | string[] }) => {
  return (
    <Typography
      variant="subtitle2"
      sx={{ color: "error.main", p: 0, textAlign: "start" }}
    >
      {error}
    </Typography>
  );
};
