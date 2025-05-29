// components/AIPlatformAssistant.jsx
import { useState } from "react";
import { askPlatformAssistant } from "../api/AiApis"; // We'll create this API function next
import { FaComments, FaPaperPlane } from "react-icons/fa";
import ReactMarkdown from "react-markdown";

export default function AIPlatformAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const toggleChat = () => setOpen(!open);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await askPlatformAssistant(input);
      const botMessage = { sender: "bot", text: response.answer };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error talking to AI:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition z-50"
      >
        <FaComments size={24} />
      </button>

      {/* Chat Popup */}
      {open && (
        <div className="fixed bottom-20 right-6 w-80 bg-white rounded-lg shadow-xl flex flex-col z-50">
          <div className="bg-blue-600 text-white p-3 rounded-t-lg text-center font-semibold">
            FleetEase AI Assistant
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2 max-h-80">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-2 rounded-lg text-sm ${
                  msg.sender === "user"
                    ? "bg-blue-100 self-end text-right"
                    : "bg-gray-100 self-start text-left"
                }`}
              >
                {/* If it's a bot message, render it with markdown */}
                {msg.sender === "bot" ? (
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                ) : (
                  msg.text
                )}
              </div>
            ))}
            {loading && (
              <div className="text-gray-400 text-center text-sm">
                Thinking...
              </div>
            )}
          </div>

          {/* Input */}
          <div className="flex p-2 border-t">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask a question..."
              className="flex-1 p-2 text-sm border rounded-l-md focus:outline-none focus:ring"
            />
            <button
              onClick={handleSend}
              className="bg-blue-600 text-white px-4 rounded-r-md hover:bg-blue-700"
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
