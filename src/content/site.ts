// Single source of truth for site copy.
// Em/en dashes removed per spec; eyebrows have no leading dash.

export const site = {
  brand: {
    name: "Medici Biologics",
    nav: [
      { label: "The Problem", href: "#problem" },
      { label: "Dr. Gabi", href: "#dr-gabi" },
      { label: "Process", href: "#process" },
      { label: "Founding", href: "#founding" },
    ],
    primaryCta: { label: "Become a Founding Member", href: "#founding" },
  },

  hero: {
    eyebrow: "Peptide Science + AI",
    headline: "Know exactly what your body needs.",
    sub: "Peptides are a fundamental shift in what medicine can do. When they are real, dosed correctly, and matched to your biology, the results are unlike anything else.",
    cta: { label: "Discover Our Approach", href: "#problem" },
    flow: {
      input: ["Bloodwork", "Goals", "Symptoms"],
      analysis: "Dr. Gabi",
      output: { title: "BPC-157", spec: "250 mcg, 2x daily" },
    },
  },

  problem: {
    eyebrow: "The Problem",
    stat: { value: 30, suffix: "%", label: "Of peptides on the market are mislabeled, mis-dosed, or contaminated." },
    headline: "Impure peptides. Wrong protocols.",
    lede: "Peptides are transformative when they are real and right for you. Most people have neither. Without knowing your biology, every protocol is a guess.",
    cards: [
      {
        title: "Grey Market",
        subtitle: "No oversight",
        body: "30% of peptides are mislabeled or contaminated. Self-prescribing offers zero oversight and zero accountability.",
      },
      {
        title: "Generic Advice",
        subtitle: "Influencer protocols",
        body: "Built around an influencer's body, not yours. Without your hormonal baseline and biology, it is just a guess.",
      },
      {
        title: "Current Experience",
        subtitle: "Unclear choices",
        body: "You're left choosing between expensive clinics or figuring it out yourself, without clarity.",
      },
    ],
  },

  betterWay: {
    eyebrow: "A Better Way",
    headline: "Built around you.",
    body: "Your protocol is based on your biology, your goals, and your response, with medical review before anything is delivered.",
  },

  drGabi: {
    eyebrow: "The Solution",
    headline: "Meet Dr. Gabi.",
    sub: "The most informed peptide clinician.",
    body: "Dr. Gabi is Medici Biologics' AI trained on current peptide science, clinical best practice, and most importantly, your individual biology. She is not a chatbot.",
    capabilities: [
      "Reads and interprets your real bloodwork",
      "Licensed physician reviews and approves every protocol",
      "Precision Medicine compounds, tests, and delivers",
    ],
  },

  hub: {
    eyebrow: "Dr. Gabi Hub",
    headline: "Structure and clarity across your routine.",
    preview: {
      title: "Protocol Approval",
      pending: "Pending Dr. Sarah Jenkins, MD",
      message: "Your personalized BPC-157 protocol is ready for medical review.",
      cta: "Confirm Order",
      meta: ["Compounded in licensed lab", "Certificate of Analysis included"],
    },
  },

  manifesto1: "Know what you're taking. Know why.",

  process: {
    eyebrow: "The Process",
    headline: "From guesswork to precision in minutes.",
    lede: "Every client interaction is built around one principle: make the right thing the easy thing. The journey feels effortless and completely safe.",
    phases: [
      {
        phase: "01",
        title: "Text to start",
        body: "Client texts a number. Receives a secure link via SMS. No app download required.",
      },
      {
        phase: "02",
        title: "Intake & Biomarkers",
        body: "Answer a short sequence of questions. Upload existing bloodwork if available. Dr. Gabi interprets.",
      },
      {
        phase: "03",
        title: "Physician Approval",
        body: "Dr. Gabi recommends a precise protocol. A licensed physician reviews and approves via dashboard.",
      },
      {
        phase: "04",
        title: "Compound & Delivery",
        body: "Peptides delivered in 48 to 72 hours with a published Certificate of Analysis.",
      },
    ],
  },

  manifesto2: "Precision, not guesswork.",

  founding: {
    eyebrow: "Limited Availability",
    headline: "Become a Founding Member.",
    lede: "We are opening Medici Biologics to an exclusive cohort of 500 members. Lock in your rate forever and start your journey with industry leading peptide credits.",
    scarcity: [
      { label: "Claimed", value: "5%" },
      { label: "Phase", value: "Launch" },
      { label: "Rate", value: "Locked Forever" },
    ],
    plan: {
      title: "Founding Member",
      tagline: "Includes $500 in immediate peptide credits.",
      price: "$228",
      cadence: "Pay 1 year upfront",
      perks: [
        "Price permanently locked at $19/month",
        "Receive $500 in peptide credits immediately",
        "Name immortalized on the Founding Member Wall",
      ],
      cta: "Add to Bag, $228",
      helper: "Secure your allocation. Order before 4pm.",
    },
  },

  precision: {
    eyebrow: "Biological Precision",
    headline: "Precision, down to the cell.",
    body: "The right protocol does not just improve performance. It changes how your body operates.",
  },

  onSite: {
    eyebrow: "Medici On-Site",
    headline: "Care, in person.",
    lede: "From bloodwork to protocol support, every step connects directly to your personalized plan, with the same precision you experience online.",
    cities: [
      {
        city: "Austin",
        neighborhood: "South Congress",
        status: "Available now",
        featured: true,
      },
      { city: "Nashville", neighborhood: "The Gulch", status: "Opening Q2" },
      { city: "Dallas", neighborhood: "Knox Henderson", status: "Opening Q2" },
    ],
  },

  footer: {
    name: "Medici Biologics",
    disclaimer:
      "The information provided on this website and by Dr. Gabi AI is for informational purposes only. Consult with a licensed physician before beginning any health protocol.",
    columns: [
      {
        label: "Platform",
        links: [
          { label: "The Problem", href: "#problem" },
          { label: "Meet Dr. Gabi", href: "#dr-gabi" },
          { label: "On-Site Clinics", href: "#on-site" },
        ],
      },
      {
        label: "Company",
        links: [
          { label: "Founding Member", href: "#founding" },
          { label: "Clinical Background", href: "#" },
          { label: "Transparency Reports", href: "#" },
        ],
      },
    ],
    legal: [
      { label: "Terms of Service", href: "#" },
      { label: "Privacy Policy", href: "#" },
    ],
    copyright: "© 2026 Medici Biologics",
  },
} as const;
