import { useState, useEffect } from "react";
import { useClientConfig } from "@/lib/use-client-config";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Phone, Moon, Sun } from "lucide-react";

const links = [
  { href: "#practice", label: "How We Help" },
  { href: "#about", label: "About" },
  { href: "#testimonials", label: "Clients" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const config = useClientConfig();
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [dark]);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#top" className="flex items-center gap-2">
          <Monogram name={config.businessName} />
          <span className="font-serif text-lg text-foreground">
            {config.businessName}
          </span>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <a
            href={`tel:${config.phone.replace(/[^0-9+]/g, "")}`}
            className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary"
          >
            <Phone className="h-4 w-4" />
            {config.phone}
          </a>
          {config.freeConsultation && (
            <Button asChild size="sm">
              <a href="#contact">Free Consultation</a>
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setDark((d) => !d)}
            aria-label="Toggle theme"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>
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
                  <a key={l.href} href={l.href} className="text-base">
                    {l.label}
                  </a>
                ))}
                <a
                  href={`tel:${config.phone.replace(/[^0-9+]/g, "")}`}
                  className="flex items-center gap-2 text-base font-medium"
                >
                  <Phone className="h-4 w-4" /> {config.phone}
                </a>
                {config.freeConsultation && (
                  <Button asChild>
                    <a href="#contact">Free Consultation</a>
                  </Button>
                )}
                <Button variant="outline" onClick={() => setDark((d) => !d)}>
                  Toggle theme
                </Button>
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
    <span className="grid h-9 w-9 place-items-center rounded-sm bg-primary text-primary-foreground font-serif text-sm">
      {initials}
    </span>
  );
}
