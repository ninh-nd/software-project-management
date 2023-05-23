import { Box, Container, Grid } from "@mui/material";
import AccountInfo from "~/components/common/accountPage/cards/AccountInfo";
import Integration from "~/components/common/accountPage/cards/Integration";
import { useAccountContext } from "~/hooks/general";
import { ThirdParty } from "~/interfaces/Entity";

export default function Account() {
  const account = useAccountContext();
  const github = account.thirdParty.find((t) => t.name === "Github");
  const gitlab = account.thirdParty.find((t) => t.name === "Gitlab");
  return (
    <Box
      flexGrow={1}
      sx={{
        m: {
          xs: 2,
          sm: 4,
        },
      }}
    >
      <Container>
        <Grid container spacing={1} justifyContent="center">
          <Grid item xs={12} md={7}>
            <AccountInfo account={account} />
          </Grid>
          <Grid item xs={12} md={5}>
            <Integration github={github} gitlab={gitlab} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
