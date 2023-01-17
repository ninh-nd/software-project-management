import { SxProps } from "@mui/material";
import Title from "../common/Title";

interface TableTitleProps {
  children?: React.ReactNode;
}

const style: SxProps = {
  fontWeight: 700,
  fontSsize: "1.2em",
  textAlign: "center",
  p: "10px 10px",
};

export default function TableTitle(props: TableTitleProps) {
  return <Title sx={style}>{props.children}</Title>;
}
