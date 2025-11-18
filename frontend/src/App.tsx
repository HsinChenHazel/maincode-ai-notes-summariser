import { useState, useEffect, useMemo, useRef } from 'react';
import { NoteInput } from './components/NoteInput';
import { NoteHistoryPanel } from './components/NoteHistory';
import { Note, ApiError } from './types';
import './App.css';
import { Sidebar } from './components/ui/Sidebar';
import { CloseIcon } from './components/icons';
import { Button } from './components/ui/Button';
import { Card } from './components/ui/Card';
import { SummaryPanel } from './components/SummaryPanel';
import { WarningDialog } from './components/ui/WarningDialog';
import { cn } from './utils/cn';


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
  const [showWarningDialog, setShowWarningDialog] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState<AppView | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Fake test data - uncomment to test with sample notes
  // const fakeNotes: Note[] = [
  // ];

  useEffect(() => {
    fetchNotes();
    
    // Uncomment below and comment fetchNotes() to use fake data:
    // setNotes(fakeNotes);
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

    // Cancel any existing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new AbortController for this request
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

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
        signal: abortController.signal,
      });

      // Check if request was aborted
      if (abortController.signal.aborted) {
        return;
      }

      if (!response.ok) {
        const errorData: ApiError = await response.json();
        throw new Error(errorData.error || 'Failed to generate summary');
      }

      const data = await response.json();

      // Check again if request was aborted before updating state
      if (abortController.signal.aborted) {
        return;
      }

      setCurrentNote(data.note);
      setSelectedHistoryId(data.note.id);
      await fetchNotes(); // Refresh notes list
    } catch (err) {
      // Don't show error if request was aborted
      if (err instanceof Error && err.name === 'AbortError') {
        return;
      }
      // Check if abort controller was aborted
      if (abortController.signal.aborted) {
        return;
      }
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      console.error('Error submitting note:', err);
    } finally {
      // Only update loading state and view if request wasn't aborted
      if (!abortController.signal.aborted) {
        setIsLoading(false);
        setActiveView('home');
      }
      // Clear abort controller reference if this was the current request
      if (abortControllerRef.current === abortController) {
        abortControllerRef.current = null;
      }
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

  // Helper function to get title from note (prefers note.title, falls back to content extraction)
  // const getTitleFromNote = (note: Note) => {
  //   // Use note.title if available (new notes), otherwise extract from content (old notes)
  //   if (note.title) {
  //     return note.title;
  //   }
    
  //   // Fallback: Extract title from content for backward compatibility
  //   const trimmed = note.content.trim();
  //   if (!trimmed) return 'Untitled Note';
  //   const firstSentence = trimmed.split('\n')[0];
  //   return firstSentence.length > 60 ? `${firstSentence.slice(0, 57)}...` : firstSentence;
  // };

  const isEditing = !isLoading && !currentNote;
  const characterCount = noteContent.length;
  const displayedNoteContent = currentNote?.content ?? noteContent;
  const canCreateNew = Boolean(currentNote && !isLoading && !error);

  const handleNewSummary = () => {
    // Cancel any ongoing request when creating new summary
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setCurrentNote(null);
    setNoteContent('');
    setError(null);
    setSelectedHistoryId(null);
    setIsLoading(false);
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
    // Check if user is trying to navigate away while generating
    const isGenerating = isLoading && !currentNote;
    
    if (isGenerating && view === 'history') {
      // Show warning dialog instead of navigating
      setPendingNavigation(view);
      setShowWarningDialog(true);
      return;
    }

    // Normal navigation
    setActiveView(view);
    if (view === 'home') {
      // Cancel any ongoing request when navigating to Home
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
        abortControllerRef.current = null;
      }
      // Reset to default starting state when navigating to Home
      setCurrentNote(null);
      setNoteContent('');
      setError(null);
      setSelectedHistoryId(null);
      setIsLoading(false); // Ensure loading is reset
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

  const handleWarningConfirm = () => {
    // User confirmed leaving - cancel ongoing request and reset generating state
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    
    setIsLoading(false);
    setNoteContent('');
    setError(null);
    setCurrentNote(null);
    setShowWarningDialog(false);
    
    if (pendingNavigation) {
      setActiveView(pendingNavigation);
      if (pendingNavigation === 'history' && notes.length) {
        if (selectedHistoryId) {
          const note = notes.find((item) => item.id === selectedHistoryId) || notes[0];
          setCurrentNote(note);
        } else {
          setSelectedHistoryId(notes[0].id);
          setCurrentNote(notes[0]);
        }
      }
      setPendingNavigation(null);
    }
  };

  const handleWarningCancel = () => {
    // User cancelled - stay on current page
    setShowWarningDialog(false);
    setPendingNavigation(null);
  };

  const renderHomeContent = () => {
    return (
      <div className="relative h-full min-h-0">
        {/* Editing State - Single Column */}
        <div
          className={cn(
            'absolute inset-0 flex h-full min-h-0 flex-col gap-4 transition-all duration-[600ms] ease-out',
            isEditing
              ? 'opacity-100 pointer-events-auto'
              : 'opacity-0 pointer-events-none -translate-x-4'
          )}
        >
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
            <div className="shrink-0 rounded-lg border border-status-error bg-status-error-light p-4 text-sm text-status-error">
              {error}
            </div>
          )}
        </div>

        {/* Generating/Summary State - Two Column Grid */}
        <div
          className={cn(
            'absolute inset-0 grid h-full min-h-0 gap-3 transition-all duration-[600ms] ease-out md:grid-cols-[minmax(0,440px)_1fr] md:gap-3',
            isEditing
              ? 'opacity-0 pointer-events-none translate-x-4'
              : 'opacity-100 pointer-events-auto'
          )}
        >
          <Card className="flex h-full min-h-0 flex-col bg-background-tertiary">
            <p className="mb-3 shrink-0 text-lg font-medium text-text-primary">
              Your Note
            </p>
            <div className="flex-1 overflow-y-auto whitespace-pre-wrap text-base text-text-primary/70">
              {displayedNoteContent || 'No note content available.'}
            </div>
          </Card>

          <div className={cn(
            'flex h-full min-h-0 flex-col transition-all duration-[600ms] ease-out',
            isEditing ? 'opacity-0 translate-x-4 scale-95' : 'opacity-100 translate-x-0 scale-100'
          )}>
            <SummaryPanel
              currentNote={currentNote}
              isLoading={isLoading}
              error={error}
              onRegenerate={handleRegenerate}
              onCopySummary={handleCopySummary}
            />
          </div>
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
      <Card className="flex h-full min-h-0 flex-col">
        {selectedHistoryNote ? (
          <>
            {/* <p className="shrink-0 text-lg font-medium text-text-primary">
              Summary
            </p> */}

            <div className="flex-1 overflow-y-auto whitespace-pre-wrap text-base text-text-primary">
              {selectedHistoryNote.title && (
                <h3 className="mb-3 text-lg font-semibold text-text-primary">
                  {selectedHistoryNote.title}
                </h3>
              )}
              {selectedHistoryNote.summary}
            </div>

            <div className="mt-5 flex shrink-0 flex-wrap justify-end gap-2">
              <Button
                type="button"
                variant="secondary"
                size="md"
                onClick={handleShowOriginalNote}
              >
                Original Note
              </Button>
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center text-center text-text-tertiary">
            <p className="text-base">No past summaries yet.</p>
          </div>
        )}
      </Card>

    </div>
  );

  return (
    <div className="flex h-screen flex-col bg-background-secondary">
      <header className="shrink-0 px-6 py-6 md:px-10 md:py-8">
        <div className="mx-auto max-w-6xl">
          <h1 className="font-['Inria_Serif',serif] text-3xl font-normal text-text-primary md:text-[32px]">
            AI Notes Summariser
          </h1>
          <p className="mt-1 text-base text-text-secondary md:text-lg">
            Drop a note. Get the gist. In seconds.
          </p>
        </div>
      </header>


      <main className="flex-1 overflow-x-hidden overflow-y-hidden px-4 pb-6 md:px-10 md:pb-8">
        <div className="mx-auto flex h-full max-w-6xl flex-col gap-4 overflow-x-hidden overflow-y-hidden md:flex-row">
          <div className="shrink-0 p-3 md:pr-3">
            <Sidebar
              activeView={activeView}
              onChange={handleSidebarChange}
              onCreateNew={handleNewSummary}
              canCreateNew={canCreateNew}
            />
          </div>
          <div className="flex-1 overflow-x-hidden overflow-y-hidden p-3">
            {activeView === 'home' ? renderHomeContent() : renderHistoryContent()}
          </div>
        </div>
      </main>

      <footer className="shrink-0 pb-6 text-center text-sm text-text-tertiary md:pb-8">
        Powered by Ollama with llama3.2:3b
      </footer>

      {/* Original Note Overlay */}
      {showOriginalNoteOverlay && selectedHistoryNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background-overlay p-4">
          <div
            ref={overlayRef}
            className="relative flex max-h-[90vh] w-full max-w-2xl flex-col rounded-2xl bg-background-primary shadow-lg"
          >
            <div className="flex shrink-0 items-center justify-between gap-3 p-5 pb-0">
              <p className="text-lg font-medium text-text-primary">Your Note</p>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                iconOnly
                onClick={handleCloseOriginalNoteOverlay}
                className="rounded-full"
                aria-label="Close overlay"
                icon={<CloseIcon className="h-5 w-5" />}
              />
            </div>
            <div className="flex-1 overflow-y-auto px-5 pb-5 pt-3">
              <p className="whitespace-pre-wrap text-base leading-[1.6] text-text-primary">
                {selectedHistoryNote.content}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Warning Dialog for Navigation During Generation */}
      <WarningDialog
        isOpen={showWarningDialog}
        onConfirm={handleWarningConfirm}
        onCancel={handleWarningCancel}
        title="Leave Generation?"
        message="Leaving now will stop the summary generation and your progress will be lost."
        confirmLabel="Leave"
        cancelLabel="Stay"
      />
    </div>
  );
}

export default App;

