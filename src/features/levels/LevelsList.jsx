import styled from "styled-components";
import LevelCard from "./LevelCard";
import Spinner from "../../ui/Spinner";
import { useLevels } from "./useLevels";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 1.6rem;
`;

export default function LevelsList({ user }) {
  const { isLoading, levels } = useLevels();

  if (isLoading) return <Spinner />;

  return (
    <Grid>
      {levels.map((level) => (
        <LevelCard
          key={level._id}
          level={level}
          completedLevels={user.completedLevels}
          currentLevel={user.currentLevel}
        />
      ))}
    </Grid>
  );
}