import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../ui/Input";
import Label from "../../ui/Label";
import Button from "../../ui/Button";
import {
  AuthFormWrapper,
  AuthCard,
  AuthLegend,
  AuthSubtitle,
  AuthField,
  FormError,
  PasswordField,
  AuthFooter,
  AuthFooterLink,
  AuthDividerWithLabel,
} from "../../ui/AuthForm";
import useLogin from "./useLogin";

export default function LoginForm({ $embedded = false, onSwitch }) {
  const { login } = useLogin();
  const navigate = useNavigate();
  const [values, setValues] = useState({ email: "student@gmail.com", password: "test12345" });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
      newErrors.email = "Please enter a valid email";
    if (!values.password) newErrors.password = "Please enter your password";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      if (!values.email || !values.password) return;
      login(
        { email: values.email, password: values.password },
        {
          onSuccess: (user) => {
            navigate(user?.hasCompletedPlacementTest ? "/levels" : "/placement-test", {
              replace: true,
            });
          },
          onSettled: () => {
            setValues({ email: "", password: "" });
          },
        }
      );
    }
  };

  return (
    <AuthFormWrapper $embedded={$embedded} onSubmit={handleSubmit}>
      <AuthCard $embedded={$embedded}>
        <AuthLegend $embedded={$embedded}>Welcome back</AuthLegend>
        <AuthSubtitle $embedded={$embedded}>
          Sign in to continue your English practice
        </AuthSubtitle>

        <AuthField>
          <Label>Email address</Label>
          <Input
            type="email"
            placeholder="you@example.com"
            value={values.email}
            onChange={(e) => setValues({ ...values, email: e.target.value })}
          />
          {errors.email && <FormError>{errors.email}</FormError>}
        </AuthField>

        <PasswordField
          label="Password"
          value={values.password}
          onChange={(e) => setValues({ ...values, password: e.target.value })}
          error={errors.password}
          placeholder="Your password"
        />

        <Button $variation="primary" style={{ display: "block", margin: "0 auto" }}>
          Sign in
        </Button>

        <AuthDividerWithLabel label="Or continue with" />

        <AuthFooter $embedded={$embedded}>
          Don't have an account?{" "}
          <AuthFooterLink $variation="secondary"
            type="button"
            onClick={onSwitch}>Sign up</AuthFooterLink>
        </AuthFooter>
      </AuthCard>
    </AuthFormWrapper>
  );
}