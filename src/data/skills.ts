type SkillGroup = {
  title: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Languages & Frameworks",
    items: ["TypeScript", "JavaScript (ES6+)", "React", "Next.js", "Redux", "Context API", "HTML5"],
  },
  {
    title: "Data & Forms",
    items: ["TanStack Query", "React Hook Form", "Axios", "REST API"],
  },
  {
    title: "Styling & UI",
    items: [
      "Tailwind CSS",
      "Radix UI",
      "Headless UI",
      "Chakra UI",
      "SCSS",
      "Styled Components",
      "RWD",
    ],
  },
  {
    title: "Data Visualization",
    items: ["Recharts", "Chart.js", "React Flow"],
  },
  {
    title: "Office Integration",
    items: ["Office.js", "Office Add-in API"],
  },
  {
    title: "Testing",
    items: ["Jest", "Playwright"],
  },
  {
    title: "Build & Tooling",
    items: ["Vite", "Webpack", "Storybook", "Husky", "lint-staged", "Biome"],
  },
  {
    title: "Performance & SEO",
    items: ["Web Vitals", "Lighthouse"],
  },
  {
    title: "Collaboration",
    items: ["Git (Gitflow)", "GitHub", "GitLab", "Figma", "Notion", "Jira", "ClickUp"],
  },
  {
    title: "AI-assisted Development",
    items: ["Claude Code", "Claude design"],
  },
];
