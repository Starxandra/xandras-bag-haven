import { useState } from "react";
import { CheckCircle2, Loader2, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { BUSINESS, waLink } from "@/data/products";
import { submitEnquiry } from "@/lib/enquiries.functions";

const fieldClass =
  "w-full rounded-2xl border border-border bg-card px-4 py-3.5 text-base outline-none transition-colors placeholder:text-muted-foreground focus:border-gold";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);
  const [emailed, setEmailed] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const send = useServerFn(submitEnquiry);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;
    setError(null);

    const name = form.name.trim();
    const email = form.email.trim();
    const phone = form.phone.trim();
    const message = form.message.trim();

    if (name.length < 2) return setError("Please enter your full name.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return setError("Please enter a valid email address.");
    if (phone.replace(/\D/g, "").length < 7)
      return setError("Please enter a valid phone number.");
    if (message.length < 5) return setError("Please tell us a little more about your enquiry.");

    setSending(true);
    try {
      const result = await send({ data: { name, email, phone, message } });
      setEmailed(result.emailed);
      setSent(true);
    } catch (err) {
      console.error(err);
      setError(
        "Sorry, your enquiry could not be sent. Please try again or reach us on WhatsApp.",
      );
    } finally {
      setSending(false);
    }
  };


  return (
    <section id="contact" className="scroll-mt-24 border-t border-border py-16 lg:py-24">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-14">
        <div>
          <p className="eyebrow">Contact</p>
          <div className="gold-rule mt-4" />
          <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
            Let&apos;s find your next bag
          </h2>

          <div className="mt-7 rounded-3xl border border-border bg-card p-6 shadow-soft">
            <p className="font-display text-2xl">{BUSINESS.name}</p>
            <ul className="mt-4 flex flex-col gap-3.5 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span>{BUSINESS.location}</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <a href={`tel:${BUSINESS.phone}`} className="hover:underline">
                  {BUSINESS.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <a
                  href={waLink(`Hello ${BUSINESS.name}! I have an enquiry about your bags.`)}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline"
                >
                  WhatsApp: {BUSINESS.whatsappDisplay}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <a href={`mailto:${BUSINESS.email}`} className="break-all hover:underline">
                  {BUSINESS.email}
                </a>
              </li>
            </ul>
            <p className="mt-5 text-xs tracking-[0.16em] text-muted-foreground uppercase">
              Nationwide Delivery Available
            </p>
            <a
              href={waLink(`Hello ${BUSINESS.name}! I would like to chat about a bag.`)}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold py-4 text-xs font-medium tracking-[0.16em] text-gold-foreground uppercase"
            >
              <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
            </a>
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-secondary/50 p-6 sm:p-8">
          {sent ? (
            <div className="py-10 text-center">
              <CheckCircle2 className="mx-auto h-11 w-11 text-gold" />
              <p className="mt-4 font-display text-2xl">Enquiry received</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Thank you {form.name || "for reaching out"}! Your enquiry has been
                recorded{emailed ? " and sent to our inbox" : ""} and we will get back to
                you shortly.
              </p>
              {!emailed && (
                <p className="mt-3 text-xs text-muted-foreground">
                  For the fastest reply, you can also send us the same message on WhatsApp.
                </p>
              )}
              <button
                type="button"
                onClick={() => {
                  setSent(false);
                  setEmailed(false);
                  setForm({ name: "", email: "", phone: "", message: "" });
                }}
                className="mt-6 rounded-full border border-border bg-card px-6 py-3 text-xs tracking-[0.16em] uppercase"
              >
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">

              <h3 className="font-display text-2xl">Send an Enquiry</h3>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Name"
                aria-label="Name"
                className={fieldClass}
              />
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="Email"
                aria-label="Email"
                className={fieldClass}
              />
              <input
                required
                type="tel"
                inputMode="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="Phone number"
                aria-label="Phone number"
                className={fieldClass}
              />
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Your message"
                aria-label="Message"
                className={fieldClass}
              />
              <button
                type="submit"
                className="rounded-full bg-primary py-4 text-xs font-medium tracking-[0.16em] text-primary-foreground uppercase"
              >
                Submit
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
