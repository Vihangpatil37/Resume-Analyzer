import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadCloud, FileText, CheckCircle } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-8">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Side: Hero Text */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100 text-primary-700 font-medium text-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-600"></span>
            </span>
            AI-Powered Analysis
          </div>
          
          <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Elevate Your Resume with <span className="text-primary-600">Precision AI</span>
          </h1>
          
          <p className="text-lg text-slate-600">
            Our platform acts as your personal ATS system and technical recruiter. Upload your resume to gain actionable insights, match against job descriptions, and generate optimized rewrites instantly.
          </p>

          <button 
            onClick={() => navigate('/dashboard')}
            className="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-3 transform hover:-translate-y-1"
          >
            Get Started Free
            <FileText className="w-5 h-5" />
          </button>
        </div>

        {/* Right Side: Feature Preview */}
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 relative">
           <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary-100 rounded-full blur-2xl opacity-60"></div>
           <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-blue-100 rounded-full blur-3xl opacity-60"></div>
           
           <div className="relative z-10 space-y-6">
             <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
                  <UploadCloud className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">1. Upload Resume</h3>
                  <p className="text-sm text-slate-500">PDF or DOCX format</p>
                </div>
             </div>

             <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">2. Real-time Analysis</h3>
                  <p className="text-sm text-slate-500">ATS Scoring & Extraction</p>
                </div>
             </div>

             <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">3. Apply Improvements</h3>
                  <p className="text-sm text-slate-500">AI Rewrites & matching</p>
                </div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
