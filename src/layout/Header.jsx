import { Box, Typography } from "@mui/material";

export default function Header() {
  return (
    <Box
      sx={{
        height: 100,
        backgroundColor: "#03a9f4",
        display: "flex",
        alignItems: "center",
        paddingX: 4,
      }}
    >
      <Typography variant="h4" sx={{ color: "white" }}>
        Gestión Total - AferTech
      </Typography>
    </Box>
  );
}
