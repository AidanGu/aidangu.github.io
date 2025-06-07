// Content Data - Edit this file to update your website content
const siteContent = {
  // Hero Section
  hero: {
    name: "Aidan Gu",
    titles: [
      "Computer Engineering Student.",
      "Maker Space Intern.",
      "AI Researcher.",
      "Adobe Ambassador.",
      "Musician.",
    ],
    description:
      "Computer Engineering student at UC Santa Cruz, passionate about building technology that brings people together. From Cambridge classrooms to Santa Cruz maker spaces, I create solutions that foster community and drive positive change.",
    profileImage: "images/profile.png",
    cta: {
      primary: {
        text: "Discover My Journey",
        link: "#story",
      },
      secondary: {
        text: "View My Work",
        link: "projects.html",
      },
    },
  },

  // Stats Section
  stats: [
    { number: 50, label: "Projects Built" },
    { number: 5, label: "Hackathons Won" },
    { number: 1000, label: "Students Impacted" },
    { number: 3, label: "Publications" },
  ],

  // About Section
  about: {
    title: "Building Community Through Code",
    subtitle:
      "From Cambridge classrooms to Santa Cruz maker spaces, I'm passionate about creating technology that brings people together and empowers communities to learn and grow.",
    description:
      "I'm a Computer Engineering student at UC Santa Cruz with a passion for creating technology that brings people together. My journey spans from working as a Maker Space Intern through the CUIP program to conducting research at the Tech4Good Lab.",
    image: "images/makerspace.png",
  },

  // Roles Section
  roles: [
    {
      icon: "fas fa-tools",
      title: "Maker Space Intern (CUIP)",
      description:
        "Managing and developing the maker space's online presence, conducting interviews with users, and analyzing data on maker space usage to improve outreach and space utilization.",
    },
    {
      icon: "fas fa-robot",
      title: "Generative AI Researcher",
      description:
        "Designing AI tools for transcript analysis, prompt workflows, and LLM evaluation to support feedback in experiential learning at the Tech4Good Lab.",
    },
    {
      icon: "fas fa-paint-brush",
      title: "Adobe Student Brand Ambassador",
      description:
        "Planning and leading workshops teaching students how to use Adobe Express and other Adobe applications for academic and creative projects.",
    },
    {
      icon: "fas fa-music",
      title: "Musician & Creator",
      description:
        "Performing music, creating content, and exploring the intersection of technology and creativity through various personal projects.",
    },
  ],

  // Timeline Section
  timeline: [
    {
      year: "2023",
      title: "UCEAP: Summer in Cambridge",
      location: "University of Cambridge, England",
      duration: "Summer 2023",
      description:
        "A transformative summer studying Robotics, Macroeconomics, and Material Science at one of the world's most prestigious universities. This experience challenged my assumptions, expanded my worldview, and showed me the incredible potential that comes from stepping outside my comfort zone.",
      highlights: ["Robotics", "Macroeconomics", "Material Science"],
      image: "images/cambridge-formal.png",
      link: {
        url: "https://uceap.universityofcalifornia.edu/programs/summer-in-cambridge",
        text: "Learn about the program",
      },
      testimonial: {
        image: "images/cambridge-testimonial.png",
        quote:
          "Studying abroad at Cambridge was the best opportunity I've ever seized. It opened my mind to new perspectives, challenged my assumptions, and showed me the incredible potential that comes from stepping outside your comfort zone.",
        author: "Aidan Gu, on his UCEAP experience",
        link: "https://uceap.universityofcalifornia.edu/programs/summer-in-cambridge",
      },
    },
    {
      year: "2024",
      title: "Slugworks Maker Space Intern (CUIP)",
      location: "UC Santa Cruz, California",
      duration: "June 2024 – June 2025",
      description:
        "Through the Chancellor's Undergraduate Internship Program, I dove deep into the intersection of technology and community building. Managing digital presence, conducting user interviews, and analyzing engagement data taught me how technology can foster inclusive learning environments.",
      highlights: ["Community Building", "Data Analysis", "Digital Strategy"],
      image: "images/makerspace.png",
      reverse: true,
    },
    {
      year: "2025",
      title: "Slugworks Staff",
      location: "UC Santa Cruz, California",
      duration: "June 2025 – June 2026",
      description:
        "Transitioning from intern to staff member, I now help shape the future of maker education at UCSC. Leading initiatives in training platform development and supporting the next generation of makers and innovators.",
      highlights: ["Leadership", "Training Development", "Mentorship"],
      image: "images/team-photo.png",
    },
    {
      year: "2025",
      title: "ACM Instruction Officer",
      location: "UC Santa Cruz, California",
      duration: "2025 – 2026",
      description:
        "As Instruction Coordinator for the Association for Computing Machinery, I coordinate educational workshops and technical training sessions, helping students bridge the gap between academic learning and practical application.",
      highlights: ["Technical Education", "Workshop Coordination", "Peer Learning"],
      image: "images/community.png",
      reverse: true,
    },
    {
      year: "2025",
      title: "CruzHacks 2025 – Sponsorship Lead",
      location: "UC Santa Cruz, California",
      duration: "2025",
      description:
        "Leading sponsorship efforts for UC Santa Cruz's premier hackathon, connecting with industry partners and securing resources to support student innovation. [Content to be updated with more details about the experience and impact.]",
      highlights: ["Event Leadership", "Partnership Development", "Student Engagement"],
      image: "/placeholder.svg?height=300&width=400",
      placeholder: true,
      editNote: "📝 Edit this section in data/content.js to add more details about your CruzHacks experience",
    },
  ],

  // Reflection Section
  reflection: {
    title: "Why I Build",
    content: [
      "Each chapter of my journey has reinforced a core belief: technology is most powerful when it brings people together. Whether it's analyzing maker space data to improve accessibility, developing AI tools for educational feedback, or creating platforms that connect students across disciplines, I'm driven by the potential to use engineering as a force for community and positive change.",
      "My experiences from Cambridge's historic halls to Santa Cruz's innovative maker spaces have taught me that the best solutions come from understanding people first, then building technology that serves their needs. This human-centered approach guides everything I create.",
    ],
  },

  // Skills Section
  skills: {
    technical: ["Python", "C", "Java", "HTML/CSS", "TypeScript", "React"],
    creative: ["Adobe Illustrator", "Photoshop", "Premiere Pro", "Adobe Express", "Figma", "Music"],
    leadership: [
      "Event Planning",
      "Workshop Facilitation",
      "Community Building",
      "Data Analysis",
      "Project Management",
    ],
  },
}

// Make content available globally
window.siteContent = siteContent
