import { useMutation, useQueryClient } from "@tanstack/react-query";
import { submitQuiz } from "../../services/apiQuiz";

export function useSubmitQuiz() {
  const queryClient = useQueryClient();

  const { mutate: submit, isLoading } = useMutation({
    mutationFn: ({ levelId, answers }) => submitQuiz({ levelId, answers }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["levels"] });
    },
    onError: (err) => {
      console.error("Quiz submit error:", err);
    },
  });

  return { submit, isLoading };
}