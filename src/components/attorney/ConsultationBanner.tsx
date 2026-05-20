import { useClientConfig } from "@/lib/use-client-config";
import { Button } from "@/components/ui/button";

export function ConsultationBanner() {
  const config = useClientConfig();
  if (!config.freeConsultation) return null;
  return (
    <section className="bg-primary py-16 text-primary-foreground md:py-20">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="font-serif text-3xl md:text-4xl">Your first conversation is free.</h2>
        <p className="mt-4 text-lg text-primary-foreground/85">
          Tell us what you're dealing with. No obligation, no pressure. Just answers.
        </p>
        <div className="mt-8">
          <Button asChild size="lg" variant="secondary">
            <a href="#contact">Schedule Your Consultation</a>
          </Button>
        </div>
        <p className="mt-4 text-sm text-primary-foreground/75">{config.responsePromise}</p>
      </div>
    </section>
  );
}
