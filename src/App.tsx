```tsx
import React, { useEffect, useState, useRef } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import "./styles/ScrollProgress.css";

/* ================= NAVBAR ================= */
function Navbar() {
  const location = useLocation();

  const nav = [
    { path: "/", name: "Home" },
    { path: "/projects", name: "Projects" },
    { path: "/experience", name: "Experience" },
    { path: "/contact", name: "Contact" },
  ];

  return (
    <nav className="sticky top-4 z-40 flex items-center justify-between rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-lg">
      <Link to="/" className="text-xl font-bold text-sky-400">
        Karthik
      </Link>

      <div className="flex flex-wrap gap-4 md:gap-10">
        {nav.map((item) => (
          <div key={item.path} className="relative">
            <Link
              to={item.path}
              className={`transition-colors hover:text-sky-400 ${
                location.pathname === item.path
                  ? "text-sky-400"
                  : "text-white"
              }`}
            >
              {item.name}
            </Link>

            {location.pathname === item.path && (
              <motion.div
                layoutId="underline"
                className="absolute -bottom-1 h-[2px] w-full bg-sky-400"
              />
            )}
          </div>
        ))}
      </div>
    </nav>
  );
}

/* ================= SCROLL PROGRESS ================= */
function ScrollProgress() {
  const [scroll, setScroll] = useState(0);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const total =
        document.documentElement.scrollHeight - window.innerHeight;

      const progress =
        total > 0 ? (window.scrollY / total) * 100 : 0;

      setScroll(Math.min(100, Math.max(0, progress)));
    };

    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });

    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    if (barRef.current) {
      barRef.current.style.setProperty(
        "--scroll-width",
        `${scroll}%`
      );
    }
  }, [scroll]);

  return (
    <div
      className="scroll-progress-bar"
      role="progressbar"
      aria-label="Page scroll progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(scroll)}
    >
      <div ref={barRef} className="scroll-progress-fill" />
    </div>
  );
}

/* ================= HOME ================= */
function Home() {
  return (
    <section className="mt-24 px-4 text-center">
      <p className="mb-4 font-semibold tracking-widest text-sky-400">
        JAVA FULL STACK DEVELOPER
      </p>

      <h1 className="bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-5xl font-bold text-transparent md:text-6xl">
        Edara Karthik
      </h1>

      <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-400">
        Java Developer focused on Java, Spring Boot, REST APIs, and
        MySQL, with additional experience in automation testing using
        Selenium. Interested in building reliable backend applications
        and practical full-stack projects.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link
          to="/projects"
          className="rounded-lg bg-sky-400 px-6 py-3 font-semibold text-black transition hover:scale-105"
        >
          View My Projects
        </Link>

        <Link
          to="/contact"
          className="rounded-lg border border-sky-400 px-6 py-3 font-semibold text-sky-400 transition hover:bg-sky-400 hover:text-black"
        >
          Contact Me
        </Link>
      </div>

      <a
        href="/resume.pdf"
        download
        className="mt-6 inline-block text-sm text-gray-400 underline decoration-sky-400 underline-offset-4 transition hover:text-sky-400"
      >
        Download Resume
      </a>

      <div className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-4 md:grid-cols-4">
        {["Java", "Spring Boot", "MySQL", "Selenium"].map((skill) => (
          <div
            key={skill}
            className="rounded-xl border border-white/10 bg-white/5 p-4 font-medium text-gray-300"
          >
            {skill}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ================= PROJECTS ================= */
function Projects() {
  const projects = [
    {
      title: "GETJOBS - Job Portal",
      category: "Java Backend",
      desc: "A job portal project built with Java, Spring Boot, JSP, and MySQL. Review the repository for its implementation and available features.",
      technologies: ["Java", "Spring Boot", "JSP", "MySQL"],
      github:
        "https://github.com/Edarakarthik-chowdary/getjobs-job-portal",
      live: "",
    },
    {
      title: "JobPortle",
      category: "Java Application",
      desc: "A Java and Spring Boot project. Explore the source code and README for details about its functionality and implementation.",
      technologies: ["Java", "Spring Boot", "Maven"],
      github: "https://github.com/Edarakarthik-chowdary/JobPortle",
      live: "",
    },
    {
      title: "Developer Portfolio",
      category: "Frontend",
      desc: "A personal portfolio website built with React, TypeScript, and Vite, featuring project links, navigation, and animations.",
      technologies: ["React", "TypeScript", "Vite"],
      github:
        "https://github.com/Edarakarthik-chowdary/portfolio-vite",
      live: "https://portfolio-tau-murex-jb94ovixxz.vercel.app",
    },
  ];

  return (
    <section className="mt-20 px-4 pb-12">
      <p className="text-center text-sm font-semibold uppercase tracking-widest text-sky-400">
        What I've Built
      </p>

      <h2 className="mb-4 mt-3 text-center text-3xl font-bold md:text-4xl">
        My Projects
      </h2>

      <p className="mx-auto mb-12 max-w-2xl text-center text-gray-400">
        Explore my projects and the technologies I use to build
        applications.
      </p>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <motion.article
            key={project.title}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col rounded-xl border border-white/10 bg-white/5 p-6 transition-colors hover:border-sky-400/50"
          >
            <span className="mb-3 text-sm font-medium text-sky-400">
              {project.category}
            </span>

            <h3 className="text-xl font-bold">{project.title}</h3>

            <p className="mt-3 flex-grow leading-relaxed text-gray-400">
              {project.desc}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {project.technologies.map((technology) => (
                <span
                  key={technology}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300"
                >
                  {technology}
                </span>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-4 border-t border-white/10 pt-4">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-sky-400 transition hover:text-sky-300"
              >
                View on GitHub ↗
              </a>

              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-sky-400 transition hover:text-sky-300"
                >
                  Live Demo ↗
                </a>
              )}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

/* ================= EXPERIENCE ================= */
function Experience() {
  const experiences = [
    {
      role: "Software Test Engineer & Java Developer Intern",
      company: "Sri Sai Software Solutions",
      duration: "2023 - 2024",
      points: [
        "Worked on Java-based automation testing activities.",
        "Developed Selenium automation scripts and explored the Page Object Model.",
        "Practiced writing maintainable test cases and improving test automation workflows.",
      ],
    },
    {
      role: "Java Backend Developer",
      company: "Personal and Freelance Projects",
      duration: "2024 - Present",
      points: [
        "Developed Java and Spring Boot application projects.",
        "Worked with MySQL database integration.",
        "Practiced REST API development and backend application design.",
      ],
    },
  ];

  return (
    <section className="mx-auto mt-20 max-w-4xl px-4 pb-12">
      <p className="text-center text-sm font-semibold uppercase tracking-widest text-sky-400">
        My Journey
      </p>

      <h2 className="mb-12 mt-3 text-center text-3xl font-bold md:text-4xl">
        Experience
      </h2>

      <div className="space-y-6">
        {experiences.map((experience) => (
          <article
            key={experience.role}
            className="rounded-xl border border-white/10 bg-white/5 p-6 transition-colors hover:border-sky-400/40"
          >
            <h3 className="text-xl font-bold">{experience.role}</h3>

            <p className="mt-2 text-sm text-sky-400">
              {experience.company} • {experience.duration}
            </p>

            <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-gray-400">
              {experience.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ================= CONTACT ================= */
function Contact() {
  const form = useRef<HTMLFormElement | null>(null);

  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const sendEmail = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!form.current || status === "sending") {
      return;
    }

    setStatus("sending");

    try {
      await emailjs.sendForm(
        "service_layfcea",
        "template_odiydlt",
        form.current,
        "xYNJIQNlItO5HRG6Z"
      );

      setStatus("success");
      form.current.reset();
    } catch (error) {
      console.error("Email sending failed:", error);
      setStatus("error");
    }
  };

  return (
    <section className="mx-auto mt-20 max-w-2xl px-4 pb-12">
      <p className="text-center text-sm font-semibold uppercase tracking-widest text-sky-400">
        Get In Touch
      </p>

      <h2 className="mb-4 mt-3 text-center text-3xl font-bold md:text-4xl">
        Contact Me
      </h2>

      <p className="mb-10 text-center leading-relaxed text-gray-400">
        Have a project idea or an opportunity to discuss? Send me a
        message using the form below.
      </p>

      <form
        ref={form}
        onSubmit={sendEmail}
        className="space-y-5 rounded-xl border border-white/10 bg-white/5 p-6 md:p-8"
      >
        <div>
          <label
            htmlFor="user_name"
            className="mb-2 block text-sm font-medium text-gray-300"
          >
            Your Name
          </label>

          <input
            id="user_name"
            name="user_name"
            type="text"
            placeholder="Enter your name"
            autoComplete="name"
            required
            maxLength={100}
            className="w-full rounded-lg border border-white/10 bg-gray-900 p-3 text-white outline-none transition focus:border-sky-400"
          />
        </div>

        <div>
          <label
            htmlFor="user_email"
            className="mb-2 block text-sm font-medium text-gray-300"
          >
            Your Email
          </label>

          <input
            id="user_email"
            name="user_email"
            type="email"
            placeholder="Enter your email address"
            autoComplete="email"
            required
            maxLength={254}
            className="w-full rounded-lg border border-white/10 bg-gray-900 p-3 text-white outline-none transition focus:border-sky-400"
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="mb-2 block text-sm font-medium text-gray-300"
          >
            Your Message
          </label>

          <textarea
            id="message"
            name="message"
            placeholder="Write your message..."
            rows={5}
            required
            maxLength={5000}
            className="w-full resize-y rounded-lg border border-white/10 bg-gray-900 p-3 text-white outline-none transition focus:border-sky-400"
          />
        </div>

        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full rounded-lg bg-sky-400 py-3 font-semibold text-black transition hover:bg-sky-300 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "sending" ? "Sending..." : "Send Message"}
        </button>

        {status === "success" && (
          <p role="status" className="text-center text-green-400">
            Your message was sent successfully!
          </p>
        )}

        {status === "error" && (
          <p role="alert" className="text-center text-red-400">
            Message could not be sent. Please try again later.
          </p>
        )}
      </form>
    </section>
  );
}

/* ================= APP ================= */
export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black p-4 text-white md:p-6">
        <ScrollProgress />

        <Navbar />

        <main className="mx-auto max-w-6xl">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        <footer className="mt-16 border-t border-white/10 px-4 py-6 text-center text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()} Edara Karthik. Built with React
            and TypeScript.
          </p>

          <a
            href="https://github.com/Edarakarthik-chowdary"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-sky-400 hover:text-sky-300"
          >
            GitHub Profile ↗
          </a>
        </footer>
      </div>
    </Router>
  );
}
```
