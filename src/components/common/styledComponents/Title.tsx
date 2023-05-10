import { SxProps, Typography } from "@mui/material";
import { ReactNode } from "react";

interface TitleProps {
  children?: ReactNode;
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
