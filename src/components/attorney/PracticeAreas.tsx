import { useState } from "react";
import { useClientConfig } from "@/lib/use-client-config";
import { Card, CardContent } from "@/components/ui/card";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";

function Icon({ name }: { name: string }) {
  const Cmp = (Icons as unknown as Record<string, LucideIcon>)[name] ?? Icons.Scale;
  return <Cmp className="h-6 w-6 text-primary" />;
}

export function PracticeAreas() {
  const { practiceAreas } = useClientConfig();
  const [open, setOpen] = useState(false);
  const first = practiceAreas.slice(0, 6);
  const rest = practiceAreas.slice(6);

  return (
    <section id="practice" className="border-t border-border bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="font-serif text-3xl text-foreground md:text-4xl">How We Can Help</h2>
          <p className="mt-3 text-muted-foreground">
            A focused practice serving individuals, families, and small businesses across Northeast Florida.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {first.map((pa) => (
            <PracticeCard key={pa.name} {...pa} />
          ))}
        </div>
        {rest.length > 0 && (
          <Collapsible open={open} onOpenChange={setOpen} className="mt-6">
            <CollapsibleContent className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((pa) => (
                <PracticeCard key={pa.name} {...pa} />
              ))}
            </CollapsibleContent>
            <div className="mt-6 flex justify-center">
              <CollapsibleTrigger asChild>
                <Button variant="outline">{open ? "Show less" : "See all practice areas"}</Button>
              </CollapsibleTrigger>
            </div>
          </Collapsible>
        )}
      </div>
    </section>
  );
}

function PracticeCard({ name, description, icon }: { name: string; description: string; icon: string }) {
  return (
    <Card className="border-border transition-colors hover:border-primary">
      <CardContent className="p-6">
        <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-md bg-primary/10">
          <Icon name={icon} />
        </div>
        <h3 className="font-serif text-xl text-foreground">{name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
