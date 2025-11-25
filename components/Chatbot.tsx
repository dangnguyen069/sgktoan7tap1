import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Bot, User, Loader2, Sparkles } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { ChatMessage, Lesson } from '../types';

interface ChatbotProps {
  currentLesson: Lesson | null;
}

const Chatbot: React.FC<ChatbotProps> = ({ currentLesson }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: 'Xin chào! Mình là trợ lý AI học tập. Bạn cần giúp đỡ gì về bài học này không?'
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Initialize GenAI
  const apiKey = process.env.API_KEY; 

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    
    // Trigger MathJax typeset whenever messages change or chat opens
    if ((window as any).MathJax && isOpen) {
       setTimeout(() => {
         (window as any).MathJax.typesetPromise();
       }, 50);
    }
  }, [messages, isOpen]);

  const handleSendMessage = async () => {
    if (!input.trim() || !apiKey) {
      if (!apiKey) alert("Chưa cấu hình API KEY trong môi trường.");
      return;
    }

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: apiKey });
      
      // Construct context from current lesson
      let context = "Bạn là một gia sư Toán lớp 7 thân thiện, vui tính và kiên nhẫn. ";
      context += "QUAN TRỌNG: Hãy sử dụng công thức Toán dưới dạng LaTeX và bọc trong dấu $ (ví dụ: $x^2 + 1 = 0$, $\\frac{1}{2}$). ";
      context += "Không sử dụng Markdown cho công thức toán, bắt buộc dùng LaTeX bọc trong $. ";
      
      if (currentLesson) {
        context += `\nHọc sinh đang xem bài: "${currentLesson.title}".\n`;
        context += `Kiến thức trọng tâm: ${currentLesson.content.keyPoints.join(' ')}\n`;
        context += `Nội dung: ${currentLesson.content.theory.join(' ')}\n`;
        context += "Hãy giải thích dựa trên nội dung này. Nếu học sinh hỏi ngoài lề, hãy khéo léo đưa về bài học. Sử dụng Tiếng Việt. Trả lời ngắn gọn, súc tích.";
      } else {
         context += "Hiện tại học sinh chưa chọn bài học nào. Hãy hướng dẫn họ chọn bài học từ danh sách.";
      }

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
            { role: 'user', parts: [{ text: context }] }, // Pre-prompt context
            ...messages.filter(m => m.id !== 'welcome').map(m => ({
                role: m.role,
                parts: [{ text: m.text }]
            })),
            { role: 'user', parts: [{ text: input }] }
        ]
      });

      const aiText = response.text || "Xin lỗi, mình không thể trả lời lúc này.";

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: aiText
      };

      setMessages(prev => [...prev, aiMessage]);

    } catch (error) {
      console.error("AI Error:", error);
      const errorMessage: ChatMessage = {
        id: Date.now().toString(),
        role: 'model',
        text: 'Có lỗi xảy ra khi kết nối với AI. Vui lòng thử lại sau.',
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-[350px] sm:w-[400px] h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col border border-teal-100 overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-teal-600 to-teal-500 p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-white/20 rounded-full">
                <Sparkles size={16} />
              </div>
              <div>
                <h3 className="font-bold text-sm">Trợ Lý AI Toán 7</h3>
                <p className="text-xs text-teal-100 opacity-90">Sẵn sàng hỗ trợ</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 p-1 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 bg-slate-50 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  msg.role === 'user' ? 'bg-teal-100 text-teal-700' : 'bg-indigo-100 text-indigo-700'
                }`}>
                  {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                </div>
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm ${
                    msg.role === 'user'
                      ? 'bg-teal-600 text-white rounded-tr-none'
                      : msg.isError 
                        ? 'bg-red-50 text-red-600 border border-red-200 rounded-tl-none'
                        : 'bg-white text-slate-700 border border-slate-200 rounded-tl-none'
                  }`}
                >
                  {/* We render text directly; MathJax will find the $ delimiters and typeset them */}
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3">
                 <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center">
                    <Bot size={16} />
                 </div>
                 <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-none border border-slate-200 shadow-sm flex items-center gap-2 text-slate-400 text-sm">
                    <Loader2 size={16} className="animate-spin" />
                    <span>Đang suy nghĩ...</span>
                 </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white border-t border-slate-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Hỏi về bài học..."
                className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !input.trim()}
                className="p-2.5 bg-teal-600 text-white rounded-xl hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`group p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-2 ${
            isOpen ? 'bg-slate-200 text-slate-600' : 'bg-teal-600 text-white'
        }`}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={28} />}
        {!isOpen && <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap font-medium pr-1">Hỏi bài ngay</span>}
      </button>
    </div>
  );
};

export default Chatbot;