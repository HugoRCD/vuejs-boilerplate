/*
textColor: {
  skin: {
    base: "var(--text-color-base)",
      muted: "var(--text-color-muted)",
  },
},
backgroundColor: {
  skin: {
    fill: "var(--color-fill)",
      muted: withOpacity("--color-muted"),
  },
},
fontSize: {
  sm: ["0.875rem", { lineHeight: "1.25rem", letterSpacing: "-0.03em" }],
    base: ["1rem", { lineHeight: "1.5rem", letterSpacing: "-0.03em" }],
    lg: ["1.125rem", { lineHeight: "1.75rem", letterSpacing: "-0.03em" }],
    xl: ["1.25rem", { lineHeight: "1.75rem", letterSpacing: "-0.03em" }],
    "2xl": ["1.5rem", { lineHeight: "2rem", letterSpacing: "-0.03em" }],
},
fontFamily: {
  inter: ["Inter", "sans-serif"],
},
screens: {
  mobile: "320px",
    tablet: "960px",
    desktop: "1280px",
},
colors: {
  transparent: "transparent",
    white: "#ffffff",
    black: "#1f1f1f",
    grass: "#10B981",
},
boxShadow: {
  sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    l: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
},*/

function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    }
    return `rgb(var(${variableName}))`;
  };
}

module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      textColor: {
        primary: "var(--font-base)",
        muted: "var(--font-muted)",
        inverted: "var(--font-inverted)",
        accent: withOpacity("--accent-color"),
        "accent-hover": withOpacity("--accent-color-hover"),
      },
      backgroundColor: {
        primary: "var(--bg-primary)",
        secondary: "var(--bg-secondary)",
        accent: withOpacity("--accent-color"),
        "accent-hover": withOpacity("--accent-color-hover"),
        "accent-faded": "var(--accent-color-faded)",
        transparent: "transparent",
      },
      ringColor: {
        accent: withOpacity("--accent-color"),
        "accent-faded": "var(--accent-color-faded)",
        transparent: "transparent",
      },
      borderColor: {
        muted: "var(--font-muted)",
        accent: withOpacity("--accent-color"),
        "accent-faded": "var(--accent-color-faded)",
        transparent: "transparent",
      },
      screens: {
        mobile: "320px",
        tablet: "960px",
        desktop: "1280px",
      },
    },
  },
  plugins: [],
};
