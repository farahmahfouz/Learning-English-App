import styled from "styled-components";
import SentenceCard from "./SentenceCard";

const Grid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

export default function SentencesList({ sentences }) {
  return (
    <Grid>
      {sentences.map((sentence) => (
        <SentenceCard key={sentence._id} sentence={sentence} />
      ))}
    </Grid>
  );
}