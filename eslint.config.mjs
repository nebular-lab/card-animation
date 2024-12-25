import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: [
      "next/core-web-vitals",
      "next/typescript",
    ],
    plugins: [
      "import",
      "unused-imports",
    ],
    "rules": {
      "@typescript-eslint/no-unused-vars": "off",
      "unused-imports/no-unused-imports": "warn",
      "unused-imports/no-unused-vars": "warn",
      "import/order": [
        "warn",
        {
          "groups": [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
            "object",
            "type"
          ],
          "newlines-between": "always",
          "pathGroupsExcludedImportTypes": [
            "builtin"
          ],
          "alphabetize": {
            "order": "asc",
            "caseInsensitive": true
          },
          "pathGroups": [
            {
              "pattern": "src/types/**",
              "group": "internal",
              "position": "before"
            }
          ]
        }
      ]
    }
  })
];

export default eslintConfig;
