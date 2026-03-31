import React, { useEffect, useState, useRef } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation
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
    { path: "/contact", name: "Contact" }
  ];

  return (
    <nav className="flex justify-between items-center p-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl sticky top-4 z-40">
      <h2 className="text-sky-400 font-bold text-xl">Karthik</h2>

      <div className="flex gap-6 md:gap-10">
        {nav.map((n) => (
          <div key={n.path} className="relative">
            <Link to={n.path} className="hover:text-sky-400">
              {n.name}
            </Link>

            {location.pathname === n.path && (
              <motion.div
                layoutId="underline"
                className="absolute w-full h-[2px] bg-sky-400 -bottom-1"
              />
            )}
          </div>
        ))}
      </div>
    </nav>
  );
}

/* ================= SCROLL ================= */
function ScrollProgress() {
  const [scroll, setScroll] = useState(0);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const total =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / total) * 100;
      setScroll(progress);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (barRef.current) {
      barRef.current.style.setProperty("--scroll-width", `${scroll}%`);
    }
  }, [scroll]);

  return (
    <div className="scroll-progress-bar">
      <div ref={barRef} className="scroll-progress-fill" />
    </div>
  );
}

/* ================= HOME ================= */
function Home() {
  return (
    <div className="text-center mt-24 px-4">
      <h1 className="text-5xl font-bold bg-gradient-to-r from-sky-400 to-blue-500 text-transparent bg-clip-text">
        Edara Karthik
      </h1>

      <p className="mt-6 text-gray-400 text-lg max-w-2xl mx-auto">
        Java Developer specializing in Spring Boot, REST APIs & Automation
        Testing with Selenium. Passionate about scalable backend systems.
      </p>

      <a
        href="/resume.pdf"
        download
        className="inline-block mt-8 px-6 py-3 bg-sky-400 text-black rounded-lg hover:scale-105 transition"
      >
        Download Resume
      </a>
    </div>
  );
}

/* ================= PROJECTS ================= */
function Projects() {
  const projects = [
    {
      title: "Automation Testing Framework",
      desc: "Selenium + Java framework with TestNG & POM. Reduced manual testing by 70%.",
      github: "https://github.com/Edarakarthik-chowdary/automation-framework",
      live: "#"
    },
    {
      title: "Spring Boot REST API",
      desc: "Secure REST APIs with JWT authentication and MySQL integration.",
      github: "https://github.com/Edarakarthik-chowdary/springboot-api",
      live: "#"
    },
    {
      title: "Portfolio Website",
      desc: "Modern React + Tailwind portfolio with animations.",
      github: "https://github.com/Edarakarthik-chowdary/portfolio",
      live: "#"
    }
  ];

  return (
    <div className="mt-20 px-4">
      <h2 className="text-3xl text-sky-400 text-center mb-12">Projects</h2>

      <div className="grid md:grid-cols-3 gap-8">
        {projects.map((p, i) => (
          <div key={i} className="p-6 bg-white/10 border border-white/20 rounded-xl">
            <h3 className="text-xl font-bold">{p.title}</h3>
            <p className="text-gray-400 mt-2">{p.desc}</p>

            <div className="flex gap-4 mt-4">
              <a href={p.github} target="_blank" className="text-sky-400">
                GitHub
              </a>
              <a href={p.live} target="_blank" className="text-sky-400">
                Live
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ================= EXPERIENCE ================= */
function Experience() {
  const exp = [
    {
      
      role: "SOFTWARE TEST ENGINEER & JAVA DEVELOPER INTERN",
      company: "Internship at sri sai software solutions",
      duration: "2023 -2024 ",
      points: [
        "Built Selenium frameworks using Java",
        "Implemented Page Object Model",
        "Reduced manual testing effort by 70%"
      ]
    },

    {
      role: "JAVA BACKEND DEVELOPER",
      company: "Freelance / Projects",
      duration: "2024 - Present",
      points: [
        "Developed REST APIs with Spring Boot",
        "Integrated MySQL database",
        "Implemented JWT authentication"
      ]
    }
  ];

  return (
    <div className="mt-20 max-w-4xl mx-auto px-4">
      <h2 className="text-3xl text-sky-400 text-center mb-12">Experience</h2>

      {exp.map((e, i) => (
        <div key={i} className="mb-6 p-6 bg-white/10 border rounded-xl">
          <h3 className="text-xl font-bold">{e.role}</h3>
          <p className="text-sky-400 text-sm">
            {e.company} • {e.duration}
          </p>
          <ul className="list-disc ml-5 mt-2 text-gray-400">
            {e.points.map((p, idx) => (
              <li key={idx}>{p}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/* ================= CONTACT ================= */
function Contact() {
  const form = useRef<HTMLFormElement | null>(null);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.current) return;

    emailjs.sendForm(
      "service_layfcea",
      "template_odiydlt",
      form.current,
      "xYNJIQNlItO5HRG6Z"
    );

    alert("Message Sent ✅");
  };

  return (
    <form ref={form} onSubmit={sendEmail} className="max-w-md mx-auto mt-16 space-y-4">
      <input name="user_name" placeholder="Name" className="w-full p-3 bg-gray-800 rounded" />
      <input name="user_email" placeholder="Email" className="w-full p-3 bg-gray-800 rounded" />
      <textarea name="message" placeholder="Message" className="w-full p-3 bg-gray-800 rounded" />
      <button className="bg-sky-400 w-full py-3 rounded">Send</button>
    </form>
  );
}

/* ================= APP ================= */
export default function App() {
  return (
    <Router>
      <div className="bg-black text-white min-h-screen p-6">
        <ScrollProgress />
        <Navbar />

        <div className="max-w-6xl mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}