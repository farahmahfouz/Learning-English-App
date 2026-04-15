import { useState } from "react";
import styled from "styled-components";
import Button from "../ui/Button";
import Heading from "../ui/Heading";
import { GridBg } from "../ui/GribBg";
import Container from "../ui/Container";
import PageShell from "../ui/PageShel";

const questions = [
  { _id: "69c13b8143b56347f705c7ae", question: 'What does "I have a meeting" mean?', options: ["A day off", "A meeting", "A project", "An appointment"], levelNumber: 1 },
  { _id: "69c13b8143b56347f705c7af", question: "Which sentence means you will complete work tomorrow?", options: ["I will start this task tomorrow.", "I finished this task yesterday.", "I will finish this task by tomorrow.", "I am working on this task."], levelNumber: 1 },
  { _id: "69c13b8143b56347f705c7b6", question: 'What does "I wake up at 7" mean?', options: ["I sleep at 7", "I wake up at 7", "I go to work at 7", "I come back at 7"], levelNumber: 2 },
  { _id: "69c13b8143b56347f705c7b7", question: "Which sentence asks about sleep time?", options: ["What time do you wake up?", "What time do you eat?", "What time do you go to bed?", "What time do you shower?"], levelNumber: 2 },
  { _id: "69c13b8143b56347f705c7be", question: "Which sentence asks about the price?", options: ["Where is this?", "How much does this cost?", "Can I buy this?", "What is this?"], levelNumber: 3 },
  { _id: "69c13b8143b56347f705c7bf", question: 'What does "I will pay in cash" mean?', options: ["I will pay by card.", "I will pay online.", "I will pay in cash.", "I will pay later."], levelNumber: 3 },
  { _id: "69c13b8143b56347f705c7c6", question: 'What does "I have a headache" mean?', options: ["I have a fever", "I have a headache", "I have back pain", "I have a cold"], levelNumber: 4 },
  { _id: "69c13b8143b56347f705c7c7", question: "Which sentence means you are not feeling good?", options: ["I feel great today.", "I don't feel well today.", "I am very tired.", "I need some rest."], levelNumber: 4 },
  { _id: "69c13b8143b56347f705c7ce", question: "Which sentence is used to book a hotel room?", options: ["I want to check out.", "I would like to book a room.", "Where is my room?", "I need a bigger room."], levelNumber: 5 },
  { _id: "69c13b8143b56347f705c7cf", question: 'What does "I lost my passport" mean?', options: ["I forgot my passport at home.", "I lost my passport.", "I need a new passport.", "My passport expired."], levelNumber: 5 },
  { _id: "69c13b8143b56347f705c7d6", question: 'What does "Let\'s keep in touch" mean?', options: ["Let's meet up soon.", "Let's stay in contact.", "Let's talk right now.", "Let's become friends."], levelNumber: 6 },
  { _id: "69c13b8143b56347f705c7d7", question: "Which sentence expresses gratitude?", options: ["It was nice meeting you.", "We should hang out sometime.", "I really appreciate your help.", "Let's keep in touch."], levelNumber: 6 },
  { _id: "69c13b8143b56347f705c7de", question: 'What does "Could you elaborate on that?" mean?', options: ["Could you repeat that?", "Could you explain more?", "Could you speak slower?", "Could you write that down?"], levelNumber: 7 },
  { _id: "69c13b8143b56347f705c7df", question: "Which sentence means you understand someone's point of view?", options: ["That's an interesting perspective.", "I see where you're coming from.", "I'd like to reconsider that.", "Let's look at this from another angle."], levelNumber: 7 },
];

// ── Styled Components ───────────────────────────────────────

const Card = styled.div`
  width: 100%;
  max-width: 700px;
  background: #080808;
  border: 1px solid #1a1a1a;
  border-radius: 16px;
  padding: 3.2rem;
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

const LevelTag = styled.span`
  display: inline-block;
  font-size: 1.1rem;
  color: #555;
  background: #0d0d0d;
  border: 1px solid #1e1e1e;
  border-radius: 999px;
  padding: 3px 10px;
  margin-bottom: 1.2rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
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
  background: ${(p) => (p.$selected ? "rgba(139,92,246,0.08)" : "transparent")};
  border: 1px solid ${(p) => (p.$selected ? "#8b5cf6" : "#1c1c1c")};
  border-radius: 8px;
  font-size: 1.4rem;
  color: ${(p) => (p.$selected ? "#c4b5fd" : "#555")};
  cursor: pointer;
  transition: border-color 0.15s, color 0.15s, background 0.15s;

  &:hover {
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

const SuccessBox = styled.div`
  text-align: center;
  padding: 2rem 0;
`;

const LevelBadge = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 8rem;
  height: 8rem;
  border-radius: 999px;
  background: rgba(139, 92, 246, 0.08);
  border: 1px solid rgba(139, 92, 246, 0.2);
  margin: 0 auto 1.6rem;
`;

const LevelNumber = styled.span`
  font-size: 3.2rem;
  font-weight: 600;
  background: var(--gradient-primary);
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
`;

// ── Component ───────────────────────────────────────────────

export default function PlacementTestForm({ userId, onDone }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const q = questions[current];
  const selected = answers[q._id];
  const pct = Math.round(((current + 1) / questions.length) * 100);
  const isLast = current === questions.length - 1;

  const pick = (opt) =>
    setAnswers((prev) => ({ ...prev, [q._id]: opt }));

  const prev = () => setCurrent((c) => c - 1);

  const next = async () => {
    if (!isLast) {
      setCurrent((c) => c + 1);
      return;
    }

    setLoading(true);
    try {
      const payload = Object.entries(answers).map(([questionId, selectedAnswer]) => {
        const found = questions.find((x) => x._id === questionId);
        return { questionId, selectedAnswer, levelNumber: found.levelNumber };
      });

      const res = await fetch("/api/placement-test/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, answers: payload }),
      });

      const data = await res.json();
      setResult(data.data.assignedLevel);
      onDone?.(data.data.assignedLevel);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (result) {
    return (
      <Card>
        <SuccessBox>
          <LevelBadge>
            <LevelNumber>{result}</LevelNumber>
          </LevelBadge>
          <ResultTitle>Your level is {result}</ResultTitle>
          <ResultSub>
            We've personalized your learning path based on your answers.
          </ResultSub>
        </SuccessBox>
      </Card>
    );
  }

  return (
    <PageShell>

      <GridBg />
      <Container>

        <Card>
          <CardHeader>
            <Heading as="h2">Placement test</Heading>
            <Subtitle>Help us find the right level for you.</Subtitle>
          </CardHeader>

          <ProgressRow>
            <ProgressBar>
              <ProgressFill $pct={pct} />
            </ProgressBar>
            <ProgressLabel>
              {current + 1} / {questions.length}
            </ProgressLabel>
          </ProgressRow>

          <LevelTag>Level {q.levelNumber}</LevelTag>
          <QuestionText>{q.question}</QuestionText>

          <Options>
            {q.options.map((opt) => (
              <Option
                key={opt}
                $selected={selected === opt}
                onClick={() => pick(opt)}
              >
                {opt}
              </Option>
            ))}
          </Options>

          <NavRow>
            <GhostButton onClick={prev} disabled={current === 0}>
              ← Previous
            </GhostButton>
            <Button
              $variation="primary"
              onClick={next}
              disabled={!selected || loading}
            >
              {isLast ? (loading ? "Submitting..." : "Submit") : "Next →"}
            </Button>
          </NavRow>
        </Card>
      </Container>
    </PageShell>
  );
}