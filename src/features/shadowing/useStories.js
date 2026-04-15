import { useQuery } from "@tanstack/react-query";
import { getStories } from "../../services/apiShadowing";

export function useStories() {
  const { isLoading, data } = useQuery({
    queryKey: ["stories"],
    queryFn: getStories,
  });

  return { isLoading, stories: data ?? [] };
}