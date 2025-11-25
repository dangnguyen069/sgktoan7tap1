import React, { useEffect, useState } from 'react';
import { Lesson, Quiz } from '../types';

interface LessonViewProps {
  lesson: Lesson;
  onComplete: (lessonId: string) => void;
  isCompleted: boolean;
}

const LessonView: React.FC<LessonViewProps> = ({ lesson, onComplete, isCompleted }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  // Reset state when lesson changes
  useEffect(() => {
    setSelectedAnswers({});
    setQuizSubmitted(false);
    setScore(0);
  }, [lesson.id]);

  // Trigger MathJax typeset whenever the lesson content changes
  useEffect(() => {
    if ((window as any).MathJax) {
      const timer = setTimeout(() => {
        (window as any).MathJax.typesetPromise();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [lesson, quizSubmitted]); // Re-run when quiz submitted to render math in explanations

  const handleAnswerSelect = (quizId: string, optionIndex: number) => {
    if (quizSubmitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [quizId]: optionIndex
    }));
  };

  const handleSubmitQuiz = () => {
    let correctCount = 0;
    lesson.content.quizzes.forEach(quiz => {
      if (selectedAnswers[quiz.id] === quiz.correctAnswer) {
        correctCount++;
      }
    });

    const calculatedScore = (correctCount / lesson.content.quizzes.length) * 100;
    setScore(calculatedScore);
    setQuizSubmitted(true);

    if (calculatedScore >= 80) {
      onComplete(lesson.id);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-8 pb-24">
      {/* Header */}
      <header className="pb-4 border-b border-slate-200">
        <h1 className="text-2xl md:text-3xl font-bold text-teal-800 flex items-center gap-3">
          <i className="fa-solid fa-graduation-cap text-teal-600"></i>
          {lesson.title}
        </h1>
        {isCompleted && (
          <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
            <i className="fa-solid fa-check-circle"></i> Đã hoàn thành
          </div>
        )}
      </header>

      {/* Key Knowledge Box (Bootstrap Card Style) */}
      <div className="card border-l-4 border-l-yellow-400">
        <div className="card-header bg-yellow-50 text-yellow-800 flex items-center gap-2">
          <i className="fa-solid fa-lightbulb text-yellow-500"></i>
          Kiến Thức Trọng Tâm
        </div>
        <div className="card-body bg-yellow-50/30">
          <ul className="space-y-2">
            {lesson.content.keyPoints.map((point, idx) => (
              <li key={idx} className="flex gap-3 text-slate-700">
                <span className="text-yellow-500 font-bold mt-1"><i className="fa-solid fa-star text-xs"></i></span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Detailed Theory */}
      <section>
        <div className="flex items-center gap-3 mb-4 text-teal-800 border-b border-slate-200 pb-2">
          <span className="bg-teal-100 p-2 rounded-lg"><i className="fa-solid fa-book-open"></i></span>
          <h2 className="text-xl font-bold uppercase">Nội Dung Bài Học</h2>
        </div>
        <div className="space-y-4">
          {lesson.content.theory.map((paragraph, idx) => (
            <div key={idx} className="card shadow-sm hover:shadow-md transition-shadow">
              <div className="card-body text-slate-700 leading-relaxed">
                {paragraph}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Examples */}
      {lesson.content.examples.length > 0 && (
        <section>
          <div className="flex items-center gap-3 mb-4 text-blue-800 border-b border-slate-200 pb-2">
            <span className="bg-blue-100 p-2 rounded-lg"><i className="fa-solid fa-shapes"></i></span>
            <h2 className="text-xl font-bold uppercase">Ví Dụ Minh Họa</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {lesson.content.examples.map((ex) => (
              <div key={ex.id} className="card border-t-4 border-t-blue-500 shadow-sm">
                <div className="card-body">
                  <div className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                    <i className="fa-solid fa-question-circle"></i> Đề bài:
                  </div>
                  <p className="text-slate-700 mb-4 bg-slate-50 p-3 rounded italic border border-slate-100">{ex.problem}</p>
                  <div className="pt-3 border-t border-slate-100">
                    <div className="font-bold text-teal-700 mb-1 text-sm flex items-center gap-2">
                      <i className="fa-solid fa-pen-nib"></i> Giải:
                    </div>
                    <p className="text-slate-800">{ex.solution}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Exercises */}
      {lesson.content.exercises.length > 0 && (
        <section>
          <div className="flex items-center gap-3 mb-4 text-indigo-800 border-b border-slate-200 pb-2">
            <span className="bg-indigo-100 p-2 rounded-lg"><i className="fa-solid fa-pencil"></i></span>
            <h2 className="text-xl font-bold uppercase">Bài Tập Tự Luyện</h2>
          </div>
          <div className="space-y-4">
            {lesson.content.exercises.map((ex, idx) => (
              <div key={ex.id} className="card shadow-sm border-l-4 border-l-indigo-400">
                <div className="card-body flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm shadow-sm">
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-slate-800 font-medium mb-3">{ex.question}</p>
                    {ex.hint && (
                      <div className="text-sm text-slate-500 bg-slate-50 p-3 rounded border border-slate-200">
                        <span className="font-bold text-slate-400 uppercase text-xs mr-2"><i className="fa-regular fa-lightbulb"></i> Gợi ý:</span>
                        {ex.hint}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Interactive Quiz & Unlock Section */}
      {lesson.content.quizzes && lesson.content.quizzes.length > 0 && (
        <section className="mt-12">
          <div className="flex items-center gap-3 mb-6 text-purple-800 border-b border-slate-200 pb-2">
             <span className="bg-purple-100 p-2 rounded-lg"><i className="fa-solid fa-list-check"></i></span>
             <h2 className="text-xl font-bold uppercase">Trắc Nghiệm & Mở Khóa</h2>
          </div>
          
          <div className="space-y-6">
            {lesson.content.quizzes.map((quiz, idx) => {
              const isCorrect = selectedAnswers[quiz.id] === quiz.correctAnswer;
              
              return (
                <div key={quiz.id} className={`card shadow-md transition-colors ${
                  quizSubmitted 
                    ? (isCorrect ? 'border-green-400 bg-green-50' : 'border-red-400 bg-red-50') 
                    : 'border-slate-200'
                }`}>
                  <div className="card-body">
                    <p className="font-semibold text-lg mb-4 text-slate-800">
                      <span className="text-slate-500 mr-2">Câu {idx + 1}:</span> 
                      {quiz.question}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {quiz.options.map((option, optIdx) => (
                        <button
                          key={optIdx}
                          disabled={quizSubmitted}
                          onClick={() => handleAnswerSelect(quiz.id, optIdx)}
                          className={`p-3 rounded-lg text-left border transition-all flex items-center gap-3
                            ${selectedAnswers[quiz.id] === optIdx 
                              ? 'bg-purple-100 border-purple-500 text-purple-900 shadow-inner' 
                              : 'bg-white border-slate-200 hover:bg-slate-50'
                            }
                            ${quizSubmitted && quiz.correctAnswer === optIdx ? '!bg-green-200 !border-green-600 !text-green-900 font-bold' : ''}
                            ${quizSubmitted && selectedAnswers[quiz.id] === optIdx && quiz.correctAnswer !== optIdx ? '!bg-red-200 !border-red-600 !text-red-900' : ''}
                          `}
                        >
                          <div className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs
                             ${selectedAnswers[quiz.id] === optIdx ? 'border-purple-600 bg-purple-600 text-white' : 'border-slate-400 text-slate-500'}
                             ${quizSubmitted && quiz.correctAnswer === optIdx ? '!border-green-700 !bg-green-700 !text-white' : ''}
                          `}>
                            {String.fromCharCode(65 + optIdx)}
                          </div>
                          {option}
                        </button>
                      ))}
                    </div>
                    {quizSubmitted && (
                      <div className={`mt-4 p-3 rounded text-sm ${isCorrect ? 'text-green-800 bg-green-100' : 'text-red-800 bg-red-100'}`}>
                        <strong><i className={`fa-solid ${isCorrect ? 'fa-check' : 'fa-xmark'}`}></i> Giải thích: </strong>
                        {quiz.explanation}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex flex-col items-center justify-center p-6 bg-slate-100 rounded-xl border border-slate-200">
            {!quizSubmitted ? (
              <button
                onClick={handleSubmitQuiz}
                disabled={Object.keys(selectedAnswers).length < lesson.content.quizzes.length}
                className="px-8 py-3 bg-teal-600 text-white font-bold rounded-lg shadow-lg hover:bg-teal-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-transform transform active:scale-95 flex items-center gap-2"
              >
                <i className="fa-solid fa-paper-plane"></i> Nộp Bài & Kiểm Tra
              </button>
            ) : (
              <div className="text-center animate-in fade-in zoom-in duration-500">
                <div className="text-4xl font-bold mb-2">
                  {score >= 80 ? <span className="text-green-600">Tuyệt Vời! 🎉</span> : <span className="text-orange-500">Cố lên nhé! 💪</span>}
                </div>
                <p className="text-lg text-slate-600 mb-4">Bạn đạt <span className="font-bold">{score.toFixed(0)}%</span> điểm số.</p>
                
                {score >= 80 ? (
                  <div className="p-4 bg-green-100 text-green-800 rounded-lg border border-green-200">
                    <i className="fa-solid fa-unlock text-xl mb-2"></i>
                    <p>Chúc mừng! Bạn đã mở khóa bài học tiếp theo.</p>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setQuizSubmitted(false);
                      setSelectedAnswers({});
                      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                    }}
                    className="px-6 py-2 bg-orange-500 text-white font-semibold rounded hover:bg-orange-600 transition-colors"
                  >
                    <i className="fa-solid fa-rotate-right"></i> Làm lại
                  </button>
                )}
              </div>
            )}
            {!quizSubmitted && Object.keys(selectedAnswers).length < lesson.content.quizzes.length && (
              <p className="text-xs text-slate-400 mt-2">Hãy chọn đáp án cho tất cả câu hỏi để nộp bài.</p>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default LessonView;