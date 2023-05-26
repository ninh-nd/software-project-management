import { SxProps, Paper } from "@mui/material";
export default function InfoPaper({
  children,
  sx,
}: {
  children: JSX.Element | JSX.Element[];
  sx?: SxProps;
}) {
  const style: SxProps = {
    p: 2,
    display: "flex",
    flexDirection: "column",
    minHeight: {
      md: 100,
      lg: 150,
    },
  };
  const mergedStyle = sx ? { ...style, ...sx } : style;
  return <Paper sx={mergedStyle}>{children}</Paper>;
}
