import { useClientConfig } from "@/lib/use-client-config";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

export function Testimonials() {
  const { testimonials } = useClientConfig();
  if (!testimonials.length) return null;

  return (
    <section id="testimonials" className="border-t border-border bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-3xl text-foreground md:text-4xl">What Clients Say</h2>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.slice(0, 3).map((t, i) => (
            <Card key={i} className="relative overflow-hidden border-border">
              <Quote className="absolute -right-2 -top-2 h-24 w-24 text-primary/10" strokeWidth={1} />
              <CardContent className="relative p-6">
                <p className="font-serif italic leading-relaxed text-foreground">"{t.quote}"</p>
                <p className="mt-4 text-sm text-muted-foreground">{t.attribution}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
