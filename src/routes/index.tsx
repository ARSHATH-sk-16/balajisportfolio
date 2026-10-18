import { useEffect, useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Check,
  Code2,
  Github,
  Linkedin,
  Mail,
  Menu,
  Send,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import resumeAsset from "@/assets/Balaji_Resume.pdf.asset.json";
import { CONTACT_EMAIL, createContactMailto } from "@/lib/contact-link";

const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

const skills = [
  { title: "Programming", values: ["Java", "Python", "SQL"] },
  {
    title: "Data Engineering",
    values: ["PySpark", "Apache Hadoop", "HDFS", "Apache Hive", "Apache Airflow", "ETL Pipelines"],
  },
  {
    title: "Web Development",
    values: ["React.js", "Node.js", "Express.js", "MongoDB", "REST APIs", "HTML5", "CSS3"],
  },
  { title: "Databases", values: ["MySQL", "SQL", "DBMS"] },
  {
    title: "AI & Machine Learning",
    values: ["Machine Learning", "Deep Learning", "TensorFlow", "Claude AI", "Prompt Engineering"],
  },
  { title: "Tools & Platforms", values: ["Git", "GitHub", "VS Code", "MS Excel", "Netlify"] },
];

const projects = [
  {
    number: "01",
    title: "QUPID",
    eyebrow: "REAL-TIME CHAT APPLICATION · PERSONAL PROJECT",
    description:
      "A real-time messaging platform built for multi-user conversations, with secure access and responsive cross-device use.",
    details: [
      "Implemented JWT authentication and role-based authorization across API endpoints.",
      "Designed 10+ RESTful endpoints for user management, messaging, and session control.",
      "Built a responsive interface for desktop and mobile use.",
    ],
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT", "REST APIs"],
    accent: "chat",
  },
  {
    number: "02",
    title: "CrimeData Analytics Platform",
    eyebrow: "DATA ENGINEERING · 2025",
    description:
      "A batch ETL pipeline that prepares large-scale crime datasets for structured analytics and querying.",
    details: [
      "Ingested, cleansed, and transformed datasets using PySpark.",
      "Used HDFS for storage and Apache Hive for structured queries.",
      "Automated scheduled workflows with Apache Airflow DAGs.",
    ],
    tech: ["PySpark", "Hadoop", "HDFS", "Hive", "Apache Airflow"],
    accent: "data",
  },
  {
    number: "03",
    title: "My Startup Website",
    eyebrow: "WEB DEVELOPMENT · DEPLOYED",
    description:
      "A responsive personal portfolio website developed to showcase projects and skills across devices.",
    details: ["Built with React and modern UI components.", "Deployed using Netlify."],
    tech: ["React.js", "HTML", "CSS", "Netlify"],
    accent: "web",
  },
];

const education = [
  {
    qualification: "Bachelor of Engineering",
    subject: "Computer Science & Engineering",
    institution: "JJ College of Engineering and Technology",
    location: "Tiruchirapalli",
    date: "2023 – 2027",
    result: "CGPA 7.5 / 10",
  },
  {
    qualification: "Higher Secondary Certificate",
    subject: "Class XII",
    institution: "Chellammal Higher Secondary School",
    location: "",
    date: "2023",
    result: "54%",
  },
  {
    qualification: "Secondary School Certificate",
    subject: "Class X",
    institution: "Chellammal Higher Secondary School",
    location: "",
    date: "2021",
    result: "Completed",
  },
];

const certifications = [
  { issuer: "IIT Bombay", names: ["C Programming Training", "Git & Version Control Training"] },
  { issuer: "NPTEL", names: ["Python for Data Science"] },
  { issuer: "HP", names: ["AI for Beginners", "Cybersecurity Awareness"] },
  {
    issuer: "Anthropic",
    names: ["Claude AI 101", "Claude Code 101", "Introduction to Claude Cowork"],
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Balaji S | Software & Data Engineering Portfolio" },
      {
        name: "description",
        content:
          "Balaji S is a Computer Science Engineering student building software, data engineering pipelines, and full-stack applications.",
      },
      { property: "og:title", content: "Balaji S | Software & Data Engineering Portfolio" },
      {
        property: "og:description",
        content:
          "Computer Science Engineering student with hands-on experience in software development, data engineering, and analytics.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portfolio,
});

function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>(".reveal");
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            entry.target.classList.remove("is-pending");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    targets.forEach((target) => {
      target.classList.add("is-pending");
      revealObserver.observe(target);
    });

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.2, 0.5] },
    );
    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) sectionObserver.observe(element);
    });

    return () => {
      revealObserver.disconnect();
      sectionObserver.disconnect();
    };
  }, []);

  function handleContactSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const formData = new FormData(form);
    const mailto = createContactMailto({
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      message: String(formData.get("message") ?? ""),
    });
    setSubmitted(true);
    window.location.href = mailto;
  }

  return (
    <main className="portfolio-shell">
      <header className="site-header">
        <div className="site-frame flex h-[72px] items-center justify-between gap-5">
          <a href="#home" className="flex items-center gap-3" aria-label="Balaji S, home">
            <span className="flex size-9 items-center justify-center rounded-lg border border-primary/35 bg-primary/10 font-semibold text-primary">
              BS
            </span>
            <span className="font-semibold tracking-normal">Balaji S</span>
          </a>
          <nav className="hidden items-center gap-7 md:flex" aria-label="Main navigation">
            {sections.map(({ id, label }) => (
              <a
                key={id}
                className="site-nav-link text-sm"
                href={`#${id}`}
                aria-current={activeSection === id ? "location" : undefined}
              >
                {label}
              </a>
            ))}
          </nav>
          <div className="hidden items-center gap-2 md:flex">
            <a
              className="flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              href="https://github.com/sbalaji1005-cyber"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub profile"
              title="GitHub profile"
            >
              <Github size={18} />
            </a>
            <a
              className="flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              href="https://www.linkedin.com/in/balaji-s-9aab9428b"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn profile"
              title="LinkedIn profile"
            >
              <Linkedin size={18} />
            </a>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X /> : <Menu />}
          </Button>
        </div>
        {menuOpen && (
          <nav
            id="mobile-navigation"
            className="site-frame grid gap-1 border-t border-border py-3 md:hidden"
            aria-label="Mobile navigation"
          >
            {sections.map(({ id, label }) => (
              <a
                key={id}
                className="site-nav-link rounded-md px-3 py-2.5 text-sm"
                href={`#${id}`}
                aria-current={activeSection === id ? "location" : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </a>
            ))}
          </nav>
        )}
      </header>

      <section id="home" className="hero-section scroll-mt-20">
        <div className="site-frame grid min-h-[670px] items-center gap-14 py-20 lg:grid-cols-[1.12fr_0.88fr] lg:py-24">
          <div className="reveal">
            <p className="eyebrow mb-6 flex items-center gap-2">
              <span className="size-2 rounded-full bg-primary" />
              Computer Science Engineering · Tamil Nadu, India
            </p>
            <h1 className="hero-title">
              Building useful things with <span className="hero-accent">code & data.</span>
            </h1>
            <p className="mt-6 max-w-[590px] text-base leading-8 text-muted-foreground md:text-lg">
              I’m Balaji, a fourth-year Computer Science Engineering student working across full-stack
              development, data engineering, and software quality.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild size="lg" className="h-12 px-5">
                <a href="#projects">
                  View My Projects <ArrowDownRight />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 px-5">
                <a href={resumeAsset.url} download="Balaji_Resume.pdf">
                  Download Resume <ArrowDown size={17} />
                </a>
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
              <a className="inline-flex items-center gap-2 transition-colors hover:text-foreground" href="mailto:sbalaji1005@gmail.com">
                <Mail size={15} /> sbalaji1005@gmail.com
              </a>
              <a
                className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
                href="https://github.com/sbalaji1005-cyber"
                target="_blank"
                rel="noreferrer"
              >
                <Github size={15} /> GitHub <ArrowUpRight size={13} />
              </a>
            </div>
          </div>

          <div className="reveal lg:pl-3">
            <div className="terminal-window">
              <div className="terminal-bar">
                <span className="terminal-dot" />
                <span className="terminal-dot" />
                <span className="terminal-dot" />
                <span className="mono-text ml-3 text-xs text-muted-foreground">balaji.ts</span>
              </div>
              <div className="terminal-body" aria-label="Developer profile code window">
                <p><span className="text-violet">const</span> developer = {'{'}</p>
                <p className="pl-5"><span className="terminal-key">name</span>: <span className="text-foreground">"Balaji S"</span>,</p>
                <p className="pl-5"><span className="terminal-key">studying</span>: <span className="text-foreground">"Computer Science"</span>,</p>
                <p className="pl-5"><span className="terminal-key">focus</span>: [</p>
                <p className="pl-10 text-foreground">"Software Engineering",</p>
                <p className="pl-10 text-foreground">"Data Engineering",</p>
                <p className="pl-10 text-foreground">"AI / ML"</p>
                <p className="pl-5">],</p>
                <p className="pl-5"><span className="terminal-key">currently</span>: <span className="text-foreground">"Building & learning"</span></p>
                <p>{'}'}</p>
                <p className="mt-4 flex items-center gap-2 text-primary"><Code2 size={15} /> open to internship & entry-level roles</p>
              </div>
            </div>
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
              <span className="mono-text">JAVA · PYTHON · SQL · PYSPARK</span>
              <span className="flex items-center gap-2"><span className="size-2 rounded-full bg-primary" /> Available for opportunities</span>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="section-block">
        <div className="site-frame grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <div className="section-heading reveal">
            <p className="eyebrow">01 / About</p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight md:text-4xl">Curious by nature. Building with purpose.</h2>
          </div>
          <div className="reveal space-y-5 text-base leading-8 text-muted-foreground">
            <p>
              I’m a fourth-year Computer Science Engineering student at JJ College of Engineering and
              Technology. I’ve worked on full-stack applications, data pipelines, and IoT-based
              monitoring systems, with hands-on experience in software testing and quality assurance.
            </p>
            <p>
              My technical work spans Python, Java, SQL, modern web development, and big-data tools.
              I’m looking to grow through internship and entry-level opportunities in software
              engineering, data engineering, AI/ML, analytics, or software testing.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {["English", "Tamil", "Software quality", "AI / ML tools"].map((item) => (
                <span className="skill-pill px-3 py-1.5 text-xs" key={item}>{item}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="section-block border-y border-border bg-card/35">
        <div className="site-frame">
          <div className="section-heading reveal">
            <p className="eyebrow">02 / Technical skills</p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight md:text-4xl">Tools I work with.</h2>
            <p className="mt-4 leading-7 text-muted-foreground">Technologies and tools listed in my experience and training.</p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map(({ title, values }, index) => (
              <article className="skill-group reveal p-5" key={title} style={{ transitionDelay: `${index * 45}ms` }}>
                <div className="flex items-center gap-3">
                  <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary"><Code2 size={17} /></span>
                  <h3 className="font-semibold">{title}</h3>
                </div>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {values.map((value) => <li className="skill-pill px-2.5 py-1.5 text-xs" key={value}>{value}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="section-block">
        <div className="site-frame">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div className="section-heading reveal">
              <p className="eyebrow">03 / Selected work</p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight md:text-4xl">Projects built to solve real problems.</h2>
            </div>
            <a className="reveal mb-1 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground" href="https://github.com/sbalaji1005-cyber" target="_blank" rel="noreferrer">
              More on GitHub <ArrowUpRight size={15} />
            </a>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {projects.map((project) => (
              <article className="group reveal flex min-w-0 flex-col overflow-hidden rounded-xl border border-border bg-card/60 transition-colors hover:border-primary/45" key={project.title}>
                <div className={`project-visual px-5 pb-4 pt-5 project-visual-${project.accent}`}>
                  <div className="project-visual-content flex w-full items-end justify-between">
                    <div>
                      <p className="eyebrow mb-2 text-[0.65rem]">{project.eyebrow}</p>
                      <p className="font-semibold text-foreground">{project.title}</p>
                    </div>
                    <span className="project-index">{project.number}</span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-lg font-semibold">{project.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{project.description}</p>
                  <ul className="mt-4 space-y-2.5 text-sm leading-6 text-muted-foreground">
                    {project.details.map((detail) => (
                      <li className="flex gap-2.5" key={detail}><Check className="mt-1 size-4 shrink-0 text-primary" /> <span>{detail}</span></li>
                    ))}
                  </ul>
                  <ul className="mt-auto flex flex-wrap gap-2 pt-6">
                    {project.tech.map((technology) => <li className="skill-pill px-2.5 py-1 text-[0.68rem]" key={technology}>{technology}</li>)}
                  </ul>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-6 flex items-start gap-3 border-l-2 border-primary/50 pl-4 text-sm leading-6 text-muted-foreground">
            <ArrowRight className="mt-1 size-4 shrink-0 text-primary" />
            <p>Project repository and demo links are shown only where the resume provides a verified destination.</p>
          </div>
        </div>
      </section>

      <section id="education" className="section-block border-y border-border bg-card/35">
        <div className="site-frame grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <div className="section-heading reveal">
            <p className="eyebrow">04 / Education</p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight md:text-4xl">Learning that keeps moving.</h2>
          </div>
          <div>
            <div className="space-y-3">
              {education.map((entry) => (
                <article className="education-entry reveal flex flex-col justify-between gap-4 p-5 sm:flex-row sm:items-center" key={entry.qualification}>
                  <div>
                    <h3 className="font-semibold">{entry.qualification} <span className="text-muted-foreground">— {entry.subject}</span></h3>
                    <p className="mt-2 text-sm text-muted-foreground">{entry.institution}{entry.location ? ` · ${entry.location}` : ""}</p>
                  </div>
                  <div className="shrink-0 sm:text-right">
                    <p className="mono-text text-xs text-muted-foreground">{entry.date}</p>
                    <p className="mt-1 text-sm font-medium text-primary">{entry.result}</p>
                  </div>
                </article>
              ))}
            </div>
            <div className="mt-9">
              <h3 className="mb-4 text-lg font-semibold">Certifications & training</h3>
              <div className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
                {certifications.map(({ issuer, names }) => (
                  <div className="reveal" key={issuer}>
                    <p className="mono-text mb-2 text-xs text-primary">{issuer}</p>
                    <ul className="space-y-1.5 text-sm leading-6 text-muted-foreground">
                      {names.map((name) => <li key={name}>{name}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="experience" className="section-block">
        <div className="site-frame grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <div className="section-heading reveal">
            <p className="eyebrow">05 / Experience</p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight md:text-4xl">Building QUPID.</h2>
          </div>
          <article className="reveal border-l border-primary/45 pl-6">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <div>
                <h3 className="text-xl font-semibold">Full-Stack Developer</h3>
                <p className="mt-1 text-muted-foreground">QUPID Real-Time Chat Application · Personal Project</p>
              </div>
              <span className="mono-text text-xs text-muted-foreground">JAN 2025 — PRESENT</span>
            </div>
            <ul className="mt-6 space-y-3 text-sm leading-7 text-muted-foreground">
              <li>Developed a real-time messaging platform with React.js, Node.js, Express.js, and MongoDB.</li>
              <li>Implemented JWT-based authentication and role-based authorization across the API.</li>
              <li>Designed 10+ RESTful endpoints for user management, messaging, and session control.</li>
              <li>Built a responsive user interface using HTML5, CSS3, and JavaScript.</li>
            </ul>
          </article>
        </div>
      </section>

      <section id="contact" className="section-block border-t border-border bg-card/35">
        <div className="site-frame">
          <div className="section-heading reveal">
            <p className="eyebrow">06 / Contact</p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight md:text-4xl">Let’s connect.</h2>
            <p className="mt-4 leading-7 text-muted-foreground">Open to internship and entry-level opportunities in software, data, AI/ML, analytics, and testing.</p>
          </div>
          <div className="mt-9 grid items-start gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="reveal space-y-5">
              <a className="contact-panel flex items-center gap-4 p-5 transition-colors hover:border-primary/50" href={`mailto:${CONTACT_EMAIL}`}>
                <span className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary"><Mail size={20} /></span>
                <span><span className="block text-sm text-muted-foreground">Email</span><span className="mt-1 block font-medium">{CONTACT_EMAIL}</span></span>
                <ArrowUpRight className="ml-auto size-4 text-muted-foreground" />
              </a>
              <div className="flex flex-wrap gap-3">
                <Button asChild variant="outline">
                  <a href="https://www.linkedin.com/in/balaji-s-9aab9428b" target="_blank" rel="noreferrer"><Linkedin /> LinkedIn <ArrowUpRight /></a>
                </Button>
                <Button asChild variant="outline">
                  <a href="https://github.com/sbalaji1005-cyber" target="_blank" rel="noreferrer"><Github /> GitHub <ArrowUpRight /></a>
                </Button>
              </div>
              <p className="text-sm leading-6 text-muted-foreground">Based in Tamil Nadu, India · Languages: English, Tamil</p>
            </div>
            <form className="contact-panel reveal space-y-4 p-5 sm:p-6" onSubmit={handleContactSubmit}>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-medium" htmlFor="contact-name">
                  Your name
                  <input className="form-field h-11 px-3 font-normal" id="contact-name" name="name" autoComplete="name" required />
                </label>
                <label className="grid gap-2 text-sm font-medium" htmlFor="contact-email">
                  Your email
                  <input className="form-field h-11 px-3 font-normal" id="contact-email" name="email" type="email" autoComplete="email" required />
                </label>
              </div>
              <label className="grid gap-2 text-sm font-medium" htmlFor="contact-message">
                Message
                <textarea className="form-field min-h-32 resize-y p-3 font-normal" id="contact-message" name="message" required />
              </label>
              <div className="flex flex-wrap items-center gap-4">
                <Button type="submit" className="h-11 px-5"><Send /> Prepare email</Button>
                <p className="text-xs leading-5 text-muted-foreground" aria-live="polite">
                  {submitted ? "Your email app should open with the message ready to send." : "Your email app opens with your message ready. Nothing is sent from this website."}
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-6">
        <div className="site-frame flex flex-col justify-between gap-2 text-xs text-muted-foreground sm:flex-row">
          <span>© {new Date().getFullYear()} Balaji S</span>
          <a className="inline-flex items-center gap-1 transition-colors hover:text-foreground" href="#home">Back to top <ArrowUpRight size={13} /></a>
        </div>
      </footer>
    </main>
  );
}
