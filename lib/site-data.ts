import type { TextBlock } from '@/components/Sections';

export type SitePage = {
  slug: string;
  title: string;
  description: string;
  h1: string;
  subtitle: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  trust?: string[];
  intro?: TextBlock[];
  offerTitle?: string;
  offers?: TextBlock[];
  steps?: string[];
  faq?: { q: string; a: string }[];
  final?: string;
  parent?: string;
  internalLinks?: { label: string; href: string }[];
};

const dentalOffers = [
  ['Dental CRM Software', '/dental-crm-software', 'Manage patients, leads and follow-ups in one place'],
  ['Dental Website Development', '/dental-website-development', 'A website that builds trust and converts visitors into booked patients'],
  ['Dental SEO Services', '/dental-seo-services', 'Rank on Google when patients search for a dentist near them'],
  ['Dentist Appointment Software', '/dentist-appointment-software', 'Fill appointment slots automatically with zero manual follow-up'],
  ['Dental Practice Automation', '/dental-practice-automation', 'Automate reminders, follow-ups and reviews']
];

const bangaloreNeighbourhoods = [
  'Koramangala — One of Bangalore\'s most competitive markets.',
  'Indiranagar — High footfall, high expectations and strong digital comparison.',
  'Jayanagar — Established neighbourhood with loyal local customers.',
  'HSR Layout — Fast growing, tech savvy customer base.',
  'Whitefield — Large residential and corporate catchment.'
];

const dentalLinks = dentalOffers.map(([label, href]) => ({ label, href }));

function offerCards(items: string[][]): TextBlock[] {
  return items.map(([title, href, body]) => ({ title, body, links: [{ label: 'Learn More', href }] }));
}

const featureDescriptions: Record<string, string> = {
  'Patient Database':
    'Complete patient profiles with contact details, treatment history, last visit date and next appointment due - all in one place. Never lose track of a patient again.',
  'New Patient Enquiries':
    'Every call, WhatsApp message or online enquiry goes into one place. Track each new patient from first contact to booked appointment — no enquiry ever falls through the cracks again.',
  'Appointment Reminders':
    'Automatic WhatsApp reminders sent 24 hours and 2 hours before every appointment. Reduce no-shows without calling every patient manually.',
  'Treatment Follow-ups':
    'Automatic WhatsApp messages after every procedure checking on recovery, answering common questions and scheduling the next visit.',
  'Recall System':
    'Automatically remind patients when their next checkup is due. Bring back patients you would otherwise lose to competitors.',
  'Review Requests':
    'Automatically ask satisfied patients for a Google review after their visit - sent at exactly the right moment when satisfaction is highest.',
  'Clinic Dashboard':
    'See your pipeline, upcoming appointments, patient retention rate and review count in one clean view updated in real time.',
  'Professional Trust-Building Design':
    'Dental patients look for trust before they book. We design clean clinic websites that highlight doctor credibility, treatments, reviews and easy appointment actions.',
  'Mobile First':
    'Most dental searches happen on phones, often while people are ready to act. Every page is built for fast scanning, thumb-friendly actions and clear WhatsApp or call buttons.',
  'Fast Loading':
    'A fast clinic website keeps anxious patients from dropping off while comparing options. We optimise pages so they open quickly on mobile networks.',
  'Services Pages':
    'Each major treatment gets its own clear page with symptoms, benefits, process and booking prompts. This helps patients understand care options and helps Google rank relevant searches.',
  'Doctor Profile Page':
    'Introduce the dentist with qualifications, experience, treatment focus and a warm professional tone. A strong profile builds confidence before the first call.',
  'WhatsApp Appointment Button':
    'Patients can start a booking conversation from any important page. This lowers friction for people who prefer messaging over calling.',
  'Google Reviews Integration':
    'Bring your Google review strength into the website experience. Reviews help visitors trust the clinic and take the next step.',
  'Location and Maps Integration':
    'Show your address, service area and map clearly so patients can plan the visit. Local clarity improves both trust and conversion.',
  'SEO Ready':
    'We structure titles, descriptions, headings, internal links and technical basics from day one. That gives Google a clean foundation before ongoing SEO work begins.',
  'Google Business Profile Optimisation':
    'We clean up your categories, services, photos, descriptions and local signals so Google understands what you offer. A stronger profile improves Maps visibility and conversion from search.',
  'Local Keyword Research':
    'We identify the exact searches patients use in Bengaluru neighbourhoods, not generic national keywords. This helps each page target people who are already looking nearby.',
  'On-Page SEO':
    'We improve page titles, headings, internal links, service content and local relevance. The goal is to make every important page easier for Google and patients to understand.',
  'Treatment Page Optimisation':
    'We optimise treatment pages around how patients search for pain relief, cosmetic care, implants, braces and checkups. Each page balances SEO with clear patient education.',
  'Review Generation Strategy':
    'We build a repeatable system for asking satisfied patients for reviews. More quality reviews strengthen Google visibility and patient trust.',
  'Competitor Analysis':
    'We study nearby clinics to see who ranks, why they rank and where your opportunity sits. This gives your SEO plan a practical local target.',
  'Local Citations':
    'Consistent business details across directories — Practo, JustDial, Sulekha, IndiaMART and more — help Google trust your location and contact information. We fix mismatches and build the citations that matter locally.',
  'AI Search Visibility (GEO)':
    'Patients are starting to ask ChatGPT, Gemini and Perplexity for a dentist nearby instead of just Googling it. We structure your website, Google Business Profile and reviews so AI answer engines can find and recommend your clinic — an early-mover advantage since almost no dental clinics are optimised for this yet.',
  'Monthly Reporting':
    'You get clear monthly updates on rankings, traffic, calls, reviews and next actions. Reports focus on business impact, not vanity charts.',
  'Online Appointment Booking':
    'Let patients request appointments online at any time of day. Your team receives structured details instead of scattered calls and messages.',
  'Automatic WhatsApp Reminders':
    'Send reminders before appointments so patients remember and confirm in time. This reduces no-shows without burdening reception.',
  'Appointment Confirmation':
    'Capture confirmation status clearly so your team knows which slots are secure. Better confirmation improves schedule reliability.',
  'Cancellation and Rescheduling':
    'Make cancellation and rescheduling easier to manage without losing the patient. The system keeps the conversation moving toward a new appointment.',
  'Waitlist Management':
    'When a slot opens, contact suitable waitlisted patients quickly. Empty chairs become recoverable appointments instead of lost time.',
  'Post Appointment Follow-up':
    'Send after-care messages, check recovery and prompt the next step after treatment. Patients feel looked after and clinics improve retention.',
  'Appointment Dashboard':
    'View upcoming bookings, confirmations, cancellations and open slots in one place. The team can manage the day without switching between calls, registers and chats.',
  'Google Business Profile Management':
    'We keep your profile accurate, active and conversion-focused with services, photos, posts and review prompts. This is often the fastest way for clinics to improve local discovery.',
  'Google Review Generation':
    'We create a simple process for collecting reviews from satisfied patients. Consistent review growth improves both rankings and patient confidence.',
  'Local SEO':
    'We optimise your clinic for searches in the areas patients actually use, from neighbourhood terms to treatment-specific queries. This makes visibility more relevant and valuable.',
  'WhatsApp Marketing':
    'Use WhatsApp for reminders, recalls, patient education and reactivation campaigns. Messages are timed and useful, not random broadcasts.',
  'Website Optimisation':
    'We improve existing pages for speed, clarity, conversion and local search. Small changes can often produce better calls and appointment enquiries quickly.',
  'Online Reputation Management':
    'We help monitor reviews, respond professionally and build a stronger trust profile over time. Reputation work protects the clinic as much as it promotes it.',
  'Monthly Strategy and Reporting':
    'Every month, you see what improved, what did not and what we will do next. Strategy stays connected to patient enquiries and appointments.',
  'Patient Recall System':
    'Automatically identify patients due for checkups or follow-up care. Recall campaigns bring back people who would otherwise disappear from the clinic cycle.',
  'Google Review Requests':
    'Send review requests after positive visits while the experience is still fresh. The timing increases response without making the request feel forced.',
  'Missed Appointment Recovery':
    'Follow up with patients who miss appointments and guide them toward rescheduling. Recovery automation protects revenue and keeps patients in care.',
  'New Patient Welcome':
    'Send new patients a warm welcome with location details, preparation notes and what to expect. This reduces anxiety and improves first-visit experience.',
  'Birthday Messages':
    'Send simple birthday greetings or checkup prompts that keep the clinic relationship alive. Small personal touches support long-term retention.',
  'Treatment Plan Follow-up':
    'Follow up with patients who received a treatment plan but have not booked. Timely reminders help them make decisions before interest fades.',
  'Trust Building Professional Design':
    'Create a polished dental website that feels calm, credible and easy to navigate. Patients should understand your services and trust your clinic quickly.',
  'Speed Optimised':
    'We optimise images, code and layout so pages load fast on mobile. Better speed helps both search performance and patient conversion.',
  'Doctor Profile Pages':
    'For multi-doctor clinics, each dentist can have a dedicated credibility page. Patients can choose the right provider with confidence.',
  'Treatment Pages':
    'Dedicated treatment pages explain common problems, procedures, benefits and booking steps. They support SEO while answering patient concerns.',
  'Before and After Gallery':
    'Show treatment outcomes in a clear, compliant and trust-building way. Visual proof helps patients understand what is possible before booking.',
  'SEO Ready From Day One':
    'Technical SEO, metadata, structured headings and local signals are included from launch. Your website starts with a search-friendly foundation instead of needing fixes later.',
  'Review Management':
    'Ask happy patients for reviews at the right moment and track your review growth over time. Stronger reviews improve trust before a new patient ever walks in.',
  'Simple Dashboard':
    'Track patient retention, campaign performance, reviews and recall activity in one clean dashboard. Owners get the numbers they need without opening five different tools.',
  'AI Receptionist':
    'Books, reschedules and answers common patient questions on your website chat — and WhatsApp, once that\'s set up. It holds a real conversation, not just a static form, and hands off to your staff when a question needs a human.',
  'WhatsApp Automation':
    'Appointment confirmations, reminders and broadcast messages sent automatically over WhatsApp — the channel patients already check, so nothing depends on someone remembering to send it.',
  'Missed-Call Text-Back':
    'Anyone whose call goes unanswered gets an automatic text within seconds, so an enquiry never goes cold just because the phone wasn\'t picked up in time.',
  'Unified Inbox':
    'Every channel — WhatsApp, website chat, missed calls — lands in one screen for your staff, instead of scattered across separate apps and notebooks.',
  'Recall & Reactivation':
    'Automatic 6-month checkup reminders and win-back messages for patients who have gone quiet, so your clinic keeps the patients it already has instead of losing them silently.',
  'Post-Treatment Follow-Up':
    'Automatic care instructions and check-in messages after a procedure, so patients feel looked after without your team having to remember to call.',
  'Review Automation':
    'Automatically requests a Google review after a visit, and drafts AI-suggested replies to incoming reviews so your team can respond quickly and consistently.'
};

function featureCards(items: string[]): TextBlock[] {
  return items.map((title) => ({
    title,
    body:
      featureDescriptions[title] ??
      'A practical feature built around daily clinic operations, clear ownership and measurable growth. We keep it simple enough for your team to use every day.'
  }));
}

function page(
  slug: string,
  title: string,
  description: string,
  h1: string,
  subtitle: string,
  options: Partial<SitePage> = {}
): SitePage {
  return {
    slug,
    title,
    description,
    h1,
    subtitle,
    primaryLabel: 'Book a Free 30 Min Call',
    secondaryLabel: 'See How It Works',
    final:
      'Book a free 30 minute call with Agastya. No sales pressure. Just an honest conversation about what your clinic needs to grow.',
    ...options
  };
}

export const homePage = page(
  '',
  'AgastyaOne | Practice Growth Systems for Dental Clinics in Bengaluru',
  'AgastyaOne builds the booking system, Google visibility, and WhatsApp follow-up that fills a dental chair — built exclusively for dental clinics in Bengaluru (Bangalore). Proven on a real clinic. Book a free audit call.',
  'Practice Growth Systems for Bengaluru Dental Clinics — Get Found, Get Booked, Get Them Back',
  'Websites, CRM software, automation and SEO — built by someone who has built real dental systems, not just read about them',
  {
    secondaryLabel: 'See Our Work',
    trust: [],
    intro: [
      {
        title: 'Dental Clinics',
        body:
          'From solo practitioners to multi-chair clinics — we help you get found online, fill appointments and keep patients coming back.',
        links: [{ label: 'Explore Dental Solutions', href: '/dental-solutions' }]
      }
    ],
    offerTitle: 'Everything Your Dental Clinic Needs to Grow Online',
    offers: [
      { title: 'Website Development', body: 'Professional websites that convert visitors into booked patients' },
      { title: 'CRM Software', body: 'Manage your patients, leads and follow-ups in one place' },
      { title: 'SEO Services', body: 'Get found on Google by patients already searching for a dentist' },
      { title: 'WhatsApp Automation', body: 'Stay connected with your patients automatically' },
      { title: 'Appointment Software', body: 'Fill your schedule and eliminate no-shows' },
      { title: 'Practice Automation', body: 'Remove the manual work so you can focus on patient care' }
    ],
    steps: [
      'Book a Free 30 Min Call — Tell us your clinic size, area and the one thing blocking your growth right now',
      'We Audit Before We Advise — We review your Google visibility, reviews, website and patient pipeline before the call',
      'We Go Live in 7–14 Days — Website, CRM and automations built and launched fast with zero back and forth',
      'Your Appointments Fill — Rankings, bookings and reviews tracked every month and compounded over time'
    ],
    internalLinks: [
      { label: 'Dental Solutions', href: '/dental-solutions' }
    ],
    parent: ''
  }
);

export const pages: SitePage[] = [
  page(
    'dental-solutions',
    'Dental Digital Solutions Bangalore | AgastyaOne',
    'Complete digital solutions for dental clinics in Bangalore. Websites, CRM, SEO and practice automation built for Bengaluru dental practices.',
    'Your Bengaluru Dental Clinic\'s Entire Digital Presence. One System. One Team.',
    'Website. CRM. SEO. WhatsApp automation. Appointment system. Built together so every part compounds — and your clinic keeps growing without you chasing leads manually.',
    {
      trust: ['Dental Websites Built and Live in Bengaluru', 'Built Our Own Dental Leads Management System', 'Active Across 5 Bengaluru Neighbourhoods', 'Specialists in Dental Digital Growth'],
      intro: [
        {
          title: 'DARK:Most Dental Clinics in Bengaluru Are Invisible Online',
          body:
            '78% of patients pick a clinic from the first 3 Google results. Most Bengaluru clinics don\'t appear in the top 10. If your clinic isn\'t showing up, your competitor is getting that patient — right now, today.'
        },
        {
          title: 'We Built a Dental CRM Before We Sold One',
          body:
            'We have spoken to clinic owners across Bengaluru and built our own dental leads management system from scratch — because the tools available did not work for how Indian clinics actually operate.',
          items: [
            'Built a real dental leads system — not a theory, an actual product',
            'Served clinics across Koramangala, Indiranagar, Jayanagar and JP Nagar',
            'We measure success by filled appointments — not impressions or clicks'
          ]
        }
      ],
      offerTitle: 'Everything Your Dental Clinic Needs to Grow Online',
      offers: offerCards(dentalOffers),
      steps: ['Book a Free 30 Min Call — Tell us your clinic size, area and the one thing blocking your growth right now', 'We Audit Before We Advise — We review your Google visibility, reviews, website and patient pipeline before the call', 'We Go Live in 7–14 Days — Website, CRM and automations built and launched fast with zero back and forth', 'Your Appointments Fill — Rankings, bookings and reviews tracked every month and compounded over time'],
      internalLinks: [{ label: 'Dental Solutions Bangalore', href: '/dental-solutions-bangalore' }, ...dentalLinks]
    }
  ),
  page('dental-crm-software', 'Dental CRM Software in Bangalore | AgastyaOne', 'Dental CRM software for clinics in Bengaluru. Manage patients, automate appointment reminders and build your Google reviews. Built for Indian dental practices.', 'Stop Losing Patients You Already Have', 'Most clinics lose 25% of patients every year — not to competitors, but to silence. No follow-up, no recall, no reminder. Our CRM fixes that automatically for dental clinics in Bengaluru.', {
    primaryLabel: 'Book a Free Demo',
    secondaryLabel: '↓ See What Is Included',
    intro: [
      { title: 'The Hidden Revenue Problem Every Dental Clinic Has', body: 'A clinic with 500 active patients losing 25% annually loses 125 patients every year. At Rs 3,000 average visit value, that is Rs 3,75,000 walking out the door silently — not because they were unhappy, but because nobody followed up.' },
      { title: 'Why It Keeps Happening', body: 'Your receptionist is busy with walk-ins and calls. No one has time to manually check who is overdue for a recall, who missed their appointment last week or who just had a root canal and never came back. That is not a people problem — it is a systems problem. AgastyaOne CRM solves it automatically.' }
    ],
    offerTitle: 'What You Get',
    offers: featureCards(['Patient Database', 'New Patient Enquiries', 'Appointment Reminders', 'Treatment Follow-ups', 'Recall System', 'Review Requests', 'Clinic Dashboard']),
    steps: [
      'Book a Free Demo — 30 minutes, we show you exactly how the CRM works for your clinic type',
      'We Set It Up — We configure your patient pipeline, message templates and automation sequences. Takes 3 to 5 days.',
      'Your Team Goes Live — Simple enough for your receptionist to manage between patient calls. We train them.',
      'Patients Start Coming Back — Reminders go out, recalls fire, reviews build. You watch it work.'
    ],
    faq: [
      { q: 'How long does setup take?', a: '3 to 5 working days. We handle the configuration — your team just needs a 30-minute walkthrough.' },
      { q: 'Will my receptionist actually use it?', a: 'Yes. We built this specifically for clinic receptionists, not tech teams. If they can use WhatsApp, they can use this.' },
      { q: 'Do patients need to download anything?', a: 'No. All patient communication happens through WhatsApp — nothing new for them to install or learn.' },
      { q: 'Is it suitable for a single-dentist clinic?', a: 'Absolutely. We built it for independent clinics first. Most of our users are solo practitioners or 2-dentist setups.' },
      { q: 'Is my patient data safe?', a: 'Yes. All data is stored securely, never shared with third parties and you own it completely. You can export everything at any time.' },
      { q: 'What if I want to cancel?', a: 'No long-term contracts. Monthly plans only. Cancel anytime — your data remains yours.' }
    ],
    internalLinks: [{ label: 'Dental Solutions', href: '/dental-solutions' }, { label: 'Dental CRM Bangalore', href: '/dental-crm-bangalore' }, { label: 'Dental Solutions Bangalore', href: '/dental-solutions-bangalore' }]
  }),
  page('dental-website-development', 'Dental Website Development in Bangalore | AgastyaOne', 'Professional dental website development in Bengaluru. Fast, mobile first, SEO ready websites for dental clinics that convert visitors into booked patients.', 'Dental Website Development in Bengaluru That Turns Online Visitors Into Booked Patients', 'A professional dental clinic website built specifically for Bengaluru dental clinics — mobile first, SEO ready and designed to convert visitors into booked appointments', {
    primaryLabel: 'Book a Free Consultation',
    parent: '/dental-solutions',
    trust: ['7–14 Day Delivery', 'All Content Written For You', 'Mobile First Design', 'SEO Ready From Day One'],
    intro: [
      {
        title: 'Your Patients Judge Your Clinic in Under 60 Seconds — Before They Ever Walk In',
        body: 'When a patient searches for a dentist in Koramangala or Indiranagar, they open the top 3 results, spend 15 seconds on each website and book with the one that feels most trustworthy. A slow, outdated or generic website loses that patient to your competitor every single time.'
      },
      {
        title: 'DARK:What Makes It Different From a Generic Website',
        body: 'Most web agencies build the same template with your logo swapped in. We build around how Bengaluru dental patients actually search, compare and decide. Every section, every word and every button is written for a dental patient who is hesitant, comparing options and needs a reason to trust your clinic over the one three streets away.'
      },
      {
        title: 'PRICING:Investment',
        body: 'Rs 18,000',
        items: [
          'All content written for you — not a single word to write',
          '10 pages including homepage, treatments, doctor profile and contact',
          'Mobile first design tested on real devices',
          'SEO ready from day one — local keywords and schema markup',
          'WhatsApp button and Google Reviews integration included',
          'Go live in 7 to 14 days'
        ]
      }
    ],

    steps: [
      'Free 30 Min Consultation — Tell us about your clinic, your current website situation and what you most want patients to do when they find you',
      'We Plan the Structure — We map out every page, every section and all the content before writing a single line of code',
      'You Review and Approve — You see the design direction before we build. No surprises.',
      'We Go Live in 7–14 Days — Full website launched, tested on mobile and connected to your WhatsApp and Google Business Profile'
    ],
    faq: [
      { q: 'How long does it take to build?', a: '7 to 14 days from the day we start. Most delays come from waiting for clinic photos — we handle all the writing ourselves.' },
      { q: 'Do you write all the content?', a: 'Yes. All page copy, treatment descriptions and doctor profiles are written by us. You provide basic information about the clinic and doctor and we handle the rest.' },
      { q: 'What if I already have a website?', a: 'We audit your current site first. Sometimes we improve and rebuild it. Sometimes we start fresh. We will tell you honestly which approach makes more sense for your clinic.' },
      { q: 'Will it show up on Google?', a: 'The website is built SEO-ready from day one — proper structure, local keywords and technical basics included. Ranking on Google takes ongoing SEO work over 3 to 6 months, which we offer separately.' },
      { q: 'Can I update it myself after it is built?', a: 'Yes. We build on a simple CMS so you or your receptionist can update content, add photos or change clinic timings without any technical knowledge.' },
      { q: 'What does mobile first actually mean?', a: 'Over 70% of dental searches in Bengaluru happen on mobile. Mobile first means we design for the phone screen first, test on real devices and make sure buttons, text and WhatsApp links work perfectly on every phone.' },
      { q: 'Do you build on WordPress?', a: 'It depends on your needs. We use the best tool for each clinic — sometimes WordPress, sometimes a faster custom build. We will recommend what is right for you on the call.' },
      { q: 'What about ongoing support after launch?', a: 'Yes — we offer ongoing support, updates and SEO packages. You are not left alone after the website goes live.' }
    ],
    internalLinks: [{ label: 'Dental Solutions', href: '/dental-solutions' }, { label: 'Dental Website Development Bangalore', href: '/dental-website-development-bangalore' }]
  }),
  page('dental-seo-services', 'Dental SEO Services in Bangalore | AgastyaOne', 'Dental SEO services for clinics in Bengaluru. Get your dental clinic found on Google Maps and local search in Koramangala, Indiranagar, Jayanagar and HSR Layout.', 'Dental SEO Services in Bengaluru That Get Your Clinic Found by Patients Searching on Google Right Now', 'When patients in Koramangala, Indiranagar, Jayanagar, HSR Layout and Whitefield search for a dentist near them — we make sure they find your clinic first', {
    primaryLabel: 'Book a Free SEO Audit',
    parent: '/dental-solutions',
    intro: [{ title: 'Patients Are Searching For a Dentist in Your Neighbourhood Right Now', body: 'If your clinic does not appear when patients search Google, your competitor gets that patient every single day.' }, { title: 'Results Timeline', items: ['Month 1: Foundations', 'Month 2-3: Rankings improve', 'Month 4-6: Consistent top positions', 'Month 6+: Compounding results'] }],
    offerTitle: 'What We Do',
    offers: featureCards(['Google Business Profile Optimisation', 'Local Keyword Research', 'Treatment Page Optimisation', 'Review Generation Strategy', 'Local Citations', 'AI Search Visibility (GEO)', 'Competitor Analysis', 'Monthly Reporting']),
    faq: [{ q: 'My clinic is already on Practo. Do I still need SEO?', a: 'Absolutely. Practo is rented visibility. Google ranking is an asset you own.' }, { q: 'Long term contract?', a: 'No. Monthly plans only.' }, { q: 'What is GEO / AI search visibility?', a: 'Patients are starting to ask AI tools like ChatGPT, Gemini and Perplexity for a dentist nearby instead of just Googling it. GEO structures your online presence so those tools can find and recommend your clinic. Almost no dental clinics are doing this yet — it\'s an early-mover advantage while it lasts.' }],
    internalLinks: [{ label: 'Dental Solutions', href: '/dental-solutions' }, { label: 'Dental SEO Bangalore', href: '/dental-seo-bangalore' }, { label: 'Dental Solutions Bangalore', href: '/dental-solutions-bangalore' }]
  }),
  page('dentist-appointment-software', 'Dentist Appointment Software in Bangalore | AgastyaOne', 'Dentist appointment software for Bengaluru clinics. Automate bookings, WhatsApp reminders and reduce no-shows. Built for Indian dental practices.', 'Dentist Appointment Software That Fills Your Schedule and Eliminates No-Shows in Bengaluru', 'Automate your appointment bookings, reminders and follow-ups so your reception team spends less time on the phone and more time with patients', {
    primaryLabel: 'Book a Free Demo',
    parent: '/dental-solutions',
    intro: [{ title: 'Empty Appointment Slots and No-Shows Are Costing Your Clinic Real Money Every Day', body: 'The average dental clinic in Bengaluru loses 15 to 20% of appointment revenue to no-shows and last minute cancellations every month.' }, { title: 'The Numbers', body: 'A clinic with 20 appointments per day losing 15% to no-shows can lose Rs 90,000 per month from patients who intended to come but were not reminded.' }, { title: 'Every Booking Lands Where Your Team Already Works', body: 'This isn\'t just a booking form — it\'s booking capture and routing. Requests from your website, and WhatsApp once that\'s live, are captured and land automatically in your clinic\'s CRM or a shared Sheet. Nothing gets manually copied out of a message into a register.' }],
    offerTitle: 'What You Get',
    offers: featureCards(['Online Appointment Booking', 'Automatic WhatsApp Reminders', 'Appointment Confirmation', 'Cancellation and Rescheduling', 'Waitlist Management', 'Post Appointment Follow-up', 'Appointment Dashboard']),
    faq: [
      { q: 'Can patients book outside clinic hours?', a: 'Yes. The online booking system works 24/7. Patients can request appointments at any time and your team sees the request when they open the dashboard the next morning.' },
      { q: 'What happens when a patient cancels last minute?', a: 'The system contacts the next patient on your waitlist automatically. Most clinics recover 70-80% of cancelled slots this way instead of leaving chairs empty.' },
      { q: 'Will patients actually use online booking?', a: 'Yes — especially for after-hours requests. Most dental enquiries happen between 9PM and midnight when clinics are closed. Online booking captures these patients instead of losing them.' },
      { q: 'How are WhatsApp reminders sent?', a: 'Reminders go out automatically 24 hours and 2 hours before each appointment. Patients reply to confirm or reschedule. Your team sees all confirmations in one dashboard — no manual follow-up needed.' },
      { q: 'Is there a setup fee?', a: 'No upfront setup fee. We set everything up as part of onboarding. You only pay the monthly subscription once the system is live and working for your clinic.' },
      { q: 'How long does setup take?', a: 'Most clinics are fully live within 5 to 7 days. We handle the technical setup, WhatsApp Business integration and staff training so your team doesn\'t need to figure anything out.' },
    ],
    internalLinks: [{ label: 'Dental Solutions', href: '/dental-solutions' }, { label: 'Dental Practice Automation', href: '/dental-practice-automation' }]
  }),
  page('dental-practice-automation', 'Dental Practice Automation in Bangalore | AgastyaOne', 'Dental practice automation for clinics in Bengaluru. AI receptionist, WhatsApp automation, missed-call text-back, unified inbox, recall and review automation.', 'Dental Practice Automation That Removes the Manual Work From Running Your Clinic in Bengaluru', 'An AI receptionist, WhatsApp automation and a unified inbox that handle enquiries, reminders, recalls and reviews — so your team focuses on patients, not paperwork', {
    primaryLabel: 'Book a Free Demo',
    parent: '/dental-solutions',
    intro: [{ title: 'Your Team Is Spending Hours Every Day on Work That Should Happen Automatically', body: 'Calling patients, following up enquiries, reminding checkups and asking for Google reviews can all be automated.' }, { title: 'The Impact', items: ['Before: receptionist spends hours daily on manual calls', 'After: zero manual reminder calls', 'Fewer no-shows with automatic confirmations', 'Reviews grow consistently every month'] }],
    offerTitle: 'What We Automate',
    offers: featureCards(['AI Receptionist', 'WhatsApp Automation', 'Missed-Call Text-Back', 'Unified Inbox', 'Recall & Reactivation', 'Post-Treatment Follow-Up', 'Review Automation']),
    faq: [{ q: 'Will automated messages feel impersonal?', a: 'Done correctly, no. Messages use patient name and context.' }, { q: 'Can I customise the messages?', a: 'Yes completely. You approve everything before it goes live.' }, { q: 'Does the AI receptionist replace my front desk?', a: 'No — it handles the overflow: after-hours enquiries, simple bookings and repeat questions, so your team isn\'t interrupted for every one of them. Anything it can\'t resolve gets handed to your staff.' }],
    internalLinks: [{ label: 'Dental Solutions', href: '/dental-solutions' }, { label: 'Dentist Appointment Software', href: '/dentist-appointment-software' }]
  }),
  page('dental-solutions-bangalore', 'Dental Digital Solutions in Bangalore | AgastyaOne', 'Complete digital solutions for dental clinics in Bangalore. Websites, CRM, SEO and practice automation for clinics across Koramangala, Indiranagar, Jayanagar and HSR Layout.', 'Complete Digital Solutions For Dental Clinics in Bangalore That Want to Grow Their Patient Base', 'Websites, CRM, SEO, appointment software and practice automation — built specifically for dental clinics across Koramangala, Indiranagar, Jayanagar, HSR Layout and Whitefield', {
    intro: [{ title: 'The Bangalore Dental Patient Journey', items: ['Search: Patient searches dentist near me on Google', 'Compare: They check star ratings, reviews and photos', 'Visit Website: They judge professionalism and services', 'Contact: They call, WhatsApp or book online', 'Return: They come back and leave a Google review'] }, { title: 'Neighbourhoods We Serve', items: bangaloreNeighbourhoods }],
    offerTitle: 'What We Offer',
    offers: offerCards(dentalOffers),
    internalLinks: [{ label: 'Dental Solutions', href: '/dental-solutions' }, ...dentalLinks]
  }),
  page('dental-crm-bangalore', 'Dental CRM Software in Bangalore | AgastyaOne', 'Dental CRM software for clinics in Bangalore. Manage patients, automate WhatsApp reminders and build a recall system that keeps patients coming back.', 'Dental CRM Software in Bangalore That Helps Your Clinic Retain Patients and Fill Appointments Every Month', 'Manage your patients, automate follow-ups and build a recall system that brings patients back — built specifically for dental clinics across Koramangala, Indiranagar, Jayanagar, HSR Layout and Whitefield', {
    primaryLabel: 'Book a Free Demo',
    intro: [{ title: 'The Bangalore Dental Retention Problem', body: 'For a Bangalore clinic with 300 active patients losing 25% annually, that is 75 patients walking away every year and significant lost revenue.' }, { title: 'Built for Bangalore Dental Clinics', body: 'Simple enough for a receptionist to manage between patient calls and powerful enough for a growing multi-chair practice.' }],
    faq: [{ q: 'We already use a register and WhatsApp group. Why do we need a CRM?', a: 'A register is manual and reactive. A CRM is automatic and proactive.' }],
    internalLinks: [{ label: 'Dental CRM Software', href: '/dental-crm-software' }, { label: 'Dental Solutions Bangalore', href: '/dental-solutions-bangalore' }]
  }),
  page('dental-seo-bangalore', 'Dental SEO in Bangalore | AgastyaOne', 'Dental SEO services for clinics in Bangalore. Get your dental clinic to the top of Google Maps in Koramangala, Indiranagar, Jayanagar, HSR Layout and Whitefield. Free audit.', 'Dental SEO in Bangalore That Gets Your Clinic to the Top of Google When Patients Search for a Dentist', 'When patients in Koramangala, Indiranagar, Jayanagar, HSR Layout and Whitefield search for a dentist near them — we make sure they find your clinic before they find your competitors', {
    primaryLabel: 'Book a Free SEO Audit',
    intro: [{ title: 'Neighbourhood Breakdown', items: bangaloreNeighbourhoods }],
    faq: [{ q: 'My clinic already has a Practo listing. Do I still need dental SEO?', a: 'Absolutely. Practo is rented visibility. Google ranking is an asset your clinic owns permanently.' }, { q: 'My clinic has no website. Can you still do SEO?', a: 'Yes. We can start with Google Business Profile immediately.' }],
    internalLinks: [{ label: 'Dental SEO Services', href: '/dental-seo-services' }, { label: 'Dental Solutions Bangalore', href: '/dental-solutions-bangalore' }]
  }),
  page('dental-website-development-bangalore', 'Dental Website Development in Bangalore | AgastyaOne', 'Professional dental website development in Bangalore. Fast, mobile first, SEO ready websites for dental clinics across Koramangala, Indiranagar, Jayanagar and HSR Layout.', 'Dental Website Development in Bangalore That Turns Google Visitors Into Booked Patients', 'Professional dental clinic websites built for practices across Koramangala, Indiranagar, Jayanagar, HSR Layout and Whitefield — fast, mobile first, SEO ready and built to convert visitors into appointments', {
    primaryLabel: 'Book a Free Consultation',
    intro: [{ title: 'What Bangalore Dental Patients Look For', body: 'They want trust, doctor credentials, the specific treatment they need, genuine patient reviews and instant WhatsApp contact. We build every element around these needs.' }, { title: 'Bangalore Neighbourhood Specific Approach', items: bangaloreNeighbourhoods }],
    offerTitle: 'What We Build',
    offers: featureCards(['Trust Building Professional Design', 'Mobile First', 'Speed Optimised', 'Doctor Profile Pages', 'Treatment Pages', 'WhatsApp Appointment Button', 'Google Reviews Integration', 'Before and After Gallery', 'Location and Maps Integration', 'SEO Ready From Day One']),
    faq: [{ q: 'How long to build?', a: '7 to 14 days.' }, { q: 'My clinic is newly opened. Is it too early?', a: 'The opposite. A new clinic needs a strong website from day one.' }],
    internalLinks: [{ label: 'Dental Website Development', href: '/dental-website-development' }, { label: 'Dental Solutions Bangalore', href: '/dental-solutions-bangalore' }]
  }),
  page('about', 'About AgastyaOne | Dental Digital Solutions Bengaluru', 'AgastyaOne is a Bengaluru based dental technology company building end-to-end digital solutions for dental clinics — websites, CRM, SEO and automation — starting with Bengaluru.', 'Building the Technology Layer That Dental Clinics in India Are Missing', 'Most technology built for dental clinics was designed for the US market, sold by agencies that have never sat inside a clinic and built by teams that do not understand how Indian dental practices actually operate. AgastyaOne is fixing that.', {
    intro: [
      {
        title: 'Why We Started With Dental',
        body: 'AgastyaOne was built with a clear long-term goal — to become a technology company that solves every digital problem a business has. We started with dental clinics because the gap here is enormous. Dental clinics in Bengaluru are running on WhatsApp groups, paper registers and generic tools built for completely different markets. The opportunity to build something purpose-built and genuinely useful was obvious.'
      },
      {
        title: 'What We Actually Built',
        body: 'We did not start by selling services. We started by building. A dental leads management CRM from scratch — designed around how Indian clinic receptionists actually work, not how US software assumes they work. Then websites. Then SEO. Then automation. Everything we sell we built and tested ourselves first.'
      },
      {
        title: 'What Makes Us Different',
        body: 'We are not a generic digital agency that added dental to our service list. We are not a software company that hired salespeople. We are a small focused team building end-to-end technology for one industry — dental — in one city first — Bengaluru — with the intention of getting it right before getting it big.'
      },
      {
        title: 'Where We Are Right Now',
        body: 'We are early. We are building. We are selective about the clinics we work with because every early client shapes what AgastyaOne becomes. If you want to be part of building something from the ground up — not buying an off-the-shelf product — this is for you.'
      }
    ],
    internalLinks: [{ label: 'Dental Solutions', href: '/dental-solutions' }, { label: 'Contact', href: '/contact' }]
  })
];

export const allPages = [homePage, ...pages];

export function getPage(slug: string) {
  return allPages.find((item) => item.slug === slug);
}

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'AgastyaOne',
    description: 'Dental digital solutions in Bengaluru — websites, CRM, SEO and automation for dental clinics',
    url: 'https://agastyaone.vercel.app',
    email: 'kancharlaagastya@gmail.com',
    telephone: '+91-8951553531',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Nayak Layout, 8th Phase, J. P. Nagar',
      addressLocality: 'Bengaluru',
      addressRegion: 'Karnataka',
      postalCode: '560076',
      addressCountry: 'IN'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '12.9082',
      longitude: '77.5717'
    },
    areaServed: ['Koramangala', 'Indiranagar', 'Jayanagar', 'HSR Layout', 'Whitefield', 'J. P. Nagar', 'Bengaluru'],
    sameAs: ['https://agastyaone.vercel.app']
  };
}

export function faqSchemaForPage(page: SitePage) {
  if (!page.faq || page.faq.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: page.faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a
      }
    }))
  };
}

export function getLocationContent(page: SitePage) {
  if (!page.slug.endsWith('-bangalore')) return null;

  const neighbourhood = 'Bengaluru';

  return {
    neighbourhood,
    problemTitle: `${neighbourhood} Competition Is Getting Sharper`,
    problemBody: `${neighbourhood} is one of Bengaluru's most competitive markets for dental clinics. Practices here compete not just on quality but on visibility, reputation and systems. The ones winning are the ones who invested in the right technology early.`,
    whyTitle: `Why AgastyaOne For ${neighbourhood}`,
    whyBody: `We have worked with dental clinics across ${neighbourhood}. We know the local patient, the local competition and exactly what it takes to stand out in this area.`,
    faq: [
      {
        q: `Do you work with dental clinics across different Bengaluru neighbourhoods?`,
        a: `Yes. We build dental digital growth systems for clinics across Koramangala, Indiranagar, Jayanagar, HSR Layout, Whitefield and wider Bengaluru.`
      },
      {
        q: `Can this be tailored to my exact area in Bengaluru?`,
        a: 'Yes. Local search terms, patient behaviour, review strategy and page content are adjusted around your neighbourhood and the competitors around you.'
      },
      {
        q: 'How quickly can a Bengaluru clinic launch these improvements?',
        a: 'Most website, CRM and automation foundations can be launched in 7 to 14 days. SEO work starts immediately and compounds over the following months.'
      }
    ]
  };
}





