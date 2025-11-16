import { useState, useEffect, useMemo, useRef } from 'react';
import { NoteInput } from './components/NoteInput';
import { NoteHistoryPanel } from './components/NoteHistory';
import { Note, ApiError } from './types';
import './App.css';
import { Sidebar } from './components/ui/Sidebar';
import { RefreshIcon, CopyIcon, InfoIcon, CloseIcon } from './components/icons';
import { TypewriterText } from './components/TypewriterText';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';
const MAX_CHAR_COUNT = 10000;
type AppView = 'home' | 'history';

function App() {
  const [currentNote, setCurrentNote] = useState<Note | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [noteContent, setNoteContent] = useState('');
  const [activeView, setActiveView] = useState<AppView>('home');
  const [selectedHistoryId, setSelectedHistoryId] = useState<string | null>(null);
  const [showOriginalNoteOverlay, setShowOriginalNoteOverlay] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    if (!showOriginalNoteOverlay) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowOriginalNoteOverlay(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        overlayRef.current &&
        !overlayRef.current.contains(event.target as Node)
      ) {
        setShowOriginalNoteOverlay(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('mousedown', handleClickOutside);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [showOriginalNoteOverlay]);

  const fetchNotes = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/notes`);
      if (!response.ok) {
        throw new Error('Failed to fetch notes');
      }
      const data = await response.json();
      setNotes(data.notes || []);
      if (!selectedHistoryId && data.notes?.length) {
        setSelectedHistoryId(data.notes[0].id);
      }
    } catch (err) {
      console.error('Error fetching notes:', err);
      // Don't show error for initial fetch failure
    }
  };

  const handleSubmitNote = async (content: string) => {
    const trimmed = content.trim();
    if (!trimmed || isLoading) {
      return;
    }
    setIsLoading(true);
    setError(null);
    setCurrentNote(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });

      if (!response.ok) {
        const errorData: ApiError = await response.json();
        throw new Error(errorData.error || 'Failed to generate summary');
      }

      const data = await response.json();
      setCurrentNote(data.note);
      setSelectedHistoryId(data.note.id);
      await fetchNotes(); // Refresh notes list
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      console.error('Error submitting note:', err);
    } finally {
      setIsLoading(false);
      setActiveView('home');
    }
  };

  useEffect(() => {
    if (activeView === 'history' && !selectedHistoryId && notes.length) {
      setSelectedHistoryId(notes[0].id);
      setCurrentNote(notes[0]);
    }
  }, [activeView, notes, selectedHistoryId]);

  const selectedHistoryNote = useMemo(
    () => notes.find((note) => note.id === selectedHistoryId) || null,
    [notes, selectedHistoryId]
  );

  const isEditing = !isLoading && !currentNote;
  const characterCount = noteContent.length;
  const displayedNoteContent = currentNote?.content ?? noteContent;
  const canCreateNew = Boolean(currentNote && !isLoading && !error);

  const handleNewSummary = () => {
    setCurrentNote(null);
    setNoteContent('');
    setError(null);
    setSelectedHistoryId(null);
    setActiveView('home');
  };

  const handleRegenerate = () => {
    if (noteContent.trim()) {
      handleSubmitNote(noteContent);
    }
  };

  const handleCopySummary = async () => {
    const summaryToCopy =
      activeView === 'history' ? selectedHistoryNote?.summary : currentNote?.summary;
    if (!summaryToCopy) return;
    try {
      await navigator.clipboard.writeText(summaryToCopy);
    } catch (err) {
      console.error('Failed to copy summary', err);
    }
  };

  const handleShowOriginalNote = () => {
    if (!selectedHistoryNote) return;
    setShowOriginalNoteOverlay(true);
  };

  const handleCloseOriginalNoteOverlay = () => {
    setShowOriginalNoteOverlay(false);
  };

  const handleSidebarChange = (view: AppView) => {
    setActiveView(view);
    if (view === 'home') {
      // Reset to default starting state when navigating to Home
      setCurrentNote(null);
      setNoteContent('');
      setError(null);
      setSelectedHistoryId(null);
    } else if (view === 'history' && notes.length) {
      if (selectedHistoryId) {
        const note = notes.find((item) => item.id === selectedHistoryId) || notes[0];
        setCurrentNote(note);
      } else {
        setSelectedHistoryId(notes[0].id);
        setCurrentNote(notes[0]);
      }
    }
  };

  const renderHomeContent = () => {
    if (isEditing) {
      return (
        <div className="flex h-full min-h-0 flex-col gap-4">
          <NoteInput
            value={noteContent}
            onChange={(value) => setNoteContent(value.slice(0, MAX_CHAR_COUNT))}
            onClear={() => setNoteContent('')}
            onSubmit={() => handleSubmitNote(noteContent)}
            characterCount={characterCount}
            maxCharacters={MAX_CHAR_COUNT}
            isSubmitting={isLoading}
            className="min-h-0"
          />
          {error && (
            <div className="shrink-0 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          )}
        </div>
      );
    }

    const renderSummaryContent = () => {
      if (isLoading) {
        const shimmerWidths = [
          '55%',
          '50%',
          '78%',
          '76%',
          '74%',
          '85%',
          '83%',
          '81%',
          '92%',
          '90%',
          '88%',
          '86%',
        ];

        return (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5 text-sm text-[#6f6f6f]">
              <p className="text-base">Generating summary…</p>
              <p>(This usually takes 10-15 seconds.)</p>
            </div>
            <div className="flex flex-col gap-2">
              {shimmerWidths.map((width, index) => (
                <div
                  key={index}
                  className="shimmer-block"
                  style={{ width, height: '13px' }}
                />
              ))}
            </div>
          </div>
        );
      }
      if (error) {
        return (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        );
      }
      if (currentNote) {
        return (
          <TypewriterText
            key={currentNote.id}
            text={currentNote.summary}
            className="whitespace-pre-wrap leading-relaxed"
          />
        );
      }
      return <p className="text-[#797979]">Enter notes above to generate an AI-powered summary.</p>;
    };

    return (
      <div className="grid h-full min-h-0 gap-3 md:grid-cols-[minmax(0,440px)_1fr] md:gap-3">
        <div className="flex h-full min-h-0 flex-col rounded-2xl bg-[#f2f2f2] p-5 shadow-sm">
          <p className="mb-3 shrink-0 text-lg font-medium text-black">Your Note</p>
          <div className="flex-1 overflow-y-auto whitespace-pre-wrap text-base text-[#181818] text-opacity-70">
            {displayedNoteContent || 'No note content available.'}
          </div>
        </div>
        <div className="flex h-full min-h-0 flex-col rounded-2xl bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2">
            <p className="text-lg font-medium text-black">AI Summary</p>
            {!isLoading && currentNote && <InfoIcon className="h-5 w-5 text-[#acacac]" />}
          </div>

          <div
            key={currentNote ? currentNote.id : isLoading ? 'loading' : 'empty'}
            className="mt-3 flex-1 overflow-y-auto text-base text-[#181818]"
          >
            {renderSummaryContent()}
          </div>

          {!isLoading && currentNote && (
            <div className="mt-5 flex shrink-0 flex-wrap justify-end gap-2">
               <button
                type="button"
                onClick={handleCopySummary}
                className="flex items-center gap-2 rounded-lg border border-transparent bg-[#0065d9] px-3 py-2
  text-white transition hover:bg-[#0052b3]"
                aria-label="Copy summary to clipboard"
              >
                <CopyIcon className="h-5 w-5" />
                <span className="sr-only">Copy summary</span>
              </button>
              <button
                type="button"
                onClick={handleRegenerate}
                className="flex items-center gap-2 rounded-lg border border-transparent bg-[#0065d9] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#0052b3]"
              >
                <RefreshIcon className="h-5 w-5" />
                Regenerate
              </button>

            </div>
          )}
        </div>
      </div>
    );
  };

  const renderHistoryContent = () => (
    <div className="grid h-full min-h-0 gap-3 md:grid-cols-[minmax(0,440px)_1fr] md:gap-3">
      <NoteHistoryPanel
        notes={notes}
        selectedId={selectedHistoryId}
        onSelect={(note) => {
          setSelectedHistoryId(note.id);
          setCurrentNote(note);
        }}
      />
      <div className="flex h-full min-h-0 flex-col rounded-2xl bg-white p-5 shadow-sm">
        {selectedHistoryNote ? (
          <>
            <p className="shrink-0 text-lg font-medium text-black">
              {selectedHistoryNote.summary.substring(0, 60) || 'Saved Summary'}
            </p>
            <div className="mt-3 flex-1 overflow-y-auto whitespace-pre-wrap text-base text-[#181818]">
              {selectedHistoryNote.summary}
            </div>
            <div className="mt-5 flex shrink-0 flex-wrap justify-end gap-2">
              <button
                type="button"
                disabled
                className="flex items-center gap-2 rounded-lg border border-[#0065d9] px-4 py-2 text-sm font-medium text-[#0065d9] opacity-60"
              >
                Remove from History
              </button>
              <button
                type="button"
                onClick={handleShowOriginalNote}
                className="flex items-center gap-2 rounded-lg border border-[#0065d9] px-4 py-2 text-sm font-medium text-[#0065d9] transition hover:bg-[#f9fcff]"
              >
                Original Note
              </button>
              <button
                type="button"
                onClick={handleCopySummary}
                className="flex items-center gap-2 rounded-lg border border-transparent bg-[#0065d9] px-3 py-2 text-sm font-medium text-white transition hover:bg-[#0052b3]"
              >
                <CopyIcon className="h-5 w-5" />
                <span className="sr-only">Copy summary</span>
              </button>
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center text-center text-[#797979]">
            <p className="text-base">No past summaries yet.</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex h-screen flex-col bg-[#f8f9fa]">
      <header className="shrink-0 px-6 py-6 md:px-10 md:py-8">
        <div className="mx-auto max-w-6xl">
          <h1 className="font-['Inria_Serif',serif] text-3xl font-normal text-black md:text-[32px]">
            AI Notes Summariser
          </h1>
          <p className="mt-1 text-base text-black/70 md:text-lg">Drop a note. Get the gist. In seconds.</p>
        </div>
      </header>

      <main className="flex-1 overflow-hidden px-4 pb-6 md:px-10 md:pb-8">
        <div className="mx-auto flex h-full max-w-6xl flex-col gap-4 overflow-hidden md:flex-row">
          <div className="shrink-0 md:pr-3">
            <Sidebar
              activeView={activeView}
              onChange={handleSidebarChange}
              onCreateNew={handleNewSummary}
              canCreateNew={canCreateNew}
            />
          </div>
          <div className="flex-1 overflow-hidden">
            {activeView === 'home' ? renderHomeContent() : renderHistoryContent()}
          </div>
        </div>
      </main>

      <footer className="shrink-0 pb-6 text-center text-sm text-[#797979] md:pb-8">
        Powered by Ollama with llama3.2:3b
      </footer>

      {showOriginalNoteOverlay && selectedHistoryNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 p-4">
          <div
            ref={overlayRef}
            className="relative flex max-h-[90vh] w-full max-w-2xl flex-col rounded-2xl bg-[#fcfcfc] shadow-lg"
          >
            <div className="flex shrink-0 items-center justify-between gap-3 p-5 pb-0">
              <p className="text-lg font-medium text-black">Your Note</p>
              <button
                type="button"
                onClick={handleCloseOriginalNoteOverlay}
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[#141414] transition hover:bg-[#f2f2f2]"
                aria-label="Close overlay"
              >
                <CloseIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 pb-5 pt-3">
              <p className="whitespace-pre-wrap text-base leading-[1.6] text-[#141414]">
                {selectedHistoryNote.content}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

