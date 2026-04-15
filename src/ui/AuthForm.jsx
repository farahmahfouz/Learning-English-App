import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState } from "react";
import Input from "./Input";
import Label from "./Label";

export const AuthFormWrapper = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: ${(p) => (p.$embedded ? "auto" : "100vh")};
  background: ${(p) => (p.$embedded ? "transparent" : "var(--background)")};
  padding: ${(p) => (p.$embedded ? "0" : "1.6rem")};
`;

export const AuthCard = styled.fieldset`
  background: ${(p) => (p.$embedded ? "rgba(13, 13, 13, 0.72)" : "var(--card-bg)")};
  border: 1px solid
    ${(p) => (p.$embedded ? "rgba(255, 255, 255, 0.08)" : "var(--color-grey-200)")};
  border-radius: var(--border-radius-lg);
  padding: 2.5rem 2rem;
  width: 100%;
  max-width: 40rem;
  box-shadow: ${(p) =>
    p.$embedded ? "0 18px 60px rgba(0,0,0,0.6)" : "var(--shadow-md)"};
  backdrop-filter: ${(p) => (p.$embedded ? "blur(10px)" : "none")};
`;

export const AuthLegend = styled.legend`
  font-size: 2.8rem;
  text-align: center;
  margin: 0 0 0.4rem;
  padding: 0;
  width: 100%;
  color: ${(p) => (p.$embedded ? "rgba(255, 255, 255, 0.92)" : "var(--text-primary)")};
`;

export const AuthSubtitle = styled.p`
  font-size: 1.3rem;
  text-align: center;
  margin: 0 0 2rem;
  color: ${(p) =>
    p.$embedded ? "rgba(255, 255, 255, 0.62)" : "var(--text-secondary)"};
`;

export const AuthField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 1.25rem;
`;

const PasswordWrapper = styled.div`
  position: relative;
`;

const EyeButton = styled.button`
  position: absolute;
  right: 1.2rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0;
  display: flex;

  &:focus {
    outline: none;
  }
`;

export const FormError = styled.span`
  font-size: 1.2rem;
  color: #f85149;
`;

export const AuthDivider = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin: 1.5rem 0;

  span {
    font-size: 1.2rem;
    color: var(--color-grey-400);
  }
`;

const DividerLine = styled.div`
  flex: 1;
  height: 1px;
  background: var(--color-grey-200);
`;

export function AuthDividerWithLabel({ label = "or" }) {
  return (
    <AuthDivider>
      <DividerLine />
      <span>{label}</span>
      <DividerLine />
    </AuthDivider>
  );
}

export const AuthFooter = styled.p`
  text-align: center;
  font-size: 1.3rem;
  margin-top: 1.5rem;
  color: ${(p) =>
    p.$embedded ? "rgba(255, 255, 255, 0.62)" : "var(--text-secondary)"};
`;

export const AuthFooterLink = styled(Link)`
  color: var(--color-brand-500);
  font-weight: 600;
  position: relative;
  display: inline-block;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: -3px;
    height: 2px;
    background: var(--gradient-primary);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 180ms ease;
  }

  &:hover {
    color: var(--color-brand-600);
  }

  &:hover::after {
    transform: scaleX(1);
  }
`;

export const AuthSuccessBox = styled.div`
  background: var(--color-grey-50);
  border: 1px solid #238636;
  border-radius: var(--border-radius-md);
  padding: 1.4rem 1.6rem;
  text-align: center;

  p {
    color: #3fb950;
    font-size: 1.4rem;
    margin: 0;
  }
`;

export function PasswordField({
  label,
  value,
  onChange,
  error,
  placeholder = "Min. 8 characters",
}) {
  const [showPass, setShowPass] = useState(false);

  return (
    <AuthField>
      <Label>{label}</Label>
      <PasswordWrapper>
        <Input
          type={showPass ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          style={{ paddingRight: "4rem" }}
        />
        <EyeButton type="button" onClick={() => setShowPass(!showPass)}>
          {showPass ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
              <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
              <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
              <line x1="1" y1="1" x2="23" y2="23" />
            </svg>
          )}
        </EyeButton>
      </PasswordWrapper>
      {error && <FormError>{error}</FormError>}
    </AuthField>
  );
}
