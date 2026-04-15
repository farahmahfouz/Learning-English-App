import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

:root {

  /* 🎯 Gradient الأساسي */
  --gradient-primary: linear-gradient(135deg, #8b5cf6, #06b6d4);

  /* 🎯 Brand Colors (Purple / Blue Theme) */
  --color-brand-50: #f5f3ff;
  --color-brand-100: #ede9fe;
  --color-brand-200: #ddd6fe;

  --color-brand-500: #8b5cf6;
  --color-brand-600: #7c3aed;
  --color-brand-700: #6d28d9;
  --color-brand-800: #5b21b6;
  --color-brand-900: #4c1d95;

  --color-blue-500: #06b6d4;

  /* Radius */
  --border-radius-sm: 6px;
  --border-radius-md: 10px;
  --border-radius-lg: 14px;

}

/* 🌞 LIGHT MODE */
.light-mode {

  --color-grey-0: #ffffff;
  --color-grey-50: #f9fafb;
  --color-grey-100: #f3f4f6;
  --color-grey-200: #e5e7eb;
  --color-grey-300: #d1d5db;
  --color-grey-400: #9ca3af;
  --color-grey-500: #6b7280;
  --color-grey-600: #4b5563;
  --color-grey-700: #374151;
  --color-grey-800: #1f2937;
  --color-grey-900: #111827;

  --text-primary: #111827;
  --text-secondary: #4b5563;

  --background: #ffffff;
  --card-bg: #ffffff;

  --backdrop-color: rgba(255, 255, 255, 0.6);

  --shadow-sm: 0 2px 8px rgba(0,0,0,0.05);
  --shadow-md: 0 10px 25px rgba(0,0,0,0.08);
  --shadow-lg: 0 20px 40px rgba(0,0,0,0.12);

  --image-grayscale: 0%;
  --image-opacity: 100%;
}


.dark-mode {

  --color-grey-0: #0b0b0f;
  --color-grey-50: #111827;
  --color-grey-100: #1f2937;
  --color-grey-200: #2c2c34;
  --color-grey-300: #3a3a44;
  --color-grey-400: #6b7280;
  --color-grey-500: #9ca3af;
  --color-grey-600: #d1d5db;
  --color-grey-700: #e5e7eb;
  --color-grey-800: #f3f4f6;
  --color-grey-900: #ffffff;

  --text-primary: #ffffff;
  --text-secondary: #9ca3af;

  --background: #0f0f0f;
  --card-bg: #161b22;

  --backdrop-color: rgba(0, 0, 0, 0.6);

  --shadow-sm: 0 4px 10px rgba(0,0,0,0.5);
  --shadow-md: 0 15px 35px rgba(0,0,0,0.6);
  --shadow-lg: 0 25px 60px rgba(0,0,0,0.8);

  --image-grayscale: 10%;
  --image-opacity: 90%;
}

/* 🔧 RESET + BASE */

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;

  transition: background-color 0.3s, color 0.3s, border 0.3s;
}

html {
  font-size: 62.5%;
}

body {
  font-family: "Poppins", sans-serif;
  background: var(--background);
  color: var(--text-primary);

  min-height: 100vh;
  line-height: 1.6;
  font-size: 1.6rem;
}


a {
  text-decoration: none;
  color: inherit;
}

button {
  cursor: pointer;
  border: none;
  font: inherit;
}

input, textarea {
  font: inherit;
}

/* Focus */

input:focus,
textarea:focus,
button:focus {
  outline: 2px solid var(--color-brand-500);
}

/* Images */
img {
  max-width: 100%;
  display: block;
  filter: grayscale(var(--image-grayscale)) opacity(var(--image-opacity));
}


.gradient-text {
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.gradient-bg {
  background: var(--gradient-primary);
  color: white;
}

.glow {
  box-shadow: 0 0 30px rgba(139, 92, 246, 0.4);
}

.card {
  background: var(--card-bg);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);
  padding: 2rem;
}

`;

export default GlobalStyles;