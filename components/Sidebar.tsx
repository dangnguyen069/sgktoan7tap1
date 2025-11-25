import React from 'react';
import { textbookData } from '../data';
import { Menu, ChevronRight, Lock, CheckCircle } from 'lucide-react';
import { Chapter, Lesson } from '../types';

interface SidebarProps {
  currentLesson: Lesson | null;
  onSelectLesson: (lesson: Lesson) => void;
  isOpen: boolean;
  onToggle: () => void;
  completedLessons: string[];
  unlockedLessons: string[];
}

const Sidebar: React.FC<SidebarProps> = ({ 
  currentLesson, 
  onSelectLesson, 
  isOpen, 
  onToggle,
  completedLessons,
  unlockedLessons
}) => {
  return (
    <>
      {/* Mobile Toggle Button (only visible when closed) */}
      {!isOpen && (
        <button
          onClick={onToggle}
          className="fixed top-4 left-4 z-50 p-2 bg-teal-600 text-white rounded-md shadow-lg md:hidden"
        >
          <Menu size={24} />
        </button>
      )}

      {/* Sidebar Container */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-80 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:translate-x-0 flex flex-col shadow-xl`}
      >
        <div className="p-6 bg-teal-700 text-white flex justify-between items-center shadow-md">
          <div>
            <h1 className="text-xl font-bold flex items-center gap-2">
              <i className="fa-solid fa-book-open"></i>
              TOÁN 7
            </h1>
            <p className="text-teal-200 text-xs mt-1 font-medium">Chân Trời Sáng Tạo</p>
          </div>
          <button onClick={onToggle} className="md:hidden text-teal-100 hover:text-white">
            <ChevronRight className="rotate-180" size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-2">
          {textbookData.map((chapter: Chapter) => (
            <div key={chapter.id} className="mb-4">
              <h2 className="px-6 py-3 text-xs font-bold text-teal-700 uppercase tracking-wider bg-teal-50 border-y border-teal-100 flex items-center gap-2">
                <i className="fa-solid fa-folder-open text-teal-500"></i>
                {chapter.title}
              </h2>
              <ul className="mt-1">
                {chapter.lessons.map((lesson: Lesson) => {
                  const isLocked = !unlockedLessons.includes(lesson.id);
                  const isCompleted = completedLessons.includes(lesson.id);
                  const isActive = currentLesson?.id === lesson.id;

                  return (
                    <li key={lesson.id}>
                      <button
                        onClick={() => {
                          if (!isLocked) {
                            onSelectLesson(lesson);
                            if (window.innerWidth < 768) onToggle();
                          }
                        }}
                        disabled={isLocked}
                        className={`w-full text-left px-6 py-3 text-sm transition-all flex items-center justify-between gap-3 ${
                          isActive
                            ? 'bg-teal-100 text-teal-900 font-bold border-r-4 border-teal-600'
                            : isLocked 
                              ? 'text-slate-400 bg-slate-50 cursor-not-allowed opacity-70' 
                              : 'text-slate-600 hover:bg-slate-50 hover:text-teal-700'
                        }`}
                      >
                        <div className="flex items-center gap-2 overflow-hidden">
                          <span className={`text-xs ${isActive ? 'text-teal-600' : 'text-slate-400'}`}>
                            {isCompleted ? <i className="fa-solid fa-check text-green-500"></i> : <i className="fa-regular fa-circle"></i>}
                          </span>
                          <span className="truncate">{lesson.title.split(': ')[1] || lesson.title}</span>
                        </div>
                        {isLocked && <Lock size={14} className="text-slate-400 flex-shrink-0" />}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="p-4 border-t border-slate-200 text-xs text-slate-400 text-center bg-slate-50">
          <div className="mb-2 font-semibold">Tiến độ: {Math.round((completedLessons.length / unlockedLessons.length) * 100) || 0}%</div>
          <div className="w-full bg-slate-200 rounded-full h-1.5 mb-2">
             <div 
                className="bg-teal-500 h-1.5 rounded-full transition-all duration-500" 
                style={{width: `${Math.round((completedLessons.length / 20) * 100)}%`}} // Assuming ~20 lessons total for bar visual
             ></div>
          </div>
          © 2024 NXB Giáo Dục
        </div>
      </div>
    </>
  );
};

export default Sidebar;