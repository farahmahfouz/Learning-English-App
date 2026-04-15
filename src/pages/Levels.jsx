import styled from "styled-components";
import PageShell from "../ui/PageShel";
import { GridBg, Glow, Glow2 } from "../ui/GribBg";
import Container from "../ui/Container";
import LevelsList from "../features/levels/LevelsList";
import { useUser } from "../features/authentication/useUser";
import Heading from "../ui/Heading";

const LevelsContainer = styled(Container)`
  display: block;
  min-height: 100vh;
  padding: clamp(2.4rem, 4vw, 6.4rem) clamp(1.6rem, 3vw, 3.2rem);
`;

const Header = styled.div`
  margin-bottom: 3.2rem;
`;

const Subtitle = styled.p`
  font-size: 1.4rem;
  color: #444;
  margin-top: 0.6rem;
`;

const GradientName = styled.span`
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

function Levels() {
  const { user } = useUser();

  return (
    <PageShell>
      <GridBg />
      <Glow />
      <Glow2 />
      <LevelsContainer>
        <Header>
          <Heading as="h1">
            Welcome back, <GradientName>{user?.name?.split(" ")[0]}</GradientName>
          </Heading>
          <Subtitle>
            You're on level {user?.currentLevel} — keep going!
          </Subtitle>
        </Header>

        <LevelsList user={user} />
      </LevelsContainer>
    </PageShell>
  );
}

export default Levels;
