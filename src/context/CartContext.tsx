import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { PRODUCTS, type Product } from "@/data/products";

export type CartItem = {
  id: string;
  quantity: number;
  colour: string;
};

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  add: (product: Product, quantity?: number, colour?: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  detailed: { product: Product; item: CartItem; lineTotal: number }[];
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "xbh-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw) as CartItem[]);
    } catch {
      /* ignore */
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items, loaded]);

  const value = useMemo<CartContextValue>(() => {
    const detailed = items
      .map((item) => {
        const product = PRODUCTS.find((p) => p.id === item.id);
        if (!product) return null;
        return { product, item, lineTotal: product.price * item.quantity };
      })
      .filter((v): v is { product: Product; item: CartItem; lineTotal: number } => v !== null);

    return {
      items,
      detailed,
      count: items.reduce((sum, i) => sum + i.quantity, 0),
      subtotal: detailed.reduce((sum, d) => sum + d.lineTotal, 0),
      cartOpen,
      setCartOpen,
      add: (product, quantity = 1, colour) =>
        setItems((prev) => {
          const existing = prev.find((i) => i.id === product.id);
          if (existing) {
            return prev.map((i) =>
              i.id === product.id
                ? { ...i, quantity: i.quantity + quantity, colour: colour ?? i.colour }
                : i,
            );
          }
          return [
            ...prev,
            { id: product.id, quantity, colour: colour ?? product.colours[0] },
          ];
        }),
      setQuantity: (id, quantity) =>
        setItems((prev) =>
          quantity <= 0
            ? prev.filter((i) => i.id !== id)
            : prev.map((i) => (i.id === id ? { ...i, quantity } : i)),
        ),
      remove: (id) => setItems((prev) => prev.filter((i) => i.id !== id)),
      clear: () => setItems([]),
    };
  }, [items, cartOpen]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
