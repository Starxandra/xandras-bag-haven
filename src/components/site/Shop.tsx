import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { ProductCard } from "./ProductCard";
import { ProductDialog } from "./ProductDialog";
import { CATEGORIES, PRODUCTS, type Product } from "@/data/products";

export function Shop() {
  const [category, setCategory] = useState<string>("All");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Product | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PRODUCTS.filter((p) => {
      const matchesCategory = category === "All" || p.category === category;
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.short.toLowerCase().includes(q) ||
        p.colours.some((c) => c.toLowerCase().includes(q));
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  const chips = ["All", ...CATEGORIES];

  return (
    <section id="shop" className="scroll-mt-24 border-t border-border py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-xl">
          <p className="eyebrow">The Collection</p>
          <div className="gold-rule mt-4" />
          <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
            Shop Beautiful Bags
          </h2>
          <p className="mt-3 text-muted-foreground">
            Browse by category or search for the exact style you have in mind. Every
            bag is priced in Naira and delivered nationwide.
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-4">
          <label className="relative block">
            <Search className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search bags, colours or categories..."
              aria-label="Search products"
              className="w-full rounded-full border border-border bg-card py-4 pr-4 pl-11 text-base outline-none transition-colors placeholder:text-muted-foreground focus:border-gold"
            />
          </label>

          <div id="categories" className="-mx-4 scroll-mt-28 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
            <div className="flex w-max gap-2">
              {chips.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  className={`shrink-0 rounded-full border px-4 py-2.5 text-xs tracking-[0.1em] uppercase transition-colors ${
                    category === c
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card hover:bg-accent"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} onView={setSelected} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-12 text-center text-muted-foreground">
            No bags match your search yet. Try another colour or category.
          </p>
        )}
      </div>

      <ProductDialog product={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
