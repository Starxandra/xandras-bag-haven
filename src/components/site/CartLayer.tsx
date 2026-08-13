import { useState } from "react";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCart } from "@/context/CartContext";
import { formatNaira } from "@/data/products";
import { CheckoutDialog } from "./CheckoutDialog";

export function CartLayer() {
  const { cartOpen, setCartOpen, detailed, subtotal, setQuantity, remove, count } = useCart();
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  return (
    <>
      <Sheet open={cartOpen} onOpenChange={setCartOpen}>
        <SheetContent className="flex w-full flex-col gap-0 border-border bg-background p-0 sm:max-w-md">
          <SheetHeader className="border-b border-border px-5 py-5">
            <SheetTitle className="font-display text-2xl">
              Your Cart {count > 0 && <span className="text-muted-foreground">({count})</span>}
            </SheetTitle>
          </SheetHeader>

          {detailed.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
              <ShoppingBag className="h-9 w-9 text-muted-foreground" />
              <p className="font-display text-xl">Your cart is empty</p>
              <p className="text-sm text-muted-foreground">
                Add a bag you love and it will appear here.
              </p>
              <button
                type="button"
                onClick={() => setCartOpen(false)}
                className="mt-2 rounded-full bg-primary px-6 py-3 text-xs tracking-[0.16em] text-primary-foreground uppercase"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto px-5 py-4">
                <ul className="flex flex-col gap-4">
                  {detailed.map(({ product, item, lineTotal }) => (
                    <li key={item.id} className="flex gap-3 rounded-2xl border border-border bg-card p-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        width={800}
                        height={800}
                        className="h-20 w-20 shrink-0 rounded-xl object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <p className="min-w-0 font-display text-lg leading-tight">
                            {product.name}
                          </p>
                          <button
                            type="button"
                            aria-label={`Remove ${product.name}`}
                            onClick={() => remove(item.id)}
                            className="shrink-0 text-muted-foreground transition-colors hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {item.colour} · {formatNaira(product.price)} each
                        </p>
                        <div className="mt-2 flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              aria-label="Decrease quantity"
                              onClick={() => setQuantity(item.id, item.quantity - 1)}
                              className="grid h-9 w-9 place-items-center rounded-full border border-border hover:bg-secondary"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="w-5 text-center text-sm">{item.quantity}</span>
                            <button
                              type="button"
                              aria-label="Increase quantity"
                              onClick={() => setQuantity(item.id, item.quantity + 1)}
                              className="grid h-9 w-9 place-items-center rounded-full border border-border hover:bg-secondary"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <p className="font-display text-lg text-primary">
                            {formatNaira(lineTotal)}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-border bg-card px-5 py-5">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Subtotal</span>
                  <span>{formatNaira(subtotal)}</span>
                </div>
                <div className="mt-2 flex items-center justify-between font-display text-2xl">
                  <span>Total</span>
                  <span className="text-primary">{formatNaira(subtotal)}</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  Delivery is confirmed with you after checkout.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setCartOpen(false);
                    setCheckoutOpen(true);
                  }}
                  className="mt-4 w-full rounded-full bg-primary py-4 text-xs font-medium tracking-[0.16em] text-primary-foreground uppercase"
                >
                  Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      <CheckoutDialog open={checkoutOpen} onOpenChange={setCheckoutOpen} />
    </>
  );
}
