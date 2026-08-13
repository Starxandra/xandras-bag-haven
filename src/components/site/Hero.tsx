import { ArrowDown, MessageCircle } from "lucide-react";
import heroImage from "@/assets/hero.jpg";
import { BUSINESS, waLink } from "@/data/products";

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-24 pb-14 sm:pt-28 lg:pt-36 lg:pb-24">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-24 h-80 w-80 rounded-full bg-champagne blur-3xl opacity-70"
      />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-14">
        <div className="rise-in">
          <p className="eyebrow">{BUSINESS.location} · {BUSINESS.delivery}</p>
          <div className="gold-rule mt-4" />
          <h1 className="mt-5 font-display text-[2.6rem] leading-[1.05] sm:text-6xl lg:text-7xl">
            Carry Confidence.
            <span className="block italic text-primary/85">Carry Style.</span>
          </h1>
          <p className="mt-5 max-w-md text-[0.98rem] leading-relaxed text-muted-foreground sm:text-lg">
            Discover beautiful, stylish and affordable bags carefully selected to
            complement every outfit and every occasion.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#shop"
              className="inline-flex h-13 items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-medium tracking-[0.16em] text-primary-foreground uppercase transition-all duration-300 hover:shadow-luxe"
            >
              Shop Bags <ArrowDown className="h-4 w-4" />
            </a>
            <a
              href={waLink(
                `Hello ${BUSINESS.name}! I would like to order a bag. Please help me with more details.`,
              )}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/25 bg-card px-8 py-4 text-sm font-medium tracking-[0.16em] uppercase transition-all duration-300 hover:bg-accent"
            >
              <MessageCircle className="h-4 w-4" /> Order on WhatsApp
            </a>
          </div>
          <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-border pt-6">
            {[
              ["12+", "Styles"],
              ["36", "States"],
              ["100%", "Handpicked"],
            ].map(([value, label]) => (
              <div key={label}>
                <dt className="font-display text-2xl">{value}</dt>
                <dd className="text-[0.7rem] tracking-[0.16em] text-muted-foreground uppercase">
                  {label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative rise-in">
          <div className="overflow-hidden rounded-[2rem] border border-border shadow-luxe">
            <img
              src={heroImage}
              alt="Collection of elegant handbags in cream, beige and chocolate brown leather"
              width={1408}
              height={1008}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-5 left-4 rounded-2xl border border-border bg-card/95 px-5 py-3 shadow-soft backdrop-blur sm:left-6">
            <p className="font-display text-lg leading-tight">New Season Arrivals</p>
            <p className="text-[0.7rem] tracking-[0.16em] text-muted-foreground uppercase">
              Handpicked in Abuja
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
