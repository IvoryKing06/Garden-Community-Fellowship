import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import {
  branding,
  church,
  connections,
  sermons,
  visit,
  volunteerOpportunities,
} from "./content";
import { youtubeRecordingUrl } from "./content-model";
function Heading({
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
      <p className="eyebrow">{label}</p>
      <h1>{title}</h1>
      <p>{children}</p>
    </section>
  );
}
export function OfficialBanner() {
  return (
    <section className="container official-banner" aria-label="Church branding">
      {branding.banner ? (
        <img
          src={branding.banner.src}
          alt={branding.banner.alt}
          width={branding.banner.width}
          height={branding.banner.height}
          fetchPriority="high"
        />
      ) : (
        <div className="banner-pending">
          <span className="eyebrow">Garden Community Fellowship</span>
          <p>Official oak-tree banner awaiting file import.</p>
        </div>
      )}
    </section>
  );
}
export function PlanVisit() {
  return (
    <>
      <Heading label="Plan Your Visit" title="We look forward to meeting you.">
        Join us in Lake Isabella for Sunday worship and fellowship. We’re happy
        to answer your questions as you plan your first visit.
      </Heading>
      <section className="container info-grid section">
        <article className="info-card">
          <h2>When we gather</h2>
          <p>
            {visit.sundayServiceTime ??
              "Sunday service times are pending confirmation."}
          </p>
          <Link className="text-link" to="/events">
            See the full church schedule <ArrowRight size={16} />
          </Link>
        </article>
        <article className="info-card">
          <h2>Finding us</h2>
          <p>
            {visit.address ??
              "Church address and directions are pending confirmation."}
          </p>
          <a className="text-link" href={`mailto:${church.email}`}>
            Request directions <ArrowRight size={16} />
          </a>
        </article>
        <article className="info-card">
          <h2>Contact &amp; mailing</h2>
          <p><a href={`tel:${church.phone}`}>{church.phone}</a></p>
          <p>Mailing address: {church.mailingAddress}</p>
          <h3>Your visit</h3>
          <p>
            {visit.accessibility ??
              "Accessibility, parking, and children’s check-in details are pending confirmation. Email us about your needs before visiting."}
          </p>
          <Link className="text-link" to="/connect">
            Connect with us <ArrowRight size={16} />
          </Link>
        </article>
      </section>
    </>
  );
}
export function GetInvolved() {
  return (
    <>
      <Heading label="Get Involved" title="There’s a place for you to help.">
        Interested in serving or learning more about our community? Start a
        conversation with the church.
      </Heading>
      <section className="container section info-grid">
        <article className="info-card">
          <h2>Volunteer</h2>
          {volunteerOpportunities.length ? (
            volunteerOpportunities.map((o) => (
              <div key={o.id}>
                <h3>{o.title}</h3>
                <p>{o.description}</p>
              </div>
            ))
          ) : (
            <p>Volunteer roles and schedules are pending confirmation.</p>
          )}
          <a
            className="button"
            href={`mailto:${church.email}?subject=Volunteer%20interest`}
          >
            Email your interest <ArrowRight size={16} />
          </a>
        </article>
        <article className="info-card">
          <h2>Ask a question</h2>
          <p>
            For general questions or ministry information, contact us directly.
          </p>
          <a
            className="button"
            href={`mailto:${church.email}?subject=Church%20contact%20request`}
          >
            Contact the church <ArrowRight size={16} />
          </a>
        </article>
        <article className="info-card">
          <h2>Online signups</h2>
          <p>
            Secure volunteer and contact forms are planned for a later phase.
            Online submissions are not available yet. The email links open your
            email app.
          </p>
          <span className="status">Coming in Phase 2</span>
        </article>
      </section>
    </>
  );
}
export function Sermons() {
  const recordings = sermons.filter((s) => youtubeRecordingUrl(s.youtubeUrl));
  return (
    <>
      <Heading label="Sermons" title="Listen. Reflect. Grow.">
        Explore recordings hosted on YouTube. All videos open on YouTube; no
        players are embedded here.
      </Heading>
      <section className="container section">
        {recordings.length ? (
          <div className="info-grid">
            {recordings.map((s) => (
              <article key={s.id} className="info-card">
                {s.image && (
                  <img
                    className="content-image"
                    src={s.image.src}
                    alt={s.image.alt}
                    width={s.image.width}
                    height={s.image.height}
                    loading="lazy"
                  />
                )}
                <h2>{s.title}</h2>
                {s.recordedOn && (
                  <p>
                    <time dateTime={s.recordedOn}>{s.recordedOn}</time>
                  </p>
                )}
                <a
                  className="button"
                  href={youtubeRecordingUrl(s.youtubeUrl)!}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Watch recording <ArrowUpRight size={16} />
                  <span className="sr-only"> (opens in new tab)</span>
                </a>
              </article>
            ))}
          </div>
        ) : (
          <div className="info-card">
            <h2>Sermon recordings</h2>
            <p>
              Individual recording links, titles, and dates are pending
              verification. In the meantime, visit the church’s official YouTube
              channel.
            </p>
            <a
              className="button"
              href={church.youtube}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit YouTube <ArrowUpRight size={16} />
              <span className="sr-only"> (opens in new tab)</span>
            </a>
          </div>
        )}
        <p className="fine-print">
          Looking for a livestream?{" "}
          <Link className="text-link" to="/watch">
            Find our live channels <ArrowRight size={16} />
          </Link>
        </p>
      </section>
    </>
  );
}
export function ConnectionLinks() {
  return (
    <ul className="connection-list">
      {connections.map((c) => (
        <li key={c.id}>
          {c.status === "verified" && c.url ? (
            <a
              href={c.url}
              {...(c.url.startsWith("https:")
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              {c.name} <ArrowUpRight size={16} />
              {c.url.startsWith("https:") && (
                <span className="sr-only"> (opens in new tab)</span>
              )}
            </a>
          ) : (
            <div>
              <span>{c.name}</span>
              <span className="status">
                {c.id === "spotify"
                  ? "Future podcast · pending"
                  : "Link pending"}
              </span>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
