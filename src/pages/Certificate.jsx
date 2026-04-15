import styled from "styled-components";
import { GridBg, Glow, Glow2 } from "../ui/GribBg";
import Container from "../ui/Container";
import PageShell from "../ui/PageShel";
import Heading from "../ui/Heading";
import Button from "../ui/Button";
import Spinner from "../ui/Spinner";
import { useCertificate } from "../features/certificate/useCertificate";
import { useDownloadPdf } from "../features/certificate/useDownloadPdf";

const FullPage = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PageContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: clamp(2.4rem, 4vw, 6.4rem) clamp(1.6rem, 3vw, 3.2rem);
`;

const CertCard = styled.div`
  width: 100%;
  max-width: 580px;
  border: 1px solid #1e1e1e;
  border-radius: 16px;
  padding: 4rem 3.2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const Badge = styled.div`
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  background: rgba(139, 92, 246, 0.08);
  border: 1px solid rgba(139, 92, 246, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 3.2rem;
    height: 3.2rem;
  }
`;

const Title = styled.p`
  font-size: 2rem;
  font-weight: 500;
  color: #e0e0e0;
`;

const Sub = styled.p`
  font-size: 1.3rem;
  color: #444;
  line-height: 1.7;
`;

const CodeBox = styled.div`
  background: #0d0d0d;
  border: 1px solid #1e1e1e;
  border-radius: 8px;
  padding: 1.2rem 2.4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  width: 100%;
`;

const CodeLabel = styled.span`
  font-size: 1.1rem;
  color: #444;
`;

const Code = styled.span`
  font-size: 2rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const IssuedAt = styled.span`
  font-size: 1.2rem;
  color: #333;
`;

const Actions = styled.div`
  display: flex;
  gap: 1.2rem;
  justify-content: center;
  flex-wrap: wrap;
`;

export default function Certificate() {
  const { isLoading, certificate } = useCertificate("shadowing");
  const { download, isLoading: isDownloading } = useDownloadPdf();

  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  if (!certificate)
    return (
      <FullPage>
        <Sub>No certificate found. Complete all levels and stories first.</Sub>
      </FullPage>
    );

  return (
    <PageShell>
      <GridBg />
      <Glow />
      <Glow2 />
      <PageContainer>
        <CertCard>
          <Badge>
            <svg viewBox="0 0 24 24" fill="none" stroke="url(#grad)" strokeWidth="1.5">
              <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#6366f1" />
                </linearGradient>
              </defs>
              <path d="M12 15l-2 5-3-1-1 3-4-8a6 6 0 0 1 8-8 6 6 0 0 1 8 8l-4 8-1-3-3 1z" />
              <circle cx="12" cy="9" r="3" />
            </svg>
          </Badge>

          <div>
            <Title>Certificate of Completion</Title>
            <Sub style={{ marginTop: "0.6rem" }}>
              You have successfully completed the English learning journey.
            </Sub>
          </div>

          <CodeBox>
            <CodeLabel>Verification Code</CodeLabel>
            <Code>{certificate.verificationCode}</Code>
            <IssuedAt>
              Issued on {new Date(certificate.issuedAt).toLocaleDateString()}
            </IssuedAt>
          </CodeBox>

          <Actions>
            <Button
              $variation="primary"
              onClick={() => download("shadowing")}
              disabled={isDownloading}
            >
              {isDownloading ? "Downloading..." : "Download PDF"}
            </Button>
          </Actions>
        </CertCard>
      </PageContainer>
    </PageShell>
  );
}