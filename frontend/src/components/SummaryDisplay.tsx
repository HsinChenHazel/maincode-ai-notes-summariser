import { Note } from '../types';

interface SummaryDisplayProps {
  note: Note | null;
  isLoading: boolean;
  error: string | null;
}

export const SummaryDisplay: React.FC<SummaryDisplayProps> = ({ note, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">AI Summary</h2>
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-4/6"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-red-800 mb-2">Error</h2>
        <p className="text-red-700">{error}</p>
      </div>
    );
  }

  if (!note) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">AI Summary</h2>
        <p className="text-gray-600">Enter notes above to generate an AI-powered summary.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">AI Summary</h2>
        <span className="text-xs text-gray-500">
          {new Date(note.createdAt).toLocaleString()}
        </span>
      </div>
      <div className="prose max-w-none">
        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{note.summary}</p>
      </div>
    </div>
  );
};

