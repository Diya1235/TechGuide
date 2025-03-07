import { useState, useEffect } from "react";
import { User2Icon, X } from "lucide-react";
import { FaRobot } from "react-icons/fa";
import { useSelector } from "react-redux";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! I'm your AI assistant 🤖. How can I assist you today?", sender: "bot" },
  ]);
  const [typing, setTyping] = useState(false);
  const [showPrompt, setShowPrompt] = useState(true); // Show prompt only once

  // FAQs
  const faqData = [
    { question: "What can I do here?", answer: "🚀 You can build ats friendly resumes,cover letters,find projects, and explore colleges,browse through news!" },
    { question: "Which Resume template to choose?", answer: "🎤 By keeping limited number of templates and each template being strained from ATS solution,you can choose any of them." },
    { question: "Can I save my resume?", answer: "💾 Yes! Your resumes are saved in your profile and can be downloaded anytime in pdf format. " },
    { question: "Is there a mobile app?", answer: "📱 Yes! You can download our native app for a seamless experience." },
    { question: "How project finder works ?", answer: "💎 It has projects listed down in categories." },
   
  ];

  const { user } = useSelector((store) => store.auth);

  // Hide the prompt message after a few seconds (Show only once)
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowPrompt(false); // Hide after showing once
    }, 4000); // Show for 4 seconds

    return () => clearTimeout(timeout);
  }, []);

  // Handle user question with a delay and typing effect
  const handleUserQuestion = (question) => {
    const answer = faqData.find((faq) => faq.question === question)?.answer || "🤖 Sorry, I don't have an answer for that.";

    setMessages([...messages, { text: question, sender: "user" }]);
    setTyping(true);

    setTimeout(() => {
      setMessages((prev) => [...prev, { text: answer, sender: "bot" }]);
      setTyping(false);
    }, 2000);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center space-x-3">
      {/* Sliding Prompt Message (Only Shows Once) */}
      {!isOpen && showPrompt && (
        <div className="bg-white shadow-md px-4 py-2 rounded-lg text-sm font-medium text-gray-800 transition-transform duration-500">
          🤖 How may I help you?
        </div>
      )}

      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:scale-110 transition-all"
      >
        {isOpen ? <X size={24} /> : <FaRobot size={24} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-14 right-0 w-80 bg-white rounded-lg shadow-2xl border p-4">
          {/* Header */}
          <div className="flex justify-center items-center mb-5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold text-lg p-2 rounded-lg">
            <FaRobot size={24} className="mr-2" />
            <span>Chat with Guide</span>
          </div>

          {/* Messages */}
          <div className="flex flex-col space-y-3 max-h-80 overflow-y-auto px-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex items-center gap-2 p-3 rounded-lg text-sm ${
                  msg.sender === "bot" ? "bg-gray-200 self-start text-gray-800 font-semibold" : "bg-blue-500 text-white self-end"
                }`}
              >
                {msg.sender === "bot" ? (
                  <>
                    <FaRobot className="text-blue-500" size={20} />
                    <span>{msg.text}</span>
                  </>
                ) : (
                  <>
                    <span>{msg.text}</span>
                    <img src={user?.profile?.profilepic || "https://i.pravatar.cc/50"} alt="User" className="w-6 h-6 rounded-full" />
                  </>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {typing && (
              <div className="flex items-center gap-2 p-3 rounded-lg text-sm bg-gray-200 self-start text-gray-800 font-semibold">
                <FaRobot className="text-blue-500" size={20} />
                <span>...</span>
              </div>
            )}
          </div>

          {/* Suggested Questions */}
          <div className="mt-3 flex flex-wrap gap-2">
            {faqData.map((faq, index) => (
              <button
                key={index}
                onClick={() => handleUserQuestion(faq.question)}
                className="text-sm bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 px-3 py-1 rounded-md font-medium transition-all"
              >
                {faq.question}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
