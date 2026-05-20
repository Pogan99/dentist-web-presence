import heroOffice from "@/assets/hero-office.jpg";
import attorneyHeadshot from "@/assets/attorney-headshot.jpg";

export interface PracticeArea {
  name: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  quote: string;
  attribution: string;
}

export interface Attorney {
  name: string;
  title: string;
  photo: string;
  bio: string;
  barAdmissions: string[];
  yearsExperience: number;
  casesHandled?: number;
  education: string[];
  linkedin?: string;
}

export interface ClientConfig {
  businessName: string;
  tagline: string;
  heroImage: string;
  heroLayout: "split" | "fullbleed";
  logo: string;
  attorneys: Attorney[];
  practiceAreas: PracticeArea[];
  testimonials: Testimonial[];
  hours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  responsePromise: string;
  freeConsultation: boolean;
  phone: string;
  email: string;
  address: string;
  lat: number;
  lng: number;
  linkedin?: string;
  facebook: string;
  primaryColor: string;
  accentColor: string;
  domain: string;
  vertical: "attorney";
  disclaimer: string;
}

export const clientConfig: ClientConfig = {
  businessName: "Whitfield Law, P.A.",
  tagline: "Experienced. Accessible. On your side.",
  heroImage: heroOffice,
  heroLayout: "fullbleed",
  logo: "",
  attorneys: [
    {
      name: "Marcus Whitfield",
      title: "Founding Attorney",
      photo: attorneyHeadshot,
      bio:
        "Marcus has practiced law in Jacksonville for more than fifteen years, advising individuals and families through difficult moments. He prides himself on being reachable, plainspoken, and thorough. Outside the office, he serves on the board of a local legal aid clinic.",
      barAdmissions: [
        "Florida State Bar, 2009",
        "U.S. District Court, Middle District of Florida",
      ],
      yearsExperience: 15,
      casesHandled: 500,
      education: [
        "J.D., University of Florida Levin College of Law, 2008",
        "B.A., Florida State University, 2005",
      ],
      linkedin: "https://www.linkedin.com/",
    },
  ],
  practiceAreas: [
    {
      name: "Personal Injury",
      description:
        "If you've been hurt due to someone else's negligence, we help you understand your options and pursue fair compensation through insurance claims or litigation.",
      icon: "Shield",
    },
    {
      name: "Family Law",
      description:
        "Divorce, custody, and support matters require both legal skill and a steady presence. We guide families through transitions with care and clarity.",
      icon: "Home",
    },
    {
      name: "Estate Planning",
      description:
        "Wills, trusts, and powers of attorney that match your wishes and protect the people you love. We make the process straightforward and unhurried.",
      icon: "Scroll",
    },
    {
      name: "Business Law",
      description:
        "Formation, contracts, and disputes for Jacksonville-area small businesses. Practical counsel from someone who understands what owners actually face.",
      icon: "Briefcase",
    },
    {
      name: "Real Estate",
      description:
        "Residential and commercial transactions, title issues, and landlord-tenant matters across Northeast Florida.",
      icon: "Building2",
    },
    {
      name: "Civil Litigation",
      description:
        "When negotiation fails, we represent clients in state and federal court with thorough preparation and clear communication at every step.",
      icon: "Scale",
    },
  ],
  testimonials: [
    {
      quote:
        "Marcus took the time to explain everything in plain language. I never felt like a number — he answered every call and email himself.",
      attribution: "— Former Client, 2024",
    },
    {
      quote:
        "Professional, patient, and prepared. The whole team treated my case with the seriousness it deserved.",
      attribution: "— Former Client, 2023",
    },
    {
      quote:
        "I came in stressed and left with a plan. That alone was worth the call.",
      attribution: "— Former Client, 2024",
    },
  ],
  hours: {
    monday: "8:30 AM – 5:30 PM",
    tuesday: "8:30 AM – 5:30 PM",
    wednesday: "8:30 AM – 5:30 PM",
    thursday: "8:30 AM – 5:30 PM",
    friday: "8:30 AM – 4:00 PM",
    saturday: "By appointment",
    sunday: "Closed",
  },
  responsePromise: "We respond to all inquiries within 2 business hours.",
  freeConsultation: true,
  phone: "(904) 555-0148",
  email: "intake@whitfieldlaw.example",
  address: "200 W Forsyth St, Suite 800, Jacksonville, FL 32202",
  lat: 30.3271,
  lng: -81.6589,
  linkedin: "https://www.linkedin.com/",
  facebook: "https://www.facebook.com/",
  primaryColor: "#0f2942",
  accentColor: "#b08442",
  domain: "whitfieldlaw.example",
  vertical: "attorney",
  disclaimer:
    "The information on this site is for general purposes only and does not constitute legal advice. No attorney-client relationship is formed by contacting this firm.",
};
