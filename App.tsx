import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import LessonView from './components/LessonView';
import Chatbot from './components/Chatbot';
import { textbookData } from './data';
import { Lesson } from './types';

function App() {
  // Flatten lessons for easy navigation logic
  const allLessons = textbookData.flatMap(chapter => chapter.lessons);
  
  // State initialization with localStorage persistence
  const [completedLessons, setCompletedLessons] = useState<string[]>(() => {
    const saved = localStorage.getItem('completedLessons');
    return saved ? JSON.parse(saved) : [];
  });

  const [unlockedLessons, setUnlockedLessons] = useState<string[]>(() => {
    const saved = localStorage.getItem('unlockedLessons');
    // Default: unlock the first lesson
    return saved ? JSON.parse(saved) : [allLessons[0].id];
  });

  const [currentLesson, setCurrentLesson] = useState<Lesson>(allLessons[0]);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // Sync with localStorage
  useEffect(() => {
    localStorage.setItem('completedLessons', JSON.stringify(completedLessons));
    localStorage.setItem('unlockedLessons', JSON.stringify(unlockedLessons));
  }, [completedLessons, unlockedLessons]);

  const handleLessonComplete = (lessonId: string) => {
    // 1. Mark current as completed
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons(prev => [...prev, lessonId]);
    }

    // 2. Unlock next lesson
    const currentIndex = allLessons.findIndex(l => l.id === lessonId);
    if (currentIndex !== -1 && currentIndex < allLessons.length - 1) {
      const nextLessonId = allLessons[currentIndex + 1].id;
      if (!unlockedLessons.includes(nextLessonId)) {
        setUnlockedLessons(prev => [...prev, nextLessonId]);
        // Optional: Auto notification or toast could go here
      }
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      <Sidebar 
        currentLesson={currentLesson}
        onSelectLesson={setCurrentLesson}
        isOpen={isSidebarOpen}
        onToggle={() => setSidebarOpen(!isSidebarOpen)}
        completedLessons={completedLessons}
        unlockedLessons={unlockedLessons}
      />

      <main className="flex-1 h-full overflow-y-auto w-full relative bg-[#f8f9fa]">
        {/* Mobile Header */}
        <div className="md:hidden h-14 w-full bg-white border-b border-slate-200 flex items-center justify-center sticky top-0 z-30 shadow-sm">
            <span className="font-bold text-teal-800">Toán 7 - Chân Trời Sáng Tạo</span>
        </div>
        
        {currentLesson ? (
          <LessonView 
            lesson={currentLesson} 
            onComplete={handleLessonComplete}
            isCompleted={completedLessons.includes(currentLesson.id)}
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-slate-400">
            <i className="fa-solid fa-book-open text-6xl mb-4 text-slate-200"></i>
            <p>Vui lòng chọn bài học từ menu bên trái</p>
          </div>
        )}
        
        {/* Footer spacing for mobile FAB */}
        <div className="h-20 md:h-0"></div>
      </main>

      <Chatbot currentLesson={currentLesson} />
    </div>
  );
}

export default App;