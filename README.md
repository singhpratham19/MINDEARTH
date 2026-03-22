# MindEarth Consultancy — Complete Next.js Website

Global ESG Intelligence & Market Research platform. 8 pages, Tailwind CSS, Framer Motion, Recharts.

## Quick Start

```bash
npm install
npm run dev
```

Open **http://localhost:3000**

## All Pages (8 routes)

| Route | Page | Key Features |
|-------|------|-------------|
| `/` | **Home** | Hero with bg image, animated Why Choose Us cards with stock photos, industries with images, report cards with 3-line descriptions + company logos, press releases with images, India ESG map visual, certifications, animated stats |
| `/reports` | **Reports** | Full marketplace (different layout from home), 2-col expanded cards with thumbnails, filter tabs, sort dropdown, company logos |
| `/reports/[slug]` | **Report Detail** | Mordor Intelligence-style — tabbed content (Overview/TOC/Segmentation/Companies), area chart, 3-tier pricing sidebar, Buy Now → checkout |
| `/checkout/[slug]` | **Checkout** | 3-step form (Contact → Billing → Payment), Stripe card mockup, Razorpay UPI/Cards/Netbanking mockup, order summary, GST calc, success state |
| `/services` | **Services** | CrediBL ESG inspired, 3 categories (Research/Advisory/Solutions), 17 service cards, BRSR links to detail page |
| `/services/brsr` | **BRSR Advisory** | Animated scroll timeline (6-phase process), deliverables grid, 3 pricing tiers, FAQ accordion |
| `/about` | **About** | McKinsey inspired — hero stock image, mission/vision, animated stats, brand story timeline, client logos, 6 values, dark methodology section, team section with global offices |
| `/insights` | **Insights** | Featured article hero, filter tabs, 8 article cards with images, newsletter signup |
| `/contact` | **Contact** | 3 quick-action cards, detailed form (name/email/phone/org/title/interest/budget/timeline), sidebar (offices/contact/hours), FAQ, client logos |

## Tech Stack

- Next.js 14 (App Router)
- Tailwind CSS 3.4
- Framer Motion 11
- Recharts

## Brand

- Emerald `#10B981` — primary
- Sky Blue `#0EA5E9` — secondary
- Plus Jakarta Sans — headings
- Inter — body
