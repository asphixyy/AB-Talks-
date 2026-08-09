import React from 'react';
import './Dashboard.css';

export default function Dashboard({ 
  registeredName, 
  navigate, 
  points, 
  setPoints, 
  completedTasks, 
  setCompletedTasks 
}) {
  const tasksList = [
    { id: 'commit', label: 'Push a GitHub commit for today\'s project', points: 10, icon: 'fa-code-branch' },
    { id: 'post', label: 'Share your milestone update on LinkedIn', points: 15, icon: 'fa-linkedin-in' },
    { id: 'dsa', label: 'Solve 1 DSA Problem on LeetCode/GFG', points: 15, icon: 'fa-brain' }
  ];

  const handleTaskToggle = (id, taskPoints) => {
    const isNowChecked = !completedTasks[id];
    setCompletedTasks({ ...completedTasks, [id]: isNowChecked });
    setPoints(prev => isNowChecked ? prev + taskPoints : prev - taskPoints);
  };

  const namePrefix = registeredName ? registeredName.trim().split(' ')[0] : 'Coder';

  // Mock GitHub heatmap contribution data for the 60-Day challenge dynamically driven by completed days
  const completedDaysCount = parseInt(localStorage.getItem('completedDaysCount') || '20');
  const heatmapDays = Array.from({ length: 60 }, (_, i) => {
    const dayNum = i + 1;
    let level = 0; // 0: empty, 1: low, 2: medium, 3: high
    if (dayNum <= completedDaysCount) {
      level = (dayNum % 3) + 1; 
    }
    return { dayNum, level };
  });

  return (
    <main className="pt-28 pb-16 px-6 font-outfit min-h-screen relative z-10 max-w-7xl mx-auto flex flex-col gap-8">
      {/* Dashboard Top Header bar (Flat, No Glassmorphism) */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#141414] border border-[#262626] rounded-xl p-6 flat-dashboard-card">
        <div className="flex flex-col">
          <h1 className="font-space text-3xl font-bold text-white tracking-tight">Welcome Back, {namePrefix}!</h1>
          <p className="text-[#a3a3a3] text-sm mt-1">Cohort 1 • Ghaziabad Hub • SDE Track</p>
        </div>

        <button 
          onClick={() => {
            localStorage.clear();
            window.history.pushState({}, '', '/');
            window.location.reload(); 
          }}
          className="px-4 py-2.5 bg-[#1f1f1f] border border-[#2d2d2d] hover:bg-[#262626] rounded-xl text-white/90 text-sm transition-all cursor-pointer"
        >
          Log Out <i className="fa-solid fa-arrow-right-from-bracket ml-1.5"></i>
        </button>
      </div>

      {/* Grid 1: Streaks, Completion, and Standings (Flat design) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Streak Card */}
        <div className="bg-[#141414] border border-[#262626] p-6 rounded-xl flex items-center justify-between gap-4 flat-dashboard-card">
          <div>
            <span className="text-xs uppercase text-[#a3a3a3] font-semibold tracking-wider">Current Streak</span>
            <div className="text-4xl font-anton text-accent-orange mt-2 tracking-wide flex items-baseline gap-2">
              20 <span className="font-outfit text-sm font-semibold text-[#a3a3a3] tracking-normal">Days</span>
            </div>
            <p className="text-xs text-[#737373] mt-1">Next milestone: 21 Days (Bronze Badge)</p>
          </div>
          <div className="w-16 h-16 rounded-full bg-accent-orange/10 flex items-center justify-center text-accent-orange text-3xl">
            <i className="fa-solid fa-fire-flame-curved"></i>
          </div>
        </div>

        {/* Completion Progress Card */}
        <div 
          onClick={() => navigate('/day/12')}
          className="bg-[#141414] border border-[#262626] hover:border-accent-yellow/40 p-6 rounded-xl flex items-center justify-between gap-4 flat-dashboard-card cursor-pointer transition-all hover:-translate-y-0.5"
        >
          <div>
            <span className="text-xs uppercase text-[#a3a3a3] font-semibold tracking-wider">Overall Completion</span>
            <div className="text-4xl font-anton text-accent-yellow mt-2 tracking-wide flex items-baseline gap-2">
              33% <span className="font-outfit text-sm font-semibold text-[#a3a3a3] tracking-normal">Finished</span>
            </div>
            <p className="text-xs text-[#737373] mt-1">20 of 60 days committed successfully</p>
          </div>
          <div className="relative w-16 h-16 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="32" cy="32" r="28" stroke="rgba(255,255,255,0.06)" strokeWidth="4.5" fill="transparent" />
              <circle cx="32" cy="32" r="28" stroke="var(--accent-yellow)" strokeWidth="4.5" fill="transparent"
                strokeDasharray={2 * Math.PI * 28}
                strokeDashoffset={2 * Math.PI * 28 * (1 - 0.33)}
              />
            </svg>
            <span className="absolute text-[11px] font-bold text-accent-yellow">20/60</span>
          </div>
        </div>

        {/* Standings Card */}
        <div className="bg-[#141414] border border-[#262626] p-6 rounded-xl flex items-center justify-between gap-4 flat-dashboard-card">
          <div>
            <span className="text-xs uppercase text-[#a3a3a3] font-semibold tracking-wider">Student Standing</span>
            <div className="text-4xl font-anton text-accent-red mt-2 tracking-wide flex items-baseline gap-2">
              Top 4% <span className="font-outfit text-sm font-semibold text-[#a3a3a3] tracking-normal">Ranking</span>
            </div>
            <p className="text-xs text-[#737373] mt-1">Consistent Coder League leader</p>
          </div>
          <div className="w-16 h-16 rounded-full bg-accent-red/10 flex items-center justify-center text-accent-red text-3xl">
            <i className="fa-solid fa-trophy"></i>
          </div>
        </div>

      </div>

      {/* Main Section Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Heatmap and Achievements */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          
          {/* GitHub Heatmap Grid */}
          <div className="bg-[#141414] border border-[#262626] p-6 rounded-xl flex flex-col gap-5 flat-dashboard-card">
            <div>
              <h2 className="font-space text-lg font-bold text-white tracking-tight">60-Day Progress Heatmap</h2>
              <p className="text-[#a3a3a3] text-xs mt-1">Visualize your commit status. Keep the streak active!</p>
            </div>

            <div className="flex flex-col gap-2">
              <div className="grid grid-cols-12 gap-2">
                {heatmapDays.map(({ dayNum, level }) => (
                  <div 
                    key={dayNum}
                    className={`aspect-square rounded-[4px] relative group border transition-all ${
                      level === 0 ? 'bg-white/5 border-white/5' :
                      level === 1 ? 'bg-emerald-950 border-emerald-900' :
                      level === 2 ? 'bg-emerald-800 border-emerald-700' :
                      'bg-emerald-500 border-emerald-400'
                    }`}
                  >
                    <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1.5 opacity-0 group-hover:opacity-100 bg-black text-[10px] text-white rounded px-2 py-1 pointer-events-none transition-all whitespace-nowrap z-50 border border-[#262626]">
                      Day {dayNum}: {level === 0 ? 'No commits' : `${level * 2} commits`}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center text-[10px] text-[#a3a3a3] mt-2 px-1">
                <span>Day 1</span>
                <div className="flex items-center gap-1.5">
                  <span>Less</span>
                  <div className="w-2.5 h-2.5 rounded-[2px] bg-white/5 border border-white/5" />
                  <div className="w-2.5 h-2.5 rounded-[2px] bg-emerald-950 border border-emerald-900" />
                  <div className="w-2.5 h-2.5 rounded-[2px] bg-emerald-800 border border-emerald-700" />
                  <div className="w-2.5 h-2.5 rounded-[2px] bg-emerald-500 border border-emerald-400" />
                  <span>More</span>
                </div>
                <span>Day 60</span>
              </div>
            </div>
          </div>

          {/* Achievements Grid */}
          <div className="bg-[#141414] border border-[#262626] p-6 rounded-xl flex flex-col gap-5 flat-dashboard-card">
            <div>
              <h2 className="font-space text-lg font-bold text-white tracking-tight">Unlocked Badges</h2>
              <p className="text-[#a3a3a3] text-xs mt-1">Claim your standing achievements</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              {/* Badge 1 */}
              <div className="flex flex-col items-center text-center p-4 bg-[#1f1f1f] border border-[#2d2d2d] rounded-xl relative group overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-0.5 bg-accent-orange" />
                <div className="w-12 h-12 rounded-full bg-accent-orange/10 flex items-center justify-center text-accent-orange text-xl mb-3">
                  <i className="fa-solid fa-flag"></i>
                </div>
                <h4 className="text-sm font-bold text-white">Streak Starter</h4>
                <p className="text-[10px] text-[#a3a3a3] mt-1">Committed first 5 consecutive days</p>
              </div>

              {/* Badge 2 */}
              <div className="flex flex-col items-center text-center p-4 bg-[#1f1f1f] border border-[#2d2d2d] rounded-xl relative group overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-0.5 bg-accent-yellow" />
                <div className="w-12 h-12 rounded-full bg-accent-yellow/10 flex items-center justify-center text-accent-yellow text-xl mb-3">
                  <i className="fa-brands fa-linkedin-in"></i>
                </div>
                <h4 className="text-sm font-bold text-white">Visibility Star</h4>
                <p className="text-[10px] text-[#a3a3a3] mt-1">Shared 10 daily learning summaries</p>
              </div>

              {/* Badge 3 (Locked) */}
              <div className="flex flex-col items-center text-center p-4 bg-[#1f1f1f] border border-[#1f1f1f] rounded-xl opacity-40 relative group overflow-hidden">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white/50 text-xl mb-3">
                  <i className="fa-solid fa-lock"></i>
                </div>
                <h4 className="text-sm font-bold text-white/60">Elite Finisher</h4>
                <p className="text-[10px] text-[#a3a3a3] mt-1">Complete all 60 days (Locked)</p>
              </div>

            </div>
          </div>

        </div>

        {/* Right Column: Daily Tasks and SDE Scorecard */}
        <div className="flex flex-col gap-8">
          
          {/* Daily Tasks Checklist */}
          <div className="bg-[#141414] border border-[#262626] p-6 rounded-xl flex flex-col gap-5 flat-dashboard-card">
            <div>
              <h2 className="font-space text-lg font-bold text-white tracking-tight">Today's Tasks</h2>
              <p className="text-[#a3a3a3] text-xs mt-1">Complete daily tasks to update your standings</p>
            </div>

            <div className="flex flex-col gap-3.5">
              {tasksList.map(task => (
                <div 
                  key={task.id}
                  onClick={() => handleTaskToggle(task.id, task.points)}
                  className={`flex gap-3.5 p-3.5 border rounded-xl cursor-pointer transition-all duration-300 items-start ${
                    completedTasks[task.id] 
                      ? 'bg-emerald-950/15 border-emerald-500/40 text-emerald-300' 
                      : 'bg-[#1f1f1f] border-[#2d2d2d] text-white hover:border-[#404040]'
                  }`}
                >
                  <div className="mt-0.5 text-base flex items-center justify-center w-5 h-5 rounded border border-white/10 bg-[#141414]">
                    {completedTasks[task.id] ? (
                      <i className="fa-solid fa-circle-check text-emerald-400"></i>
                    ) : (
                      <div className="w-2.5 h-2.5 rounded-sm bg-transparent" />
                    )}
                  </div>
                  <div className="flex-1 flex flex-col gap-1">
                    <span className={`text-xs font-medium leading-normal ${completedTasks[task.id] ? 'line-through text-[#737373]' : 'text-white'}`}>
                      {task.label}
                    </span>
                    <span className="text-[10px] text-[#ffe000] font-semibold flex items-center gap-1">
                      <i className="fa-solid fa-coins text-[9px]"></i> +{task.points} Coins
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SDE Scorecard (Skill Analyzer) */}
          <div className="bg-[#141414] border border-[#262626] p-6 rounded-xl flex flex-col gap-5 flat-dashboard-card">
            <div>
              <h2 className="font-space text-lg font-bold text-white tracking-tight">SDE Competence Score</h2>
              <p className="text-[#a3a3a3] text-xs mt-1">Performance breakdown of your public learning streak</p>
            </div>

            <div className="flex flex-col gap-4">
              
              {/* Metric 1 */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-white">Coding Consistency</span>
                  <span className="text-accent-orange">85%</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-accent-orange rounded-full" style={{ width: '85%' }} />
                </div>
              </div>

              {/* Metric 2 */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-white">Public Visibility (LinkedIn)</span>
                  <span className="text-accent-yellow">75%</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-accent-yellow rounded-full" style={{ width: '75%' }} />
                </div>
              </div>

              {/* Metric 3 */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-white">System Design & QA</span>
                  <span className="text-accent-red">60%</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-accent-red rounded-full" style={{ width: '60%' }} />
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </main>
  );
}
