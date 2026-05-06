import HomeClient from "@/components/HomeClient";

export const metadata = {
  title: "MindEarth Consultancy | ESG & Carbon Accounting Solutions India",
  description:
    "MindEarth Consultancy helps companies track GHG emissions, ESG metrics, and climate risks with data-driven insights. 300+ reports. 850+ clients. 40+ countries.",
  alternates: { canonical: "https://www.mindearthconsultancy.com" },
  openGraph: {
    title: "MindEarth Consultancy | ESG & Carbon Accounting Solutions India",
    description:
      "MindEarth Consultancy — institutional-grade ESG market research across 25+ industries and 40+ countries.",
    url: "https://www.mindearthconsultancy.com",
  },
};

export default function Home() {
  return <HomeClient />;
}
