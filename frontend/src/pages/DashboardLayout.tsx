import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ResumeUploader from '../components/ResumeUploader';

const DashboardLayout = () => {
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState(false);

  const handleUploadSuccess = (resumeId: string) => {
    // Once uploaded, take them to the analysis/builder workspace
    navigate(`/builder/${resumeId}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <header className="mb-12">
        <h1 className="text-3xl font-bold text-slate-900">Analysis Dashboard</h1>
        <p className="text-slate-500 mt-2">Upload a new resume to generate an ATS Report.</p>
      </header>
      
      <main className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          <ResumeUploader 
            onUploadSuccess={handleUploadSuccess}
            setIsUploading={setIsUploading} 
          />
          
          {isUploading && (
            <div className="mt-6 text-center animate-pulse text-primary-600 font-medium">
              Uploading and analyzing... Please wait.
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
