import { useQuery } from "@tanstack/react-query";
import { getLevelById } from "../../services/apiLevels";

export function useLevel(levelId) {
  const { isLoading, data: level } = useQuery({
    queryKey: ["level", levelId],
    queryFn: () => getLevelById(levelId),
    enabled: !!levelId,
  });

  return { isLoading, level };
}