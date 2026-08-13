import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { CartProvider } from "@/context/CartContext";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Shop } from "@/components/site/Shop";
import { About } from "@/components/site/About";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { CartLayer } from "@/components/site/CartLayer";

const title = "Xandra's Bag Haven — Stylish Bags in Abuja, Nigeria";
const description =
  "Shop beautiful, affordable handbags, totes, crossbody, mini and travel bags. Based in Abuja with nationwide delivery across Nigeria. Order online or on WhatsApp.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <CartProvider>
      <div className="min-h-screen overflow-x-hidden">
        <Navbar />
        <main>
          <Hero />
          <Shop />
          <About />
          <Contact />
        </main>
        <Footer />
        <CartLayer />
        <Toaster position="top-center" />
      </div>
    </CartProvider>
  );
}
