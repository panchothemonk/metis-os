import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MythSection from "@/components/MythSection";
import LayersSection from "@/components/LayersSection";
import ArchitectureSection from "@/components/ArchitectureSection";
import DeploySection from "@/components/DeploySection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <MythSection />
        <LayersSection />
        <ArchitectureSection />
        <DeploySection />
      </main>
      <Footer />
    </>
  );
}
