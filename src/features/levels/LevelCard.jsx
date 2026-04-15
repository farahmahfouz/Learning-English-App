import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Card = styled.div`
  position: relative;
  padding: 2rem;
  background: ${(p) => p.$completed ? "rgba(139,92,246,0.06)" : p.$current ? "#0d0d0d" : "#080808"};
  border: 1px solid ${(p) => p.$current ? "#8b5cf6" : p.$completed ? "rgba(139,92,246,0.3)" : "#1a1a1a"};
  border-radius: 12px;
  cursor: ${(p) => p.$locked ? "not-allowed" : "pointer"};
  transition: border-color 0.15s, background 0.15s;
  opacity: ${(p) => p.$locked ? 0.4 : 1};

  &:hover:not([data-locked="true"]) {
    border-color: ${(p) => p.$current ? "#8b5cf6" : "#2e2e2e"};
  }
`;

const TopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const LevelNum = styled.span`
  font-size: 1.1rem;
  color: #444;
  letter-spacing: 0.06em;
  text-transform: uppercase;
`;

const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 1.1rem;
  padding: 3px 10px;
  border-radius: 999px;
  background: ${(p) =>
        p.$completed ? "rgba(139,92,246,0.12)" :
            p.$current ? "rgba(6,182,212,0.1)" : "transparent"};
  color: ${(p) =>
        p.$completed ? "#a78bfa" :
            p.$current ? "#06b6d4" : "transparent"};
  border: 1px solid ${(p) =>
        p.$completed ? "rgba(139,92,246,0.25)" :
            p.$current ? "rgba(6,182,212,0.25)" : "transparent"};
`;

const CheckIcon = () => (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
    </svg>
);

const DotIcon = () => (
    <svg width="6" height="6" viewBox="0 0 6 6">
        <circle cx="3" cy="3" r="3" fill="currentColor" />
    </svg>
);

const Title = styled.h3`
  font-size: 1.5rem;
  font-weight: 500;
  color: ${(p) => p.$locked ? "#333" : "#e0e0e0"};
  margin: 0 0 0.4rem;
`;

const SentenceCount = styled.p`
  font-size: 1.2rem;
  color: #444;
  margin: 0;
`;

export default function LevelCard({ level, completedLevels, currentLevel }) {
    const navigate = useNavigate();
    const isCompleted = completedLevels.includes(level._id);
    const isCurrent = level.levelNumber === currentLevel;
    const isLocked = level.levelNumber > currentLevel;

    const handleClick = () => {
        if (!isLocked) navigate(`/levels/${level._id}`);
    };

    return (
        <Card
            $completed={isCompleted}
            $current={isCurrent}
            $locked={isLocked}
            data-locked={isLocked}
            onClick={handleClick}
        >
            <TopRow>
                <LevelNum>Level {level.levelNumber}</LevelNum>
                {isCompleted && (
                    <StatusBadge $completed>
                        <CheckIcon /> Completed
                    </StatusBadge>
                )}
                {isCurrent && !isCompleted && (
                    <StatusBadge $current>
                        <DotIcon /> Current
                    </StatusBadge>
                )}
            </TopRow>

            <Title $locked={isLocked}>{level.title}</Title>
            <SentenceCount>{level.sentences.length} sentences · {level.quiz.length} questions</SentenceCount>
        </Card>
    );
}