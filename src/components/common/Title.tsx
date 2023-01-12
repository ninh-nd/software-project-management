import * as React from "react";
import Typography from "@mui/material/Typography";

interface TitleProps {
  children?: React.ReactNode;
  className?: string;
}

export default function Title(props: TitleProps) {
  return (
    <Typography
      component="h2"
      variant="h6"
      color="primary"
      gutterBottom
      className={props.className}
    >
      {props.children}
    </Typography>
  );
}
