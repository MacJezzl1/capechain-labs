import { useState } from 'react';
import { TelemetryBar } from './components/layout/TelemetryBar';
import { Header } from './components/layout/Header';
import { HeroSection } from './components/layout/HeroSection';
import { PillarsSection } from './components/positioning/PillarsSection';
import { ArchitecturalDiagram } from './components/positioning/ArchitecturalDiagram';
import { ProjectShowcase } from './components/projects/ProjectShowcase';
import { GitHubShowcase } from './components/github/GitHubShowcase';
import { PhilosophyBanner } from './components/positioning/PhilosophyBanner';
import { EngineeringComparison } from './components/positioning/EngineeringComparison';
import { Footer } from './components/layout/Footer';
import { ContactModal } from './components/layout/ContactModal';

export function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Real-time telemetry ticker */}
      <TelemetryBar />

      {/* Primary Navigation */}
      <Header onOpenContact={() => setIsContactOpen(true)} />

      {/* Main Experience */}
      <main className="flex-grow">
        {/* Hero Section with 19. IMMERSIVE 3D DIGITAL EXPERIENCE */}
        <HeroSection onOpenContact={() => setIsContactOpen(true)} />

        {/* 21. PREMIUM POSITIONING: Core Pillars */}
        <PillarsSection />

        {/* 21. PREMIUM POSITIONING: Architectural Diagram & System Visualization */}
        <ArchitecturalDiagram />

        {/* 20. REAL ENGINEERING SHOWCASE: "Built With Intelligence. Engineered With Purpose." */}
        <ProjectShowcase />

        {/* 20. REAL ENGINEERING SHOWCASE: GitHub Live Integration & Repositories */}
        <GitHubShowcase />

        {/* 21. PREMIUM POSITIONING: Philosophy Banner */}
        <PhilosophyBanner />

        {/* 21. PREMIUM POSITIONING: Beyond Development into Engineering */}
        <EngineeringComparison />
      </main>

      {/* Footer */}
      <Footer />

      {/* Architectural Consultation Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
}

export default App;
