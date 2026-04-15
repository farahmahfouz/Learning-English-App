import styled from "styled-components";

const Input = styled.input`
  background: var(--color-grey-50);
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-md);
  padding: 1rem 1.2rem;
  font-size: 1.4rem;
  color: var(--text-primary);
  width: 100%;
  transition: border-color 0.2s;

  &::placeholder {
    color: var(--color-grey-400);
  }

  &:focus {
    outline: none;
    border-color: var(--color-brand-500);
  }
`;

export default Input;