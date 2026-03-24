import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  // Seed contact info
  const contactInfo = [
    { key: "email", value: "you@example.com" },
    { key: "github", value: "https://github.com/yourusername" },
    { key: "linkedin", value: "https://linkedin.com/in/yourusername" },
    { key: "twitter", value: "https://twitter.com/yourusername" },
    { key: "location", value: "Your City, Country" },
  ];

  for (const info of contactInfo) {
    await prisma.contactInfo.upsert({
      where: { key: info.key },
      update: { value: info.value },
      create: info,
    });
  }

  // Seed projects
  const projects = [
    {
      title: "Portfolio Website",
      slug: "portfolio-website",
      description:
        "My personal portfolio built with Next.js, Tailwind CSS, and PostgreSQL. Features a dynamic project showcase, career timeline, and contact form.",
      imageUrl: null,
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "Prisma"],
      githubUrl: "https://github.com/yourusername/portfolio",
      liveUrl: "https://yourname.vercel.app",
      published: true,
    },
    {
      title: "Sample Full-Stack App",
      slug: "sample-full-stack-app",
      description:
        "A sample REST API and React frontend demonstrating CRUD operations, authentication, and clean code patterns.",
      imageUrl: null,
      technologies: ["React", "Node.js", "Express", "MongoDB"],
      githubUrl: "https://github.com/yourusername/sample-app",
      liveUrl: null,
      published: true,
    },
  ];

  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: project,
      create: project,
    });
  }

  // Seed experiences (career timeline)
  // Clear and re-insert to maintain order
  await prisma.experience.deleteMany();
  await prisma.experience.createMany({
    data: [
      {
        company: "Current Company",
        position: "Software Engineer",
        startDate: new Date("2023-01-01"),
        endDate: null,
        description:
          "Working on full-stack web applications using React, Node.js, and cloud infrastructure. Lead developer for the customer-facing dashboard.",
        orderIndex: 0,
      },
      {
        company: "Previous Company",
        position: "Junior Developer",
        startDate: new Date("2021-06-01"),
        endDate: new Date("2022-12-31"),
        description:
          "Developed REST APIs and maintained legacy codebases. Collaborated with cross-functional teams in an Agile environment.",
        orderIndex: 1,
      },
      {
        company: "First Job Tech",
        position: "Intern — Software Development",
        startDate: new Date("2020-05-01"),
        endDate: new Date("2021-05-31"),
        description:
          "Assisted in building internal tools and automation scripts. Gained experience with SQL databases and backend development.",
        orderIndex: 2,
      },
    ],
  });

  console.log("Seed data inserted successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
