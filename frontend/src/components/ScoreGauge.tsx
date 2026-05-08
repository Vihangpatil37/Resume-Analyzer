import React from 'react';

interface Props {
  score: number;
}

const ScoreGauge: React.FC<Props> = ({ score }) => {
  const radius = 60;
  const stroke = 12;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  let colorClass = 'text-emerald-500';
  if (score < 50) colorClass = 'text-red-500';
  else if (score < 75) colorClass = 'text-amber-500';

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white rounded-3xl shadow-sm border border-slate-100 relative">
      <h3 className="font-semibold text-slate-700 mb-4">ATS Match Score</h3>
      <div className="relative flex items-center justify-center">
        <svg height={radius * 2} width={radius * 2} className="transform -rotate-90">
          <circle
            stroke="currentColor"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            className="text-slate-100"
          />
          <circle
            stroke="currentColor"
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={circumference + ' ' + circumference}
            style={{ strokeDashoffset }}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            className={`${colorClass} transition-all duration-1000 ease-out`}
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center">
          <span className="text-4xl font-extrabold text-slate-900">{score}</span>
          <span className="text-xs font-medium text-slate-500 uppercase tracking-widest">/ 100</span>
        </div>
      </div>
      
      <p className="mt-6 text-sm text-slate-600 font-medium text-center">
        {score >= 75 ? "Excellent fit! High ATS visibility." : "Needs targeted keyword improvements."}
      </p>
    </div>
  );
};

export default ScoreGauge;
