import { useClientConfig } from "@/lib/use-client-config";
import { PhoneCall, Mail, MapPin } from "lucide-react";

export function HoursLocation() {
  const config = useClientConfig();
  const days: [keyof typeof config.hours, string][] = [
    ["monday", "Monday"], ["tuesday", "Tuesday"], ["wednesday", "Wednesday"],
    ["thursday", "Thursday"], ["friday", "Friday"], ["saturday", "Saturday"], ["sunday", "Sunday"],
  ];
  const mapSrc = `https://www.google.com/maps?q=${config.lat},${config.lng}&z=15&output=embed`;

  return (
    <section className="border-t border-border bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-3xl text-foreground md:text-4xl">Visit or Call</h2>
        <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2">
          <div>
            <h3 className="font-serif text-sm uppercase tracking-wider text-muted-foreground">Hours</h3>
            <dl className="mt-4 divide-y divide-border rounded-md border border-border">
              {days.map(([key, label]) => (
                <div key={key} className="flex items-center justify-between px-4 py-3 text-sm">
                  <dt className="font-medium">{label}</dt>
                  <dd className="text-muted-foreground">{config.hours[key]}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-6 space-y-2 text-sm">
              <p className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 text-primary" /> {config.address}</p>
              <p className="flex items-center gap-2"><PhoneCall className="h-4 w-4 text-primary" />
                <a href={`tel:${config.phone.replace(/[^0-9+]/g, "")}`} className="hover:text-primary">{config.phone}</a>
              </p>
              <p className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" />
                <a href={`mailto:${config.email}`} className="hover:text-primary">{config.email}</a>
              </p>
            </div>
            <div className="mt-6 flex items-start gap-3 rounded-md border border-primary/20 bg-primary/5 px-4 py-3 text-sm">
              <PhoneCall className="mt-0.5 h-4 w-4 text-primary" />
              <p className="text-foreground">{config.responsePromise}</p>
            </div>
          </div>
          <div className="overflow-hidden rounded-md border border-border">
            <iframe
              title="Office location"
              src={mapSrc}
              className="h-full min-h-[360px] w-full"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
