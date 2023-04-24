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
    minHeight: {
      md: 100,
      lg: 150,
    },
  };
  return <Paper sx={style}>{children}</Paper>;
}
