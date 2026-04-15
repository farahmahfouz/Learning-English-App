import { useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useLevel } from "../levels/useLevel";
import { useSubmitQuiz } from "./useSubmitQuiz";
import Button from "../../ui/Button";
import Heading from "../../ui/Heading";
import Spinner from "../../ui/Spinner";

// ── Styled Components ───────────────────────────────────

const Wrapper = styled.div`
  width: 100%;
  max-width: 620px;
  margin: 0 auto;
`;

const CardHeader = styled.div`
  margin-bottom: 2.4rem;
`;

const Subtitle = styled.p`
  font-size: 1.3rem;
  color: #444;
  margin-top: 0.6rem;
`;

const ProgressRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 2.8rem;
`;

const ProgressBar = styled.div`
  flex: 1;
  height: 3px;
  background: #111;
  border-radius: 999px;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  border-radius: 999px;
  background: var(--gradient-primary);
  transition: width 0.35s ease;
  width: ${(p) => p.$pct}%;
`;

const ProgressLabel = styled.span`
  font-size: 1.2rem;
  color: #333;
  white-space: nowrap;
`;

const QuestionText = styled.p`
  font-size: 1.7rem;
  font-weight: 500;
  color: #e0e0e0;
  line-height: 1.5;
  margin-bottom: 2rem;
`;

const Options = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 2.8rem;
`;

const Option = styled.button`
  width: 100%;
  text-align: left;
  padding: 1.1rem 1.4rem;
  background: ${(p) =>
    p.$correct ? "rgba(34,197,94,0.08)" :
    p.$wrong ? "rgba(248,113,113,0.08)" :
    p.$selected ? "rgba(139,92,246,0.08)" : "transparent"};
  border: 1px solid ${(p) =>
    p.$correct ? "#22c55e" :
    p.$wrong ? "#f87171" :
    p.$selected ? "#8b5cf6" : "#1c1c1c"};
  border-radius: 8px;
  font-size: 1.4rem;
  color: ${(p) =>
    p.$correct ? "#4ade80" :
    p.$wrong ? "#f87171" :
    p.$selected ? "#c4b5fd" : "#555"};
  cursor: ${(p) => (p.$revealed ? "default" : "pointer")};
  transition: border-color 0.15s, color 0.15s, background 0.15s;

  &:hover:not([data-revealed="true"]) {
    border-color: ${(p) => (p.$selected ? "#8b5cf6" : "#2e2e2e")};
    color: ${(p) => (p.$selected ? "#c4b5fd" : "#888")};
  }
`;

const NavRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

const GhostButton = styled.button`
  padding: 0.9rem 1.6rem;
  background: transparent;
  border: 1px solid #1e1e1e;
  border-radius: 8px;
  font-size: 1.4rem;
  color: #444;
  cursor: pointer;
  transition: border-color 0.15s, color 0.15s;

  &:hover:not(:disabled) {
    border-color: #333;
    color: #888;
  }

  &:disabled {
    opacity: 0.2;
    cursor: not-allowed;
  }
`;

const FeedbackRow = styled.div`
  margin-bottom: 1.6rem;
  font-size: 1.3rem;
  color: ${(p) => (p.$correct ? "#4ade80" : "#f87171")};
`;

// ── Result Screen ────────────────────────────────────────

const ResultBox = styled.div`
  text-align: center;
  padding: 2rem 0;
`;

const ScoreBadge = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 9rem;
  height: 9rem;
  border-radius: 999px;
  background: ${(p) => p.$passed ? "rgba(139,92,246,0.08)" : "rgba(248,113,113,0.08)"};
  border: 1px solid ${(p) => p.$passed ? "rgba(139,92,246,0.25)" : "rgba(248,113,113,0.25)"};
  margin: 0 auto 1.6rem;
`;

const ScoreText = styled.span`
  font-size: 2.8rem;
  font-weight: 600;
  background: ${(p) => p.$passed ? "var(--gradient-primary)" : "linear-gradient(135deg, #f87171, #fb923c)"};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const ResultTitle = styled.p`
  font-size: 1.8rem;
  font-weight: 500;
  color: #e0e0e0;
  margin-bottom: 0.6rem;
`;

const ResultSub = styled.p`
  font-size: 1.3rem;
  color: #444;
  margin-bottom: 2.4rem;
`;

const ResultActions = styled.div`
  display: flex;
  gap: 1.2rem;
  justify-content: center;
`;

// ── Component ────────────────────────────────────────────

export default function QuizForm() {
  const { levelId } = useParams();
  const navigate = useNavigate();
  const { isLoading, level } = useLevel(levelId);
  const { submit, isLoading: isSubmitting } = useSubmitQuiz();

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [revealed, setRevealed] = useState(false);
  const [result, setResult] = useState(null);

  if (isLoading) return <Spinner />;

  const questions = level.quiz;
  const q = questions[current];
  const selected = answers[q._id];
  const isLast = current === questions.length - 1;
  const pct = Math.round(((current + 1) / questions.length) * 100);

  const pick = (opt) => {
    if (revealed) return;
    setAnswers((prev) => ({ ...prev, [q._id]: opt }));
    setRevealed(true);
  };

  const next = () => {
    setRevealed(false);
    if (!isLast) {
      setCurrent((c) => c + 1);
      return;
    }
  
    const payload = Object.entries(answers).map(([questionId, selectedAnswer]) => ({
      questionId,
      selectedAnswer,
    }));
  
    submit(
      { levelId, answers: payload },  // ← levelId من useParams
      { onSuccess: (data) => setResult(data) }
    );
  };

  // ── Result Screen ──
  if (result) {
    const passed = result.passed;
    const score = result.quizScore;
    const isLastLevel = level.levelNumber === 7;

    return (
      <Wrapper>
        <ResultBox>
          <ScoreBadge $passed={passed}>
            <ScoreText $passed={passed}>{score}%</ScoreText> 
          </ScoreBadge>
          <ResultTitle>{passed ? "Well done!" : "Keep practicing!"}</ResultTitle>
          <ResultSub>
            {passed
              ? isLastLevel 
                ? "You completed all levels! Time to practice shadowing."
                : "You passed this level. Next level is now unlocked."
              : "You need 70% to pass. Review the sentences and try again."}
          </ResultSub>
          <ResultActions>
            {!passed && (
              <GhostButton onClick={() => {
                setCurrent(0);
                setAnswers({});
                setRevealed(false);
                setResult(null);
              }}>
                Try again
              </GhostButton>
            )}
            <Button
              $variation="primary"
              onClick={() => {
                if (passed && isLastLevel) {
                  navigate("/shadowing");
                } else {
                  navigate("/levels");
                }
              }}
            >
              {passed
                ? isLastLevel ? "Start Shadowing →" : "Next level →"
                : "Back to levels"}
            </Button>
          </ResultActions>
        </ResultBox>
      </Wrapper>
    );
  }
  // ── Quiz Screen ──
  return (
    <Wrapper>
      <CardHeader>
        <Heading as="h2">{level.title} — Quiz</Heading>
        <Subtitle>Answer all questions to complete this level.</Subtitle>
      </CardHeader>

      <ProgressRow>
        <ProgressBar>
          <ProgressFill $pct={pct} />
        </ProgressBar>
        <ProgressLabel>{current + 1} / {questions.length}</ProgressLabel>
      </ProgressRow>

      <QuestionText>{q.question}</QuestionText>

      {revealed && (
        <FeedbackRow $correct={selected === q.correctAnswer}>
          {selected === q.correctAnswer ? "Correct!" : `Correct answer: ${q.correctAnswer}`}
        </FeedbackRow>
      )}

      <Options>
        {q.options.map((opt) => (
          <Option
            key={opt}
            $selected={selected === opt}
            $correct={revealed && opt === q.correctAnswer}
            $wrong={revealed && selected === opt && opt !== q.correctAnswer}
            $revealed={revealed}
            data-revealed={revealed}
            onClick={() => pick(opt)}
          >
            {opt}
          </Option>
        ))}
      </Options>

      <NavRow>
        <GhostButton
          onClick={() => { setCurrent((c) => c - 1); setRevealed(false); }}
          disabled={current === 0}
        >
          ← Previous
        </GhostButton>
        <Button
          $variation="primary"
          onClick={next}
          disabled={!selected || isSubmitting}
        >
          {isLast ? (isSubmitting ? "Submitting..." : "Submit") : "Next →"}
        </Button>
      </NavRow>
    </Wrapper>
  );
}