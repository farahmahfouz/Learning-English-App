import { GridBg, Glow, Glow2 } from "../ui/GribBg";
import PageShell from "../ui/PageShel";
import Container from "../ui/Container";
import QuizForm from "../features/quiz/QuizForm";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";

const BackBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: transparent;
  border: none;
  font-size: 1.3rem;
  color: #555;
  cursor: pointer;
  padding: 0;
  margin-bottom: 2.4rem;
  transition: color 0.15s;

  &:hover { color: #888; }
`;

function Quiz() {
  const navigate = useNavigate();
  const { levelId } = useParams();

  return (
    <PageShell>
      <GridBg />
      <Glow />
      <Glow2 />
      <Container>
        <BackBtn onClick={() => navigate(`/levels/${levelId}`)}>
          ← Back to level
        </BackBtn>
        <QuizForm />
      </Container>
    </PageShell>
  );
}

export default Quiz;