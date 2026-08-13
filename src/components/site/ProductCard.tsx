import { MessageCircle, Plus } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext";
import { BUSINESS, formatNaira, waLink, type Product } from "@/data/products";

export function ProductCard({
  product,
  onView,
}: {
  product: Product;
  onView: (product: Product) => void;
}) {
  const { add, setCartOpen } = useCart();

  const orderMessage = `Hello ${BUSINESS.name}!%0A%0AI would like to order:%0A*${product.name}*`;

  return (
    <article className="card-luxe group flex flex-col overflow-hidden">
      <button
        type="button"
        onClick={() => onView(product)}
        className="relative block aspect-square overflow-hidden bg-secondary"
        aria-label={`View details for ${product.name}`}
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={800}
          height={800}
          className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
        />
        <span className="absolute top-3 left-3 rounded-full bg-background/85 px-3 py-1 text-[0.6rem] tracking-[0.18em] uppercase backdrop-blur">
          {product.category}
        </span>
      </button>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="min-w-0 font-display text-xl leading-tight">{product.name}</h3>
          <p className="shrink-0 font-display text-lg text-primary">
            {formatNaira(product.price)}
          </p>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{product.short}</p>

        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          {product.colours.map((c) => (
            <span
              key={c}
              className="rounded-full border border-border bg-secondary px-2.5 py-1 text-[0.68rem] text-secondary-foreground"
            >
              {c}
            </span>
          ))}
        </div>

        <div className="mt-5 flex flex-col gap-2">
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => onView(product)}
              className="rounded-full border border-primary/25 py-3 text-xs font-medium tracking-[0.12em] uppercase transition-colors hover:bg-accent"
            >
              View Details
            </button>
            <button
              type="button"
              onClick={() => {
                add(product, 1);
                setCartOpen(true);
              }}
              className="rounded-full bg-primary py-3 text-xs font-medium tracking-[0.12em] text-primary-foreground uppercase transition-opacity hover:opacity-90"
            >
              Order Now
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => {
                add(product, 1);
                toast.success(`${product.name} added to cart`);
              }}
              className="inline-flex items-center justify-center gap-1.5 rounded-full bg-gold py-3 text-xs font-medium tracking-[0.12em] text-gold-foreground uppercase transition-opacity hover:opacity-90"
            >
              <Plus className="h-3.5 w-3.5" /> Add to Cart
            </button>
            <a
              href={waLink(
                `Hello ${BUSINESS.name}!\n\nI would like to order:\n*${product.name}*\nPrice: ${formatNaira(product.price)}\nQuantity: 1\nColour: ${product.colours[0]}`,
              )}
              target="_blank"
              rel="noreferrer"
              data-order={orderMessage}
              className="inline-flex items-center justify-center gap-1.5 rounded-full border border-border py-3 text-xs font-medium tracking-[0.12em] uppercase transition-colors hover:bg-accent"
            >
              <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
