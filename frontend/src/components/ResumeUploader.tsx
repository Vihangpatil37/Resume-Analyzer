import React, { useCallback, useState } from 'react';
import { useDropzone, DropzoneOptions } from 'react-dropzone';
import { UploadCloud } from 'lucide-react';

interface Props {
  onUploadSuccess: (resumeId: string) => void;
  setIsUploading: (val: boolean) => void;
}

const ResumeUploader: React.FC<Props> = ({ onUploadSuccess, setIsUploading }) => {
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setError(null);
    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];
    setIsUploading(true);
    
    // Simulate an upload delay or call the real API
    // In actual implementation: 
    // const formData = new FormData();
    // formData.append('resume', file);
    // const res = await apiService.uploadResume(formData);
    // onUploadSuccess(res.data.data.resumeId);

    setTimeout(() => {
      // Mocking successful upload response
      setIsUploading(false);
      onUploadSuccess("mocked-uuid-1234");
    }, 2000);

  }, [onUploadSuccess, setIsUploading]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxFiles: 1,
    maxSize: 5242880 // 5MB
  } as DropzoneOptions);

  return (
    <div>
      <div 
        {...getRootProps()} 
        className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-colors duration-200 ease-in-out ${
          isDragActive ? 'border-primary-500 bg-primary-50' : 'border-slate-300 hover:border-primary-400 bg-slate-50'
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-4 text-slate-500">
          <UploadCloud className={`w-12 h-12 ${isDragActive ? 'text-primary-600' : 'text-slate-400'}`} />
          {isDragActive ? (
            <p className="text-lg font-medium text-primary-700">Drop the resume here ...</p>
          ) : (
            <div>
              <p className="text-lg font-medium text-slate-700">Drag & drop your resume here</p>
              <p className="text-sm mt-1">or click to select file (PDF, DOCX up to 5MB)</p>
            </div>
          )}
        </div>
      </div>
      {error && <p className="text-red-500 mt-4 text-sm font-medium">{error}</p>}
    </div>
  );
};

export default ResumeUploader;
