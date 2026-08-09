import React, { useState } from 'react';
import './Rewards.css';

export default function Rewards({ registeredName, navigate, points, setPoints }) {
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const rewardsStore = [
    { id: 'stickers', title: 'ABTalks Custom Sticker Pack', cost: 100, icon: 'fa-note-sticky', desc: 'Pack of 5 holographic developer stickers for your laptop.' },
    { id: 'theme', title: 'Premium Dev Theme Pack', cost: 50, icon: 'fa-palette', desc: 'Custom high-contrast VS Code and terminal themes.' },
    { id: 'discord', title: 'Exclusive Discord VIP Role', cost: 30, icon: 'fa-hashtag', desc: 'Unlock custom name colors and VIP channel access.' },
    { id: 'cert', title: 'Verified Completion Certificate', cost: 200, icon: 'fa-file-signature', desc: 'Verifiable credentials for your resume and LinkedIn.' },
    { id: 'sheet', title: 'System Design Cheat Sheet', cost: 80, icon: 'fa-diagram-project', desc: 'High-res reference sheet for system architecture.' },
    { id: 'resume', title: 'Resume Review & Feedback', cost: 150, icon: 'fa-address-card', desc: 'Detailed async review & formatting tips by a recruiter.' },
    { id: 'mentor', title: '1-on-1 Mock Interview Session', cost: 350, icon: 'fa-user-tie', desc: '45-min mock session with a MAANG engineer.' },
    { id: 'hoodie', title: 'Official ABTalks Developer Hoodie', cost: 500, icon: 'fa-shirt', desc: 'Premium, heavy-blend black hoodie with neon branding.' }
  ];

  const handleRedeem = (item) => {
    if (points >= item.cost) {
      setPoints(points - item.cost);
      setSuccessMessage(`Successfully redeemed: ${item.title}! Check your email for claim details.`);
      setErrorMessage('');
      setTimeout(() => setSuccessMessage(''), 5000);
    } else {
      setErrorMessage(`Insufficient AB Coins! You need ${item.cost - points} more coins to redeem this.`);
      setSuccessMessage('');
      setTimeout(() => setErrorMessage(''), 5000);
    }
  };

  return (
    <main className="pt-28 pb-16 px-6 font-outfit min-h-screen relative z-10 max-w-7xl mx-auto flex flex-col gap-8">
      {/* Rewards Top Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl relative overflow-hidden liquid-glass">
        <div className="flex flex-col">
          <h1 className="font-space text-3xl font-bold text-white tracking-tight">ABTalks Rewards Center</h1>
          <p className="text-secondary text-sm mt-1">Redeem your hard-earned coins for official swags and developer resources.</p>
        </div>

        {/* Current Points balance display */}
        <div className="flex items-center gap-3 bg-[#ffe000]/15 border border-[#ffe000]/30 rounded-xl px-5 py-3 text-[#ffe000] font-bold text-lg shadow-[0_0_20px_rgba(255,224,0,0.15)] pulse-points animate-pulse self-stretch md:self-auto justify-center">
          <i className="fa-solid fa-coins text-xl"></i>
          <span>{points} AB Coins</span>
        </div>
      </div>

      {/* Success/Error Alerts */}
      {successMessage && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 rounded-xl text-sm flex items-center gap-2">
          <i className="fa-solid fa-circle-check text-base"></i>
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 text-red-300 rounded-xl text-sm flex items-center gap-2">
          <i className="fa-solid fa-triangle-exclamation text-base"></i>
          {errorMessage}
        </div>
      )}

      {/* Rewards Catalog Grid */}
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="font-space text-xl font-bold text-white tracking-tight">Available Rewards</h2>
          <p className="text-secondary text-xs mt-1">Strengthen your coding habits, earn coins, and treat yourself.</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {rewardsStore.map(item => {
            const canAfford = points >= item.cost;
            return (
              <div 
                key={item.id}
                className={`p-4 rounded-xl flex flex-col justify-between aspect-square relative overflow-hidden group transition-all duration-300 ${
                  canAfford 
                    ? 'border border-[#ffe000]/40 shadow-[0_0_15px_rgba(255,224,0,0.15)] bg-gradient-to-br from-[#ffe000]/3 to-white/1 hover:border-[#ffe000]/80 hover:shadow-[0_0_25px_rgba(255,224,0,0.35)] hover:-translate-y-1' 
                    : 'border border-white/5 bg-[#141414] hover:-translate-y-0.5'
                }`}
              >
                <div className="flex flex-col gap-2">
                  <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-white text-base border border-white/5">
                    <i className={`fa-solid ${item.icon}`}></i>
                  </div>
                  <div>
                    <h3 className={`text-[13px] sm:text-[14px] font-bold transition-colors leading-tight ${canAfford ? 'text-white group-hover:text-[#ffe000]' : 'text-white/90'}`}>{item.title}</h3>
                    <p className="text-secondary text-[10px] leading-snug mt-0.5">{item.desc}</p>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center text-[10px] font-semibold">
                    <span className="text-[#ffe000] flex items-center gap-1"><i className="fa-solid fa-coins text-[8px]"></i> {item.cost} Coins</span>
                    <span className="text-secondary hidden sm:inline">{points >= item.cost ? 'Available' : `${item.cost - points} more`}</span>
                  </div>

                  {canAfford ? (
                    <button 
                      onClick={() => handleRedeem(item)}
                      className="btn-redeem w-full py-1.5 rounded-lg font-semibold text-[11px] tracking-wide cursor-pointer transition-all duration-300 text-center bg-accent-orange text-white hover:shadow-[0_0_12px_rgba(255,94,0,0.4)]"
                    >
                      Redeem
                    </button>
                  ) : (
                    <button 
                      disabled
                      className="w-full py-1.5 text-center font-bold text-[11px] tracking-wider text-red-500 bg-transparent cursor-not-allowed uppercase"
                    >
                      Grind more champ!
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
