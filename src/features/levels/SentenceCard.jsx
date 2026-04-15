import { useState } from "react";
import styled from "styled-components";

const Card = styled.div`
  padding: 2rem;
  background: #080808;
  border: 1px solid #1a1a1a;
  border-radius: 12px;
  transition: border-color 0.15s;

  &:hover {
    border-color: #2e2e2e;
  }
`;

const SentenceText = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  color: #e0e0e0;
  line-height: 1.5;
  margin: 0 0 1.2rem;
`;

const ToggleBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: transparent;
  border: 1px solid #1e1e1e;
  border-radius: 999px;
  padding: 5px 14px;
  font-size: 1.2rem;
  color: #555;
  cursor: pointer;
  transition: border-color 0.15s, color 0.15s;

  &:hover {
    border-color: #333;
    color: #888;
  }
`;

const Translation = styled.p`
  font-size: 1.4rem;
  color: #666;
  margin: 1.2rem 0 0;
  padding-top: 1.2rem;
  border-top: 1px solid #1a1a1a;
  direction: rtl;
`;

export default function SentenceCard({ sentence }) {
  const [showTranslation, setShowTranslation] = useState(false);

  return (
    <Card>
      <SentenceText>{sentence.text}</SentenceText>
      <ToggleBtn onClick={() => setShowTranslation((s) => !s)}>
        {showTranslation ? "Hide translation" : "Show translation"}
      </ToggleBtn>
      {showTranslation && <Translation>{sentence.translation}</Translation>}
    </Card>
  );
}