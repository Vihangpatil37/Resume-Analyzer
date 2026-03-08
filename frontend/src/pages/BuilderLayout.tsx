import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ScoreGauge from '../components/ScoreGauge';
import SkillRadarChart from '../components/SkillRadarChart';
import RewritePanel from '../components/RewritePanel';
import { ChevronLeft } from 'lucide-react';

const BuilderLayout = () => {
  const { resumeId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    // In actual implementation: await apiService.getAnalysis(resumeId)
    // Mocking an async load
    setTimeout(() => {
      setData({
        atsScore: 78,
        matchScore: 82,
        radarData: [
          { subject: 'React', A: 90, B: 100, fullMark: 100 },
          { subject: 'Node.js', A: 60, B: 80, fullMark: 100 },
          { subject: 'TypeScript', A: 85, B: 90, fullMark: 100 },
          { subject: 'PostgreSQL', A: 50, B: 70, fullMark: 100 },
          { subject: 'Docker', A: 20, B: 60, fullMark: 100 },
          { subject: 'AWS', A: 40, B: 50, fullMark: 100 },
        ],
        rewrites: [
          {
            original: "Built a web app using React and Node.",
            improved: "Engineered a scalable full-stack web application utilizing React.js and Node.js, supporting 10,000+ monthly active users with 99.9% uptime."
          },
          {
            original: "Fixed bugs in the database.",
            improved: "Optimized PostgreSQL queries by indexing high-read columns, reducing database latency by 35% across core API endpoints."
          }
        ],
        weaknesses: [
          "Docker and containerization knowledge is missing compared to target JD.",
          "Some bullet points lack measurable action verbs and numeric outcomes."
        ]
      });
    }, 1500);
  }, [resumeId]);

  if (!data) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="animate-pulse flex flex-col items-center">
        <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
        <p className="mt-4 text-slate-500 font-medium tracking-wide">Analyzing Resume Data...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <header className="flex items-center gap-4 mb-8">
          <button 
            onClick={() => navigate('/dashboard')}
            className="p-2 bg-white rounded-full shadow-sm hover:bg-slate-100 transition-colors"
          >
            <ChevronLeft className="text-slate-600" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Analysis Workspace</h1>
            <p className="text-slate-500 mt-1">Reviewing Document ID: <span className="font-mono text-xs bg-slate-200 px-2 py-1 rounded">{resumeId}</span></p>
          </div>
        </header>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column (Scores & Charts) */}
          <div className="lg:col-span-1 flex flex-col gap-8">
            <ScoreGauge score={data.atsScore} />
            <SkillRadarChart data={data.radarData} />
            
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
              <h3 className="font-semibold text-slate-700 mb-4">Detected Weaknesses</h3>
              <ul className="space-y-3">
                {data.weaknesses.map((w: string, i: number) => (
                  <li key={i} className="flex gap-3 text-sm text-slate-600">
                    <span className="text-red-500 flex-shrink-0">•</span>
                    {w}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column (Rewrites) */}
          <div className="lg:col-span-2 flex flex-col gap-8">
             <RewritePanel rewrites={data.rewrites} />
          </div>

        </div>
      </div>
    </div>
  );
};

export default BuilderLayout;
