import { useState } from "react";
import { CheckCircle2, MessageCircle } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useCart } from "@/context/CartContext";
import { BUSINESS, formatNaira, waLink } from "@/data/products";

const STATES = [
  "Abia","Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa","Benue","Borno","Cross River","Delta","Ebonyi","Edo","Ekiti","Enugu","FCT - Abuja","Gombe","Imo","Jigawa","Kaduna","Kano","Katsina","Kebbi","Kogi","Kwara","Lagos","Nasarawa","Niger","Ogun","Ondo","Osun","Oyo","Plateau","Rivers","Sokoto","Taraba","Yobe","Zamfara",
];

const emptyForm = {
  name: "",
  phone: "",
  email: "",
  address: "",
  state: "",
  colour: "",
  quantity: "1",
  message: "",
};

const fieldClass =
  "w-full rounded-2xl border border-border bg-card px-4 py-3.5 text-base outline-none transition-colors placeholder:text-muted-foreground focus:border-gold";

export function CheckoutDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { detailed, subtotal, clear } = useCart();
  const [form, setForm] = useState(emptyForm);
  const [submitted, setSubmitted] = useState(false);
  const [order, setOrder] = useState<{ message: string } | null>(null);

  const set = (key: keyof typeof form) => (value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const buildMessage = () =>
    [
      `*New Order — ${BUSINESS.name}*`,
      "",
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Email: ${form.email}`,
      `Delivery Address: ${form.address}`,
      `State: ${form.state}`,
      `Preferred Colour: ${form.colour || "As shown"}`,
      `Quantity (preferred): ${form.quantity}`,
      "",
      "*Items:*",
      ...detailed.map(
        (d) =>
          `• ${d.product.name} — ${d.item.colour} × ${d.item.quantity} = ${formatNaira(d.lineTotal)}`,
      ),
      "",
      `*Total: ${formatNaira(subtotal)}*`,
      "",
      `Message: ${form.message || "—"}`,
    ].join("\n");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = buildMessage();
    setOrder({ message });
    setSubmitted(true);
    clear();
  };

  const close = (next: boolean) => {
    onOpenChange(next);
    if (!next) {
      setSubmitted(false);
      setOrder(null);
      setForm(emptyForm);
    }
  };

  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogContent className="max-h-[92vh] overflow-y-auto rounded-3xl border-border bg-background p-5 sm:max-w-2xl sm:p-8">
        {submitted ? (
          <div className="py-6 text-center">
            <CheckCircle2 className="mx-auto h-12 w-12 text-gold" />
            <DialogTitle className="mt-4 font-display text-3xl leading-tight">
              Order Received
            </DialogTitle>
            <p className="mx-auto mt-3 max-w-md text-muted-foreground">
              Thank you for shopping with {BUSINESS.name}! Your order has been received.
              We&apos;ll contact you shortly to confirm your order and delivery details.
            </p>
            <div className="mt-7 flex flex-col gap-2 sm:mx-auto sm:max-w-sm">
              <a
                href={waLink(order?.message ?? "")}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary py-4 text-xs font-medium tracking-[0.16em] text-primary-foreground uppercase"
              >
                <MessageCircle className="h-4 w-4" /> Send Order on WhatsApp
              </a>
              <button
                type="button"
                onClick={() => close(false)}
                className="rounded-full border border-border py-4 text-xs tracking-[0.16em] uppercase hover:bg-accent"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        ) : (
          <>
            <p className="eyebrow">Checkout</p>
            <DialogTitle className="mt-2 font-display text-3xl leading-tight">
              Complete Your Order
            </DialogTitle>

            <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3">
              <input
                required
                value={form.name}
                onChange={(e) => set("name")(e.target.value)}
                placeholder="Full name"
                aria-label="Full name"
                className={fieldClass}
              />
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  required
                  type="tel"
                  inputMode="tel"
                  value={form.phone}
                  onChange={(e) => set("phone")(e.target.value)}
                  placeholder="Phone number"
                  aria-label="Phone number"
                  className={fieldClass}
                />
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => set("email")(e.target.value)}
                  placeholder="Email address"
                  aria-label="Email address"
                  className={fieldClass}
                />
              </div>
              <input
                required
                value={form.address}
                onChange={(e) => set("address")(e.target.value)}
                placeholder="Delivery address"
                aria-label="Delivery address"
                className={fieldClass}
              />
              <div className="grid gap-3 sm:grid-cols-3">
                <select
                  required
                  value={form.state}
                  onChange={(e) => set("state")(e.target.value)}
                  aria-label="State"
                  className={fieldClass}
                >
                  <option value="">Select state</option>
                  {STATES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <input
                  value={form.colour}
                  onChange={(e) => set("colour")(e.target.value)}
                  placeholder="Preferred colour"
                  aria-label="Preferred bag colour"
                  className={fieldClass}
                />
                <input
                  type="number"
                  min={1}
                  value={form.quantity}
                  onChange={(e) => set("quantity")(e.target.value)}
                  placeholder="Quantity"
                  aria-label="Quantity"
                  className={fieldClass}
                />
              </div>
              <textarea
                rows={3}
                value={form.message}
                onChange={(e) => set("message")(e.target.value)}
                placeholder="Additional message or enquiry"
                aria-label="Additional message"
                className={fieldClass}
              />

              <div className="mt-2 rounded-2xl border border-border bg-card p-4">
                <p className="eyebrow">Order Summary</p>
                <ul className="mt-3 flex flex-col gap-2">
                  {detailed.map(({ product, item, lineTotal }) => (
                    <li key={item.id} className="flex items-start justify-between gap-3 text-sm">
                      <span className="min-w-0">
                        {product.name}
                        <span className="block text-xs text-muted-foreground">
                          {item.colour} · {formatNaira(product.price)} × {item.quantity}
                        </span>
                      </span>
                      <span className="shrink-0">{formatNaira(lineTotal)}</span>
                    </li>
                  ))}
                  {detailed.length === 0 && (
                    <li className="text-sm text-muted-foreground">Your cart is empty.</li>
                  )}
                </ul>
                <div className="mt-3 flex items-center justify-between border-t border-border pt-3 font-display text-xl">
                  <span>Total</span>
                  <span className="text-primary">{formatNaira(subtotal)}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={detailed.length === 0}
                className="mt-2 rounded-full bg-primary py-4 text-xs font-medium tracking-[0.16em] text-primary-foreground uppercase disabled:opacity-50"
              >
                Place Order
              </button>
              <p className="text-center text-xs text-muted-foreground">
                Prefer WhatsApp? Place the order and send the summary with one tap.
              </p>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
