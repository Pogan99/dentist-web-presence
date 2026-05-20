import { useClientConfig } from "@/lib/use-client-config";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Linkedin } from "lucide-react";
import type { Attorney } from "@/client-config";

export function AboutAttorneys() {
  const { attorneys } = useClientConfig();
  if (!attorneys.length) return null;

  // NOTE: Review attorney bio copy for Florida Bar Rule 4-7.13 compliance.
  // Outcome claims (e.g. "has won X cases" or "recovered $X for clients") are prohibited.

  if (attorneys.length === 1) {
    const a = attorneys[0];
    return (
      <section id="about" className="border-t border-border bg-secondary/40 py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 md:grid-cols-2 md:items-center lg:px-8">
          <div className="order-2 md:order-1">
            <h2 className="font-serif text-3xl text-foreground md:text-4xl">About {a.name}</h2>
            <p className="mt-2 text-accent-foreground/80 font-medium">{a.title}</p>
            <p className="mt-6 leading-relaxed text-muted-foreground">{a.bio}</p>
            <DetailBlock attorney={a} />
          </div>
          <div className="order-1 md:order-2">
            <div className="relative overflow-hidden rounded-md border border-border bg-card shadow-sm">
              <img
                src={a.photo}
                alt={`Portrait of ${a.name}`}
                className="aspect-[4/5] w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="border-t border-border bg-secondary/40 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-3xl text-foreground md:text-4xl">The Team</h2>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {attorneys.map((a) => (
            <Dialog key={a.name}>
              <DialogTrigger asChild>
                <Card className="cursor-pointer overflow-hidden border-border transition-colors hover:border-primary">
                  <div className="grid grid-cols-3">
                    <img src={a.photo} alt={a.name} className="aspect-square h-full w-full object-cover" loading="lazy" />
                    <CardContent className="col-span-2 p-6">
                      <h3 className="font-serif text-xl">{a.name}</h3>
                      <p className="text-sm text-muted-foreground">{a.title}</p>
                      <p className="mt-3 line-clamp-3 text-sm text-muted-foreground">{a.bio}</p>
                    </CardContent>
                  </div>
                </Card>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="font-serif">{a.name}</DialogTitle>
                </DialogHeader>
                <p className="text-sm text-muted-foreground">{a.title}</p>
                <p className="text-sm leading-relaxed">{a.bio}</p>
                <DetailBlock attorney={a} />
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
}

function DetailBlock({ attorney }: { attorney: Attorney }) {
  return (
    <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
      <div>
        <h4 className="font-serif text-sm uppercase tracking-wider text-foreground">Education</h4>
        <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
          {attorney.education.map((e) => <li key={e}>{e}</li>)}
        </ul>
      </div>
      <div>
        <h4 className="font-serif text-sm uppercase tracking-wider text-foreground">Bar Admissions</h4>
        <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
          {attorney.barAdmissions.map((b) => <li key={b}>{b}</li>)}
        </ul>
      </div>
      {attorney.linkedin && (
        <a
          href={attorney.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-primary hover:underline sm:col-span-2"
        >
          <Linkedin className="h-4 w-4" /> Connect on LinkedIn
        </a>
      )}
    </div>
  );
}
