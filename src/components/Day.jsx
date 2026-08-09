import React, { useState, useEffect } from 'react';
import './Day.css';

export default function Day({ points, setPoints, navigate }) {
  const [gitLink, setGitLink] = useState('');
  const [linkedinLink, setLinkedinLink] = useState('');
  const [completedDays, setCompletedDays] = useState(() => {
    const hasSubmitted = localStorage.getItem('day20Submitted') === 'true';
    const totalCount = parseInt(localStorage.getItem('completedDaysCount') || '20');
    return hasSubmitted ? Math.max(21, totalCount) : totalCount;
  });
  const [isSubmitted, setIsSubmitted] = useState(() => {
    return localStorage.getItem('day20Submitted') === 'true';
  });
  const [isSubmittedSuccess, setIsSubmittedSuccess] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 4000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSubmitted) {
      showToast('You have already submitted today\'s proof of work!', 'error');
      return;
    }

    // Award +25 points, set completed days to 21
    const nextDaysCount = 21;
    setCompletedDays(nextDaysCount);
    setPoints(prev => prev + 25);
    setIsSubmitted(true);

    localStorage.setItem('completedDaysCount', nextDaysCount.toString());
    localStorage.setItem('day20Submitted', 'true');
    
    // Sync coins inside localStorage
    const savedCoins = parseInt(localStorage.getItem('userCoins') || '150');
    localStorage.setItem('userCoins', (savedCoins + 25).toString());

    // Mark task checklist complete on Dashboard
    const completedTasks = JSON.parse(localStorage.getItem('completedTasks') || '{"commit":false,"post":false,"dsa":false}');
    completedTasks.commit = true;
    completedTasks.post = true;
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));

    setIsSubmittedSuccess(true);
    setGitLink('');
    setLinkedinLink('');
  };

  return (
    <div className="day-container-react relative z-10 text-left">
      {/* Toast Alert */}
      {toast.show && (
        <div className={`fixed top-6 right-6 z-[11000] p-4 rounded-xl border backdrop-blur-md flex items-center gap-3 shadow-2xl animate-fade-in ${
          toast.type === 'error' 
            ? 'bg-red-950/90 border-red-500/30 text-white' 
            : 'bg-green-950/90 border-green-500/30 text-white'
        }`}>
          <i className={`fa-solid text-lg ${toast.type === 'error' ? 'fa-triangle-exclamation text-red-400' : 'fa-circle-check text-green-400'}`}></i>
          <div>
            <strong className="block text-xs font-bold uppercase tracking-wider">{toast.type === 'error' ? 'Notification' : 'Success!'}</strong>
            <span className="text-xs text-white/80">{toast.message}</span>
          </div>
        </div>
      )}

      {/* Left Column: Hero Challenge Card */}
      <section className="challenge-hero-card-react">
        <div>
          <div className="flex items-center justify-between mb-8">
            <span className="font-anton text-accent-orange text-2xl tracking-wide uppercase flex items-center gap-2">
              Day.TWENTY <i className="fa-solid fa-circle-check text-green-400 text-lg"></i>
            </span>
            <span className="px-3 py-1 bg-accent-orange/10 border border-accent-orange/20 text-accent-orange rounded-full text-[10px] font-semibold uppercase tracking-wider">
              DSA & Backend
            </span>
          </div>

          <div className="artwork-loops-react">
            <div className="loop-react"></div>
            <div className="loop-react"></div>
            <div className="loop-react"></div>
            <div className="loop-react"></div>
          </div>

          <h2 className="font-space text-3xl lg:text-4xl font-bold text-white leading-tight mb-3">
            Build a CRUD REST API
          </h2>
          <p className="text-sm text-secondary leading-relaxed mb-6">
            {isSubmitted 
              ? "You have completed today's challenge. Come back tomorrow!" 
              : "Design and deploy a structured REST API containing endpoints to write, read, update, and delete entries inside a local mock repository databases. Verify functionality using tools like Postman or Curl."
            }
          </p>
        </div>

        <div>
          <div className="w-full h-px bg-white/10 mb-6"></div>
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-anton text-2xl text-white tracking-wide">{completedDays}/60</span>
              <span className="text-[10px] text-secondary uppercase tracking-wider font-semibold">Completed</span>
            </div>
            <div className="flex flex-col">
              <span className="font-anton text-2xl text-white tracking-wide">3h</span>
              <span className="text-[10px] text-secondary uppercase tracking-wider font-semibold">Duration</span>
            </div>
            <button 
              onClick={() => navigate('/dashboard')}
              className="w-11 h-11 rounded-full bg-[#141414] border border-white/10 flex items-center justify-center text-white hover:bg-accent-orange hover:border-accent-orange hover:shadow-[0_0_15px_rgba(255,94,0,0.4)] transition-all cursor-pointer"
              title="Return to Dashboard"
            >
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </section>

      {/* Right Column: Submission Form */}
      <section className="bg-black/30 border border-white/5 p-8 rounded-3xl backdrop-blur-[25px] flex flex-col gap-6 shadow-2xl">
        {isSubmitted ? (
          <div className="flex flex-col items-center justify-center text-center gap-4 py-8">
            <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center text-green-400 text-3xl pulse-dot mb-2">
              <i className="fa-solid fa-circle-check"></i>
            </div>
            <h3 className="font-space text-xl font-bold text-white">Milestone Completed!</h3>
            <p className="text-xs text-secondary leading-relaxed max-w-[240px]">
              Today's challenge proof of work has been registered. Come back tomorrow!
            </p>
            <button 
              onClick={() => navigate('/dashboard')}
              className="btn px-6 py-3 mt-2 cursor-pointer text-white text-xs font-semibold"
            >
              Go back to Dashboard
            </button>
          </div>
        ) : (
          <>
            <div className="border-b border-white/5 pb-4">
              <h3 className="font-space text-xl font-bold text-white">Submit Challenge Proof</h3>
              <p className="text-xs text-secondary mt-1">Earn 25 coins upon verified submission</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-semibold text-secondary uppercase tracking-wider">GitHub Repository / Commit URL</label>
                <input 
                  type="url" 
                  required 
                  placeholder="e.g. https://github.com/shivam/day12"
                  value={gitLink}
                  onChange={(e) => setGitLink(e.target.value)}
                  className="submission-input-react"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-semibold text-secondary uppercase tracking-wider">LinkedIn Post URL</label>
                <input 
                  type="url" 
                  required 
                  placeholder="e.g. https://linkedin.com/posts/shivam-day12"
                  value={linkedinLink}
                  onChange={(e) => setLinkedinLink(e.target.value)}
                  className="submission-input-react"
                />
              </div>

              <button 
                type="submit" 
                className="btn-submit-challenge text-sm font-bold tracking-tight mt-2 flex items-center justify-center gap-2 py-3.5"
              >
                Submit Challenge Proof <i className="fa-solid fa-paper-plane text-xs"></i>
              </button>
            </form>
          </>
        )}

        <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-5 flex flex-col gap-3">
          <span className="text-[10px] text-secondary font-semibold uppercase tracking-wider">Verification Checklist</span>
          <div className="flex items-center gap-2.5 text-xs text-white/70">
            <i className="fa-solid fa-circle-nodes text-accent-orange"></i> Code committed publicly
          </div>
          <div className="flex items-center gap-2.5 text-xs text-white/70">
            <i className="fa-solid fa-hashtag text-accent-yellow"></i> Shared with #ABTalks60Days
          </div>
        </div>
      </section>

      {/* Centered Success Modal Pop-up */}
      {isSubmittedSuccess && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            onClick={() => {
              setIsSubmittedSuccess(false);
              navigate('/dashboard');
            }}
            className="absolute inset-0 bg-black/75 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Container */}
          <div className="liquid-glass w-full max-w-sm p-8 rounded-3xl relative border border-white/10 shadow-2xl z-10 text-center flex flex-col items-center justify-center font-outfit">
            <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center text-green-400 text-3xl pulse-dot mb-6">
              <i className="fa-solid fa-circle-check"></i>
            </div>
            
            <h2 className="font-space text-2xl font-bold text-white tracking-tight mb-2">
              Submission Successful!
            </h2>
            
            <p className="text-sm text-[#a3a3a3] leading-relaxed mb-6">
              Your proof of work has been registered. <strong className="text-white">+25 Coins</strong> added to your wallet.
            </p>

            <button 
              onClick={() => {
                setIsSubmittedSuccess(false);
                navigate('/dashboard');
              }}
              className="btn w-full py-3.5 cursor-pointer text-white font-semibold"
            >
              Back to Dashboard <i className="fa-solid fa-house ml-1.5 text-xs"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
