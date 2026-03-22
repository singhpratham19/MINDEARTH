import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-brand-light border-t border-brand-border">
      <div className="max-w-container mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 mb-14">
          <div className="col-span-2 md:col-span-1 lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 relative flex items-center justify-center">
                <svg className="w-9 h-9" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="20" cy="20" r="18" stroke="#0B6E4F" strokeWidth="1.8" fill="none" />
                  <ellipse cx="20" cy="20" rx="9" ry="18" stroke="#0B6E4F" strokeWidth="1.2" fill="none" />
                  <path d="M4 15h32" stroke="#0B6E4F" strokeWidth="1" opacity="0.5" />
                  <path d="M4 25h32" stroke="#0B6E4F" strokeWidth="1" opacity="0.5" />
                  <path d="M20 8c6 4 8 12 4 20" stroke="#0B6E4F" strokeWidth="1.8" strokeLinecap="round" fill="none" />
                  <path d="M20 8c-2 6-1 12 4 20" stroke="#0B6E4F" strokeWidth="1" opacity="0.4" strokeLinecap="round" fill="none" />
                </svg>
              </div>
              <div>
                <span className="font-heading text-base font-bold text-brand-blue">Mind<span className="text-brand-green">Earth</span></span>
                <span className="block text-[8.5px] font-semibold text-brand-muted tracking-[0.2em] uppercase">Consultancy</span>
              </div>
            </div>
            <p className="text-sm text-brand-body leading-relaxed max-w-[260px] mb-5">Global ESG intelligence. 300+ sustainability reports powering smarter decisions for institutions worldwide.</p>
            <p className="text-xs font-semibold text-brand-dark mb-2.5">Subscribe to ESG Insights</p>
            <div className="flex gap-2 max-w-xs">
              <input placeholder="Enter your email" className="flex-1 px-3.5 py-2.5 text-sm bg-white border border-brand-border rounded-lg outline-none focus:border-brand-green placeholder:text-brand-muted" />
              <button className="bg-brand-green text-white text-xs font-semibold px-5 py-2.5 rounded-lg hover:bg-[#095C42] transition-colors duration-200 shrink-0">Go</button>
            </div>
          </div>
          {[
            ["Research", [["Syndicated Reports", "/reports"], ["Custom Research", "/contact"], ["ESG Data Models", "/reports"], ["Industry Analysis", "/reports"]]],
            ["Solutions", [["ESG Strategy", "/services"], ["BRSR Advisory", "/services/brsr"], ["Climate Risk", "/services"], ["Due Diligence", "/services"]]],
            ["Company", [["About Us", "/about"], ["Methodology", "/about"], ["Careers", "/about"], ["Contact", "/contact"]]],
          ].map(([title, items]) => (
            <div key={title}>
              <h4 className="text-[11px] font-bold tracking-[0.15em] text-brand-dark uppercase mb-4">{title}</h4>
              {items.map(([l, href]) => (
                <Link key={l} href={href} className="block text-sm text-brand-body mb-3 hover:text-brand-green transition-colors duration-200">{l}</Link>
              ))}
            </div>
          ))}
        </div>
        <div className="border-t border-brand-border pt-6 flex flex-wrap justify-between items-center gap-4">
          <span className="text-xs text-brand-muted">© 2026 MindEarth Consultancy. All rights reserved.</span>
          <div className="flex items-center gap-6 text-xs text-brand-muted">
            <span>Pune, India | Global Operations</span>
            <span className="hover:text-brand-body cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-brand-body cursor-pointer transition-colors">Terms</span>
            <a href="#" className="w-7 h-7 rounded-lg bg-brand-blue flex items-center justify-center hover:bg-brand-green transition-colors duration-200">
              <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
