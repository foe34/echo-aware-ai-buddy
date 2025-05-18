import React, { useRef, useState } from "react";
import AppNavbar from "@/components/AppNavbar";
import VoiceAssistantMic from "@/components/VoiceAssistantMic";
import ChatBubble from "@/components/ChatBubble";

// Simple animated placeholder, can be replaced with real waveform later
function WaveformAnimation() {
  // Simple animated placeholder, can be replaced with real waveform later
  return (
    <div aria-label="Waveform" className="flex justify-center items-end gap-1 h-10 my-8">
      {[1,2,3,4,5,6,7,8].map((_, i) => (
        <div
          key={i}
          className="bg-blue-300 rounded w-2"
          style={{
            height: `${8 + Math.abs(Math.sin(Date.now()/400 + i))*32}px`,
            transition: "height 0.1s linear"
          }}
        />
      ))}
    </div>
  );
}

const Index = () => {
  const [listening, setListening] = useState(false);
  const [messages, setMessages] = useState<{ message: string; type: "user" | "ai" }[]>([]);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  // For browser compatibility
  const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

  const handleMicClick = () => {
    if (!SpeechRecognition) {
      alert("Sorry, your browser does not support speech recognition.");
      return;
    }

    if (!listening) {
      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript;
        setMessages((msgs) => [...msgs, { message: transcript, type: "user" }]);
        setListening(false);
      };

      recognition.onend = () => setListening(false);
      recognition.onerror = () => setListening(false);

      recognition.start();
      recognitionRef.current = recognition;
      setListening(true);
    } else {
      recognitionRef.current?.stop();
      setListening(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#151E35] flex flex-col">
      <AppNavbar />
      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-sm mx-auto flex flex-col items-center">
          <h1 className="text-white text-2xl md:text-3xl font-semibold text-center mt-12 tracking-wide mb-4">
            HI! HOW CAN I HELP YOU?
          </h1>
          {/* Chat UI */}
          <div className="w-full bg-[#1A2440] rounded-lg p-4 mb-6 min-h-[200px] flex flex-col justify-end">
            {messages.length === 0 ? (
              <p className="text-gray-400 text-center">Tap the mic and say something…</p>
            ) : (
              messages.map((msg, idx) => (
                <ChatBubble key={idx} message={msg.message} type={msg.type} />
              ))
            )}
          </div>
          {/* Mic button and waveform */}
          <WaveformAnimation />
          <VoiceAssistantMic onClick={handleMicClick} disabled={listening} />
          {listening && (
            <p className="mt-3 text-xs text-blue-300 text-center animate-pulse">
              Listening… tap mic to stop
            </p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
