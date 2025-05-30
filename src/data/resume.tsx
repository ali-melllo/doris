import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
  name: "Doris AI",
  initials: "DV",
  url: "https://doris-pi.vercel.app/",
  location: "Netherlands, AM",
  locationLink: "https://www.google.com/maps/place/sanfrancisco",
  description: `Doris AI , Global Helper in Netherlands`,
  summary:
    `Why 'Black Labs'?
We chose the name Black Labs as a tribute to the curious, intelligent, and loyal nature of black labrador retrievers — qualities we mirror in how we build software: smart, reliable, and always exploring new ground.

Philosophy
We don't just ship code. We solve problems. Whether you're an early-stage startup or a growing business, we become your technical partner — translating your vision into rock-solid code.

Tech Stack Highlights:

Frontend: React, Next.js, Tailwind CSS, TypeScript

Backend: Node.js, Express, MongoDB, PostgreSQL

DevOps: Docker, GitHub Actions, Vercel, Railway, Liara

AI/Automation: OpenAI, LangChain, GPT Agents, Web Scraping

CMS / eCommerce: Sanity, Strapi, Shopify, Medusa.js

Let’s Build Something
Whether you need a full product team or expert hands to scale your platform, Black Labs is ready to deliver. Reach out to collaborate on your next big idea.`,
  avatarUrl: "/me.jpg",
  marquee: [
    {
      alt: "Jack",
      img: "/shahedan-logo.png",
    },
    {
      alt: "atrafe man",
      img: "/atrafe-man.png",
    },
    {
      alt: "kloud",
      img: "/logo.png",
    },
    { 
      alt: "meow shop",
      img: "/meowshop-logo.jpg",
    },
    {
      alt: "kloud new",
      img: "/logo-symbol.svg",
    },
    {
      alt: "Jack",
      img: "/sarafiroyal-logo.png",
    },
    {
      alt: "Jack",
      img: "/ugym-logo.jpg",
    },
    {
      alt: "takhte",
      img: "/takhte-logo.png",
    },
    {
      alt: "PlayCo",
      img: "/playco-logo.png",
    },
    {
      alt: "Navoshgaran",
      img: "/navoshgaran-logo.png",
    },
    {
      alt: "90 roz",
      img: "/90-roz.webp",
    },

  ],
  morphins: [
    "+16 Real World Projects",
    "+7 Teams Collaborated",
    "+5 years of Experience",
    "Looking forward for big stuff :)",
  ],
  skills: [
    "React",
    "Next.js",
    "Tailwind",
    "Shad-cn",
    "REST Api",
    "grpc",
    "trpc",
    "CI/CD",
    "SSO",
    "Bootstrap",
    "Typescript",
    "Node.js",
    "MongoDB",
    "Mongoose",
    "Express",
    "Docker",
    "Redux toolkit",
    "RTK Query",
    "Redux Thunk",
    "Axios",
    "React Query",
    "React-Router",
    "PWA",
    "Socket.io",
    "useWebSocket",
    "Framer Motion",
    "Material UI",
    "React Context",
    "Xterm",
    "Ethers",
    "Metamask",
    "Phantom Wallet Adapter",
    "Tron web",
    "AG-charts",
    "Headless ui ",
    "Css Modules",
    "Styled Components",
    "Flowbite",
    "Scrum",
    "Jest ( unit & integration )",
    "Git",
    "Azure DevOps",
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
  ],
  contact: {
    email: "hello@example.com",
    tel: "+123456789",
    social: {
      Map: {
        name: "Map",
        url: "/map",
        icon: Icons.github,

        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/alii-maleki/",
        icon: Icons.linkedin,

        navbar: true,
      },
      X: {
        name: "X",
        url: "#",
        icon: Icons.x,

        navbar: true,
      },
      Youtube: {
        name: "Youtube",
        url: "#",
        icon: Icons.youtube,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "alimelllo32@gmail.com",
        icon: Icons.email,

        navbar: false,
      },
    },
  },

  work: [
    {
      company: "Atomic Finance",
      href: "https://atomic.finance",
      badges: [],
      location: "Remote",
      title: "Bitcoin Protocol Engineer",
      logoUrl: "/atomic.png",
      start: "May 2021",
      end: "Oct 2022",
      description:
        "Implemented the Bitcoin discreet log contract (DLC) protocol specifications as an open source Typescript SDK. Dockerized all microservices and setup production kubernetes cluster. Architected a data lake using AWS S3 and Athena for historical backtesting of bitcoin trading strategies. Built a mobile app using react native and typescript.",
    },
    {
      company: "Shopify",
      badges: [],
      href: "https://shopify.com",
      location: "Remote",
      title: "Software Engineer",
      logoUrl: "/shopify.svg",
      start: "January 2021",
      end: "April 2021",
      description:
        "Implemented a custom Kubernetes controller in Go to automate the deployment of MySQL and ProxySQL custom resources in order to enable 2,000+ internal developers to instantly deploy their app databases to production. Wrote several scripts in Go to automate MySQL database failovers while maintaining master-slave replication topologies and keeping Zookeeper nodes consistent with changes.",
    },
    {
      company: "Nvidia",
      href: "https://nvidia.com/",
      badges: [],
      location: "Santa Clara, CA",
      title: "Software Engineer",
      logoUrl: "/nvidia.png",
      start: "January 2020",
      end: "April 2020",
      description:
        "Architected and wrote the entire MVP of the GeForce Now Cloud Gaming internal admin and A/B testing dashboard using React, Redux, TypeScript, and Python.",
    },
    {
      company: "Splunk",
      href: "https://splunk.com",
      badges: [],
      location: "San Jose, CA",
      title: "Software Engineer",
      logoUrl: "/splunk.svg",
      start: "January 2019",
      end: "April 2019",
      description:
        "Co-developed a prototype iOS app with another intern in Swift for the new Splunk Phantom security orchestration product (later publicly demoed and launched at .conf annual conference in Las Vegas). Implemented a realtime service for the iOS app in Django (Python) and C++; serialized data using protobufs transmitted over gRPC resulting in an approximate 500% increase in data throughput.",
    },
    {
      company: "Lime",
      href: "https://li.me/",
      badges: [],
      location: "San Francisco, CA",
      title: "Software Engineer",
      logoUrl: "/lime.svg",
      start: "January 2018",
      end: "April 2018",
      description:
        "Proposed and implemented an internal ruby API for sending/receiving commands to scooters over LTE networks. Developed a fully automated bike firmware update system to handle asynchronous firmware updates of over 100,000+ scooters worldwide, and provide progress reports in real-time using React, Ruby on Rails, PostgreSQL and AWS EC2 saving hundreds of developer hours.",
    },
    {
      company: "Mitre Media",
      href: "https://mitremedia.com/",
      badges: [],
      location: "Toronto, ON",
      title: "Software Engineer",
      logoUrl: "/mitremedia.png",
      start: "May 2017",
      end: "August 2017",
      description:
        "Designed and implemented a robust password encryption and browser cookie storage system in Ruby on Rails. Leveraged the Yahoo finance API to develop the dividend.com equity screener",
    },
  ],
  education: [
    {
      school: "Buildspace",
      href: "https://buildspace.so",
      degree: "s3, s4, sf1, s5",
      logoUrl: "/buildspace.jpg",
      start: "2023",
      end: "2024",
    },
    {
      school: "University of Waterloo",
      href: "https://uwaterloo.ca",
      degree: "Bachelor's Degree of Computer Science (BCS)",
      logoUrl: "/waterloo.png",
      start: "2016",
      end: "2021",
    },
    {
      school: "Wilfrid Laurier University",
      href: "https://wlu.ca",
      degree: "Bachelor's Degree of Business Administration (BBA)",
      logoUrl: "/laurier.png",
      start: "2016",
      end: "2021",
    },
    {
      school: "International Baccalaureate",
      href: "https://ibo.org",
      degree: "IB Diploma",
      logoUrl: "/ib.png",
      start: "2012",
      end: "2016",
    },
  ],
  projects: [
    {
      title: "Chat Collect",
      href: "https://chatcollect.com",
      dates: "Jan 2024 - Feb 2024",
      active: true,
      description:
        "With the release of the [OpenAI GPT Store](https://openai.com/blog/introducing-the-gpt-store), I decided to build a SaaS which allows users to collect email addresses from their GPT users. This is a great way to build an audience and monetize your GPT API usage.",
      technologies: [
        "Next.js",
        "Typescript",
        "PostgreSQL",
        "Prisma",
        "TailwindCSS",
        "Stripe",
        "Shadcn UI",
        "Magic UI",
      ],
      links: [
        {
          type: "Website",
          href: "https://chatcollect.com",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/chat-collect.mp4",
    },
    {
      title: "Magic UI",
      href: "https://magicui.design",
      dates: "June 2023 - Present",
      active: true,
      description:
        "Designed, developed and sold animated UI components for developers.",
      technologies: [
        "Next.js",
        "Typescript",
        "PostgreSQL",
        "Prisma",
        "TailwindCSS",
        "Stripe",
        "Shadcn UI",
        "Magic UI",
      ],
      links: [
        {
          type: "Website",
          href: "https://magicui.design",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/magicuidesign/magicui",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "https://cdn.magicui.design/bento-grid.mp4",
    },
    {
      title: "llm.report",
      href: "https://llm.report",
      dates: "April 2023 - September 2023",
      active: true,
      description:
        "Developed an open-source logging and analytics platform for OpenAI: Log your ChatGPT API requests, analyze costs, and improve your prompts.",
      technologies: [
        "Next.js",
        "Typescript",
        "PostgreSQL",
        "Prisma",
        "TailwindCSS",
        "Shadcn UI",
        "Magic UI",
        "Stripe",
        "Cloudflare Workers",
      ],
      links: [
        {
          type: "Website",
          href: "https://llm.report",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/dillionverma/llm.report",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "https://cdn.llm.report/openai-demo.mp4",
    },
    {
      title: "Automatic Chat",
      href: "https://automatic.chat",
      dates: "April 2023 - March 2024",
      active: true,
      description:
        "Developed an AI Customer Support Chatbot which automatically responds to customer support tickets using the latest GPT models.",
      technologies: [
        "Next.js",
        "Typescript",
        "PostgreSQL",
        "Prisma",
        "TailwindCSS",
        "Shadcn UI",
        "Magic UI",
        "Stripe",
        "Cloudflare Workers",
      ],
      links: [
        {
          type: "Website",
          href: "https://automatic.chat",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/automatic-chat.mp4",
    },
  ],
  hackathons: [
    {
      title: " Yottab Paas Services ",
      dates: "2024",
      location: "Tehran , Iran",
      description:
        "Yottab  is a Paas platform offering multiple cloud services or third  party repositories ",
      image:
        "/logo.png",
      mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2019/mlh-trust-badge-2019-white.svg",
      links: [],
    },
    {
      title: "Meow Shop",
      dates: "2024",
      location: "Tehran Iran, Ontario",
      description:
        "Meow Shop is An Iranian pet store providing pet services",
      image:
        "/meowshop-logo.jpg",
      mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2019/mlh-trust-badge-2019-white.svg",
      links: [],
    },
    {
      title: "Play Co Tv",
      dates: "2023",
      location: "Spain",
      description:
        "Play Co  is a web platform for watching movies and series online.",
      icon: "public",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/firstnet.png",
      links: [],
    },
    {
      title: "90 Rouz",
      dates: "2022",
      location: "Tehran , Iran",
      description:
        "90 Days  is a mobile web application for creating challenges and art groups with multiple categories with nested groups for everyone to jin and integrate",
      image:
        "/90-roz.webp",
      links: [
      ],
    },
    {
      title: "Atrafe Man",
      dates: "2022",
      location: "Tehran , Iran ",
      description:
        "Atrafe Man  is a mobile  web app providing services with geographic events ",
      image:
        "/atrafe-man.png",
      win: "Best Data Hack",
      mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2018/white.svg",
      links: [],
    },
    {
      title: "Shahedan",
      dates: "2021",
      location: "Tehran , Iran",
      description:
        "Shahedan  is a web app providing tour packages and traveling services around the world for middle east travelers.",
      image:
        "/shahedan-logo.png",
      links: [
      ],
    },
    {
      title: "Sarafi Royal ",
      dates: "2021",
      location: "Tehran, Iran",
      description:
        "Sarafi Royal is a crypto currency website allowing you to exchange multiple types of currency located in tehran for middle east exchanges.",
      image:
        "/sarafiroyal-logo.png",
      mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2017/white.svg",
      links: [ ],
    },
    
  ],
} as const;
