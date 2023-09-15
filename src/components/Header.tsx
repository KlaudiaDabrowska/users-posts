import { Typography } from "@mui/material";

export const Header = () => {
  return (
    <header>
      <Typography
        variant="h3"
        sx={{
          p: 3,
          mb: { xs: 4, md: 8 },
          textAlign: "center",
          fontWeight: { xs: "bold", md: "normal" },
        }}
      >
        Users posts
      </Typography>
    </header>
  );
};
