import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";

function useLogin() {
  const queryClient = useQueryClient();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user);
    },
    onError: (err) => {
      console.log("ERROR", err);
    },
  });
  return { login, isLoading };
}

export default useLogin;
