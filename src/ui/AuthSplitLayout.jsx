import styled from "styled-components";
import { Glow, Glow2, GridBg } from "./GribBg";
import Container from "./Container";

export const AuthPage = styled.div`
  display: flex;
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  position: relative;
  overflow: hidden;
  padding: clamp(1.6rem, 3vw, 3.2rem);
`;

export const AuthInner = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    min-height: auto;
  }
`;

export const AuthLeft = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 3.2rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const AuthRight = styled.section`
  width: 420px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3.2rem;

  @media (max-width: 768px) {
    width: 100%;
    padding: 2rem;
  }
`;

export const AuthBrand = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const AuthBrandDot = styled.div`
  width: 2.8rem;
  height: 2.8rem;
  border-radius: 6px;
  background: var(--gradient-primary);
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 14px;
    height: 14px;
  }
`;

export const AuthBrandName = styled.span`
  font-size: 1.5rem;
  font-weight: 500;
  color: #fff;
  letter-spacing: -0.01em;
`;

export const AuthHero = styled.div`
  max-width: 500px;
`;

export const AuthBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #0d0d0d;
  border: 1px solid #1e1e1e;
  border-radius: 999px;
  padding: 5px 12px;
  margin-bottom: 2rem;

  span {
    font-size: 1.2rem;
    color: #666;
    letter-spacing: 0.02em;
  }
`;

export const AuthBadgeDot = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: var(--gradient-primary);
`;

export const AuthHeroTitle = styled.h1`
  font-size: clamp(2.4rem, 3.5vw, 3.6rem);
  font-weight: 600;
  color: #fff;
  line-height: 1.1;
  letter-spacing: -0.04em;
  margin-bottom: 1.6rem;

  em {
    font-style: normal;
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

export const AuthHeroLead = styled.p`
  font-size: 1.4rem;
  color: #555;
  line-height: 1.75;
  margin-bottom: 2.4rem;
`;

export const AuthFeatures = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const AuthFeat = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const AuthFeatCheck = styled.div`
  width: 18px;
  height: 18px;
  border-radius: 5px;
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(6, 182, 212, 0.15));
  border: 1px solid rgba(139, 92, 246, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg {
    width: 10px;
    height: 10px;
  }
`;

export const AuthFeatText = styled.span`
  font-size: 1.3rem;
  color: #555;
`;

export const AuthLeftFooter = styled.div`
  font-size: 1.2rem;
  color: #2a2a2a;
`;

export function AuthGradientDefs({ gradientId = "auth-marketing-grad" }) {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }}>
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function AuthSplitPageShell({ children }) {
  return (
    <AuthPage>
      <GridBg />
      <Glow />
      <Glow2 />
      {children}
    </AuthPage>
  );
}

export { Container };
