import { useClientConfig } from "@/lib/use-client-config";
import { Button } from "@/components/ui/button";

export function Hero() {
  const config = useClientConfig();
  const ctaPrimary = config.freeConsultation ? "Schedule a Free Consultation" : "Contact Us Today";

  if (config.heroLayout === "split") {
    return (
      <section id="top" className="grid min-h-[60vh] grid-cols-1 md:grid-cols-5">
        <div className="bg-primary text-primary-foreground md:col-span-2 flex items-center px-6 py-16 md:px-12">
          <div className="max-w-md">
            <h1 className="font-serif text-4xl leading-tight md:text-5xl">
              {config.tagline}
            </h1>
            <p className="mt-4 text-lg text-primary-foreground/80">{config.businessName}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" variant="secondary">
                <a href="#contact">{ctaPrimary}</a>
              </Button>
              <Button asChild size="lg" variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/10">
                <a href="#practice">Our Practice Areas</a>
              </Button>
            </div>
            <p className="mt-6 text-sm text-primary-foreground/70">{config.responsePromise}</p>
          </div>
        </div>
        <div className="relative md:col-span-3">
          <img
            src={config.heroImage}
            alt=""
            className="h-full w-full object-cover"
            loading="eager"
            decoding="async"
          />
        </div>
      </section>
    );
  }

  return (
    <section id="top" className="relative isolate min-h-[70vh] overflow-hidden">
      <img
        src={config.heroImage}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        loading="eager"
        decoding="async"
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/85 via-primary/70 to-primary/30" />
      <div className="relative mx-auto flex max-w-7xl flex-col justify-center px-4 py-24 sm:px-6 md:py-32 lg:px-8">
        <div className="max-w-2xl text-primary-foreground">
          <h1 className="font-serif text-4xl leading-tight md:text-5xl lg:text-6xl">
            {config.tagline}
          </h1>
          <p className="mt-4 text-lg text-primary-foreground/80 md:text-xl">
            {config.businessName}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" variant="secondary">
              <a href="#contact">{ctaPrimary}</a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <a href="#practice">Our Practice Areas</a>
            </Button>
          </div>
          <p className="mt-6 text-sm text-primary-foreground/80">{config.responsePromise}</p>
        </div>
      </div>
    </section>
  );
}
