import styled from "styled-components";
import { GridBg, Glow, Glow2 } from "../ui/GribBg";
import Container from "../ui/Container";
import PageShell from "../ui/PageShel";
import Spinner from "../ui/Spinner";
import { useUser } from "../features/authentication/useUser";
import { useProgress } from "../features/profile/useProgress";

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
  min-height: 100vh;
  padding: clamp(2.4rem, 4vw, 6.4rem) clamp(1.6rem, 3vw, 3.2rem);
  gap: 3.2rem;
`;

const ProfileCard = styled.div`
  width: 100%;
  max-width: 580px;
  border: 1px solid #1e1e1e;
  border-radius: 16px;
  padding: 3.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const Avatar = styled.div`
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  background: rgba(139, 92, 246, 0.15);
  border: 1px solid rgba(139, 92, 246, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.4rem;
  font-weight: 600;
  color: #c4b5fd;
`;

const Name = styled.p`
  font-size: 2rem;
  font-weight: 500;
  color: #e0e0e0;
`;

const Email = styled.p`
  font-size: 1.3rem;
  color: #555;
`;

const InfoGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.2rem;
`;

const InfoBox = styled.div`
  background: #0d0d0d;
  border: 1px solid #1e1e1e;
  border-radius: 10px;
  padding: 1.4rem 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const InfoLabel = styled.span`
  font-size: 1.1rem;
  color: #444;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const InfoValue = styled.span`
  font-size: 1.5rem;
  font-weight: 500;
  color: #e0e0e0;
`;

const ProgressSection = styled.div`
  width: 100%;
  max-width: 580px;
  border: 1px solid #1e1e1e;
  border-radius: 16px;
  padding: 3.2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const SectionTitle = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  color: #e0e0e0;
`;

const ProgressBarWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const ProgressBarBg = styled.div`
  width: 100%;
  height: 10px;
  background: #1e1e1e;
  border-radius: 999px;
  overflow: hidden;
`;

const ProgressBarFill = styled.div`
  height: 100%;
  width: ${(p) => p.$percent}%;
  background: var(--gradient-primary);
  border-radius: 999px;
  transition: width 0.4s ease;
`;

const PercentLabel = styled.span`
  font-size: 1.3rem;
  color: #888;
  text-align: right;
`;

const LevelList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const LevelRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  padding: 1.2rem 1.4rem;
  background: #0d0d0d;
  border: 1px solid #1e1e1e;
  border-radius: 10px;
`;

const LevelDot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
  background: ${(p) => (p.$completed ? "#a78bfa" : "#2e2e2e")};
`;

const LevelInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const LevelTitle = styled.p`
  font-size: 1.3rem;
  color: #ccc;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const LevelMeta = styled.p`
  font-size: 1.1rem;
  color: #444;
`;

const ScoreBadge = styled.span`
  font-size: 1.2rem;
  font-weight: 500;
  color: ${(p) => (p.$perfect ? "#a78bfa" : "#888")};
  background: ${(p) =>
    p.$perfect ? "rgba(139, 92, 246, 0.1)" : "transparent"};
  border: 1px solid
    ${(p) => (p.$perfect ? "rgba(139, 92, 246, 0.25)" : "#1e1e1e")};
  border-radius: 6px;
  padding: 0.3rem 0.8rem;
`;

export default function Profile() {
  const { isLoading: isLoadingUser, user } = useUser();
  const { isLoading: isLoadingProgress, progress, percentage } = useProgress();

  if (isLoadingUser || isLoadingProgress)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "?";

  const completedCount = progress?.length ?? 0;

  return (
    <PageShell>
      <GridBg />
      <Glow />
      <Glow2 />
      <PageContainer>
        <ProfileCard>
          <Avatar>{initials}</Avatar>
          <div style={{ textAlign: "center" }}>
            <Name>{user?.name ?? "Student"}</Name>
            <Email>{user?.email ?? ""}</Email>
          </div>

          <InfoGrid>
            <InfoBox>
              <InfoLabel>Role</InfoLabel>
              <InfoValue>{user?.role ?? "—"}</InfoValue>
            </InfoBox>
            <InfoBox>
              <InfoLabel>Current Level</InfoLabel>
              <InfoValue>{user?.currentLevel ?? "—"}</InfoValue>
            </InfoBox>
            <InfoBox>
              <InfoLabel>Starting Level</InfoLabel>
              <InfoValue>{user?.startingLevel ?? "—"}</InfoValue>
            </InfoBox>
            <InfoBox>
              <InfoLabel>Levels Completed</InfoLabel>
              <InfoValue>{completedCount}</InfoValue>
            </InfoBox>
          </InfoGrid>
        </ProfileCard>

        <ProgressSection>
          <SectionTitle>Course Progress</SectionTitle>

          <ProgressBarWrapper>
            <ProgressBarBg>
              <ProgressBarFill $percent={percentage ?? 0} />
            </ProgressBarBg>
            <PercentLabel>{percentage ?? 0}% complete</PercentLabel>
          </ProgressBarWrapper>

          <LevelList>
            {(progress ?? []).map((item) => (
              <LevelRow key={item._id}>
                <LevelDot $completed={item.status === "completed"} />
                <LevelInfo>
                  <LevelTitle>
                    Level {item.level.levelNumber} — {item.level.title}
                  </LevelTitle>
                  <LevelMeta>
                    {item.status === "completed"
                      ? `Completed ${new Date(item.completedAt).toLocaleDateString()}`
                      : "In progress"}
                  </LevelMeta>
                </LevelInfo>
                <ScoreBadge $perfect={item.quizScore === 100}>
                  {item.quizScore}%
                </ScoreBadge>
              </LevelRow>
            ))}
          </LevelList>
        </ProgressSection>
      </PageContainer>
    </PageShell>
  );
}
