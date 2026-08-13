import { BUSINESS, waLink } from "@/data/products";

export function Footer() {
  return (
    <footer className="border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-3">
        <div>
          <p className="font-display text-2xl">{BUSINESS.name}</p>
          <p className="mt-2 font-display text-lg italic text-primary-foreground/75">
            {BUSINESS.slogan}
          </p>
          <p className="mt-4 text-sm text-primary-foreground/70">
            {BUSINESS.location}
            <br />
            {BUSINESS.delivery}
          </p>
        </div>

        <div className="text-sm text-primary-foreground/80">
          <p className="text-[0.65rem] tracking-[0.28em] uppercase text-primary-foreground/60">
            Contact
          </p>
          <ul className="mt-3 flex flex-col gap-2">
            <li>
              Phone:{" "}
              <a href={`tel:${BUSINESS.phone}`} className="hover:underline">
                {BUSINESS.phone}
              </a>
            </li>
            <li>
              WhatsApp:{" "}
              <a
                href={waLink(`Hello ${BUSINESS.name}!`)}
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
              >
                {BUSINESS.whatsappDisplay}
              </a>
            </li>
            <li className="break-all">
              Email:{" "}
              <a href={`mailto:${BUSINESS.email}`} className="hover:underline">
                {BUSINESS.email}
              </a>
            </li>
          </ul>
        </div>

        <div className="text-sm text-primary-foreground/80">
          <p className="text-[0.65rem] tracking-[0.28em] uppercase text-primary-foreground/60">
            Explore
          </p>
          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
            <li>
              <a href="#home" className="hover:underline">Home</a>
            </li>
            <li>
              <a href="#shop" className="hover:underline">Shop</a>
            </li>
            <li>
              <a href="#about" className="hover:underline">About</a>
            </li>
            <li>
              <a href="#contact" className="hover:underline">Contact</a>
            </li>
            <li>
              <a
                href={waLink(`Hello ${BUSINESS.name}!`)}
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
              >
                WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/15 px-4 py-5 text-center text-xs text-primary-foreground/60 sm:px-6">
        © {new Date().getFullYear()} {BUSINESS.name}. All rights reserved.
      </div>
    </footer>
  );
}
