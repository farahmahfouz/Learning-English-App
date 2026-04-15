import { useMutation } from "@tanstack/react-query";
import { downloadCertificatePdf } from "../../services/apiCertificate";

export function useDownloadPdf() {
  const { mutate: download, isLoading } = useMutation({
    mutationFn: downloadCertificatePdf,
    onSuccess: (blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "certificate.pdf";
      a.click();
      window.URL.revokeObjectURL(url);
    },
  });

  return { download, isLoading };
}