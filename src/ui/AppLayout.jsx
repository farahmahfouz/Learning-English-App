import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Sidebar from "./Sidebar";

const Root = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100%;
  background: #000;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Main = styled.main`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export default function AppLayout() {
  return (
    <Root>
      <Sidebar />
      <Main>
        <Outlet />
      </Main>
    </Root>
  );
}
