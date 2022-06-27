import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Footer = () => {
  return (
    <Box
      sx={{
        maxWidth: "100vw",
        textAlign: "center",
        py: 1,
      }}
    >
      <Typography variant="caption">
        &copy; 2022 Microtask Counter. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
