export interface DentistConfig {
  businessName: string;
  tagline: string;
  heroImage: string;
  logo?: string;
  phone: string;
  email: string;
  address: string;
  lat?: number;
  lng?: number;
  instagram?: string;
  facebook?: string;
  primaryColor: string;
  accentColor: string;
  domain?: string;
  placeId?: string;
  yearsInPractice: number;
  patientsServed: number;
  googleRating: number;
  googleReviewCount: number;
  newPatientOffer: string;
  insuranceAccepted: string[];
  services: Array<{ name: string; description: string; icon: string }>;
  hours: Record<string, string>;
  team: Array<{ name: string; title: string; photo?: string; bio: string }>;
  testimonials: Array<{ quote: string; author: string; rating: number }>;
  emergencyLine?: string;
  newPatientsWelcome: boolean;
}

export const clientConfig: DentistConfig = {
  businessName: "Coastal Family Dentistry",
  tagline: "Gentle care for the whole family — right here in Jacksonville.",
  heroImage:
    "https://images.unsplash.com/photo-1606811841689-23dfddce3e66?w=1600&q=85",
  phone: "(904) 555-0197",
  email: "hello@coastalfamilydentistry.com",
  address: "3421 Hendricks Ave, Jacksonville, FL 32207",
  lat: 30.2918,
  lng: -81.6354,
  primaryColor: "#1B4D5C",
  accentColor: "#C9963A",
  domain: "coastalfamilydentistry.com",
  yearsInPractice: 18,
  patientsServed: 4200,
  googleRating: 4.9,
  googleReviewCount: 312,
  newPatientOffer: "$99 New Patient Special — Exam, X-Rays & Cleaning",
  insuranceAccepted: [
    "Delta Dental",
    "Cigna",
    "Aetna",
    "BlueCross BlueShield",
    "Humana",
    "Guardian",
    "MetLife",
    "United Concordia",
  ],
  services: [
    {
      name: "General Dentistry",
      description:
        "Routine cleanings, fillings, and preventive care for the whole family.",
      icon: "tooth",
    },
    {
      name: "Cosmetic Dentistry",
      description:
        "Teeth whitening, veneers, and smile makeovers tailored to you.",
      icon: "sparkles",
    },
    {
      name: "Emergency Care",
      description:
        "Same-day appointments for toothaches, broken teeth, and dental emergencies.",
      icon: "zap",
    },
    {
      name: "Invisalign",
      description:
        "Straighter teeth without braces — discreet, comfortable, effective.",
      icon: "align-center",
    },
    {
      name: "Dental Implants",
      description:
        "Permanent tooth replacement that looks and feels completely natural.",
      icon: "anchor",
    },
    {
      name: "Pediatric Care",
      description:
        "Kid-friendly visits that make dental health a lifelong habit.",
      icon: "heart",
    },
  ],
  hours: {
    Monday: "8am–5pm",
    Tuesday: "8am–5pm",
    Wednesday: "8am–5pm",
    Thursday: "8am–5pm",
    Friday: "8am–3pm",
    Saturday: "By appointment",
    Sunday: "Closed",
  },
  team: [
    {
      name: "Dr. Sarah Mendez, DDS",
      title: "Lead Dentist & Founder",
      bio: "18 years in Jacksonville. Graduate of UF College of Dentistry. Specializes in cosmetic and family dentistry.",
      photo:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80",
    },
    {
      name: "Dr. James Park, DMD",
      title: "Associate Dentist",
      bio: "Expertise in oral surgery and implants. Patients love his calm, gentle approach.",
      photo:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80",
    },
  ],
  testimonials: [
    {
      quote:
        "I used to be terrified of the dentist. Now I actually look forward to my appointments.",
      author: "Maria T.",
      rating: 5,
    },
    {
      quote: "The team here genuinely cares. My kids ask when they get to go back.",
      author: "David R.",
      rating: 5,
    },
    {
      quote:
        "Got a same-day appointment for a broken tooth. In and out in 90 minutes, no pain.",
      author: "Jennifer K.",
      rating: 5,
    },
  ],
  emergencyLine: "(904) 555-0198",
  newPatientsWelcome: true,
};
