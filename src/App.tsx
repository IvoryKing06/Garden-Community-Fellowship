import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  Mail,
  Menu,
  Play,
  X,
} from "lucide-react";
import {
  church,
  gatherings,
  ministries,
  bibleStudies,
  outreach,
  announcements,
} from "./content";
import {
  PlanVisit,
  GetInvolved,
  Sermons,
  ConnectionLinks,
  OfficialBanner,
} from "./PhaseOnePages";
import { pageInfo } from "./pages";
import "./App.css";
const currentYear = new Date().getFullYear();
const links = Object.entries(pageInfo).map(([path, page]) => [
  path,
  page.title,
]);
function Brand() {
  return (
    <Link
      className="brand"
      to="/"
      aria-label="Garden Community Fellowship home"
    >
      <span>
        GARDEN<span>COMMUNITY FELLOWSHIP</span>
      </span>
    </Link>
  );
}
function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    const page =
      pageInfo[
        (location.pathname.replace(/\/$/, "") || "/").replace(
          /^\/contact$/,
          "/connect",
        )
      ];
    document.title = `${page?.title ?? "Page not found"} | ${church.name}`;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", page?.description ?? "Page not found.");
    document
      .querySelector('meta[property="og:title"]')
      ?.setAttribute("content", document.title);
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute("content", page?.description ?? "Page not found.");
  }, [location]);
  return (
    <>
      <div className="announcement">
        Rooted in faith. Growing in community.
        <Link to="/watch">
          Join us online <ArrowUpRight size={13} />
        </Link>
      </div>
      <header
        onClick={(event) => {
          if ((event.target as HTMLElement).closest("a")) setOpen(false);
        }}
      >
        <div className="container header-inner">
          <Brand />
          <button
            className="menu-toggle"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            aria-controls="navigation"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
          <nav
            id="navigation"
            className={open ? "open" : ""}
            aria-label="Main navigation"
          >
            <NavLink to="/" end>
              Home
            </NavLink>
            <details className="nav-group" key={`about-${location.pathname}`}>
              <summary>
                About <ChevronDown size={13} />
              </summary>
              <div className="nav-dropdown">
                <NavLink to="/about">About Us</NavLink>
                <NavLink to="/plan-your-visit">Plan Your Visit</NavLink>
              </div>
            </details>
            <details
              className="nav-group"
              key={`community-${location.pathname}`}
            >
              <summary>
                Community <ChevronDown size={13} />
              </summary>
              <div className="nav-dropdown">
                <NavLink to="/events">Events &amp; Outreach</NavLink>
                <NavLink to="/ministries">
                  Ministries &amp; Bible Studies
                </NavLink>
                <NavLink to="/get-involved">Get Involved</NavLink>
              </div>
            </details>
            <NavLink to="/sermons">Sermons</NavLink>
            <NavLink to="/connect">Connect</NavLink>
          </nav>
        </div>
      </header>
    </>
  );
}
function Button({
  to,
  children,
  light = false,
}: {
  to: string;
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <Link className={`button ${light ? "light" : ""}`} to={to}>
      {children}
      <ArrowRight size={17} />
    </Link>
  );
}
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="eyebrow">
      <span />
      {children}
    </p>
  );
}
function SectionTitle({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="section-title">
      <div>
        <Eyebrow>{label}</Eyebrow>
        <h2>{title}</h2>
      </div>
      {children}
    </div>
  );
}
function MinistryCards() {
  return (
    <div className="ministry-grid">
      {ministries.map((m, i) => (
        <Link
          to={`/ministries#${m.id}`}
          className={`ministry-card ministry-${i}`}
          key={m.id}
        >
          <div className="ministry-art">
            <span>{m.symbol}</span>
          </div>
          <div className="card-body">
            <span className="eyebrow">{m.category}</span>
            <h3>{m.name}</h3>
            <span className="text-link">
              Find your place <ArrowUpRight size={17} />
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
function EventList() {
  return (
    <div className="event-list">
      {gatherings.map((g) => (
        <article className="event-row" key={g.id}>
          <div className="date-tile">
            <span>{g.date ? "DATE" : "WEEKLY"}</span>
            <strong>{g.date ?? g.day.replace("Every ", "")}</strong>
          </div>
          {g.image && (
            <img
              className="event-image"
              src={g.image.src}
              alt={g.image.alt}
              width={g.image.width}
              height={g.image.height}
              loading="lazy"
            />
          )}
          <div className="event-copy">
            <span className="eyebrow">{g.category}</span>
            <h3>{g.title}</h3>
            <p>{g.description}</p>
          </div>
          <span className="event-time">
            <Clock3 size={16} />
            {g.time}
          </span>
          <Link
            to="/connect"
            aria-label={`Ask about ${g.title}`}
            className="circle-link"
          >
            <ArrowUpRight size={20} />
          </Link>
        </article>
      ))}
    </div>
  );
}
function Home() {
  return (
    <>
      <OfficialBanner />
      <section className="hero container">
        <div className="hero-copy">
          <Eyebrow>Welcome to Garden Community Fellowship</Eyebrow>
          <h1>
            A place to put
            <br />
            down <em>roots.</em>
          </h1>
          <p>
            There’s room for you here. Discover a community where faith takes
            root and life is shared, one connection at a time.
          </p>
          <div className="actions">
            <Button to="/plan-your-visit">Plan your visit</Button>
            <Link className="play-link" to="/watch">
              <span>
                <Play size={15} fill="currentColor" />
              </span>
              Watch online
            </Link>
          </div>
          <div className="hero-note">
            <span>Come as you are. Grow with us.</span>
          </div>
        </div>
      </section>
      <section className="gather-strip">
        <div className="container gather-inner">
          <div>
            <span className="eyebrow">A little space in your week</span>
            <h2>Let’s gather together.</h2>
          </div>
          <div>
            <CalendarDays size={24} />
            <p>
              <strong>Monday evenings</strong>
              <span>Cafés from 6 PM · Celebrate Recovery at 7 PM</span>
            </p>
          </div>
          <Link to="/events" className="text-link">
            Explore gatherings <ArrowRight size={18} />
          </Link>
        </div>
      </section>
      <section className="section container intro">
        <div>
          <Eyebrow>A community to call home</Eyebrow>
          <h2>
            Life is better <br />
            when we grow together.
          </h2>
          <p>
            Welcome to Garden Community Fellowship. Whether you’re taking a
            first step or looking for a place to reconnect, we’d love to get to
            know you.
          </p>
          <Link className="text-link" to="/about">
            Our community <ArrowRight size={18} />
          </Link>
        </div>
      </section>
      <section className="section soft">
        <div className="container">
          <SectionTitle
            label="Find your community"
            title="A place for every season."
          >
            <Link className="text-link" to="/ministries">
              Explore ministries <ArrowRight size={18} />
            </Link>
          </SectionTitle>
          <MinistryCards />
        </div>
      </section>
      <section className="section container">
        <SectionTitle label="Life at Garden" title="Make room for connection.">
          <Link className="text-link" to="/events">
            All gatherings <ArrowRight size={18} />
          </Link>
        </SectionTitle>
        <EventList />
        <p className="fine-print">
          Planning a visit? Contact us for gathering locations and service
          information.
        </p>
      </section>
      {announcements.length > 0 && (
        <section className="section container">
          <h2>Announcements</h2>
          {announcements.map((a) => (
            <article className="info-card" key={a.id}>
              <h3>{a.title}</h3>
              <p>{a.body}</p>
            </article>
          ))}
        </section>
      )}
      <WatchBanner />
    </>
  );
}
function PageHead({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="page-head container">
      <Eyebrow>{label}</Eyebrow>
      <h1>{title}</h1>
      <p>{children}</p>
    </section>
  );
}
function About() {
  return (
    <>
      <PageHead label="Rooted in community" title="Welcome to the Garden.">
        We’re glad you’re here. Get to know Garden Community Fellowship and find
        your next step toward connection.
      </PageHead>
      <section className="container about-layout">
        <div>
          <Eyebrow>About us</Eyebrow>
          <h2>
            A place to belong.
            <br />
            Room to grow.
          </h2>
          <p>
            Garden Community Fellowship is a church community. We invite you to
            explore our ministries, connect at a Monday gathering, or join us
            online.
          </p>
          <Button to="/connect">Start a conversation</Button>
        </div>
      </section>
      <section className="section container info-grid">
        {[
          [
            "Our mission",
            "Our church-approved mission statement will be shared here.",
          ],
          [
            "Our beliefs",
            "Our church-approved statement of beliefs will be shared here.",
          ],
          [
            "Our leadership",
            "Meet our leadership team here soon. Names, photographs, and introductions are awaiting approval.",
          ],
        ].map(([title, text]) => (
          <article className="info-card" key={title}>
            <h3>{title}</h3>
            <p>{text}</p>
            <span className="status">Details coming soon</span>
          </article>
        ))}
      </section>
    </>
  );
}
function Ministries() {
  useEffect(() => {
    if (location.hash)
      document.getElementById(location.hash.slice(1))?.scrollIntoView();
  }, []);
  return (
    <>
      <PageHead
        label="Ministries & Bible Studies"
        title="Grow in good company."
      >
        Explore places to connect, share life, and take your next step at
        Garden.
      </PageHead>
      <section className="container ministry-details">
        {ministries.map((m) => (
          <article id={m.id} className="ministry-detail" key={m.id}>
            <span className="number">{m.symbol}</span>
            <div>
              <Eyebrow>{m.category}</Eyebrow>
              <h2>{m.name}</h2>
              <p>{m.description}</p>
              {m.schedule && <p>{m.schedule}</p>}
              {m.image && (
                <img
                  className="content-image"
                  src={m.image.src}
                  alt={m.image.alt}
                  width={m.image.width}
                  height={m.image.height}
                  loading="lazy"
                />
              )}
              <details>
                <summary>
                  More information <ChevronDown size={18} />
                </summary>
                <p>
                  {m.id === "recovery"
                    ? "Celebrate Recovery meets Mondays at 7 PM. Connect Café is at 6 PM and Cross Talk Café is at 6:15 PM."
                    : "Schedules, age groups, and ministry leader information are awaiting confirmation."}{" "}
                  Email us for current information and location details.
                </p>
                <Link className="text-link" to="/connect">
                  Ask about this ministry <ArrowRight size={16} />
                </Link>
              </details>
            </div>
          </article>
        ))}
      </section>
      <section className="container section">
        <h2>Bible Studies</h2>
        {bibleStudies.length ? (
          bibleStudies.map((b) => (
            <article key={b.id}>
              <h3>{b.title}</h3>
              <p>{b.description}</p>
              <p>{b.schedule ?? "Schedule pending confirmation."}</p>
            </article>
          ))
        ) : (
          <p>
            Bible study topics, leaders, and schedules are pending confirmation.{" "}
            <Link className="text-link" to="/connect">
              Contact the church for current information.
            </Link>
          </p>
        )}
      </section>
      <WatchBanner />
    </>
  );
}
function Events() {
  return (
    <>
      <PageHead label="Events & Outreach" title="Good things happen together.">
        Make space for community. Here’s what’s coming up each week at Garden
        Community Fellowship.
      </PageHead>
      <section className="container section events-page">
        <div className="notice">
          <CalendarDays size={22} />
          <p>
            These gatherings recur every Monday. Contact us to confirm holiday
            schedules and locations.
          </p>
        </div>
        <EventList />
        <section className="section">
          <h2>Outreach</h2>
          {outreach.length ? (
            outreach.map((o) => (
              <article key={o.id}>
                <h3>{o.title}</h3>
                <p>{o.description}</p>
              </article>
            ))
          ) : (
            <p>
              Outreach opportunities and dates are pending confirmation.{" "}
              <Link className="text-link" to="/get-involved">
                Explore ways to get involved.
              </Link>
            </p>
          )}
        </section>
        <div className="info-card upcoming">
          <h3>More to look forward to.</h3>
          <p>
            Dated special events and event photographs will appear here once
            confirmed. Stay connected for updates.
          </p>
          <Button to="/connect">Get in touch</Button>
        </div>
      </section>
    </>
  );
}
function WatchBanner() {
  return (
    <section className="watch-banner">
      <div className="container">
        <div>
          <Eyebrow>Wherever you are</Eyebrow>
          <h2>A little closer, even from afar.</h2>
          <p>Connect with Garden Community Fellowship online.</p>
        </div>
        <Button to="/watch" light>
          Watch with us
        </Button>
      </div>
    </section>
  );
}
function Watch() {
  return (
    <>
      <PageHead label="Garden online" title="A connection, wherever you are.">
        Find our livestreams and videos on YouTube and Twitch. Follow our
        channels for broadcast updates.
      </PageHead>
      <section className="container watch-grid">
        {[
          [
            "YouTube",
            church.youtube,
            "Explore videos and livestreams on our YouTube channel.",
          ],
          ["Twitch", church.twitch, "Connect with Rooted GCF on Twitch."],
        ].map(([name, url, text]) => (
          <article className="stream-card" key={name}>
            <div className="stream-art">
              <Play size={42} strokeWidth={1} />
            </div>
            <h2>{name}</h2>
            <p>{text}</p>
            <a
              className="button"
              href={url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open {name}
              <ArrowUpRight size={17} />
              <span className="sr-only"> (opens in new tab)</span>
            </a>
          </article>
        ))}
      </section>
      <p className="container fine-print watch-note">
        Broadcast times are awaiting confirmation. Channel links do not indicate
        that a stream is currently live.
      </p>
    </>
  );
}
function Contact() {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(church.email);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }
  return (
    <>
      <PageHead label="Connect" title="Let’s start a conversation.">
        Have a question or planning your first visit? We’d love to hear from
        you.
      </PageHead>
      <section className="container contact-layout">
        <article className="contact-card">
          <Mail size={32} strokeWidth={1} />
          <Eyebrow>Say hello</Eyebrow>
          <h2>We’re just an email away.</h2>
          <a className="email" href={`mailto:${church.email}`}>
            {church.email}
            <ArrowUpRight size={20} />
          </a>
          <div className="actions">
            <a className="button" href={`mailto:${church.email}`}>
              Write to us <ArrowRight size={17} />
            </a>
            <button className="copy-button" onClick={copy}>
              {copied && <Check size={16} />}
              <span aria-live="polite">
                {copied ? "Email copied" : "Copy email"}
              </span>
            </button>
          </div>
          <p>
            For service times, gathering locations, accessibility needs, or
            ministry questions, please contact the church directly.
          </p>
        </article>
        <div className="contact-side">
          <h3>Find us online</h3>
          <ConnectionLinks />
          <div className="visit-note">
            <h3>Planning a visit?</h3>
            <p>
              We’ll be happy to help you find current service information and
              directions.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
function Footer() {
  return (
    <footer>
      <div className="container footer-main">
        <div>
          <Brand />
          <p>Rooted in faith. Growing in community.</p>
        </div>
        <div>
          <span className="eyebrow">Explore</span>
          <div className="footer-links">
            {links.slice(1).map(([to, label]) => (
              <Link to={to} key={to}>
                {label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <span className="eyebrow">Stay connected</span>
          <a href={`mailto:${church.email}`}>{church.email}</a>
          <div className="social-links">
            <a href={church.youtube}>
              YouTube <ArrowUpRight size={13} />
            </a>
            <a href={church.twitch}>
              Twitch <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {currentYear} Garden Community Fellowship</span>
        <span>Rooted together. Growing together.</span>
      </div>
    </footer>
  );
}
export function Site() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/ministries" element={<Ministries />} />
          <Route path="/events" element={<Events />} />
          <Route path="/watch" element={<Watch />} />
          <Route path="/connect" element={<Contact />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/plan-your-visit" element={<PlanVisit />} />
          <Route path="/get-involved" element={<GetInvolved />} />
          <Route path="/sermons" element={<Sermons />} />
          <Route
            path="*"
            element={
              <section className="page-head container">
                <h1>Page not found.</h1>
                <Button to="/">Back to the Garden</Button>
              </section>
            }
          />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Site />
    </BrowserRouter>
  );
}
