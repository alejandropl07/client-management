import React, { Fragment } from "react";
import { Box, Typography } from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";

function Error() {
  return (
    <Fragment>
        <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
      <WarningIcon color="primary"
       sx={{ fontSize: 80 }} />
       <Typography
        component="h1"
        variant="h2"
        color="primary"
        noWrap
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        404
      </Typography>
       </Box>
      <Typography
        component="h1"
        variant="h2"
        color="inherit"
        noWrap
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        Error
      </Typography>
    </Fragment>
  );
}

export default Error;
