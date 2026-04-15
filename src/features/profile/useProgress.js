import { useQuery } from "@tanstack/react-query";
import { getProgress } from "../../services/apiQuiz";

export function useProgress() {
  const { isLoading, data } = useQuery({
    queryKey: ["progress"],
    queryFn: getProgress,
  });

  return { isLoading, progress: data?.progress, percentage: data?.percentage };
}
