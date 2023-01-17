import { Skeleton, SxProps } from "@mui/material";
export default function FullPageSkeleton() {
  const style: SxProps = {
    flexGrow: 1,
    height: "100vh",
    minHeight: "100vh",
  };
  return <Skeleton variant="rounded" sx={style} />;
}
