# Branding Color Palette

## 1. CSS Variables

```css
:root {
  /* Greens */
  --color-eucalyptus: #2ae18e; /* rgb(42,225,142)  */
  --color-android-green-100: #afd136; /* rgb(175,209,54)  */
  --color-apple: #5ebb46; /* rgb(94,187,70)   */
  --color-spanish-green: #0d9447; /* rgb(13,148,71)   */
  --color-bangladesh-green: #096349; /* rgb(9,97,73)     */
  --color-android-green-900: #06261c; /* rgb(6,38,28)     */

  /* Neutrals */
  --color-rich-black: #000000;
  --color-nickel: #737373; /* rgb(115,115,115) */
  --color-anti-flash-white: #f2f3f4; /* rgb(242,243,244) */

  /* Semantic aliases */
  --color-primary: var(--color-apple);
  --color-primary-dark: var(--color-spanish-green);
  --color-accent: var(--color-eucalyptus);
  --color-bg: var(--color-anti-flash-white);
  --color-text: var(--color-rich-black);
}
```

---

## 2. SCSS / Sass Map

```scss
$colors: (
  eucalyptus: #2ae18e,
  android-green-100: #afd136,
  apple: #5ebb46,
  spanish-green: #0d9447,
  bangladesh-green: #096349,
  android-green-900: #06261c,
  rich-black: #000000,
  nickel: #737373,
  anti-flash-white: #f2f3f4,
);

@function color($name) {
  @return map-get($colors, $name);
}
```

---

## 3. JS/TS Tokens (Styled Components)

```ts
export const colors = {
  eucalyptus: "#2AE18E",
  androidGreen100: "#AFD136",
  apple: "#5EBB46",
  spanishGreen: "#0D9447",
  bangladeshGreen: "#096349",
  androidGreen900: "#06261C",
  richBlack: "#000000",
  nickel: "#737373",
  antiFlashWhite: "#F2F3F4",

  // Semantic
  primary: "#5EBB46",
  primaryDark: "#0D9447",
  accent: "#2AE18E",
  bg: "#F2F3F4",
  text: "#000000",
} as const;

export const theme = {
  colors,
};
```

---

## 4. React Native

```ts
export const palette = {
  eucalyptus: "#2AE18E",
  androidGreen100: "#AFD136",
  apple: "#5EBB46",
  spanishGreen: "#0D9447",
  bangladeshGreen: "#096349",
  androidGreen900: "#06261C",
  richBlack: "#000000",
  nickel: "#737373",
  antiFlashWhite: "#F2F3F4",
};

export const theme = {
  colors: {
    primary: palette.apple,
    primaryDark: palette.spanishGreen,
    accent: palette.eucalyptus,
    bg: palette.antiFlashWhite,
    text: palette.richBlack,
    mutedText: palette.nickel,
  },
};
```

---

## 5. Tailwind Config

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        eucalyptus: "#2AE18E",
        androidGreen: {
          100: "#AFD136",
          900: "#06261C",
        },
        apple: "#5EBB46",
        spanishGreen: "#0D9447",
        bangladeshGreen: "#096349",
        richBlack: "#000000",
        nickel: "#737373",
        antiFlashWhite: "#F2F3F4",
      },
    },
  },
};
```

---

## 6. Design Tokens JSON

```json
{
  "color": {
    "eucalyptus": { "value": "#2AE18E" },
    "androidGreen100": { "value": "#AFD136" },
    "apple": { "value": "#5EBB46" },
    "spanishGreen": { "value": "#0D9447" },
    "bangladeshGreen": { "value": "#096349" },
    "androidGreen900": { "value": "#06261C" },
    "richBlack": { "value": "#000000" },
    "nickel": { "value": "#737373" },
    "antiFlashWhite": { "value": "#F2F3F4" },
    "primary": { "value": "{color.apple.value}" },
    "primaryDark": { "value": "{color.spanishGreen.value}" },
    "accent": { "value": "{color.eucalyptus.value}" },
    "bg": { "value": "{color.antiFlashWhite.value}" },
    "text": { "value": "{color.richBlack.value}" }
  }
}
```
