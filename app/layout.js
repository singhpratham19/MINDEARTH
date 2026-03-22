import "./globals.css";

export const metadata = {
  title: "MindEarth Consultancy — Global ESG Intelligence & Market Research",
  description: "300+ sustainability reports, data-driven ESG insights, trusted by 850+ global institutions.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-gray-800 antialiased">{children}</body>
    </html>
  );
}
