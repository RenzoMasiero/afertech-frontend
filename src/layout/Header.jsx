import { Box, Typography } from "@mui/material";

export default function Header() {
  return (
    <Box
      sx={{
        height: 56,
        backgroundColor: "#03a9f4",
        display: "flex",
        alignItems: "center",
        paddingX: 2,
      }}
    >
      <Typography variant="h6" sx={{ color: "white" }}>
        Gestión Total
      </Typography>
    </Box>
  );
}
