import { useClientConfig } from "@/lib/use-client-config";
import { Scale, Shield, Award, PhoneCall } from "lucide-react";

export function TrustStrip() {
  const config = useClientConfig();
  const lead = config.attorneys[0];
  const items: { icon: React.ComponentType<{ className?: string }>; label: string }[] = [];
  if (lead?.yearsExperience) items.push({ icon: Shield, label: `${lead.yearsExperience}+ Years of Experience` });
  if (lead?.barAdmissions?.[0]) items.push({ icon: Scale, label: lead.barAdmissions[0] });
  if (lead?.casesHandled) items.push({ icon: Award, label: `${lead.casesHandled}+ Cases Handled` });
  if (config.freeConsultation) items.push({ icon: PhoneCall, label: "Free Consultation" });

  if (!items.length) return null;

  return (
    <div className="border-b border-border bg-primary/5">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-3 px-4 py-3 sm:gap-4 sm:px-6 lg:px-8">
        {items.map((it) => (
          <div
            key={it.label}
            className="flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary sm:text-sm"
          >
            <it.icon className="h-3.5 w-3.5" />
            {it.label}
          </div>
        ))}
      </div>
    </div>
  );
}
