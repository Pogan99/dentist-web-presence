import { useClientConfig } from "@/lib/use-client-config";
import { Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  const config = useClientConfig();

  return (
    <footer className="w-full pt-16 pb-8" style={{ backgroundColor: "#1A1A1A", color: "#fff" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <span className="font-serif text-xl" style={{ color: "#fff" }}>
              {config.businessName}
            </span>
            <p className="mt-3 text-sm leading-relaxed" style={{ color: "#9CA3AF" }}>
              Gentle, comprehensive dental care for Jacksonville families since 2006.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest" style={{ color: "#C9963A" }}>
              Services
            </h4>
            <ul className="flex flex-col gap-2">
              {config.services.map((s) => (
                <li key={s.name}>
                  <a href="#services" className="text-sm hover:text-white transition-colors" style={{ color: "#9CA3AF" }}>
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest" style={{ color: "#C9963A" }}>
              Hours
            </h4>
            <ul className="flex flex-col gap-1.5">
              {Object.entries(config.hours).map(([day, hrs]) => (
                <li key={day} className="flex justify-between gap-4 text-sm" style={{ color: "#9CA3AF" }}>
                  <span>{day}</span>
                  <span>{hrs}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest" style={{ color: "#C9963A" }}>
              Contact
            </h4>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href={`tel:${config.phone.replace(/[^0-9+]/g, "")}`}
                  className="flex items-center gap-2 text-sm hover:text-white transition-colors"
                  style={{ color: "#9CA3AF" }}
                >
                  <Phone className="h-4 w-4 shrink-0" />
                  {config.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${config.email}`}
                  className="flex items-center gap-2 text-sm hover:text-white transition-colors"
                  style={{ color: "#9CA3AF" }}
                >
                  <Mail className="h-4 w-4 shrink-0" />
                  {config.email}
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm" style={{ color: "#9CA3AF" }}>
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>{config.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-6 sm:flex-row" style={{ borderColor: "#2D2D2D" }}>
          <p className="text-xs" style={{ color: "#6B7280" }}>
            © {new Date().getFullYear()} {config.businessName}. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: "#6B7280" }}>
            Site by{" "}
            <a href="https://github.com/Pogan99" className="hover:text-white underline transition-colors">
              Coastal Web Studio
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
