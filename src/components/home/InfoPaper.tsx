import { SxProps, Paper } from "@mui/material";

export default function InfoPaper({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  const style: SxProps = {
    p: "16px",
    display: "flex",
    flexDirection: "column",
  };
  return <Paper sx={style}>{children}</Paper>;
}
