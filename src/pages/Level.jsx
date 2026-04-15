import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { GridBg, Glow, Glow2 } from "../ui/GribBg";
import Container from "../ui/Container";
import SentencesList from "../features/levels/SentencesList";
import { useLevel } from "../features/levels/useLevel";
import Spinner from "../ui/Spinner";
import Heading from "../ui/Heading";
import Button from "../ui/Button";
import PageShell from "../ui/PageShel";

const FullPage = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LevelContainer = styled(Container)`
  display: block;
  align-self: stretch;
  min-height: 100vh;
  padding: clamp(2.4rem, 4vw, 6.4rem) clamp(1.6rem, 3vw, 3.2rem);
`;

const Header = styled.div`
  margin-bottom: 3.2rem;
`;

const BackBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: transparent;
  border: none;
  font-size: 1.3rem;
  color: #555;
  cursor: pointer;
  margin-bottom: 2rem;
  transition: color 0.15s;

  &:hover {
    color: #888;
  }
  &:focus {
    outline: none;
  }
`;

const Meta = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-top: 0.8rem;
`;

const MetaTag = styled.span`
  font-size: 1.2rem;
  color: #444;
  background: #0d0d0d;
  border: 1px solid #1e1e1e;
  border-radius: 999px;
  padding: 3px 10px;
`;

const Footer = styled.div`
  margin-top: 3.2rem;
  display: flex;
  justify-content: flex-end;
`;

function Level() {
  const { levelId } = useParams();
  const navigate = useNavigate();
  const { isLoading, level } = useLevel(levelId);

  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  return (
    <PageShell>
      <GridBg />
      <Glow />
      <Glow2 />
      <LevelContainer>
        <Header>
          <BackBtn onClick={() => navigate("/levels")}>
            ← Back to levels
          </BackBtn>
          <Heading as="h1">{level.title}</Heading>
          <Meta>
            <MetaTag>Level {level.levelNumber}</MetaTag>
            <MetaTag>{level.sentences.length} sentences</MetaTag>
            <MetaTag>{level.quiz.length} quiz questions</MetaTag>
          </Meta>
        </Header>

        <SentencesList sentences={level.sentences} />

        <Footer>
          <Button
            $variation="primary"
            onClick={() => navigate(`/levels/${levelId}/quiz`)}
          >
            Start quiz →
          </Button>
        </Footer>
      </LevelContainer>
    </PageShell>
  );
}

export default Level;