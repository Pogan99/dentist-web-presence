import { useClientConfig } from "@/lib/use-client-config";
import { Linkedin, Facebook } from "lucide-react";

export function Footer() {
  const config = useClientConfig();
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border bg-secondary/60 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:items-center">
          <div>
            <p className="font-serif text-lg text-foreground">{config.businessName}</p>
            <p className="mt-1 text-sm text-muted-foreground">Jacksonville, FL</p>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm md:justify-center">
            <a href="#practice" className="text-muted-foreground hover:text-foreground">How We Help</a>
            <a href="#about" className="text-muted-foreground hover:text-foreground">About</a>
            <a href="#testimonials" className="text-muted-foreground hover:text-foreground">Clients</a>
            <a href="#contact" className="text-muted-foreground hover:text-foreground">Contact</a>
          </nav>
          <div className="flex items-center gap-4 text-sm md:justify-end">
            <a href={`tel:${config.phone.replace(/[^0-9+]/g, "")}`} className="hover:text-primary">{config.phone}</a>
            <span className="text-border">•</span>
            <a href={`mailto:${config.email}`} className="hover:text-primary">Email</a>
            {config.linkedin && (
              <a href={config.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-muted-foreground hover:text-foreground">
                <Linkedin className="h-4 w-4" />
              </a>
            )}
            {config.facebook && (
              <a href={config.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-muted-foreground hover:text-foreground">
                <Facebook className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
        <p className="mt-10 text-xs leading-relaxed text-muted-foreground">{config.disclaimer}</p>
        <div className="mt-4 flex flex-col items-start justify-between gap-2 text-xs text-muted-foreground sm:flex-row">
          <p>© {year} {config.businessName}. All rights reserved.</p>
          <a href="#" className="hover:text-foreground">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
}
