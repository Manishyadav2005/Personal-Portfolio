import { Award, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

const certifications = [
  { name: 'Oracle Cloud Infrastructure 2025 Certified Generative AI Professional', issuer: 'Oracle University', date: 'September 2025', category: 'Cloud & AI', link: 'https://drive.google.com/file/d/1eBHyq3EbueYIhSmatxhOtXtOakr1DHnz/preview' },
  { name: 'Java Web Development with AI', issuer: 'HCLTech (NCVET Approved)', date: 'March 2025', category: 'Development',link: 'https://drive.google.com/file/d/1Jzvj51DcOtRpahyqXUApbjPI7mWEXXRu/preview'
 },
  { name: 'Foundations of Artificial Intelligence', issuer: 'Edunet Foundation | AICTE | Microsoft', date: 'April 2025', category: 'AI/ML' ,link: 'https://drive.google.com/file/d/13Z_X3CI_Hdbug7vhpKsyyL5M_yjT3QX3/preview'
},
  { name: 'Cyber Security Internship Program', issuer: 'Edunet Foundation | AICTE | IBM SkillsBuild', date: 'May–June 2025', category: 'Security',link: 'https://drive.google.com/file/d/1TDM57qan1d9W2DpC5YawAND1THSIu2Yt/preview'
 },
  { name: 'Solutions Architecture Job Simulation (AWS)', issuer: 'Forage (AWS Program)', date: 'December 2025', category: 'Cloud & AI', link: 'https://drive.google.com/file/d/1-CsQhkf5pwZAY_zsuuAMVYRKyDpUHRYF/preview'
   },
  { name: 'Introduction to Data Science with R Programming', issuer: 'Simplilearn SkillUp', date: 'March 2025', category: 'Data Science',link: 'https://drive.google.com/file/d/1Q6amgg__vimTrIruOnp0zDLQ7AWeSRhk/preview'
 },
  { name: 'Introduction to Generative AI Studio', issuer: 'Google Cloud | Simplilearn SkillUp', date: 'June 2025', category: 'Cloud & AI',link: 'https://drive.google.com/file/d/114QxvQQmX8AQg6w6LzGMB36AoAXaG6Pk/preview'
 },
  { name: 'Explore AI Basics', issuer: 'Microsoft', date: 'April 2025', category: 'AI/ML',link: 'https://drive.google.com/file/d/10fj1vCs0Nb6Sqjf6X20FhGbYHNW0vEZz/preview'
 },
  { name: 'Yuva AI for All', issuer: 'INDIAai | Nasscom FutureSkills Prime | MeitY', date: 'December 2025', category: 'AI/ML',link: 'https://drive.google.com/file/d/1Y9RhWkWoMgyJ6SfpC_4IdcpgFa97Sius/preview'
 },
  { name: 'Professional Logo Production with Artificial Intelligence', issuer: 'Udemy', date: 'April 2025', category: 'Design',link: 'https://drive.google.com/file/d/1K7MSkPPARM44hvfbmQLsV6_bJb8NTeSB/preview'
 },
  { name: 'Java Programming Masterclass – Beginner to Master', issuer: 'Udemy', date: 'April 2025', category: 'Development',link: 'https://drive.google.com/file/d/1a0x1HrAth6hIKi_fZ7tVNwDOVHPHUHTr/preview'
 },
  { name: 'Learn ChatGPT, Midjourney, AI and Use it for Passive Income', issuer: 'Udemy', date: 'July 2025', category: 'AI/ML',link: 'https://drive.google.com/file/d/17P0WPqrAZHRHZCAeX4Avc5-CWYQ4TeZH/preview'
 },
  { name: 'AI Tools & ChatGPT Workshop', issuer: 'be10x', date: 'November 2025', category: 'AI/ML' ,link: 'https://drive.google.com/file/d/1yjCcZcQdCTUMOtZsz1tw4PqIAEbZB1Sb/preview'
},
  { name: 'Employability Skills Enhancement Training – Web Technologies', issuer: 'Softpro India | AKTU', date: 'November 2024', category: 'Professional',link: 'https://drive.google.com/file/d/1sOGWIwh-GrsHYq79nIBb_4SMrKaV2SgP/preview'
 },
  { name: 'Frontend Development Training', issuer: 'Digital Navik | Bansal Institute of Engineering & Technology', date: 'Sep–Dec 2023', category: 'Development',link: 'https://drive.google.com/file/d/1KidnAMmeVlO_ERftIibz_diFLxjRXTcs/preview'
 },
  { name: 'Python with IoT Workshop', issuer: 'Mechatrendz Softwares & Innovations Pvt. Ltd.', date: 'December 2023', category: 'Development',link: 'https://drive.google.com/file/d/10dgD8LT1Mo5U4vPHQGUl0XjQfgBHGSap/preview'
 },
  { name: 'AWS Summit India – Online (Certificate of Attendance)', issuer: 'Amazon Web Services (AWS)', date: 'June 2025', category: 'Cloud & AI',link: 'https://drive.google.com/file/d/1lvWerqUse2WKkZQmmp4SWs5mtSk5DPHZ/preview'
 },
  { name: 'Interview Tips & Resume Hacks', issuer: 'Campus Code (Session by Arushi Garg, Adobe)', date: 'April 2025', category: 'Professional',link: 'https://drive.google.com/file/d/1kR6b4mpQ4TKnOMrAjDMuxDH_m_Y8RcA2/preview'
 },
  { name: 'AINCAT 2025 – India\'s Biggest Career Aptitude Test', issuer: 'Naukri Campus', date: 'May 2025', category: 'Professional' ,link: 'https://drive.google.com/file/d/1yPeu6u8kmJJJhy-RxEZDVHGJDvxinJWx/preview'
},
  { name: 'Nestlé E-learning 2025 – Resilience', issuer: 'Nestlé (Nesternship)', date: '2025', category: 'Professional',link: 'https://drive.google.com/file/d/14HWwpA4T0h5tfVnP4IG3NiFYw3TO-Zwh/preview'
},
  { name: 'Connect with Git Workshop', issuer: 'Google Developer Student Club (GDSC)', date: 'November 2023', category: 'Community',link: 'https://drive.google.com/file/d/1NAQ7wtc9odt2UJ6tGNtFJSQ__5GmPj32/preview'
 },
  { name: 'Agent of Discord (Kaggle Badge)', issuer: 'Kaggle', date: '2025', category: 'Community',link: 'https://drive.google.com/file/d/1EC6djXw7NtzoOEvzC8FVqjxFiuQBG9yG/preview'
 },
  { name: 'GirlScript Summer of Code – Contributor', issuer: 'GirlScript Foundation', date: 'October 2024', category: 'Community' ,link: 'https://drive.google.com/file/d/1e0gv6P7Lv6ARvoXG8eiOK-M3w5o0cF9h/preview'
},
  { name: 'Bazaar Shashtra 2024 – Intra College Competition', issuer: 'Fintopedia', date: 'January 2024', category: 'Competition',link: 'https://drive.google.com/file/d/1yh5uBJOg3NZdzmSNwXqlVMUOJlQ3sB0w/preview'
 },
 { name: 'Ignite India 5.0 Program',issuer: 'Wadhwani Foundation',date: 'December 2025',category: 'Professional',link: 'https://drive.google.com/file/d/1-ra7nMQQVijHTmcqY-H2kh_iw5oNRzTb/preview'
 },
 { name: 'GenAI Powered Data Analytics Job Simulation', issuer: 'TATA (via Forage)', date: 'June 2025', category: 'AI/ML', link: 'https://drive.google.com/file/d/1iqq0dzj7kZRXSCfuhTQlpag3ywqS1eY3/preview'
 },
 { name: 'SOAR – AI for Educators', issuer: 'Microsoft (NCVET Recognised)', date: 'November 2025', category: 'AI/ML', link: 'https://drive.google.com/file/d/1V3Uevz8KYd9XVvWXqc0MGxUOgsyBeMXv/preview'
  },
  { name: 'Introduction to IoT and Digital Transformation', issuer: 'Cisco Networking Academy', date: 'January 2026', category: 'Cloud & AI', link: 'https://drive.google.com/file/d/13OGQ8t3rEVSEWyyINRfgQ5c90rwkRQmE/preview'
 },
 { name: 'Introduction to Internet of Things', issuer: 'Cisco Networking Academy', date: 'January 2026', category: 'Cloud & AI', link: 'https://drive.google.com/file/d/14msloV5idwbfr7Jc8_CvCTx5KevXb-cW/preview'
  },
  {
  name: 'Claude Code in Action', issuer: 'Anthropic', date: 'April 2026', category: 'AI/ML', link: 'http://verify.skilljar.com/c/vnqtvo2w2eiz'
},
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
    <section id="certifications" className="py-24 relative overflow-hidden bg-transparent">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
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
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-transparent border border-primary/40 text-primary mb-6 shadow-glow">
            <Sparkles className="w-4 h-4" />
            Certifications
          </span>
          <h2 className="section-title">
            Professional <span className="text-gradient">Credentials</span>
          </h2>
          <p className="text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] text-lg max-w-2xl mx-auto font-normal">
            <span className="text-3xl font-bold text-gradient">{certifications.length}+</span> certifications demonstrating continuous learning across various domains
          </p>
        </motion.div>

        {/* Category Filter - Transparent */}
        <div className="flex flex-wrap justify-center gap-3 mb-14">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => { setActiveCategory(category); setShowAll(false); }}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-white/20 text-white border border-white/60 shadow-glow scale-105'
                  : 'bg-transparent text-slate-300 border border-white/20 hover:border-white/50 hover:text-white'
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

        {/* Certifications Grid - 100% Transparent */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {displayedCerts.map((cert, index) => {
            const style = categoryStyles[cert.category] || categoryStyles['Development'];
            return (
              <motion.a
                key={`${cert.name}-${index}`}
                href={cert.link || "#"}
                target={cert.link ? "_blank" : "_self"}
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`relative group block p-6 rounded-2xl bg-transparent hover:bg-white/[0.04] transition-all duration-300 shadow-xl ${cert.link ? 'cursor-pointer' : ''}`}
              >
                {/* Rotating rainbow border overlay */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-2xl z-10"
                  style={{
                    padding: "1.5px",
                    background:
                      "conic-gradient(from var(--angle, 0deg), #ff4d00, #ff4500, #ffcc00, #00ff88, #00cfff, #a855f7, #ff0080, #ff4d00)",
                    WebkitMask:
                      "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                    animation: "spin-border 3s linear infinite",
                  }}
                />
                <div className="flex items-start gap-4 relative z-20">
                  <div className="p-3 rounded-xl bg-black/40 border border-white/20 group-hover:shadow-glow transition-all shrink-0">
                    <Award className={`w-6 h-6 ${style.iconColor} drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-white text-base mb-2 line-clamp-2 group-hover:text-primary transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
                      {cert.name}
                    </h4>
                    <p className="text-white font-medium text-xs mb-3 truncate drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">{cert.issuer}</p>
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <span className="text-xs font-medium bg-transparent border border-white/30 rounded-full py-1 px-3 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                        {cert.date}
                      </span>
                      <span className="text-xs font-medium bg-transparent border border-white/30 rounded-full py-1 px-3 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                        {cert.category}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.a>
            );
          })}
        </motion.div>

        {/* Show More Button - Transparent */}
        {filteredCerts.length > 9 && (
          <div className="text-center mt-12">
            <button
              onClick={() => setShowAll(!showAll)}
              className="relative group overflow-hidden bg-transparent hover:bg-white/10 text-white font-semibold px-8 py-3 rounded-xl shadow-glow hover:scale-105 transition-all"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-10"
                style={{
                  borderRadius: "inherit",
                  padding: "1.5px",
                  background:
                    "conic-gradient(from var(--angle, 0deg), #ff4d00, #ff4500, #ffcc00, #00ff88, #00cfff, #a855f7, #ff0080, #ff4d00)",
                  WebkitMask:
                    "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                  animation: "spin-border 3s linear infinite",
                  border: "none",
                }}
              />
              <span className="relative z-20 flex items-center text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                {showAll ? (
                  <>Show Less <ChevronUp className="ml-2 w-5 h-5 group-hover:-translate-y-1 transition-transform" /></>
                ) : (
                  <>Show All ({filteredCerts.length}) <ChevronDown className="ml-2 w-5 h-5 group-hover:translate-y-1 transition-transform" /></>
                )}
              </span>
            </button>
          </div>
        )}
      </div>

      {/* Inline keyframes for rotating border */}
      <style>{`
        @property --angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }
        @keyframes spin-border {
          to { --angle: 360deg; }
        }
      `}</style>
    </section>
  );
};

export default CertificationsSection;
