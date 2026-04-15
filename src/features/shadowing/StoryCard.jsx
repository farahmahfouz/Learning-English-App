import { useState } from "react";
import styled from "styled-components";
import { useSubmitShadowing } from "./useSubmitShadowing";
import AudioPlayer from "./AudioPlayer";

const Card = styled.div`
  border: 1px solid #1e1e1e;
  border-radius: 12px;
  padding: 2.4rem;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const StoryTitle = styled.h3`
  font-size: 1.6rem;
  font-weight: 500;
  color: #e0e0e0;
`;

const StoryText = styled.p`
  font-size: 1.4rem;
  color: #555;
  line-height: 1.8;
  white-space: pre-line;
`;

const EvalRow = styled.div`
  display: flex;
  gap: 1rem;
`;

const EvalBtn = styled.button`
  flex: 1;
  padding: 1rem;
  border-radius: 8px;
  font-size: 1.3rem;
  cursor: pointer;
  border: 1px solid ${(p) => p.$correct ? "#22c55e" : "#f87171"};
  background: ${(p) => p.$correct ? "rgba(34,197,94,0.08)" : "rgba(248,113,113,0.08)"};
  color: ${(p) => p.$correct ? "#4ade80" : "#f87171"};
  transition: opacity 0.15s;

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

const DoneTag = styled.span`
  font-size: 1.2rem;
  color: #4ade80;
  align-self: center;
`;

export default function StoryCard({ story, onComplete }) {
  const { submit, isLoading } = useSubmitShadowing();
  const [done, setDone] = useState(false);

  const handleEval = (selfEvaluation) => {
    submit(
      { storyId: story._id, selfEvaluation },
      {
        onSuccess: () => {
          setDone(true);
          onComplete?.();
        },
      }
    );
  };

  return (
    <Card>
      <StoryTitle>{story.title}</StoryTitle>
      <AudioPlayer src={story.audioUrl} />
      <StoryText>{story.text}</StoryText>

      {done ? (
        <DoneTag>Completed</DoneTag>
      ) : (
        <EvalRow>
          <EvalBtn $correct onClick={() => handleEval("correct")} disabled={isLoading}>
            I got it right
          </EvalBtn>
          <EvalBtn onClick={() => handleEval("incorrect")} disabled={isLoading}>
            I need more practice
          </EvalBtn>
        </EvalRow>
      )}
    </Card>
  );
}