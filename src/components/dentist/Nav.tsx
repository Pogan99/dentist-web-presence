import { useState, useEffect } from "react";
import { useClientConfig } from "@/lib/use-client-config";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Phone } from "lucide-react";

const links = [
  { href: "#top", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#team", label: "Team" },
  { href: "#insurance", label: "Insurance" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const config = useClientConfig();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="sticky top-0 z-40 transition-all duration-300"
      style={
        scrolled
          ? {
              backdropFilter: "blur(12px)",
              background: "rgba(248,246,241,0.95)",
              boxShadow: "0 1px 16px 0 rgba(27,77,92,0.10)",
            }
          : { background: "rgba(248,246,241,0.80)", backdropFilter: "blur(6px)" }
      }
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <a href="#top" className="flex items-center gap-2.5">
          <Monogram name={config.businessName} />
          <span className="font-serif text-lg" style={{ color: "#1B4D5C" }}>
            {config.businessName}
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-[#6B7280] transition-colors hover:text-[#1B4D5C]"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden items-center gap-3 md:flex">
          <Button
            asChild
            size="sm"
            style={{ backgroundColor: "#C9963A", color: "#fff", border: "none" }}
            className="hover:opacity-90 font-semibold"
          >
            <a href={`tel:${config.phone.replace(/[^0-9+]/g, "")}`}>
              <Phone className="mr-1.5 h-3.5 w-3.5" />
              New Patients: Call Now
            </a>
          </Button>
        </div>

        {/* Mobile */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="mt-8 flex flex-col gap-4">
                {links.map((l) => (
                  <a key={l.href} href={l.href} className="text-base font-medium text-[#1B4D5C]">
                    {l.label}
                  </a>
                ))}
                <a
                  href={`tel:${config.phone.replace(/[^0-9+]/g, "")}`}
                  className="flex items-center gap-2 text-base font-semibold"
                  style={{ color: "#C9963A" }}
                >
                  <Phone className="h-4 w-4" />
                  {config.phone}
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

function Monogram({ name }: { name: string }) {
  const initials = name
    .replace(/[^A-Za-z\s]/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
  return (
    <span
      className="grid h-9 w-9 place-items-center rounded-md font-serif text-sm text-white"
      style={{ backgroundColor: "#1B4D5C" }}
    >
      {initials}
    </span>
  );
}
