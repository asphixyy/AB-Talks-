import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import RotatingText from './components/RotatingText';
import introVideo from './assets/VID_20260809_115255.mp4';
import logoIcon from './assets/fed689f4-3fea-42a8-9c6e-21e5546265e5.png';
import Dashboard from './components/Dashboard';
import Rewards from './components/Rewards';
import Day from './components/Day';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', dob: '', email: '', city: '' });
  const [registeredName, setRegisteredName] = useState('');
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [points, setPoints] = useState(150);
  const [completedTasks, setCompletedTasks] = useState({
    commit: false,
    post: false,
    dsa: false
  });

  const containerRef = useRef(null);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 6, width: 48, background: '#ffffff', boxShadow: 'none' });

  // Custom SPA Router popstate listener
  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const navigate = (path) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  // Route Protection: Redirect from protected dashboard/rewards/day pages to / if not registered
  useEffect(() => {
    if ((currentPath === '/dashboard' || currentPath === '/rewards' || currentPath.startsWith('/day')) && !registeredName) {
      window.history.pushState({}, '', '/');
      setCurrentPath('/');
      setIsModalOpen(true);
    }
  }, [currentPath, registeredName]);

  // Sync Bottom Nav Indicator Position
  useEffect(() => {
    if (!registeredName || currentPath === '/') return;

    // Timeout ensures DOM layout is updated and rendered before measuring
    const updatePosition = () => {
      const activeBtn = containerRef.current?.querySelector(
        isAccountOpen ? '.account-btn' : '.active-btn'
      );
      if (activeBtn) {
        setIndicatorStyle({
          left: activeBtn.offsetLeft,
          width: activeBtn.offsetWidth,
          background: '#ffffff',
          boxShadow: '0 8px 16px rgba(255, 255, 255, 0.12)',
          opacity: 1
        });
      } else {
        setIndicatorStyle({
          left: 0,
          width: 0,
          background: '#ffffff',
          boxShadow: 'none',
          opacity: 0
        });
      }
    };

    updatePosition();
    // Re-check after multiple intervals for layout safety
    const t1 = setTimeout(updatePosition, 50);
    const t2 = setTimeout(updatePosition, 150);
    
    if (document.fonts) {
      document.fonts.ready.then(updatePosition);
    }
    
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [currentPath, registeredName, isAccountOpen]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="fixed inset-0 bg-black z-[9999] flex items-center justify-center overflow-hidden"
          >
            <video
              src={introVideo}
              autoPlay
              muted
              playsInline
              className="w-full h-full object-cover bg-black"
              onEnded={() => setIsLoading(false)}
            />
            {/* Dynamic Loading Bar */}
            <div className="absolute bottom-20 w-[80%] max-w-md h-1.5 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 4, ease: "linear" }}
                className="h-full bg-accent-yellow rounded-full shadow-[0_0_12px_#ffb700]"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="background-effects">
        <div className="glow-orb orb-primary"></div>
        <div className="glow-orb orb-secondary"></div>
        <div className="noise-overlay"></div>
      </div>

      {/* Floating Bottom Liquid Glass Navbar (visible only on inner pages dashboard & rewards) */}
      {registeredName && currentPath !== '/' && (
        <div className="fixed bottom-8 left-0 w-full flex justify-center z-[10000] px-4 pointer-events-none">
          <div ref={containerRef} className="pointer-events-auto relative flex items-center justify-center gap-2 bg-[#0a0a0a]/40 border border-white/10 rounded-full p-1.5 shadow-2xl backdrop-blur-[25px]">
            {/* Sliding Highlight Indicator */}
            <div 
              style={{
                position: 'absolute',
                top: '6px',
                height: '48px',
                borderRadius: '100px',
                transition: 'all 0.38s cubic-bezier(0.25, 1, 0.5, 1)',
                left: `${indicatorStyle.left}px`,
                width: `${indicatorStyle.width}px`,
                background: indicatorStyle.background,
                boxShadow: indicatorStyle.boxShadow,
                opacity: indicatorStyle.hasOwnProperty('opacity') ? indicatorStyle.opacity : 1,
                zIndex: 1
              }}
            />

            {/* Dashboard Link */}
            <button 
              onClick={() => {
                setIsAccountOpen(false);
                navigate('/dashboard');
              }}
              className={`relative z-10 flex items-center justify-center gap-2 h-12 rounded-full transition-all duration-300 cursor-pointer focus:outline-none ${
                currentPath === '/dashboard' && !isAccountOpen
                  ? 'active-btn px-5 text-[#000000] font-semibold' 
                  : 'w-12 text-white/60 hover:text-white'
              }`}
            >
              <i className="fa-solid fa-house text-base"></i>
              {currentPath === '/dashboard' && !isAccountOpen && (
                <span className="text-[13px] font-bold tracking-tight">Dashboard</span>
              )}
            </button>

            {/* Challenge Link */}
            <button 
              onClick={() => {
                setIsAccountOpen(false);
                navigate('/day/12');
              }}
              className={`relative z-10 flex items-center justify-center gap-2 h-12 rounded-full transition-all duration-300 cursor-pointer focus:outline-none ${
                currentPath.startsWith('/day') && !isAccountOpen
                  ? 'active-btn px-5 text-[#000000] font-semibold' 
                  : 'w-12 text-white/60 hover:text-white'
              }`}
            >
              <i className="fa-solid fa-calendar-day text-base"></i>
              {currentPath.startsWith('/day') && !isAccountOpen && (
                <span className="text-[13px] font-bold tracking-tight">Challenge</span>
              )}
            </button>

            {/* Rewards Link */}
            <button 
              onClick={() => {
                setIsAccountOpen(false);
                navigate('/rewards');
              }}
              className={`relative z-10 flex items-center justify-center gap-2 h-12 rounded-full transition-all duration-300 cursor-pointer focus:outline-none ${
                currentPath === '/rewards' && !isAccountOpen
                  ? 'active-btn px-5 text-[#000000] font-semibold' 
                  : 'w-12 text-white/60 hover:text-white'
              }`}
            >
              <i className="fa-solid fa-dollar-sign text-base"></i>
              {currentPath === '/rewards' && !isAccountOpen && (
                <span className="text-[13px] font-bold tracking-tight">Rewards</span>
              )}
            </button>

            {/* Account Details Button */}
            <button 
              onClick={() => {
                setIsAccountOpen(true);
              }}
              className={`relative z-10 flex items-center justify-center gap-2 h-12 rounded-full transition-all duration-300 cursor-pointer focus:outline-none account-btn ${
                isAccountOpen 
                  ? 'px-5 text-[#000000] font-semibold' 
                  : 'w-12 text-red-300 hover:text-red-400'
              }`}
            >
              <i className="fa-solid fa-power-off text-base"></i>
              {isAccountOpen && (
                <span className="text-[13px] font-bold tracking-tight">Account</span>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Top Navbar Header */}
      {(registeredName || currentPath === '/') && (
        <nav className="fixed top-0 left-0 w-full flex justify-between items-center py-5 px-6 z-50 bg-[#000000]/20 backdrop-blur-md border-b border-white/5">
          <button 
            onClick={() => navigate('/')} 
            className="flex items-center gap-3 font-space text-2xl font-bold tracking-tight focus:outline-none cursor-pointer hover:opacity-80"
          >
            <img src={logoIcon} alt="ABTalks Logo" className="w-9 h-9 object-contain rounded-lg" />
            <span><span className="text-accent-orange">AB</span>Talks</span>
          </button>
          <button onClick={() => registeredName ? navigate('/dashboard') : setIsModalOpen(true)} className="nav-cta cursor-pointer">
            {registeredName ? `Hey, ${registeredName.split(' ')[0]}` : 'Join Now'}
          </button>
        </nav>
      )}

      {currentPath === '/dashboard' && registeredName ? (
        <Dashboard 
          registeredName={registeredName} 
          navigate={navigate} 
          points={points} 
          setPoints={setPoints} 
          completedTasks={completedTasks} 
          setCompletedTasks={setCompletedTasks} 
        />
      ) : currentPath === '/rewards' && registeredName ? (
        <Rewards 
          registeredName={registeredName} 
          navigate={navigate} 
          points={points} 
          setPoints={setPoints} 
        />
      ) : currentPath.startsWith('/day') && registeredName ? (
        <Day 
          points={points}
          setPoints={setPoints}
          navigate={navigate}
        />
      ) : (
        <>
          <main>
            <section className="flex flex-col justify-center items-center pt-32 lg:pt-40 pb-16 px-6 min-h-screen relative z-10">
              <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
                
                <div className="mb-6 inline-flex items-center gap-2 py-1.5 px-4 bg-[#ff5e00]/10 border border-[#ff5e00]/20 text-accent-orange rounded-full text-xs font-semibold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 bg-accent-orange rounded-full pulse-dot"></span> 
                  60-Day Coding Challenge
                </div>
                
                <h1 className="font-anton text-[3rem] sm:text-[4.5rem] lg:text-[8.5rem] font-normal leading-[1] mb-14 tracking-wide uppercase flex flex-col items-center">
                  <span>Connecting Leaders.</span>
                  <span className="inline-block whitespace-nowrap">
                    <RotatingText 
                      texts={[
                        { text: 'Decoding AI.', className: 'text-accent-yellow' },
                        { text: 'Shaping The Future.', className: 'text-gradient' }
                      ]} 
                      interval={4000} 
                    />
                  </span>
                </h1>
                
                <p className="text-lg lg:text-xl text-secondary mb-10 max-w-2xl font-outfit mt-4">
                  Build something every day, submit a <strong className="text-primary">GitHub commit</strong> & a <strong className="text-primary">LinkedIn post</strong>. 
                  Maintain your public learning streak, build consistency, and become visible to top recruiters.
                </p>
                
                <div className="flex flex-col lg:flex-row items-center gap-6">
                  <button onClick={() => registeredName ? navigate('/dashboard') : setIsModalOpen(true)} className="btn cursor-pointer">
                    Commit to 60 Days <i className="fa-solid fa-arrow-right transition-transform"></i>
                  </button>
                  
                  <div className="flex items-center gap-3 text-sm text-secondary font-outfit">
                    <div className="flex">
                      <img src="https://i.pravatar.cc/100?img=1" alt="Student" className="w-8 h-8 rounded-full border-2 border-dark" />
                      <img src="https://i.pravatar.cc/100?img=2" alt="Student" className="w-8 h-8 rounded-full border-2 border-dark -ml-2.5" />
                      <img src="https://i.pravatar.cc/100?img=3" alt="Student" className="w-8 h-8 rounded-full border-2 border-dark -ml-2.5" />
                    </div>
                    Join 10,000+ Indian College Students
                  </div>
                </div>
              </div>
            </section>

            {/* Trust, Clarity, and Motivation Section */}
            <section className="py-24 px-6 relative z-10 border-t border-white/5 bg-black/40 backdrop-blur-3xl font-outfit">
              <div className="max-w-6xl mx-auto">
                
                {/* Header */}
                <div className="text-center mb-16">
                  <span className="inline-flex items-center gap-2 py-1.5 px-4 bg-accent-orange/10 border border-accent-orange/20 text-accent-orange rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
                    What is ABTalks?
                  </span>
                  <h2 className="text-3xl lg:text-5xl font-bold font-space tracking-tight mb-4 text-white">
                    Empowering Quiet Coders into Visible Creators
                  </h2>
                  <p className="text-secondary text-base lg:text-lg max-w-2xl mx-auto">
                    ABTalks is a student-first community helping you bridge the gap between academic learning and real-world tech careers. Here is how we build consistency:
                  </p>
                </div>

                {/* Grid 1: Four pillars of the challenge */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                  
                  {/* Card 1: Clarity (Build & Push) */}
                  <motion.div 
                    initial={{ opacity: 0, filter: "blur(12px)", y: 40 }}
                    whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                    viewport={{ once: false, margin: "-80px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="liquid-glass p-8 rounded-2xl hover:border-accent-orange/30 group hover:-translate-y-1 shadow-2xl relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-orange to-accent-red transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                    <div className="w-12 h-12 rounded-xl bg-accent-orange/10 flex items-center justify-center text-accent-orange mb-6 text-xl">
                      <i className="fa-solid fa-code"></i>
                    </div>
                    <h3 className="text-xl font-bold font-space text-white mb-3">1. Build & Push Daily</h3>
                    <p className="text-secondary text-sm leading-relaxed">
                      Commit to writing code daily for 60 days. Push your projects to GitHub to build your green contribution graph. Real proof of work speaks louder than any resume.
                    </p>
                  </motion.div>

                  {/* Card 2: Motivation (Public Accountability) */}
                  <motion.div 
                    initial={{ opacity: 0, filter: "blur(12px)", y: 40 }}
                    whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                    viewport={{ once: false, margin: "-80px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                    className="liquid-glass p-8 rounded-2xl hover:border-accent-yellow/30 group hover:-translate-y-1 shadow-2xl relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-yellow to-accent-orange transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                    <div className="w-12 h-12 rounded-xl bg-accent-yellow/10 flex items-center justify-center text-accent-yellow mb-6 text-xl">
                      <i className="fa-brands fa-linkedin-in"></i>
                    </div>
                    <h3 className="text-xl font-bold font-space text-white mb-3">2. Share & Get Visible</h3>
                    <p className="text-secondary text-sm leading-relaxed">
                      Post your daily learnings on LinkedIn using our hash tags. Build your personal brand, connect with recruiters, and create a public learning streak.
                    </p>
                  </motion.div>

                  {/* Card 3: Trust (Recognition & Networking) */}
                  <motion.div 
                    initial={{ opacity: 0, filter: "blur(12px)", y: 40 }}
                    whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                    viewport={{ once: false, margin: "-80px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                    className="liquid-glass p-8 rounded-2xl hover:border-accent-red/30 group hover:-translate-y-1 shadow-2xl relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-red to-accent-orange transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                    <div className="w-12 h-12 rounded-xl bg-accent-red/10 flex items-center justify-center text-accent-red mb-6 text-xl">
                      <i className="fa-solid fa-graduation-cap"></i>
                    </div>
                    <h3 className="text-xl font-bold font-space text-white mb-3">3. Unlock Placements</h3>
                    <p className="text-secondary text-sm leading-relaxed">
                      Maintain your learning streak to earn a verified ABTalks Certificate, join our referral pools, and unlock direct interviews with partner startup ecosystems.
                    </p>
                  </motion.div>

                  {/* Card 4: Rewards (AB Coins & Swags) */}
                  <motion.div 
                    initial={{ opacity: 0, filter: "blur(12px)", y: 40 }}
                    whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                    viewport={{ once: false, margin: "-80px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
                    className="liquid-glass p-8 rounded-2xl hover:border-pink-500/30 group hover:-translate-y-1 shadow-2xl relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                    <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center text-pink-500 mb-6 text-xl">
                      <i className="fa-solid fa-coins"></i>
                    </div>
                    <h3 className="text-xl font-bold font-space text-white mb-3">4. Earn Reward Points</h3>
                    <p className="text-secondary text-sm leading-relaxed">
                      Earn AB Coins for every daily commit and post. Build your streak multiplier and redeem your points for exciting tech goodies, official swags, and premium resources.
                    </p>
                  </motion.div>

                </div>

                {/* Grid 2: Big Statistics (Social Proof) */}
                <motion.div 
                  initial={{ opacity: 0, filter: "blur(15px)", y: 50 }}
                  whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                  viewport={{ once: false, margin: "-80px" }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="liquid-glass grid grid-cols-2 md:grid-cols-4 gap-8 py-10 px-8 rounded-3xl mb-20"
                >
                  <div className="text-center">
                    <div className="text-4xl lg:text-5xl font-anton text-accent-orange mb-2">10,000+</div>
                    <div className="text-xs uppercase tracking-wider text-secondary">Active Coders</div>
                  </div>
                  <div className="text-center border-l border-white/5">
                    <div className="text-4xl lg:text-5xl font-anton text-white mb-2">450k+</div>
                    <div className="text-xs uppercase tracking-wider text-secondary">GitHub Commits</div>
                  </div>
                  <div className="text-center border-l border-white/5">
                    <div className="text-4xl lg:text-5xl font-anton text-accent-yellow mb-2">120+</div>
                    <div className="text-xs uppercase tracking-wider text-secondary">Placed Students</div>
                  </div>
                  <div className="text-center border-l border-white/5">
                    <div className="text-4xl lg:text-5xl font-anton text-white mb-2">100%</div>
                    <div className="text-xs uppercase tracking-wider text-secondary">Free & Non-Profit</div>
                  </div>
                </motion.div>

                {/* Testimonials */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <motion.div 
                    initial={{ opacity: 0, filter: "blur(12px)", y: 30 }}
                    whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                    viewport={{ once: false, margin: "-80px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="liquid-glass p-6 rounded-2xl flex gap-4 items-start hover:-translate-y-1"
                  >
                    <img src="https://i.pravatar.cc/100?img=11" alt="Alumni" className="w-12 h-12 rounded-full border border-white/10" />
                    <div>
                      <p className="text-sm text-secondary italic mb-3">
                        "I had zero commits on my GitHub before joining ABTalks. Coding and posting daily for 60 days not only built my skills but got me my first internship through a recruiter who saw my LinkedIn posts!"
                      </p>
                      <h4 className="text-sm font-bold text-white">Rohit Sharma</h4>
                      <p className="text-xs text-secondary">SDE Intern at TechCorp (60-Day Finisher)</p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, filter: "blur(12px)", y: 30 }}
                    whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                    viewport={{ once: false, margin: "-80px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                    className="liquid-glass p-6 rounded-2xl flex gap-4 items-start hover:-translate-y-1"
                  >
                    <img src="https://i.pravatar.cc/100?img=12" alt="Alumni" className="w-12 h-12 rounded-full border border-white/10" />
                    <div>
                      <p className="text-sm text-secondary italic mb-3">
                        "The community here keeps you going when you want to quit. You see thousands of other students pushing code at midnight, and it forces you to open your editor. Pure consistency builder."
                      </p>
                      <h4 className="text-sm font-bold text-white">Aditi Verma</h4>
                      <p className="text-xs text-secondary">Pre-placement offer at CloudScale</p>
                    </div>
                  </motion.div>
                </div>

              </div>
            </section>
          </main>

          <footer className="py-8 px-6 border-t border-white/5 relative z-10 bg-black/30 font-outfit">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between text-center gap-6">
              <div>
                <p className="font-medium">&copy; <span className="text-accent-yellow">2026</span> ABTalks.</p>
                <p className="text-sm text-secondary mt-1">Ghaziabad, Uttar Pradesh</p>
              </div>
              
              <div className="flex gap-4">
                {[
                  { icon: 'discord', brandClass: 'liquid-glass-discord hover:bg-[#5865F2]', url: 'https://discord.gg/bUWygPMcT' },
                  { icon: 'linkedin-in', brandClass: 'liquid-glass-linkedin hover:bg-[#0077b5]', url: 'https://www.linkedin.com/company/abtalks-on-ai/' },
                  { icon: 'instagram', brandClass: 'liquid-glass-instagram hover:bg-[#e1306c]', url: 'https://www.instagram.com/abtalksonai?igsh=eDczMzljbXA5bjM4' },
                  { icon: 'github', brandClass: 'liquid-glass-github hover:bg-black', url: '#' },
                  { icon: 'youtube', brandClass: 'liquid-glass-youtube hover:bg-[#ff0000]', url: 'https://youtube.com/live/Tl7kFB_DXYc?feature=share' }
                ].map(({ icon, brandClass, url }) => (
                  <a key={icon} href={url} target={url !== '#' ? '_blank' : undefined} rel={url !== '#' ? 'noopener noreferrer' : undefined} className={`liquid-glass-circle flex items-center justify-center w-10 h-10 text-secondary hover:text-white transition-all duration-300 hover:-translate-y-1 hover:scale-110 ${brandClass}`}>
                    <i className={`fa-brands fa-${icon}`}></i>
                  </a>
                ))}
              </div>
            </div>
          </footer>
        </>
      )}

      {/* Registration Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsModalOpen(false);
                setIsSubmitted(false);
              }}
              className="absolute inset-0 bg-black/75 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="liquid-glass w-full max-w-md p-8 rounded-3xl relative border border-white/10 shadow-2xl z-10 font-outfit"
            >
              {/* Close Button */}
              <button 
                onClick={() => {
                  setIsModalOpen(false);
                  setIsSubmitted(false);
                }} 
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all cursor-pointer border border-white/10"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>

              {!registeredName ? (
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    setRegisteredName(formData.name);
                  }}
                  className="flex flex-col gap-5 mt-2"
                >
                  <div className="text-center mb-2">
                    <h2 className="font-space text-2xl font-bold text-white tracking-tight">Join the cohort</h2>
                    <p className="text-xs text-secondary mt-1">Unlock consistency, points, and certification</p>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-secondary uppercase tracking-wider">Full Name</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="e.g. Shivam Gupta"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-accent-orange/50 transition-all font-outfit text-sm focus:ring-1 focus:ring-accent-orange/30"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-secondary uppercase tracking-wider">Date of Birth</label>
                    <input 
                      type="date" 
                      required 
                      value={formData.dob}
                      onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-orange/50 transition-all font-outfit text-sm focus:ring-1 focus:ring-accent-orange/30 scheme-dark"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-secondary uppercase tracking-wider">Email Address</label>
                    <input 
                      type="email" 
                      required 
                      placeholder="e.g. shivam@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-accent-orange/50 transition-all font-outfit text-sm focus:ring-1 focus:ring-accent-orange/30"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-secondary uppercase tracking-wider">City</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="e.g. Ghaziabad"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-accent-orange/50 transition-all font-outfit text-sm focus:ring-1 focus:ring-accent-orange/30"
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="btn w-full mt-4 cursor-pointer py-3.5 text-white"
                  >
                    Confirm Cohort Registration <i className="fa-solid fa-check"></i>
                  </button>
                </form>
              ) : (
                <div className="flex flex-col items-center text-center py-8 gap-4 mt-2">
                  <div className="w-16 h-16 rounded-full bg-[#ff5e00]/10 border border-[#ff5e00]/30 flex items-center justify-center text-accent-orange text-3xl pulse-dot">
                    <i className="fa-solid fa-circle-check"></i>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <h2 className="font-space text-2xl font-bold text-white tracking-tight">You're in, {registeredName.split(' ')[0]}!</h2>
                    <p className="text-sm text-secondary px-4 leading-relaxed">
                      Your registration for the 60-Day Coding Challenge cohort is complete. We've sent details to <strong className="text-white">{formData.email}</strong>.
                    </p>
                  </div>
                  <button 
                    onClick={() => {
                      setIsModalOpen(false);
                      navigate('/dashboard');
                    }}
                    className="btn px-8 py-3.5 mt-4 cursor-pointer text-white"
                  >
                    Get Started <i className="fa-solid fa-arrow-right"></i>
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Account Details Modal */}
      <AnimatePresence>
        {isAccountOpen && (
          <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4">
            {/* Blur Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAccountOpen(false)}
              className="absolute inset-0 bg-black/75 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="liquid-glass w-full max-w-sm p-8 rounded-3xl relative border border-white/10 shadow-2xl z-10 font-outfit text-left"
            >
              {/* Close Button */}
              <button 
                onClick={() => setIsAccountOpen(false)} 
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all cursor-pointer border border-white/10"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>

              <div className="mb-6">
                <h2 className="font-space text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                  <i className="fa-solid fa-user-gear text-accent-orange text-xl"></i> Account Details
                </h2>
                <p className="text-xs text-secondary mt-1">Verify your cohort membership credentials</p>
              </div>
              
              <div className="flex flex-col gap-4 font-outfit text-sm text-white/80">
                <div className="border-b border-white/5 pb-2">
                  <span className="block text-[10px] text-white/40 uppercase tracking-wider font-semibold">Full Name</span>
                  <strong className="text-white text-[15px] font-bold">{formData.name || 'Shivam Gupta'}</strong>
                </div>
                <div className="border-b border-white/5 pb-2">
                  <span className="block text-[10px] text-white/40 uppercase tracking-wider font-semibold">Date of Birth</span>
                  <strong className="text-white">
                    {formData.dob ? new Date(formData.dob).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }) : '15th August 2004'}
                  </strong>
                </div>
                <div className="border-b border-white/5 pb-2">
                  <span className="block text-[10px] text-white/40 uppercase tracking-wider font-semibold">Email Address</span>
                  <strong className="text-white">{formData.email || 'shivam@gmail.com'}</strong>
                </div>
                <div className="border-b border-white/5 pb-2">
                  <span className="block text-[10px] text-white/40 uppercase tracking-wider font-semibold">City / Hub</span>
                  <strong className="text-white">{formData.city || 'Ghaziabad'}</strong>
                </div>
                <div className="border-b border-white/5 pb-2">
                  <span className="block text-[10px] text-white/40 uppercase tracking-wider font-semibold">Program Track</span>
                  <strong className="text-accent-orange font-bold">Software Development (SDE)</strong>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
