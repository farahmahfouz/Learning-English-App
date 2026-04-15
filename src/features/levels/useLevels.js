import { useQuery } from "@tanstack/react-query";
import { getLevels } from "../../services/apiLevels";

export function useLevels() {
  const { isLoading, data: levels } = useQuery({
    queryKey: ["levels"],
    queryFn: getLevels,
  });

  return { isLoading, levels };
}