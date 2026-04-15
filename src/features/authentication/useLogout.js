import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { logout as logoutApi } from "../../services/apiAuth";

function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      Cookies.remove("jwt");
      queryClient.removeQueries();
      navigate("/", { replace: true });
    },
    onError: (err) => {
      console.log("Logout error", err);
    },
  });

  return { logout, isLoading };
}

export default useLogout;
