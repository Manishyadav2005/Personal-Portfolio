import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/portfolio/Navbar';
import HeroSection from '@/components/portfolio/HeroSection';
import AboutSection from '@/components/portfolio/AboutSection';
import SkillsSection from '@/components/portfolio/SkillsSection';
import ExperienceSection from '@/components/portfolio/ExperienceSection';
import ProjectsSection from '@/components/portfolio/ProjectsSection';
import ServicesSection from '@/components/portfolio/ServicesSection';
import CertificationsSection from '@/components/portfolio/CertificationsSection';
import ContactSection from '@/components/portfolio/ContactSection';
import Footer from '@/components/portfolio/Footer';
import FloatingAIButton from "@/components/portfolio/FloatingAIButton";
import ResearchSection from "@/components/portfolio/ResearchSection";

const Index = () => {
  return (
    <>
      <Helmet>
      <title>Manish Yadav Software Engineer | Portfolio | Java Developer India</title>
        <meta
          name="description"
          content="Portfolio of Manish Yadav - A passionate Software Developer specializing in Web Development, Java, DevOps, and AI-driven solutions. Explore my projects, skills, and experience."
        />
        <meta
          name="keywords"
          content="Manish Yadav, Software Developer, Web Developer, Java Developer, DevOps, AI, Portfolio, React, Python"
        />
        <meta name="author" content="Manish Yadav" />
        <meta property="og:title" content="Manish Yadav | Software Developer Portfolio" />
        <meta
          property="og:description"
          content="A passionate Software Developer specializing in Web Development, Java, DevOps, and AI-driven solutions."
        />
        <meta property="og:type" content="website" />
      <link rel="canonical" href="https://manish.page" />
      </Helmet>

      <main className="min-h-screen bg-background">
        <Navbar />
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <ResearchSection /> 
        <ServicesSection />
        <CertificationsSection />
        <ContactSection />
        <Footer />

         {/* Floating AI Button – visible on all pages */}
      <FloatingAIButton />
      </main>
    </>
  );
};

export default Index;
