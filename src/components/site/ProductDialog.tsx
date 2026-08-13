import { useEffect, useState } from "react";
import { MessageCircle, Minus, Plus } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useCart } from "@/context/CartContext";
import { BUSINESS, formatNaira, waLink, type Product } from "@/data/products";

export function ProductDialog({
  product,
  onClose,
}: {
  product: Product | null;
  onClose: () => void;
}) {
  const { add, setCartOpen } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [colour, setColour] = useState("");

  useEffect(() => {
    if (product) {
      setQuantity(1);
      setColour(product.colours[0] ?? "");
    }
  }, [product]);

  if (!product) return null;
  const total = product.price * quantity;

  const message = `Hello ${BUSINESS.name}!\n\nI would like to order:\n*${product.name}*\nPrice: ${formatNaira(product.price)}\nQuantity: ${quantity}\nColour: ${colour}\nTotal: ${formatNaira(total)}\n\nPlease confirm availability and delivery.`;

  return (
    <Dialog open={!!product} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-h-[92vh] gap-0 overflow-y-auto rounded-3xl border-border bg-card p-0 sm:max-w-3xl">
        <div className="grid sm:grid-cols-2">
          <div className="aspect-square overflow-hidden bg-secondary">
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              width={800}
              height={800}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="p-5 sm:p-7">
            <p className="eyebrow">{product.category}</p>
            <DialogTitle className="mt-2 font-display text-3xl leading-tight">
              {product.name}
            </DialogTitle>
            <p className="mt-2 font-display text-2xl text-primary">
              {formatNaira(product.price)}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {product.description}
            </p>

            <div className="mt-5">
              <p className="eyebrow">Available Colours</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.colours.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setColour(c)}
                    className={`rounded-full border px-3.5 py-2 text-xs transition-colors ${
                      colour === c
                        ? "border-gold bg-accent text-accent-foreground"
                        : "border-border hover:bg-secondary"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between gap-4 rounded-2xl border border-border bg-background px-4 py-3">
              <span className="text-xs tracking-[0.16em] text-muted-foreground uppercase">
                Quantity
              </span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="grid h-10 w-10 place-items-center rounded-full border border-border hover:bg-secondary"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-6 text-center font-display text-lg">{quantity}</span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="grid h-10 w-10 place-items-center rounded-full border border-border hover:bg-secondary"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <p className="mt-4 flex items-center justify-between font-display text-xl">
              <span>Total</span>
              <span className="text-primary">{formatNaira(total)}</span>
            </p>

            <div className="mt-5 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  add(product, quantity, colour);
                  toast.success(`${product.name} added to cart`);
                  onClose();
                }}
                className="rounded-full bg-gold py-4 text-xs font-medium tracking-[0.16em] text-gold-foreground uppercase"
              >
                Add to Cart
              </button>
              <button
                type="button"
                onClick={() => {
                  add(product, quantity, colour);
                  onClose();
                  setCartOpen(true);
                }}
                className="rounded-full bg-primary py-4 text-xs font-medium tracking-[0.16em] text-primary-foreground uppercase"
              >
                Order Now
              </button>
              <a
                href={waLink(message)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/25 py-4 text-xs font-medium tracking-[0.16em] uppercase hover:bg-accent"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp Order
              </a>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
