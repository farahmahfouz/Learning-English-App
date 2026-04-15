import { useQuery } from "@tanstack/react-query";
import { getCertificate } from "../../services/apiCertificate";

export function useCertificate(course) {
  const { isLoading, data } = useQuery({
    queryKey: ["certificate", course],
    queryFn: () => getCertificate(course),
  });

  // API returns fields on data.data (no nested certificate key)
  const payload = data?.data;
  const certificate =
    payload?.certificate ?? (payload?.verificationCode != null ? payload : undefined);

  return { isLoading, certificate };
}