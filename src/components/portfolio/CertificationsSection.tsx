import { Award, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const certifications = [
  { name: 'Oracle Cloud Infrastructure 2025 Certified Generative AI Professional', issuer: 'Oracle University', date: 'September 2025', category: 'Cloud & AI' },
  { name: 'Java Web Development with AI', issuer: 'HCLTech (NCVET Approved)', date: 'March 2025', category: 'Development' },
  { name: 'Foundations of Artificial Intelligence', issuer: 'Edunet Foundation | AICTE | Microsoft', date: 'April 2025', category: 'AI/ML' },
  { name: 'Cyber Security Internship Program', issuer: 'Edunet Foundation | AICTE | IBM SkillsBuild', date: 'May–June 2025', category: 'Security' },
  { name: 'GenAI Powered Data Analytics Job Simulation', issuer: 'Forage', date: 'June 2025', category: 'AI/ML' },
  { name: 'Cyber Job Simulation', issuer: 'Deloitte (via Forage)', date: 'June 2025', category: 'Security' },
  { name: 'Introduction to Data Science with R Programming', issuer: 'Simplilearn SkillUp', date: 'March 2025', category: 'Data Science' },
  { name: 'Introduction to Generative AI Studio', issuer: 'Google Cloud | Simplilearn SkillUp', date: 'June 2025', category: 'Cloud & AI' },
  { name: 'Explore AI Basics', issuer: 'Microsoft', date: 'April 2025', category: 'AI/ML' },
  { name: 'Yuva AI for All', issuer: 'INDIAai | Nasscom FutureSkills Prime | MeitY', date: 'December 2025', category: 'AI/ML' },
  { name: 'Professional Logo Production with Artificial Intelligence', issuer: 'Udemy', date: 'April 2025', category: 'Design' },
  { name: 'Java Programming Masterclass – Beginner to Master', issuer: 'Udemy', date: 'April 2025', category: 'Development' },
  { name: 'Learn ChatGPT, Midjourney, AI and Use it for Passive Income', issuer: 'Udemy', date: 'July 2025', category: 'AI/ML' },
  { name: 'AI Tools & ChatGPT Workshop', issuer: 'be10x', date: 'November 2025', category: 'AI/ML' },
  { name: 'Employability Skills Enhancement Training – Web Technologies', issuer: 'Softpro India | AKTU', date: 'November 2024', category: 'Professional' },
  { name: 'Frontend Development Training', issuer: 'Digital Navik | Bansal Institute of Engineering & Technology', date: 'Sep–Dec 2023', category: 'Development' },
  { name: 'Python with IoT Workshop', issuer: 'Mechatrendz Softwares & Innovations Pvt. Ltd.', date: 'December 2023', category: 'Development' },
  { name: 'AWS Summit India – Online (Certificate of Attendance)', issuer: 'Amazon Web Services (AWS)', date: 'June 2025', category: 'Cloud & AI' },
  { name: 'Interview Tips & Resume Hacks', issuer: 'Campus Code (Session by Arushi Garg, Adobe)', date: 'April 2025', category: 'Professional' },
  { name: 'AINCAT 2025 – India\'s Biggest Career Aptitude Test', issuer: 'Naukri Campus', date: 'May 2025', category: 'Professional' },
  { name: 'Nestlé E-learning 2025 – Resilience', issuer: 'Nestlé (Nesternship)', date: '2025', category: 'Professional' },
  { name: 'Connect with Git Workshop', issuer: 'Google Developer Student Club (GDSC)', date: 'November 2023', category: 'Community' },
  { name: 'Agent of Discord (Kaggle Badge)', issuer: 'Kaggle', date: '2025', category: 'Community' },
  { name: 'GirlScript Summer of Code – Contributor', issuer: 'GirlScript Foundation', date: 'October 2024', category: 'Community' },
  { name: 'Bazaar Shashtra 2024 – Intra College Competition', issuer: 'Fintopedia', date: 'January 2024', category: 'Competition' },
];

const categories = ['All', 'Cloud & AI', 'Development', 'AI/ML', 'Security', 'Data Science', 'Design', 'Professional', 'Community', 'Competition'];

const categoryStyles: Record<string, { gradient: string; iconColor: string; borderColor: string }> = {
  'Cloud & AI': { gradient: 'from-blue-500/20 to-cyan-500/20', iconColor: 'text-blue-400', borderColor: 'border-blue-500/30' },
  'Development': { gradient: 'from-green-500/20 to-emerald-500/20', iconColor: 'text-green-400', borderColor: 'border-green-500/30' },
  'AI/ML': { gradient: 'from-purple-500/20 to-pink-500/20', iconColor: 'text-purple-400', borderColor: 'border-purple-500/30' },
  'Security': { gradient: 'from-red-500/20 to-orange-500/20', iconColor: 'text-red-400', borderColor: 'border-red-500/30' },
  'Data Science': { gradient: 'from-indigo-500/20 to-violet-500/20', iconColor: 'text-indigo-400', borderColor: 'border-indigo-500/30' },
  'Design': { gradient: 'from-pink-500/20 to-rose-500/20', iconColor: 'text-pink-400', borderColor: 'border-pink-500/30' },
  'Professional': { gradient: 'from-amber-500/20 to-yellow-500/20', iconColor: 'text-amber-400', borderColor: 'border-amber-500/30' },
  'Community': { gradient: 'from-teal-500/20 to-cyan-500/20', iconColor: 'text-teal-400', borderColor: 'border-teal-500/30' },
  'Competition': { gradient: 'from-orange-500/20 to-red-500/20', iconColor: 'text-orange-400', borderColor: 'border-orange-500/30' },
};

const CertificationsSection = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [showAll, setShowAll] = useState(false);

  const filteredCerts = activeCategory === 'All' 
    ? certifications 
    : certifications.filter(c => c.category === activeCategory);

  const displayedCerts = showAll ? filteredCerts : filteredCerts.slice(0, 9);

  return (
    <section id="certifications" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[hsl(var(--primary)/_0.03)] to-background" />
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-glow-purple/10 rounded-full blur-[100px]" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-flex items-center gap-2 glass-pill border-primary/30 text-primary mb-6">
            <Sparkles className="w-4 h-4" />
            Certifications
          </span>
          <h2 className="section-title">
            Professional <span className="text-gradient">Credentials</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            <span className="text-3xl font-bold text-gradient">{certifications.length}+</span> certifications demonstrating continuous learning across various domains
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-14">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => { setActiveCategory(category); setShowAll(false); }}
              className={`glass-pill transition-all duration-300 ${
                activeCategory === category
                  ? 'glass-pill-active scale-105'
                  : 'hover:border-primary/50 hover:text-foreground'
              }`}
            >
              {category}
              {category !== 'All' && (
                <span className="ml-2 text-xs opacity-70">
                  ({certifications.filter(c => c.category === category).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Certifications Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {displayedCerts.map((cert, index) => {
            const style = categoryStyles[cert.category] || categoryStyles['Development'];
            return (
              <motion.div
                key={`${cert.name}-${index}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`group glass-card p-6 bg-gradient-to-br ${style.gradient} ${style.borderColor} hover:scale-[1.02] hover:shadow-glow transition-all duration-500`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 glass-card shrink-0 ${style.borderColor} group-hover:shadow-glow transition-all`}>
                    <Award className={`w-6 h-6 ${style.iconColor}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-foreground text-sm mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {cert.name}
                    </h4>
                    <p className="text-muted-foreground text-xs mb-3 truncate">{cert.issuer}</p>
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <span className="text-xs font-medium glass-pill py-1 px-3 border-primary/30 text-primary">
                        {cert.date}
                      </span>
                      <span className={`text-xs glass-pill py-1 px-3 ${style.borderColor} ${style.iconColor}`}>
                        {cert.category}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Show More Button */}
        {filteredCerts.length > 9 && (
          <div className="text-center mt-12">
            <Button
              onClick={() => setShowAll(!showAll)}
              className="group bg-gradient-to-r from-primary to-glow-purple hover:from-primary/90 hover:to-glow-purple/90 shadow-glow px-8 py-6"
            >
              {showAll ? (
                <>Show Less <ChevronUp className="ml-2 w-5 h-5 group-hover:-translate-y-1 transition-transform" /></>
              ) : (
                <>Show All ({filteredCerts.length}) <ChevronDown className="ml-2 w-5 h-5 group-hover:translate-y-1 transition-transform" /></>
              )}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default CertificationsSection;
