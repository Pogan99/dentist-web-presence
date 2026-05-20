import { useState } from "react";
import { clientConfig, type DentistConfig } from "@/client-config";

type ProspectRecord = {
  name?: string; phone?: string; email?: string; address?: string;
  lat?: number; lng?: number; instagram?: string; facebook?: string;
  photos?: string[]; logo?: string; working_hours?: Record<string, string>;
  rating?: number; reviews?: number; description?: string; place_id?: string;
};

function decodePd(): ProspectRecord | null {
  if (typeof window === "undefined") return null;
  const pd = new URLSearchParams(window.location.search).get("pd");
  if (!pd) return null;
  try { return JSON.parse(decodeURIComponent(escape(atob(pd)))); } catch { return null; }
}

function mergeHours(wh?: Record<string, string>): DentistConfig["hours"] {
  if (!wh) return clientConfig.hours;
  // DentistConfig.hours is Record<string, string> — keep original casing
  const merged: Record<string, string> = { ...clientConfig.hours };
  for (const [day, time] of Object.entries(wh)) {
    const key = day.charAt(0).toUpperCase() + day.slice(1).toLowerCase();
    merged[key] = time;
  }
  return merged;
}

function mergeProspect(r: ProspectRecord): DentistConfig {
  return {
    ...clientConfig,
    businessName: r.name      ?? clientConfig.businessName,
    phone:        r.phone     ?? clientConfig.phone,
    email:        r.email     ?? clientConfig.email,
    address:      r.address   ?? clientConfig.address,
    lat:          r.lat       ?? clientConfig.lat,
    lng:          r.lng       ?? clientConfig.lng,
    instagram:    r.instagram ?? clientConfig.instagram,
    facebook:     r.facebook  ?? clientConfig.facebook,
    heroImage:    r.photos?.[0] && r.photos[0].startsWith("http") ? r.photos[0] : clientConfig.heroImage,
    logo:         r.logo      || clientConfig.logo,
    hours:        mergeHours(r.working_hours),
  };
}

export function useClientConfig(): DentistConfig {
  const [config] = useState<DentistConfig>(() => {
    const r = decodePd();
    return r ? mergeProspect(r) : clientConfig;
  });
  return config;
}
