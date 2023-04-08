import { SxProps } from "@mui/material";
import Paper from "@mui/material/Paper";
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
    height: "100%",
  };
  return <Paper sx={style}>{children}</Paper>;
}
