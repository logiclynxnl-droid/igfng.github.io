import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { RegistrationForm } from "@/components/RegistrationForm";
import {
  impactStats,
  pastEvents,
  partners,
  upcomingEvent,
} from "@/data/content";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Reveal } from "@/components/Reveal";

const heroImg = "/assets/images/students-696x759.webp";
const logoUrl = "https://cdn.builder.io/api/v1/image/assets%2F2f4ddb44415d4627a98c758ea56ce800%2Fd1c36fd4076d4a6eb870f5e8f231e918?format=webp&width=800";

export default function Index() {
  const location = useLocation();
  useEffect(() => {
    if (!location.hash) return;
    try {
      const id = location.hash.replace(/^#/, "").split("?")[0];
      if (!id) return;
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch {
      // ignore invalid hash
    }
  }, [location.hash]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero */}
      <section className="relative">
        <div className="absolute inset-0 -z-10">
          <img
            src={heroImg}
            alt="Students"
            className="h-full w-full object-cover opacity-20"
            onError={(e) => (e.currentTarget.src = "/placeholder.svg")}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background/60 to-background" />
        </div>
        <div className="container py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img
                src={logoUrl}
                alt="Igiehon Foundation"
                className="h-10 w-10 rounded"
                onError={(e) => (e.currentTarget.src = "/placeholder.svg")}
              />
              <span className="text-sm uppercase tracking-widest text-primary font-semibold">
                Igiehon Foundation
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
              Empowering Minds. Inspiring Excellence.
            </h1>
            <p className="mt-5 text-lg text-muted-foreground max-w-2xl">
              The Igiehon Mathematics Tournament is a high-impact competition
              for senior secondary schools in Edo State, celebrating intellect
              and creativity.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="brand-gradient text-primary-foreground"
              >
                <Link to="/register">Register Now</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="#impact">Our Impact</a>
              </Button>
            </div>
            <div className="mt-8 rounded-lg border p-4 bg-card/60">
              <p className="text-sm text-muted-foreground">Upcoming Event</p>
              <p className="mt-1 font-semibold">{upcomingEvent.title}</p>
              <p className="mt-1">
                {upcomingEvent.date} · {upcomingEvent.venue}
              </p>
              <p className="text-sm mt-1">
                Registration Window: {upcomingEvent.registrationWindow}
              </p>
            </div>
          </div>
          <div className="md:justify-self-end">
            <Reveal>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl ring-1 ring-border">
                <img
                  src={heroImg}
                  alt="Igiehon Tournament"
                  className="w-full h-full object-cover"
                  onError={(e) => (e.currentTarget.src = "/placeholder.svg")}
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Impact */}
      <section id="impact" className="container py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          Impact
        </h2>
        <p className="text-muted-foreground mt-2 max-w-2xl">
          Backed by the Igiehon Foundation for Academic Excellence, IMT brings
          together schools across Edo State for a world-class challenge.
        </p>
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          {impactStats.map((s) => (
            <Reveal key={s.label}>
              <div className="rounded-xl border bg-card p-6 text-center">
                <div className="text-3xl md:text-4xl font-extrabold text-primary">
                  {s.value.toLocaleString()}
                  {(s as any).plus ? "+" : ""}
                </div>
                <div className="mt-1 text-sm uppercase tracking-wide text-muted-foreground">
                  {s.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Registration */}
      <section id="register" className="relative border-y">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
        <div className="absolute inset-0 -z-10 opacity-40 [background-image:radial-gradient(hsl(var(--brand-gold))/0.15_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="container py-16 md:py-24 grid md:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Register for IMT 2025
            </h2>
            <p className="text-muted-foreground mt-2">
              Event: {upcomingEvent.date} • Venue: {upcomingEvent.venue}
            </p>
            <ul className="mt-4 text-sm list-disc pl-5 space-y-1 text-muted-foreground">
              <li>Free registration</li>
              <li>Open to senior secondary schools in Edo State</li>
              <li>Registration Window: {upcomingEvent.registrationWindow}</li>
            </ul>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button asChild variant="secondary">
                <a href="#volunteer">Volunteer</a>
              </Button>
              <Button asChild variant="outline">
                <a href="#partners">Become a Partner</a>
              </Button>
            </div>
            <div className="mt-6 rounded-xl border bg-card p-5">
              <h3 className="font-semibold">Eligibility Criteria</h3>
              <ul className="mt-2 list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                <li>Open to all Senior Secondary Schools in Edo State</li>
                <li>
                  All participants must be current Senior Secondary Students
                </li>
                <li>
                  Teams consist of two (2) students from any class or department
                </li>
                <li>Teams must identify a teacher coach at registration</li>
                <li>
                  Competition includes written test (Initial Round) and oral
                  segment (Finals)
                </li>
              </ul>
            </div>
          </div>
          <div className="rounded-2xl border bg-card/90 backdrop-blur p-6 shadow-lg ring-1 ring-border">
            <RegistrationForm interest="event" />
          </div>
        </div>
      </section>

      {/* Past Events */}
      <section className="container py-16 md:py-24">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Past Events
            </h2>
            <p className="text-muted-foreground mt-2">
              Highlights from previous tournaments.
            </p>
          </div>
          <Button asChild variant="ghost">
            <Link to="/events">View all</Link>
          </Button>
        </div>
        <div className="mt-8 grid gap-6 grid-cols-1 md:grid-cols-3">
          {pastEvents.map((e) => (
            <Reveal key={e.title}>
              <div className="group overflow-hidden rounded-2xl border bg-card">
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={e.image}
                    alt={e.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={(ev) => (ev.currentTarget.src = "/placeholder.svg")}
                  />
                </div>
                <div className="p-4">
                  <div className="text-sm text-muted-foreground">{e.date}</div>
                  <div className="font-semibold">{e.title}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Executive Leadership moved to About page */}

      {/* Partners */}
      <section id="partners" className="container py-16 md:py-24">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Strategy Partners
            </h2>
            <p className="text-muted-foreground mt-2">
              We invite organizations to partner in empowering students.
            </p>
          </div>
          <Button asChild variant="ghost">
            <Link to="/partners">Partner with us</Link>
          </Button>
        </div>
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
          {partners.map((p) => (
            <Reveal key={p.name}>
              <a
                href={(p as any).url || undefined}
                target={p && (p as any).url ? "_blank" : undefined}
                rel={p && (p as any).url ? "noreferrer" : undefined}
                className="rounded-lg border bg-card p-6 md:p-8 flex items-center justify-center hover:shadow-md transition-shadow"
              >
                <img
                  src={p.logo}
                  alt={p.name}
                  className="max-h-20 md:max-h-28 object-contain"
                />
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Volunteer CTA */}
      <section
        id="volunteer"
        className="border-t bg-primary text-primary-foreground"
      >
        <div className="container py-14 flex flex-col md:flex-row items-center gap-6 justify-between">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold">
              Volunteer Intake • 2025
            </h3>
            <p className="text-primary-foreground/90 mt-1">
              Join our team to deliver an exceptional experience for students.
            </p>
          </div>
          <Button asChild size="lg" variant="secondary">
            <Link to="/register?interest=volunteer">Apply to Volunteer</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
