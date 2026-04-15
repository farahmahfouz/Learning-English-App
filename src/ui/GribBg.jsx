import styled from "styled-components";

const GridBg = styled.div`
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(#ffffff06 1px, transparent 1px),
    linear-gradient(90deg, #ffffff06 1px, transparent 1px);
  background-size: 48px 48px;
  pointer-events: none;
  z-index: 0;
`;

const Glow = styled.div`
  position: absolute;
  top: -180px;
  left: -100px;
  width: 600px;
  height: 600px;
  border-radius: 999px;
  background: radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 65%);
  pointer-events: none;
  z-index: 0;
`;

const Glow2 = styled.div`
  position: absolute;
  bottom: -100px;
  right: -100px;
  width: 500px;
  height: 500px;
  border-radius: 999px;
  background: radial-gradient(circle, rgba(6, 182, 212, 0.1) 0%, transparent 65%);
  pointer-events: none;
  z-index: 0;
`;


export { GridBg, Glow, Glow2 };