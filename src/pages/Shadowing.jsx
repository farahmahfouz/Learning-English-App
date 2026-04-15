import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { GridBg, Glow, Glow2 } from "../ui/GribBg";
import Container from "../ui/Container";
import PageShell from "../ui/PageShel";
import Heading from "../ui/Heading";
import Button from "../ui/Button";
import Spinner from "../ui/Spinner";
import StoryCard from "../features/shadowing/StoryCard";
import { useStories } from "../features/shadowing/useStories";

const PageContainer = styled(Container)`
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
  margin-top: 0.8rem;
`;

const StoriesGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

const Footer = styled.div`
  margin-top: 4rem;
  display: flex;
  justify-content: flex-end;
`;

const FullPage = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function Shadowing() {
  const navigate = useNavigate();
  const { isLoading, stories } = useStories();
  const [completed, setCompleted] = useState(0);

  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  const allDone = completed === stories.length;

  return (
    <PageShell>
      <GridBg />
      <Glow />
      <Glow2 />
      <PageContainer>
        <Header>
          <Heading as="h1">Shadowing Practice</Heading>
          <Subtitle>
            Listen to each story, repeat it out loud, then evaluate yourself.
            Complete all stories to unlock AI conversation.
          </Subtitle>
        </Header>

        <StoriesGrid>
          {stories.map((story) => (
            <StoryCard
              key={story._id}
              story={story}
              onComplete={() => setCompleted((c) => c + 1)}
            />
          ))}
        </StoriesGrid>

        {allDone && (
          <Footer>
            <Button
              $variation="primary"
              onClick={() => navigate("/certificate")}
            >
             Get your Certificate
            </Button>
          </Footer>
        )}
      </PageContainer>
    </PageShell>
  );
}