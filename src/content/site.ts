// Single source of truth for site copy.
// Em/en dashes removed per spec; eyebrows have no leading dash.

export const site = {
  brand: {
    name: "Medici Biologics",
    nav: [
      { label: "How it works", href: "#process" },
      { label: "Dr. Gabi", href: "#dr-gabi" },
      { label: "Founding", href: "#founding" },
      { label: "Locations", href: "#on-site" },
    ],
    primaryCta: { label: "Become a Founding Member", href: "#founding" },
  },

  hero: {
    eyebrow: "Peptide Science + AI",
    headline: "Your protocol, written by your biology.",
    sub: "Upload bloodwork. Dr. Gabi reads it, designs your peptide protocol, and a licensed physician approves every order before it ships.",
    cta: { label: "Start your protocol", href: "#founding" },
    secondary: { label: "How it works", href: "#process" },
    flow: {
      input: ["Bloodwork", "Goals", "Symptoms"],
      analysis: "Dr. Gabi",
      output: { title: "BPC-157", spec: "250 mcg, 2x daily", reviewer: "Dr. Jenkins, MD" },
    },
    proof: [
      { label: "Compounded in", value: "Licensed labs" },
      { label: "Reviewed by", value: "Physicians" },
      { label: "Shipped in", value: "48 hrs" },
    ],
  },

  problem: {
    eyebrow: "The Problem",
    headline: "Today's peptide market wasn't built for you.",
    lede: "Most protocols are guesses. Most peptides are unverified. The result is wasted money, missed effects, and real risk.",
    cards: [
      {
        title: "Grey market sourcing",
        body: "Unregulated supply means mislabeled, mis-dosed, and contaminated peptides that never see a lab certificate.",
      },
      {
        title: "Generic protocols",
        body: "Built around an influencer's body, not yours. Without your hormonal baseline, every dose is a guess.",
      },
      {
        title: "No accountability",
        body: "No physician review, no compounding standards, no follow-up. You're left to figure it out alone.",
      },
    ],
  },

  betterWay: {
    eyebrow: "A Better Way",
    headline: "Built around the only baseline that matters: yours.",
    body: "Your protocol starts from your bloodwork, your goals, and your response, and gets reviewed by a licensed physician before anything is delivered.",
    pillars: [
      { label: "Your biology", body: "Real bloodwork, not a quiz." },
      { label: "Physician approved", body: "Licensed MD on every order." },
      { label: "Lab certified", body: "Certificate of Analysis included." },
    ],
  },

  drGabi: {
    eyebrow: "Meet Dr. Gabi",
    headline: "The most informed peptide clinician you've ever met.",
    sub: "She is not a chatbot. She is a clinical intelligence trained on current peptide science, physician practice, and your individual biology.",
    capabilities: [
      {
        title: "Reads your bloodwork",
        body: "Interprets 50+ biomarkers, hormone panels, and metabolic signals against current peptide research.",
      },
      {
        title: "Designs your protocol",
        body: "Recommends peptide, dose, cadence, and stack based on what your body actually needs right now.",
      },
      {
        title: "Routes to a physician",
        body: "Every recommendation is reviewed and approved by a licensed MD before compounding begins.",
      },
    ],
    biomarkers: ["WBC", "T3", "DHEA", "IGF-1", "TSH", "hsCRP", "ALT", "Vit D"],
  },

  hub: {
    eyebrow: "Live Hub",
    headline: "Know what you're taking. Know why.",
    sub: "Every protocol you receive is documented, sourced, and reviewable. No hidden ingredients. No guesswork.",
    preview: {
      title: "Protocol Approval",
      pending: "Pending Dr. Sarah Jenkins, MD",
      message: "Your personalized BPC-157 protocol is ready for medical review.",
      cta: "Confirm Order",
      meta: ["Compounded in licensed lab", "Certificate of Analysis included"],
    },
  },

  process: {
    eyebrow: "The Process",
    headline: "From guesswork to precision in minutes.",
    lede: "Make the right thing the easy thing. Every interaction is built so the path is effortless and unmistakably safe.",
    phases: [
      {
        phase: "01",
        title: "Text to start",
        body: "Text us. Get a secure link. No app download.",
      },
      {
        phase: "02",
        title: "Intake & biomarkers",
        body: "Quick questions, optional bloodwork upload. Dr. Gabi interprets everything.",
      },
      {
        phase: "03",
        title: "Physician approval",
        body: "Dr. Gabi proposes a protocol. A licensed physician approves it via dashboard.",
      },
      {
        phase: "04",
        title: "Compound & deliver",
        body: "Peptides shipped in 48 to 72 hours with a Certificate of Analysis.",
      },
    ],
  },

  manifesto: "Precision, not guesswork.",

  founding: {
    eyebrow: "Limited to 500 members",
    headline: "Become a Founding Member.",
    lede: "We're opening Medici to a private cohort. Lock your rate forever, claim $500 in immediate peptide credits, and be among the first to start.",
    plan: {
      title: "Founding Member",
      price: "$228",
      cadence: "first year, paid upfront",
      lockedAt: "$19 / mo locked forever",
      perks: [
        { label: "$500 in peptide credits", body: "Applied to your first protocol immediately." },
        { label: "$19/month, forever", body: "Locked rate. Never increases. Never tiers up." },
        { label: "Founding Member Wall", body: "Your name immortalized in the Medici archive." },
        { label: "Priority physician access", body: "Direct routing to a senior reviewer on every order." },
      ],
      cta: "Add to Bag, $228",
      helper: "Order before 4pm Pacific for same-day physician review.",
    },
    scarcity: { claimed: 5, total: 500 },
    badges: [
      { label: "Compounded in licensed labs" },
      { label: "Reviewed by licensed physicians" },
      { label: "Certificate of Analysis on every order" },
    ],
  },

  precision: {
    eyebrow: "Biological Precision",
    headline: "Precision, down to the cell.",
    body: "The right protocol does not just improve performance. It changes how your body operates.",
  },

  onSite: {
    eyebrow: "Medici On-Site",
    headline: "Care, in person.",
    lede: "Walk into a Medici location for bloodwork, IV therapy, and protocol calibration. The same precision you experience online, in a private, physician-supervised space.",
    cities: [
      {
        city: "Austin",
        neighborhood: "South Congress",
        status: "Available now",
        cta: "Book a visit",
        imageKey: "city-austin",
      },
      {
        city: "Nashville",
        neighborhood: "The Gulch",
        status: "Opening Q2 2026",
        cta: "Join the waitlist",
        imageKey: "city-nashville",
      },
      {
        city: "Dallas",
        neighborhood: "Knox Henderson",
        status: "Opening Q2 2026",
        cta: "Join the waitlist",
        imageKey: "city-dallas",
      },
    ],
  },

  footer: {
    name: "Medici Biologics",
    disclaimer:
      "Information provided by Medici Biologics and Dr. Gabi AI is for educational purposes only. Consult a licensed physician before beginning any health protocol.",
    columns: [
      {
        label: "Platform",
        links: [
          { label: "How it works", href: "#process" },
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
