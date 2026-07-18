import { defineConfig } from "vite-plus";

export default defineConfig({
  staged: {
    "*": "vp check --fix",
  },
  fmt: {
    sortTailwindcss: {
      stylesheet: "./apps/website/src/style.css",
    },
  },
  lint: {
    plugins: [
      "react",
      "typescript",
      "unicorn",
      "oxc",
      "jsx-a11y",
      "import",
      "promise",
      "react-perf",
    ],
    jsPlugins: [{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" }],
    rules: { "vite-plus/prefer-vite-plus-imports": "error" },
    options: { typeAware: true, typeCheck: true },
  },
  run: {
    cache: true,
    tasks: {
      "gen-readme": {
        command: "node scripts/gen-readme.mjs",
        // README.md is also an input: it's hand-written outside the spec
        // markers, so cache replay must not restore a stale copy of it.
        input: ["apps/website/src/spec.mdx", "scripts/gen-readme.mjs", "README.md"],
        output: ["README.md"],
      },
    },
  },
});
