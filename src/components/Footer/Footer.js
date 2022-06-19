import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { grey } from "@mui/material/colors";

const Footer = () => {
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: grey[100],
        textAlign: "center",
        p: 1,
      }}
    >
      <Typography variant="caption" color="primary">
        &copy; 2022 Microtask Counter. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
