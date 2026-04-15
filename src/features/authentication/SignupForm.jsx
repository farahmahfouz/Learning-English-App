import { useState } from "react";
import Input from "../../ui/Input";
import Label from "../../ui/Label";
import Button from "../../ui/Button";
import {
  AuthCard,
  AuthDividerWithLabel,
  AuthField,
  AuthFooter,
  AuthFooterLink,
  AuthFormWrapper,
  AuthLegend,
  AuthSubtitle,
  AuthSuccessBox,
  FormError,
  PasswordField,
} from "../../ui/AuthForm";

export default function SignupForm({ $embedded = false, onSwitch }) {
  const [values, setValues] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!values.name.trim()) newErrors.name = "Please enter your name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
      newErrors.email = "Please enter a valid email";
    if (values.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";
    return newErrors;
  };

  const handleSubmit = () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      setSuccess(true);
    }
  };

  if (success) {
    return (
      <AuthFormWrapper $embedded={$embedded}>
        <AuthCard as="div" $embedded={$embedded}>
          <AuthSuccessBox>
            <p>Account created successfully!</p>
          </AuthSuccessBox>
        </AuthCard>
      </AuthFormWrapper>
    );
  }

  return (
    <AuthFormWrapper $embedded={$embedded}>
      <AuthCard $embedded={$embedded}>
        <AuthLegend $embedded={$embedded}>Create your account</AuthLegend>
        <AuthSubtitle $embedded={$embedded}>
          Start your learning journey today
        </AuthSubtitle>

        <AuthField>
          <Label>Full name</Label>
          <Input
            type="text"
            placeholder="Ahmed Mohamed"
            value={values.name}
            onChange={(e) => setValues({ ...values, name: e.target.value })}
          />
          {errors.name && <FormError>{errors.name}</FormError>}
        </AuthField>

        <AuthField>
          <Label>Email address</Label>
          <Input
            type="email"
            placeholder="ahmed@example.com"
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
        />

        <Button $variation="primary" onClick={handleSubmit} style={{ display: "block", margin: "0 auto" }}>
          Create account
        </Button>

        <AuthDividerWithLabel label="Or continue with" />

        <AuthFooter $embedded={$embedded}>
          Already have an account?{" "}
          <AuthFooterLink $variation="secondary"
            type="button"
            onClick={onSwitch}>Sign in</AuthFooterLink>
        </AuthFooter>
      </AuthCard>
    </AuthFormWrapper>
  );
}
