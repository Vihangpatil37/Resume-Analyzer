import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

interface Props {
  data: {
    subject: string;
    A: number; // Resume Score
    B: number; // JD Req
    fullMark: number;
  }[];
}

const SkillRadarChart: React.FC<Props> = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 h-96 flex flex-col">
      <h3 className="font-semibold text-slate-700 mb-2">Skill Coverage</h3>
      <div className="flex-1 w-full h-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
            <PolarGrid stroke="#f1f5f9" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12 }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
            <Radar name="Resume" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.5} />
            <Radar name="Job Post" dataKey="B" stroke="#cbd5e1" fill="#cbd5e1" fillOpacity={0.3} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-center gap-6 mt-2 text-sm">
        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-primary-500 rounded-full"></div> Resume</div>
        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-slate-300 rounded-full"></div> Target Role</div>
      </div>
    </div>
  );
};

export default SkillRadarChart;
