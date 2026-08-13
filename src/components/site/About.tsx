import { Gem, Sparkles, Truck, Wallet } from "lucide-react";
import { BUSINESS } from "@/data/products";

const REASONS = [
  {
    icon: Gem,
    title: "Quality & Style",
    text: "Beautiful bags selected with style and quality in mind.",
  },
  {
    icon: Wallet,
    title: "Affordable Prices",
    text: "Stylish options at accessible prices.",
  },
  {
    icon: Truck,
    title: "Nationwide Delivery",
    text: "We deliver to customers across Nigeria.",
  },
  {
    icon: Sparkles,
    title: "Easy Ordering",
    text: "Order easily through the website or WhatsApp.",
  },
];

export function About() {
  return (
    <section id="about" className="scroll-mt-24 border-t border-border bg-secondary/45 py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="eyebrow">About Us</p>
          <div className="gold-rule mt-4" />
          <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
            Bags made for confident women
          </h2>
          <p className="mt-5 leading-relaxed text-muted-foreground">
            Welcome to {BUSINESS.name}, your destination for stylish and affordable bags
            in Nigeria. We believe the right bag is more than an accessory — it is a
            reflection of confidence, personality and style. From everyday handbags to
            elegant statement pieces, we carefully select beautiful bags for different
            occasions and lifestyles.
          </p>
          <p className="mt-5 inline-flex flex-wrap items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-xs tracking-[0.16em] uppercase">
            Based in {BUSINESS.location} <span className="text-gold">|</span>{" "}
            {BUSINESS.delivery}
          </p>
        </div>

        <div className="mt-12">
          <h3 className="font-display text-2xl">Why Shop With Us</h3>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {REASONS.map(({ icon: Icon, title, text }) => (
              <div key={title} className="card-luxe p-5">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-accent">
                  <Icon className="h-5 w-5 text-accent-foreground" />
                </span>
                <h4 className="mt-4 font-display text-xl leading-tight">{title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
