import { useMutation } from "@tanstack/react-query";
import { submitShadowing } from "../../services/apiShadowing";

export function useSubmitShadowing() {
  const { mutate: submit, isLoading } = useMutation({
    mutationFn: submitShadowing,
  });

  return { submit, isLoading };
}
