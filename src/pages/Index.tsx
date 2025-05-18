
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
  const [apiKey, setApiKey] = useState<string>('');
  const recognitionRef = useRef<any>(null);

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

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setMessages((msgs) => [
          ...msgs,
          { message: transcript, type: "user" }
        ]);
        setListening(false);

        // Send to AI after transcription if API key is present
        if (apiKey) {
          fetchAIResponse(transcript);
        } else {
          setMessages((msgs) => [
            ...msgs,
            { message: "Set your OpenAI API key above to get AI responses.", type: "ai" }
          ]);
        }
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

  const fetchAIResponse = async (text: string) => {
    setMessages((msgs) => [
      ...msgs,
      { message: "Assistant typing…", type: "ai" }
    ]);
    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "You are a helpful AI assistant." },
            { role: "user", content: text }
          ],
          max_tokens: 100,
          temperature: 0.7
        })
      });
      if (!res.ok) {
        throw new Error("API error");
      }
      const data = await res.json();
      const answer = data.choices?.[0]?.message?.content?.trim() || "No response.";
      setMessages((msgs) =>
        // Replace the last "Assistant typing..." message
        msgs.slice(0, -1).concat([{ message: answer, type: 'ai' }])
      );
    } catch (err) {
      setMessages((msgs) =>
        msgs.slice(0, -1).concat([{ message: "Failed to get AI response. Check your API key.", type: 'ai' }])
      );
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
          {/* API key input */}
          <div className="w-full mb-2">
            <input
              type="password"
              className="w-full rounded-md px-3 py-1 border border-[#2B3759] bg-[#19213A] text-white text-xs"
              placeholder="Enter your OpenAI API key to enable AI responses"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
          </div>
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
