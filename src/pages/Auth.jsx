import SignupForm from "../features/authentication/SignupForm";
import LoginForm from '../features/authentication/LoginForm';
import {
  AuthSplitPageShell,
  AuthGradientDefs,
  AuthInner,
  AuthLeft,
  AuthRight,
  AuthBrand,
  AuthBrandDot,
  AuthBrandName,
  AuthHero,
  AuthBadge,
  AuthBadgeDot,
  AuthHeroTitle,
  AuthHeroLead,
  AuthFeatures,
  AuthFeat,
  AuthFeatCheck,
  AuthFeatText,
  AuthLeftFooter,
  Container,
} from "../ui/AuthSplitLayout";
import { useState } from "react";

function Auth() {
  const gradId = "auth-marketing-grad";
  const [isLogin, setIsLogin] = useState(true);

  return (
    <AuthSplitPageShell>
      <AuthGradientDefs gradientId={gradId} />

      <Container>
        <AuthInner>
          <AuthLeft>
            <AuthBrand>
              <AuthBrandDot>
                <svg viewBox="0 0 14 14" fill="none">
                  <path d="M7 1L13 12H1L7 1Z" fill="#fff" />
                </svg>
              </AuthBrandDot>
              <AuthBrandName>AI English Coach</AuthBrandName>
            </AuthBrand>

            <AuthHero>
              <AuthBadge>
                <AuthBadgeDot />
                <span>Now in early access</span>
              </AuthBadge>
              <AuthHeroTitle>
                Learn English with <em>AI</em> that actually gets you.
              </AuthHeroTitle>
              <AuthHeroLead>
                Personalized lessons, real-time feedback, and smart practice
                sessions — built to help you grow faster than any traditional method.
              </AuthHeroLead>
              <AuthFeatures>
                {[
                  "AI-powered conversation practice",
                  "Instant grammar & vocabulary feedback",
                  "Adaptive lessons that match your level",
                ].map((text) => (
                  <AuthFeat key={text}>
                    <AuthFeatCheck>
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={`url(#${gradId})`}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </AuthFeatCheck>
                    <AuthFeatText>{text}</AuthFeatText>
                  </AuthFeat>
                ))}
              </AuthFeatures>
            </AuthHero>

            <AuthLeftFooter>© 2025 AI English Coach</AuthLeftFooter>
          </AuthLeft>

          <AuthRight>
            {isLogin ? (
              <LoginForm $embedded onSwitch={() => setIsLogin(false)} />
            ) : (
              <SignupForm $embedded onSwitch={() => setIsLogin(true)} />
            )}
          </AuthRight>
        </AuthInner>
      </Container>
    </AuthSplitPageShell>
  );
}

export default Auth;
