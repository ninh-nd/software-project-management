import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { getProjectIn } from "~/hooks/fetching/user/axios";
import { toast } from "~/utils/toast";
import { getAccountInfo } from "../account/axios";
import { useSetAccountContext } from "~/hooks/general";
import { login, register } from "./axios";
import { AccountRegister } from "../account";

export function useLoginMutation() {
  interface LoginParams {
    username: string;
    password: string;
  }
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const setAccountContext = useSetAccountContext();
  return useMutation({
    mutationFn: ({ username, password }: LoginParams) =>
      login(username, password),
    onSuccess: async () => {
      const { data } = await getAccountInfo();
      if (data) {
        // IMPORTANT!
        setAccountContext(data);
        const { role } = data;
        if (role === "admin") {
          navigate("/admin");
        } else {
          const { data } = await getProjectIn();
          if (!data) {
            enqueueSnackbar("Can't get list of project owned", {
              variant: "error",
            });
            return;
          }
          if (data.length === 0) {
            navigate("/new-project");
          }
          const currentProject = data[0].name;
          navigate(`/${currentProject}/`);
        }
      }
    },
    onError: (error) => {
      enqueueSnackbar("Wrong username/password", { variant: "error" });
    },
  });
}

export function useCreateAccountMutation() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationFn: (account: AccountRegister) => register(account),
    onSuccess: (response) => {
      toast(response, enqueueSnackbar, () => {
        navigate("/login");
      });
    },
  });
}
