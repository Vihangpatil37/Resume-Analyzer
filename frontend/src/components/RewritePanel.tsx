import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface RewriteData {
  original: string;
  improved: string;
}

interface Props {
  rewrites: RewriteData[];
}

const RewritePanel: React.FC<Props> = ({ rewrites }) => {
  const [copied, setCopied] = useState<number | null>(null);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopied(index);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 space-y-6">
      <h3 className="font-semibold text-slate-700">AI Rewrites (STAR Method)</h3>
      
      {rewrites.length === 0 ? (
        <p className="text-slate-500 italic text-sm">No rewrites generated yet.</p>
      ) : (
        <div className="space-y-4">
          {rewrites.map((rw, i) => (
            <div key={i} className="flex flex-col gap-2 p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="text-sm text-slate-500 line-through">
                "{rw.original}"
              </div>
              <div className="text-sm font-medium text-slate-900 bg-emerald-50 border border-emerald-100 p-3 rounded-xl">
                {rw.improved}
              </div>
              <div className="flex justify-end mt-1">
                <button 
                  onClick={() => handleCopy(rw.improved, i)}
                  className="flex items-center gap-2 text-xs font-semibold text-primary-600 hover:text-primary-800 transition-colors"
                >
                  {copied === i ? <><Check className="w-3 h-3"/> Copied</> : <><Copy className="w-3 h-3"/> Copy Impact Point</>}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RewritePanel;
