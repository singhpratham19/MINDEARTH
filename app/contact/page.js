"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Fade from "@/components/Fade";
import { clientLogos } from "@/lib/data";

const faqs = [
  ["How do I get a free sample report?", "Click 'Download Sample' on any report page, or contact us and we'll send one directly within 2 hours."],
  ["What's included in a custom research engagement?", "Bespoke scope, dedicated analyst team, Excel data models, 6-year forecasts, company profiles, and 30-day post-delivery support."],
  ["Do you offer annual subscriptions?", "Yes — our Enterprise plans include annual access to all syndicated reports in your chosen industry verticals plus analyst support hours."],
  ["Can I speak to an analyst before purchasing?", "Absolutely. Schedule a free 30-minute call and our sector specialist will walk you through scope, methodology, and sample findings."],
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <>
      <Navbar />
      <section className="relative h-[40vh] min-h-[280px] flex items-center overflow-hidden">
        <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/85 to-emerald-900/70" />
        <div className="relative z-10 max-w-7xl mx-auto px-5 text-center"><Fade><p className="text-emerald-300 text-xs font-bold tracking-[0.2em] uppercase mb-2">Contact Us</p><h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-white mb-3">Let's Build Your ESG Strategy Together</h1><p className="text-sm text-white/50 max-w-lg mx-auto">Report purchases, custom research, or strategic advisory — our team is ready.</p></Fade></div>
      </section>
      <div className="bg-white border-b border-gray-100 py-3 px-5"><div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-gray-400"><Link href="/" className="hover:text-emerald-600">Home</Link><span>/</span><span className="text-gray-700 font-medium">Contact</span></div></div>

      {/* 3 Quick-Action Cards */}
      <section className="bg-brand-light py-10 px-5 border-b border-gray-100">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-4">
          {[["📊","Buy a Report","Browse our 300+ syndicated ESG reports and purchase instantly.","/reports","Browse Reports"],
            ["🔬","Request Custom Research","Bespoke market research tailored to your specific needs.","/contact","Get Proposal"],
            ["💬","Book a Consultation","30-minute free call with our ESG specialists.","/contact","Schedule Call"]
          ].map(([icon, title, desc, href, cta], i) => (
            <Fade key={title} delay={i * 0.06}>
              <div className="bg-white rounded-xl p-6 border border-gray-200 hover:border-emerald-200 hover:shadow-md transition-all text-center">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-2xl mx-auto mb-3">{icon}</div>
                <h3 className="font-heading text-sm font-bold text-brand-dark mb-2">{title}</h3>
                <p className="text-xs text-gray-500 mb-4">{desc}</p>
                <Link href={href} className="bg-emerald-500 text-white text-xs font-semibold px-5 py-2 rounded-lg hover:bg-emerald-600 transition inline-block">{cta}</Link>
              </div>
            </Fade>
          ))}
        </div>
      </section>

      {/* Form + Sidebar */}
      <section className="bg-white py-14 px-5">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3">
            <Fade><h2 className="font-heading text-xl font-bold text-brand-dark mb-6">Get in Touch</h2></Fade>
            {submitted ? (
              <Fade><div className="bg-emerald-50 rounded-2xl p-10 text-center border border-emerald-100">
                <div className="w-14 h-14 rounded-full bg-emerald-500 flex items-center justify-center mx-auto mb-4"><svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}><path d="M5 13l4 4L19 7"/></svg></div>
                <h3 className="font-heading text-lg font-bold text-emerald-700 mb-2">Message Sent Successfully</h3>
                <p className="text-sm text-gray-500">Our team will respond within 24 hours.</p>
              </div></Fade>
            ) : (
              <Fade><div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  {[["Full Name *","text","Your name"],["Email *","email","you@company.com"],["Phone","tel","+91 98765 43210"],["Job Title","text","e.g. Head of Sustainability"]].map(([l,t,p])=><div key={l}><label className="text-xs font-semibold text-gray-600 mb-1.5 block">{l}</label><input type={t} placeholder={p} className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-50 transition placeholder:text-gray-400"/></div>)}
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><label className="text-xs font-semibold text-gray-600 mb-1.5 block">Organisation</label><input placeholder="Company name" className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-50 placeholder:text-gray-400"/></div>
                  <div><label className="text-xs font-semibold text-gray-600 mb-1.5 block">Interest Area</label><select className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-sky-400 text-gray-600 cursor-pointer"><option>Select...</option><option>Syndicated Reports</option><option>Custom Research</option><option>BRSR Advisory</option><option>ESG Strategy</option><option>Climate Risk</option><option>Training</option><option>Partnership</option><option>Other</option></select></div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><label className="text-xs font-semibold text-gray-600 mb-1.5 block">Budget Range</label><select className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-lg outline-none text-gray-600"><option>Select (optional)...</option><option>Under ₹5L</option><option>₹5L – ₹15L</option><option>₹15L – ₹50L</option><option>₹50L+</option></select></div>
                  <div><label className="text-xs font-semibold text-gray-600 mb-1.5 block">Timeline</label><select className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-lg outline-none text-gray-600"><option>Select (optional)...</option><option>Immediate</option><option>1-3 months</option><option>3-6 months</option><option>6+ months</option></select></div>
                </div>
                <div><label className="text-xs font-semibold text-gray-600 mb-1.5 block">How can we help? *</label><textarea rows={4} placeholder="Tell us about your research needs..." className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-50 resize-vertical placeholder:text-gray-400"/></div>
                <div className="flex items-start gap-2"><input type="checkbox" className="mt-1 accent-emerald-500"/><span className="text-xs text-gray-500">I agree to receive ESG insights from MindEarth. Unsubscribe anytime.</span></div>
                <button onClick={() => setSubmitted(true)} className="bg-emerald-500 text-white font-semibold text-sm px-7 py-3 rounded-lg hover:bg-emerald-600 transition shadow-sm">Send Message</button>
              </div></Fade>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2 space-y-5">
            <Fade delay={0.1}>
              <div className="bg-brand-light rounded-xl p-5 border border-gray-200">
                <p className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase mb-4">Global Presence</p>
                {[["📍","Pune, India","HQ — South Asia & Middle East"],["📍","London, UK","Europe & Africa Hub"],["📍","Singapore","Southeast Asia Hub"]].map(([ic,city,role],i)=><div key={city} className={`flex items-start gap-3 ${i<2?"pb-3 mb-3 border-b border-gray-200":""}`}><div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center text-base shrink-0">{ic}</div><div><p className="text-sm font-semibold text-gray-800">{city}</p><p className="text-[10px] text-gray-500">{role}</p></div></div>)}
              </div>
            </Fade>
            <Fade delay={0.15}>
              <div className="bg-brand-light rounded-xl p-5 border border-gray-200">
                <p className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase mb-4">Direct Contact</p>
                {[["📧","hello@mindearth.co","General"],["☎","+91 20 1234 5678","India"],["☎","+1 617 765 2493","International"]].map(([ic,val,label])=><div key={val} className="flex items-center gap-3 mb-2.5"><span className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-sm">{ic}</span><div><p className="text-sm font-medium text-gray-800">{val}</p><p className="text-[10px] text-gray-400">{label}</p></div></div>)}
                <div className="mt-3 pt-3 border-t border-gray-200 flex items-center gap-2"><span className="text-[10px] text-gray-400">Office hours:</span><span className="text-[11px] font-medium text-gray-600">Mon–Fri, 9am–6pm IST</span></div>
              </div>
            </Fade>
            <Fade delay={0.2}>
              <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-100">
                <h3 className="font-heading text-sm font-bold text-emerald-800 mb-2">We respond within 24 hours</h3>
                <p className="text-xs text-emerald-700/70 leading-relaxed mb-3">For urgent requests, call our priority line or schedule an immediate callback.</p>
                <button className="bg-emerald-500 text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-emerald-600 transition">Schedule Callback</button>
              </div>
            </Fade>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-brand-light py-12 px-5">
        <div className="max-w-3xl mx-auto">
          <Fade><p className="text-[11px] font-bold tracking-[0.2em] text-emerald-600 uppercase mb-2">Pre-Sales FAQ</p><h2 className="font-heading text-xl font-bold text-brand-dark mb-6">Common Questions</h2></Fade>
          {faqs.map(([q,a],i) => <Fade key={i} delay={i*0.04}><div className="border-b border-gray-200 cursor-pointer" onClick={()=>setOpenFaq(openFaq===i?null:i)}><div className="flex justify-between items-center py-3.5"><span className="text-sm font-semibold text-brand-dark flex-1 pr-4">{q}</span><div className={`w-6 h-6 rounded-full flex items-center justify-center transition ${openFaq===i?"bg-emerald-500":"bg-gray-100"}`}><svg className="w-3 h-3" fill="none" stroke={openFaq===i?"white":"#999"} viewBox="0 0 24 24" strokeWidth={2.5} style={{transform:openFaq===i?"rotate(180deg)":"none",transition:"0.2s"}}><path d="M6 9l6 6 6-6"/></svg></div></div>{openFaq===i&&<p className="text-sm text-gray-500 leading-relaxed pb-4">{a}</p>}</div></Fade>)}
        </div>
      </section>

      {/* Client trust */}
      <div className="bg-white border-y border-gray-100 py-6 px-5"><div className="max-w-7xl mx-auto flex items-center justify-center gap-8 md:gap-12 flex-wrap opacity-25">{clientLogos.map(c=><span key={c} className="text-xs font-bold text-gray-800 tracking-wide whitespace-nowrap">{c}</span>)}</div></div>

      <Footer />
    </>
  );
}
