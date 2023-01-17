import * as React from "react";
import Typography from "@mui/material/Typography";
import { SxProps } from "@mui/material";

interface TitleProps {
  children?: React.ReactNode;
  sx?: SxProps;
}

export default function Title(props: TitleProps) {
  return (
    <Typography
      component="h2"
      variant="h6"
      color="primary"
      gutterBottom
      sx={props.sx}
    >
      {props.children}
    </Typography>
  );
}
