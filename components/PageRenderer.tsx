import dynamic from 'next/dynamic';
import { CardGrid, ContactStrip, FAQ, Hero, Section, Steps, TextSections, TrustBar } from './Sections';
import { ParallaxComponent } from './ui/parallax-scrolling';
import { faqSchemaForPage, getLocationContent, type SitePage } from '@/lib/site-data';

// Heavy, page-specific components — loaded only when the relevant page renders
const WebsitePagesTabs = dynamic(() => import('./WebsitePagesTabs').then(m => m.WebsitePagesTabs));
const CRMDemo = dynamic(() => import('./CRMDemo').then(m => m.CRMDemo));
const ServicesInteractive = dynamic(() => import('./ServicesInteractive').then(m => m.ServicesInteractive));
const AgencyVsUs = dynamic(() => import('./AgencyVsUs').then(m => m.AgencyVsUs));
const BookingWidget = dynamic(() => import('./BookingWidget').then(m => m.BookingWidget));
const AppointmentFeatureTabs = dynamic(() => import('./AppointmentFeatureTabs').then(m => m.AppointmentFeatureTabs));
const InvisibilityCalculator = dynamic(() => import('./InvisibilityCalculator').then(m => m.InvisibilityCalculator));
const SEOProofStrip = dynamic(() => import('./SEOPageContent').then(m => m.SEOProofStrip));
const TwoTrackSection = dynamic(() => import('./SEOPageContent').then(m => m.TwoTrackSection));
const TimelineSection = dynamic(() => import('./SEOPageContent').then(m => m.TimelineSection));
const SEOFaq = dynamic(() => import('./SEOPageContent').then(m => m.SEOFaq));
const SEOFeatureTabs = dynamic(() => import('./SEOFeatureTabs').then(m => m.SEOFeatureTabs));
const CRMFeaturesSection = dynamic(() => import('./CRMFeaturesSection').then(m => m.CRMFeaturesSection));
const MarketingFeatureTabs = dynamic(() => import('./MarketingFeatureTabs').then(m => m.MarketingFeatureTabs));
const AboutPage = dynamic(() => import('./AboutPage').then(m => m.AboutPage));

export function PageRenderer({ page, schema = false }: { page: SitePage; schema?: boolean }) {
  const isAppointmentPage = page.slug === 'dentist-appointment-software';
  const ctas = [
    { label: page.primaryLabel ?? 'Book a Free 30 Min Call', href: '/contact' },
    { label: page.secondaryLabel ?? 'See How It Works', href: isAppointmentPage ? '#booking-demo' : (page.parent || page.internalLinks?.[0]?.href || '/blog') }
  ];
  const locationContent = getLocationContent(page);
  const faqSchema = faqSchemaForPage(page);

  return (
    <>
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
      {page.slug === '' ? (
        <ParallaxComponent
          eyebrow="✨ Bengaluru growth systems"
          title={page.h1}
          subtitle={page.subtitle}
          primaryCta={ctas[0]}
          secondaryCta={ctas[1]}
        />
      ) : (
        <Hero
          title={page.h1}
          subtitle={page.subtitle}
          ctas={ctas}
          imageAlt={`${page.h1} dashboard illustration`}
          showCRM={page.slug === 'dental-solutions' || page.slug === 'dental-crm-software'}
          showWebsitePanel={page.slug === 'dental-website-development'}
          showAboutPanel={page.slug === 'about'}
          slug={page.slug}
        />
      )}
      {page.trust && page.trust.length > 0 && <TrustBar items={page.trust} />}

      {/* About page — completely custom, skip all generic sections */}
      {page.slug === 'about' ? (
        <AboutPage />
      ) : page.slug === '' ? (
        <CRMDemo />
      ) : page.slug === 'dental-seo-services' ? (
        <>
          <SEOProofStrip />
          <InvisibilityCalculator />
          <TwoTrackSection />
          <TimelineSection />
        </>
      ) : page.slug === 'dental-crm-software' ? (
        page.intro && (
          <section style={{ background: '#F8F6F3', padding: '40px 0 48px' }}>
            <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 clamp(1rem,5vw,2rem)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 16 }}>
              <div style={{ background: '#1A1A2E', borderRadius: 18, padding: '24px 24px 20px', boxShadow: '0 12px 40px rgba(26,26,46,0.12)' }}>
                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 800, fontSize: 42, color: '#E86C2F', lineHeight: 1 }}>₹3.75L</div>
                  <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>Lost per year · avg clinic</div>
                </div>
                <h3 style={{ fontFamily: 'Poppins,sans-serif', fontSize: 16, fontWeight: 700, color: '#fff', margin: '0 0 10px', lineHeight: 1.3 }}>{page.intro[0].title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 13, lineHeight: 1.75, margin: 0 }}>{page.intro[0].body}</p>
              </div>
              <div style={{ background: '#fff', borderRadius: 18, padding: '24px 24px 20px', borderLeft: '4px solid #E86C2F', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(232,108,47,0.08)', border: '1px solid rgba(232,108,47,0.15)', borderRadius: 99, padding: '3px 12px', fontSize: 11, fontWeight: 700, color: '#E86C2F', marginBottom: 14, width: 'fit-content' }}>WHY THIS HAPPENS</div>
                <h3 style={{ fontFamily: 'Poppins,sans-serif', fontSize: 16, fontWeight: 700, color: '#1A1A2E', margin: '0 0 10px', lineHeight: 1.3 }}>{page.intro[1].title}</h3>
                <p style={{ color: '#6B7280', fontSize: 13, lineHeight: 1.75, margin: 0 }}>{page.intro[1].body}</p>
              </div>
            </div>
          </section>
        )
      ) : page.slug === 'dental-marketing-services' ? (
        page.intro && (
          <section style={{ background: '#F8F6F3', padding: '40px 0 48px' }}>
            <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 clamp(1rem,5vw,2rem)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 16 }}>
              <div style={{ background: '#1A1A2E', borderRadius: 18, padding: '24px 24px 20px', boxShadow: '0 12px 40px rgba(26,26,46,0.12)' }}>
                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 800, fontSize: 38, color: '#E86C2F', lineHeight: 1 }}>Word of Mouth</div>
                  <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>is not a growth strategy</div>
                </div>
                <h3 style={{ fontFamily: 'Poppins,sans-serif', fontSize: 16, fontWeight: 700, color: '#fff', margin: '0 0 10px', lineHeight: 1.3 }}>{page.intro[0].title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 13, lineHeight: 1.75, margin: 0 }}>{page.intro[0].body}</p>
              </div>
              <div style={{ background: '#fff', borderRadius: 18, padding: '24px 24px 20px', borderLeft: '4px solid #E86C2F', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(232,108,47,0.08)', border: '1px solid rgba(232,108,47,0.15)', borderRadius: 99, padding: '3px 12px', fontSize: 11, fontWeight: 700, color: '#E86C2F', marginBottom: 14, width: 'fit-content' }}>IS THIS YOU?</div>
                <h3 style={{ fontFamily: 'Poppins,sans-serif', fontSize: 16, fontWeight: 700, color: '#1A1A2E', margin: '0 0 12px', lineHeight: 1.3 }}>{page.intro[1].title}</h3>
                {page.intro[1].items?.map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, padding: '6px 0', borderBottom: i < (page.intro![1].items?.length ?? 0) - 1 ? '1px solid #F3F4F6' : 'none' }}>
                    <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'rgba(232,108,47,0.1)', border: '1px solid rgba(232,108,47,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                      <span style={{ color: '#E86C2F', fontSize: 9, fontWeight: 700 }}>✓</span>
                    </div>
                    <span style={{ color: '#374151', fontSize: 13, lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )
      ) : page.intro && (
        <Section tint>
          <TextSections sections={page.intro} />
        </Section>
      )}
      {isAppointmentPage && (
        <Section title="See How the Booking Flow Works" body="Try it yourself — this is exactly what your patients experience when they book through your clinic.">
          <BookingWidget />
        </Section>
      )}
      {page.slug === 'dental-website-development' && <WebsitePagesTabs />}
      {page.offers && (
        page.slug === '' || page.slug === 'dental-solutions' ? (
          <ServicesInteractive />
        ) : page.slug === 'dental-seo-services' ? (
          <Section title="What We Do" body="Tap any area to see exactly what's included and what it does.">
            <SEOFeatureTabs />
          </Section>
        ) : isAppointmentPage ? (
          <Section title={page.offerTitle ?? 'What We Offer'} body="Tap any feature to see how it works. Auto-cycles through all 7.">
            <AppointmentFeatureTabs />
          </Section>
        ) : page.slug === 'dental-crm-software' ? (
          <CRMFeaturesSection />
        ) : page.slug === 'dental-marketing-services' ? (
          <Section title="What We Do" body="Tap any service — see exactly what we do and what it produces.">
            <MarketingFeatureTabs />
          </Section>
        ) : (
          <Section title={page.offerTitle ?? 'What We Offer'}>
            <CardGrid cards={page.offers} />
          </Section>
        )
      )}
      {(page.slug === '' || page.slug === 'dental-solutions') && <AgencyVsUs />}
      {page.steps && (
        <Section title="Getting Started Is Simple" tint>
          <Steps steps={page.steps} />
        </Section>
      )}
      {page.faq && page.slug !== 'dental-seo-services' && (
        <Section title="FAQ">
          <FAQ items={page.faq} />
        </Section>
      )}
      {page.slug === 'dental-seo-services' && <SEOFaq />}
      {locationContent && (
        <>
          <Section title={locationContent.problemTitle} body={locationContent.problemBody} tint />
          <Section title={locationContent.whyTitle} body={locationContent.whyBody} />
          <Section title={`${locationContent.neighbourhood} FAQ`} tint>
            <FAQ items={locationContent.faq} />
          </Section>
        </>
      )}
      {page.slug !== 'about' && <ContactStrip />}
    </>
  );
}


