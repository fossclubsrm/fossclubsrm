export default {
  "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
  "*.{json,css,md,html,yaml,yml}": ["prettier --write"],
  "package.json": ["prettier --write"],
};

