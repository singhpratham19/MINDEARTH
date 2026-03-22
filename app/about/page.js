import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Fade from "@/components/Fade";
import CountUp from "@/components/CountUp";
import { clientLogos } from "@/lib/data";

const values = [
  ["Integrity Without Compromise", "Research shaped by data, not convenience. We report what the data reveals."],
  ["Purpose-Driven Excellence", "Same intensity for a 10-page brief as a year-long advisory engagement."],
  ["Collaborative Intelligence", "Clients as co-creators, not passive recipients of findings."],
  ["Radical Transparency", "Open about methodologies, assumptions, and limitations."],
  ["Innovation with Impact", "New tools and indices, always in service of measurable outcomes."],
  ["Global Mindset, Local Depth", "International standards calibrated to regional realities."],
];

const story = [
  ["The Problem", "ESG intelligence remained fragmented, performative, and disconnected from actual market dynamics.", "border-red-400", "bg-red-50", "text-red-700"],
  ["The Gap", "Growth-stage enterprises and emerging market corporations were underserved — those most in need of integrated ESG intelligence.", "border-amber-400", "bg-amber-50", "text-amber-700"],
  ["The Solution", "MindEarth was built as an integrated research and solutions company — market intelligence and ESG expertise as a single unified discipline.", "border-emerald-500", "bg-emerald-50", "text-emerald-700"],
  ["The Vision", "When organisations have the right intelligence, they make better decisions — for shareholders, communities, and future generations.", "border-sky-500", "bg-sky-50", "text-sky-700"],
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      {/* Hero with image */}
      <section className="relative h-[50vh] min-h-[360px] flex items-center overflow-hidden">
        <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&q=80" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/85 to-emerald-900/70" />
        <div className="relative z-10 max-w-7xl mx-auto px-5 text-center">
          <Fade><p className="text-emerald-300 text-xs font-bold tracking-[0.2em] uppercase mb-3">About MindEarth</p>
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">Intelligence That Moves the World<br className="hidden sm:block" /> Toward a Sustainable Future</h1>
          <p className="text-sm text-white/50 max-w-lg mx-auto mt-4">Making ESG intelligence accessible, credible, and actionable for every organisation.</p></Fade>
        </div>
      </section>

      <div className="bg-white border-b border-gray-100 py-3 px-5"><div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-gray-400"><Link href="/" className="hover:text-emerald-600">Home</Link><span>/</span><span className="text-gray-700 font-medium">About</span></div></div>

      {/* Mission + Vision */}
      <section className="bg-white py-14 px-5">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
          {[["Our Mission", "MindEarth bridges the gap between the world's most pressing sustainability challenges and the actionable intelligence businesses need. We empower organisations to understand, measure, and improve ESG performance — as a genuine source of competitive advantage.", "border-emerald-500"],
            ["Our Vision", "To be the world's most trusted ESG intelligence partner, accelerating the transition to a sustainable global economy. The firm Fortune 500 companies and sovereign wealth funds turn to for ESG clarity.", "border-sky-500"]
          ].map(([t, d, b]) => <Fade key={t}><div className={`border-l-4 ${b} pl-6`}><h2 className="font-heading text-xl font-bold text-brand-dark mb-3">{t}</h2><p className="text-sm text-gray-500 leading-relaxed">{d}</p></div></Fade>)}
        </div>
      </section>

      {/* Stats */}
      <section className="bg-emerald-50 py-12 px-5">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-around gap-8 text-center">
          {[[300,"+","Reports"],[850,"+","Clients"],[40,"+","Countries"],[550,"+","Analysts"],[98,"%","Retention"]].map(([n,s,l])=><Fade key={l}><div><div className="font-heading text-3xl font-bold text-emerald-600"><CountUp end={n} suffix={s}/></div><div className="text-xs text-emerald-700 font-medium mt-1">{l}</div></div></Fade>)}
        </div>
      </section>

      {/* Brand Story */}
      <section className="bg-brand-light py-14 px-5">
        <div className="max-w-7xl mx-auto">
          <Fade><p className="text-[11px] font-bold tracking-[0.2em] text-emerald-600 uppercase mb-2">Our Story</p><h2 className="font-heading text-2xl font-bold text-brand-dark mb-8">Born from a conviction the world deserves better ESG intelligence</h2></Fade>
          <div className="space-y-4 max-w-3xl">
            {story.map(([phase, body, brd, bg, clr], i) => (
              <Fade key={phase} delay={i * 0.08}>
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden flex">
                  <div className={`w-1 shrink-0 ${brd.replace("border-", "bg-")}`} />
                  <div className="flex items-start gap-4 p-5 flex-1">
                    <span className={`text-[10px] font-bold tracking-wider uppercase whitespace-nowrap px-2.5 py-1 rounded ${bg} ${clr}`}>{phase}</span>
                    <p className="text-sm text-gray-500 leading-relaxed">{body}</p>
                  </div>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* Client Logos */}
      <section className="bg-white py-10 px-5 border-y border-gray-100">
        <div className="max-w-7xl mx-auto text-center">
          <Fade><p className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase mb-5">Trusted by Leading Institutions Worldwide</p>
          <div className="flex justify-center gap-8 md:gap-12 flex-wrap opacity-30">{clientLogos.map(c => <span key={c} className="text-xs font-bold text-gray-800 tracking-wide whitespace-nowrap">{c}</span>)}</div></Fade>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-white py-14 px-5">
        <div className="max-w-7xl mx-auto">
          <Fade><p className="text-[11px] font-bold tracking-[0.2em] text-emerald-600 uppercase mb-2">Core Values</p><h2 className="font-heading text-2xl font-bold text-brand-dark mb-8">Six principles that govern everything we do</h2></Fade>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{values.map(([t, d], i) => <Fade key={t} delay={i*0.05}><div className="bg-brand-light rounded-xl p-5 border border-gray-200 hover:border-emerald-200 transition-all h-full group"><div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3 text-sm font-bold font-heading group-hover:bg-emerald-500 group-hover:text-white transition-colors">{i+1}</div><h3 className="font-heading text-sm font-bold text-brand-dark mb-1.5">{t}</h3><p className="text-xs text-gray-500 leading-relaxed">{d}</p></div></Fade>)}</div>
        </div>
      </section>

      {/* Methodology */}
      <section className="bg-gray-900 py-14 px-5">
        <div className="max-w-7xl mx-auto">
          <Fade><div className="text-center mb-10"><p className="text-[11px] font-bold tracking-[0.2em] text-amber-400 uppercase mb-2">How We Work</p><h2 className="font-heading text-2xl font-bold text-white">Research Methodology</h2></div></Fade>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[["01","Market Scoping","Define boundaries using proprietary L1 framework with official sources.","🔍"],["02","Triangulation","Cross-validate via top-down, bottom-up, and revenue benchmarking.","📐"],["03","Segmentation","Build projections across type, application, geography using L2 framework.","📊"],["04","Validation","Expert interviews, peer review, sensitivity analysis before publication.","✅"]].map(([n,t,d,ic],i) => <Fade key={n} delay={i*0.08}><div className="bg-white/[0.04] rounded-xl p-6 border border-white/[0.06] h-full relative"><span className="font-heading text-3xl font-bold text-amber-400/20 absolute top-4 right-5">{n}</span><div className="text-2xl mb-3">{ic}</div><h3 className="text-sm font-semibold text-white mb-2">{t}</h3><p className="text-xs text-gray-500 leading-relaxed">{d}</p></div></Fade>)}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="relative py-16 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1600&q=80" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/90 to-gray-900/80" />
        <div className="relative z-10 max-w-3xl mx-auto px-5 text-center">
          <Fade><p className="text-emerald-300 text-xs font-bold tracking-[0.2em] uppercase mb-3">Our Team</p>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-4">"We are a people-first organisation"</h2>
          <p className="text-sm text-white/50 leading-relaxed mb-6">550+ research analysts, sector specialists, and ESG advisors across 3 global offices. Deep domain expertise combined with genuine passion for sustainability outcomes.</p>
          <div className="flex justify-center gap-6 flex-wrap">{[["Pune, India","HQ"],["London, UK","Europe Hub"],["Singapore","Asia Hub"]].map(([city, role]) => <div key={city} className="bg-white/10 backdrop-blur rounded-lg px-4 py-2 border border-white/10"><p className="text-sm font-semibold text-white">{city}</p><p className="text-[10px] text-emerald-300">{role}</p></div>)}</div></Fade>
        </div>
      </section>

      <Footer />
    </>
  );
}
